import React, {Component, useState} from 'react';
import { Form, FormGroup, Label, Input, Container, Button, Row, ButtonGroup } from 'reactstrap';
import {useDispatch, useSelector} from 'react-redux';
function fetchNameOfBoardsFromUI(BOARDS){
    BOARDS.map(Board => {
        //console.log(document.getElementById(Board.id).value);
        return(
            Board.name = document.getElementById(Board.id).value
        );
    })
    //console.log(BOARDS);
    return BOARDS;
}
function Headers(){
    const [newBoardName, setNewBoardName] = useState("");
    const [trigger,setTrigger] = useState(true);
    const BOARDS = useSelector(state => state.BOARDS);
    const dispatch = useDispatch();
    //console.log(this.state.newBoardName);
    const ButtonList = () => BOARDS.map(Board => {
        if(Board.changeable==="No"){
            return(<Input type="button" id={Board.id} className = "btn-info" value={Board.name} onClick={(e) => {dispatch({type:"EnableChangingNameOfBoard", nameOfBoard: e.target.value});setTrigger(!trigger)}}></Input>);
        }
        else{
            return(<Input type="textarea" id={Board.id} defaultValue={Board.name} ></Input>);
        }
        
    });


    return(
        <Container>
            <ButtonGroup>
                <ButtonList/>
            </ButtonGroup>
            
            <div className = "input-group">
                <Button className = "btn-info" onClick={() => dispatch({type:"AddBoard", nameOfBoard: newBoardName})}>Add</Button>
                <Input type="text" placeholder='Name Of New Board' onChange={(e) => {setNewBoardName(e.target.value);dispatch({type:"UpdateBOARDS", BOARDS: fetchNameOfBoardsFromUI(BOARDS)}) }} value={newBoardName}></Input>
                
            </div>
            
        </Container>
        
    )
    
}

export default Headers