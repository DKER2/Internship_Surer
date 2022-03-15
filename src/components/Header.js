import React, {Component, useState} from 'react';
import { Form, FormGroup, Label, Input, Container, Button, Row, ButtonGroup } from 'reactstrap';
import {useDispatch, useSelector, connect } from 'react-redux';
import _ from 'lodash'
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
const mapDispatchToProps = (dispatch) => {
    return {
      // dispatching plain actions
      EnableChangingNameOfBoard: (name) => dispatch({type:"EnableChangingNameOfBoard", name: name }),
      SetDisplay: (name) => dispatch({type:"SetDisplay", name: name }),
    }
}
let timer = 0;
let  delay = 200;
let   prevent = false;

function onSingleClickHandler(e,dispatch) {
    timer = setTimeout(() => {
        if (!prevent) {
            console.log(e);
            dispatch({type:"EnableChangingNameOfBoard", name: e.target.value});
        }
    }, delay);
};
function onDoubleClickHandler(e,dispatch) {
    clearTimeout(timer);
    prevent = true;
    dispatch({type:"SetDisplay", name: e.target.value});
    setTimeout(() => {
        prevent = false;
    }, delay);
};
let clickTimeout = null;
function handleClicksButtonList(e,dispatch,trigger,setTrigger) {
    if (clickTimeout !== null) {
        dispatch({type:"SetDisplay", name: e.target.value});
        dispatch({type:"DisableChangingNameOfBoard", name: e.target.value}); 
        clearTimeout(clickTimeout)
        clickTimeout = null
    } else {
        dispatch({type:"EnableChangingNameOfBoard", name: e.target.value}); 
        clickTimeout = setTimeout(()=>{
        setTrigger(!trigger);
        clearTimeout(clickTimeout)
        clickTimeout = null
        }, 200)
    }
  }
function Headers(){
    const [newBoardName, setNewBoardName] = useState("");
    const [trigger,setTrigger] = useState(true);
    const BOARDS = useSelector(state => state.BOARDS);
    const dispatch = useDispatch();
    //console.log(this.state.newBoardName);
    const ButtonList = () => BOARDS.map(Board => {
        if(Board.changeable==="No"){
            return(<Input type="button" id={Board.id} className = "btn-info" value={Board.name} onClick={e => {handleClicksButtonList(e,dispatch,trigger,setTrigger);}}></Input>);
        }
        else{
            return(<Input type="textarea" id={Board.id} defaultValue={Board.name} onKeyDown={(e) => {if(e.key === "Enter"){dispatch({type:"UpdateBOARDS", BOARDS: fetchNameOfBoardsFromUI(BOARDS)});dispatch({type:"DisableChangingNameOfBoard", name: e.target.value});setTrigger(!trigger)}}} ></Input>);
        }
        // (e) => {onSingleClickHandler(e,dispatch);setTrigger(!trigger)}} onDoubleClick={(e) => {onDoubleClickHandler(e,dispatch)}
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