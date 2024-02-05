import React from "react";
import { useState } from "react";
import './../styles/home/aux.css'

export function ButtonElem(){

    const [n,setN] = useState(1);

    function handleMinusClick(e){
        if(n == 1) return;
        else{
            setN((n)=>n-1)
        }
    }

    function handlePlusClick(e){
        if(n < 1000){
            setN((n)=>n+1)
        }
    }

    return (
        <React.Fragment>
            <div className="btn-group-add">
                <button className="btn-group-elem-size b-l" onClick={handleMinusClick}>    -</button>
                <div    className="btn-group-elem-size d-c">                              {n}</div>
                <button className="btn-group-elem-size b-r"  onClick={handlePlusClick}>    +</button>
            </div>
        </React.Fragment>
    )
}