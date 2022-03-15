import React, { Component, useState } from "react";
import Header from './Header';
import Board from './Board';
function Main() {
    const [mainTrigger,setMainTrigger] = useState(false);
    return(
        <div>
            <div><p></p></div>
            <Header mainTrigger={mainTrigger} setMainTrigger={setMainTrigger}/>
            <p></p>
            <div className='container'>
                <Board/>
            </div>
        </div>
    );
}

export default Main;