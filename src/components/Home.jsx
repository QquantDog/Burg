import { useEffect, useState } from "react"
import React from "react";
import { ButtonElem } from "../buttons/ButtonElem";
import './../styles/home/flex.css'


export function Home(){
    
    const [data, setData] = useState([]);

    useEffect(()=>{
        async function fetchData(){
            const resp = await fetch('http://localhost:3099/');
            if(resp.ok){
                try{
                    const json_resp = await resp.json();
                    console.log("json_resp", json_resp);
                    setData(json_resp)                 
                }
                catch{
                    console.log("error serializing in json");
                    setData(()=>{
                        return []
                    })
                }
            }
            else{
                console.log("error due fetching(server is not active/wrong url)")
                setData(()=>{
                    return []
                })
            }
        }
        fetchData();
    }, [])
    
    return(
        <div className="main-grid">
            <div>Home header</div>
            <div className="main-grid-wrapper">
                {data.map((el)=>{
                    return (
                        <div className="item-wrapper">
                            <div className="img-wrapper"><img className="main-grid-img" src={el.img_href}/></div>
                            <div className="main-item-text-wrapper">
                                <div className="item_name">{el.item_name}</div>
                                <div className="item_descr">{el.description}</div>
                            </div>
                            <div className="btn-block">
                                <button className="add-to-basket-btn" onClick={(e)=>{console.log("clicked")}}>В корзину</button>
                                
                                <ButtonElem />

                            </div>
                        </div>
                    )
                })}
            </div>
            
            <button onClick={()=>console.log(data)}>JMI</button>

        </div>
    )
    
}