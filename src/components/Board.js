import { Button } from 'bootstrap';
import React, { Component } from 'react';
import { useSelector } from 'react-redux';
import { Row } from 'reactstrap';
import Column from "./Column";

function Board(){
    const BOARDS = useSelector((state) => state.BOARDS);
    const displayedBoard = BOARDS.filter(BOARD => BOARD.display === "Yes");
    const Table = () => displayedBoard[0].columns.map(column => {
            return(<Column column = {column}/>)
        }
    );
    
    return (

        <Row>
            <Table/> 
        </Row>
        
    )
        
}


export default Board;