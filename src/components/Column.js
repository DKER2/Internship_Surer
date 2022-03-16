import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody,
     Button, CardHeader, Input, InputGroup } from 'reactstrap';




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




function addCard(idOfColumn,BOARDS,maxCardInColumn,dispatch){
    dispatch({type: "UpdateBoard", BOARDS: fetchNameOfCardsFromUI(BOARDS)});
    dispatch({type: "AddCard", idOfColumn: idOfColumn, maxCardInColumn: maxCardInColumn})
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

function dragOverHandler(e){
    e.preventDefault();
    console.log(e.target.id);
}

function dragStartHandler(e,id){
    e.dataTransfer.setData("id",id);
}

function dragEndHandler(e){
    console.log(e.target.id);
}

function onDrop(e,maxCardInColumn, dispatch){
    let id = e.dataTransfer.getData("id");
    let toId = e.target.id;
    dispatch({type : "TransferData", sourceId: id, toId: toId, maxCardInColumn: maxCardInColumn})

}
function deleteCard(id,dispatch){
    dispatch({type: "DeleteCard", id: id});
}
function Column(props){
    const [trigger,setTrigger] = useState(false);
    const dispatch = useDispatch();
    const BOARDS = useSelector(state => state.BOARDS);
    let maxCardInColumn = props.maxCardInColumn;
    const CardList = () => props.column.cards.map((card,index) => {
        if(card.changeable=="No"){
            return(
                <div>
                    <InputGroup >
                        <Input draggable onDragEnd={e => dragEndHandler(e)} onDragStart={e => dragStartHandler(e,card.id)} type="button" id={card.id} value={card.text} onClick={e => {setToChangeable(e,dispatch); setTrigger(!trigger)}}></Input>
                        
                        <Button onClick={e => {deleteCard(card.id,dispatch); setTrigger(!trigger)}}>X</Button>
                    </InputGroup>
                    
                    <p></p>
                </div>
                        
            );
        }



        else{
            return(
                <div>
                    <InputGroup >
                        <Input type="textarea" id={card.id} defaultValue={card.text}  onKeyDown={e => {changeCardState(e,dispatch,trigger,setTrigger,BOARDS)}} ></Input>
                        <Button onClick={e => {deleteCard(card.id,dispatch); setTrigger(!trigger)}}>X</Button>
                    </InputGroup>
                    <p></p>
                </div>
                        
            );
        }
        
    })
        
        
    return(
        <div className = "col-12 col-md-3 droppable"  id={props.column.id} onDragOver={e => dragOverHandler(e)} onDrop={(e) => {onDrop(e,maxCardInColumn, dispatch); props.setBoardTrigger(!props.boardTrigger)}}>
            <Card id={props.column.id}>
                <CardHeader  id={props.column.id}>{props.column.columnTitle}</CardHeader>
                <CardBody  id={props.column.id}>
                    
                    <div  id={props.column.id}>
                        <CardList />
                    </div>

                    <p></p>
                    <Button  id={props.column.id} className = "btn-success" onClick={() => {addCard(props.column.id,BOARDS,maxCardInColumn,dispatch); setTrigger(!trigger)}}>+ Add a card</Button>
                    
                </CardBody>
            </Card>
        </div>
    );
    
    
}

export default Column;