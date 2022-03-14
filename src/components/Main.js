import React, { Component } from "react";
import Header from './Header';
import Board from './Board';
class Main extends Component{
    constructor(props){
        super(props);
    }
    render() {
        return(
            <div>
                <div><p></p></div>
                <Header/>
                <p></p>
                <div className='container'>
                    <Board/>
                </div>
            </div>
        );
    }
}

export default Main;