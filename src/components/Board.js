import { Button } from 'bootstrap';
import React, { Component, useState } from 'react';
import { useSelector } from 'react-redux';
import { Row } from 'reactstrap';
import Column from "./Column";
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
function Board(){
    const [boardTrigger, setBoardTrigger] = useState(false);
    const BOARDS = useSelector((state) => state.BOARDS);
    const displayedBoard = BOARDS.filter(BOARD => BOARD.display === "Yes");
    //console.log(displayedBoard[0]);
    const Table = () => displayedBoard[0].columns.map(column => {
            return(<Column column = {column} boardTrigger={boardTrigger} setBoardTrigger={setBoardTrigger}/>)
        }
    );
    
    return (

        <Row>
            <Table/> 
        </Row>
        
    )
        
}


export default Board;