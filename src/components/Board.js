import { Button } from 'bootstrap';
import React, { Component } from 'react';
import { Row } from 'reactstrap';
import Column from "./Column";

class Board extends Component {
    constructor(props) {
        super(props);
        //console.log(props);
    }
    
    
    render (){
        const Table = () => this.props.columns.map(column => {
                return(<Column column = {column}/>)
            }
        );
    
        return(
            <Row>
                <Table/> 
            </Row>
        )
    }
        
}


export default Board;