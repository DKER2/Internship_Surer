import React, { Component } from 'react';
import { Card, CardText, CardBody,
     Button, CardHeader } from 'reactstrap';


class Column extends Component{
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            cards: this.props.column.cards,
        };
        this.addCard = this.addCard.bind(this);
    }
    // function addCard(){
    //     props.column.cards.push({text : "TYPH"});
    //     console.log(props.column.cards);
    // }
    addCard(){
        var newState = this.state.cards;
        newState.push({"text" : "TYPH"});
        this.setState({cards: newState})
    }
    render(){
        const CardList = () => this.state.cards.map(card => {
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
        
        return(
            <div className = "col-3">
                <Card>
                    <CardHeader>{this.props.column.columnTitle}</CardHeader>
                    <CardBody>
                        
                        
                        <CardList />
                        <p></p>
                        <Button className = "btn-success" onClick={() => {this.addCard()}}>+ Add a card</Button>
    
                    </CardBody>
                </Card>
            </div>
        );
    }
    
}

export default Column;