import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Row } from 'reactstrap';
import Column from "./Column";
function Board(props){
    const [boardTrigger, setBoardTrigger] = useState(false);
    const BOARDS = useSelector((state) => state.BOARDS);
    const displayedBoard = BOARDS.filter(BOARD => BOARD.display === "Yes");
    const Table = () => displayedBoard[0].columns.map(column => {
            return(<Column maxCardInColumn={props.maxCardInColumn} column = {column} boardTrigger={boardTrigger} setBoardTrigger={setBoardTrigger}/>)
        }
    );
    
    return (

        <Row>
            <Table/> 
        </Row>
        
    )
        
}


export default Board;