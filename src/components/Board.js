import { Button } from 'bootstrap';
import React from 'react';
import { Row } from 'reactstrap';
import Column from "./Column";

function Board(props) {
    const Table = (props) => {
        return (
            props.columns.map(column => {
                    return(<Column column = {column}/>)
                }
            )
        );
    }
    return(
        <Row>
            <Table columns = {props.board}/> 
        </Row>
       
    );
}


export default Board;