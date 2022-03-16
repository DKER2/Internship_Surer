import React, { useState} from 'react';
import { Input, Container, Button, ButtonGroup } from 'reactstrap';
import {useDispatch, useSelector } from 'react-redux';
import _ from 'lodash'
function fetchNameOfBoardsFromUI(BOARDS){
    BOARDS.map(Board => {
        return(
            Board.name = document.getElementById(Board.id).value
        );
    })
    return BOARDS;
}


let clickTimeout = null;
function handleClicksButtonList(e,dispatch,mainTrigger,setMainTrigger) {
    if (clickTimeout !== null) {
        dispatch({type:"SetDisplay", name: e.target.value});
        dispatch({type:"DisableChangingNameOfBoard", name: e.target.value}); 
        //setTrigger(!trigger);
        setMainTrigger(!mainTrigger);
        clearTimeout(clickTimeout)
        clickTimeout = null
    } else {
        dispatch({type:"EnableChangingNameOfBoard", name: e.target.value}); 
        clickTimeout = setTimeout(()=>{
        //setTrigger(!trigger);
        setMainTrigger(!mainTrigger);
        clearTimeout(clickTimeout)
        clickTimeout = null
        }, 200)
    }
  }

function Headers(props){
    const [newBoardName, setNewBoardName] = useState("");
    const [trigger,setTrigger] = useState(true);
    const BOARDS = useSelector(state => state.BOARDS);
    const dispatch = useDispatch();
    //console.log(this.state.newBoardName);
    const ButtonList = () => BOARDS.map(Board => {
        if(Board.changeable==="No"){
            if(Board.display==="Yes"){
                return(<Input type="button" id={Board.id} className = "btn-dark" value={Board.name} onClick={e => {handleClicksButtonList(e,dispatch,props.mainTrigger,props.setMainTrigger);}}></Input>);
            }
            return(<Input type="button" id={Board.id} className = "btn-secondary" value={Board.name} onClick={e => {handleClicksButtonList(e,dispatch,props.mainTrigger,props.setMainTrigger)}}></Input>);
        }
        else{
            return(<Input type="textarea" id={Board.id} defaultValue={Board.name} onKeyDown={(e) => {if(e.key === "Enter"){dispatch({type:"UpdateBOARDS", BOARDS: fetchNameOfBoardsFromUI(BOARDS)});dispatch({type:"DisableChangingNameOfBoard", name: e.target.value});setTrigger(!trigger)}}} ></Input>);
        }
    });


    return(
        <Container>
            <ButtonGroup>
                <ButtonList/>
            </ButtonGroup>
            
            <div className = "input-group">
                <Button className = "btn-info" onClick={() => dispatch({type:"AddBoard", nameOfBoard: newBoardName})}>Add</Button>
                <Input type="text" placeholder='Name Of New Board' onKeyDown={(e) => {if(e.key==="Enter"){dispatch({type:"AddBoard", nameOfBoard: newBoardName})}}} onChange={(e) => {setNewBoardName(e.target.value);dispatch({type:"UpdateBOARDS", BOARDS: fetchNameOfBoardsFromUI(BOARDS)}) }} value={newBoardName}></Input>
                
            </div>
            
        </Container>
        
    )
    
}

export default Headers