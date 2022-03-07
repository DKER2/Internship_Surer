import React from 'react';
import { Card, CardText, CardBody,
    CardTitle, Button, CardHeader } from 'reactstrap';


function Column(props){
    const CardList = (props) => {
        return(
            props.cards.map(card => {
                return(
                    <Card>
                        <CardBody>
                            <CardText>
                                {card.text}
                            </CardText>
                        </CardBody>
                    </Card>
                );
            })
        );
    }
    function addCard(){
        
    }
    return(
        <div className = "col-3">
            <Card>
                <CardHeader>{props.column.columnTitle}</CardHeader>
                <CardBody>
                    
                    
                    <CardList cards = {props.column.cards} />
                    <p></p>
                    <Button className = "btn-success" onClick={() => addCard()}>+ Add a card</Button>

                </CardBody>
            </Card>
        </div>
    );
}

export default Column;