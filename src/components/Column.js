import React, { Component, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardText, CardBody,
     Button, CardHeader, Input } from 'reactstrap';




function fetchNameOfCardsFromUI(BOARDS){
    BOARDS.map(Board => {
        //console.log(document.getElementById(Board.id).value);
        if(Board.display === "Yes"){
            Board.columns.map(column => {
                column.cards.map(card => {
                    card.text = document.getElementById(card.id).value;
                })
            })
        }
    })
    //console.log(BOARDS);
    return BOARDS;
}




function addCard(idOfColumn,BOARDS,dispatch){
    dispatch({type: "UpdateBoard", BOARDS: fetchNameOfCardsFromUI(BOARDS)});
    dispatch({type: "AddCard", idOfColumn: idOfColumn})
}
function changeCardState(e,dispatch,trigger,setTrigger,BOARDS){
    if(e.key === "Enter"){
        
        dispatch({type: "UpdateBoard", BOARDS: fetchNameOfCardsFromUI(BOARDS)})
        dispatch({type: "DisableChangingNameOfCard", id: e.target.id});
        setTrigger(!trigger)
    }
}
function setToChangeable(e,dispatch){
    dispatch({type: "EnableChangingNameOfCard", id: e.target.id})
}




function Column(props){
    const [trigger,setTrigger] = useState(false);
    const dispatch = useDispatch();
    const BOARDS = useSelector(state => state.BOARDS);
    const CardList = () => props.column.cards.map(card => {
        if(card.changeable=="No"){
            return(
                <div>
                    <Input type="button" id={card.id} value={card.text} onClick={e => {setToChangeable(e,dispatch); setTrigger(!trigger)}}></Input>
                    
                    <p></p>
                </div>
                        
            );
        }



        else{
            return(
                <div>
                    <Input type="textarea" id={card.id} defaultValue={card.text}  onKeyDown={e => {changeCardState(e,dispatch,trigger,setTrigger,BOARDS)}} ></Input>
                    <p></p>
                </div>
                        
            );
        }
        
    })
        
        
    return(
        <div className = "col-12 col-md-3">
            <Card id={props.column.id}>
                <CardHeader>{props.column.columnTitle}</CardHeader>
                <CardBody>
                    
                    
                    <CardList />
                    <p></p>
                    <Button className = "btn-success" onClick={() => {addCard(props.column.id,BOARDS,dispatch); setTrigger(!trigger)}}>+ Add a card</Button>
                    
                </CardBody>
            </Card>
        </div>
    );
    
    
}

export default Column;