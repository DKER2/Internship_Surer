import React, { useState,useRef, useEffect} from 'react';
import { Input, Container, Button, ButtonGroup } from 'reactstrap';
import {useDispatch, useSelector } from 'react-redux';
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
        setMainTrigger(!mainTrigger);
        clearTimeout(clickTimeout)
        clickTimeout = null
    } else {
        dispatch({type:"EnableChangingNameOfBoard", name: e.target.value}); 
        clickTimeout = setTimeout(()=>{
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
    
    const wrapperRef = useRef(null);
    useEffect(() => {
        
        function handleClickOutside(event) {
          if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
              dispatch({type: "SaveNameOfBoard"});
              props.setMainTrigger(!props.mainTrigger);
          }
        }
        document.addEventListener("mousedown", handleClickOutside);
        props.setMainTrigger(!props.mainTrigger);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [wrapperRef]);
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
            <div ref ={wrapperRef}>
                <ButtonGroup>
                    <ButtonList/>
                </ButtonGroup>
            </div>
            
            <div className = "input-group">
                <Button className = "btn-success" onClick={() => dispatch({type:"AddBoard", nameOfBoard: newBoardName})}>Add</Button>
                <Input type="text" placeholder='Name Of New Board' onKeyDown={(e) => {if(e.key==="Enter"){dispatch({type:"AddBoard", nameOfBoard: newBoardName})}}} onChange={(e) => {setNewBoardName(e.target.value);dispatch({type:"UpdateBOARDS", BOARDS: fetchNameOfBoardsFromUI(BOARDS)}) }} value={newBoardName}></Input>
                
            </div>
            
        </Container>
        
    )
    
}

export default Headers