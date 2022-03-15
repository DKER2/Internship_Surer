import React, { Component } from 'react';
import { Card, CardText, CardBody,
     Button, CardHeader, Input } from 'reactstrap';


class Column extends Component{
    constructor(props) {
        super(props);
        this.state = {
            cards: this.props.column.cards,
        };
        this.addCard = this.addCard.bind(this);
        // this.changeCardText = this.changeCardText.bind(this);
        this.changeCardState = this.changeCardState.bind(this);
        this.setToChangeable = this.setToChangeable.bind(this);
    }
    addCard(){
        var newCards = this.state.cards;
        var length = newCards.length;   
        var id = newCards[length-1].id + 0.1;
        newCards.map(card => {
            console.log(document.getElementById(card.id).value)
            return(
                card.text = document.getElementById(card.id).value
            );
        })
        
        newCards.push({"id" : id, "text" : null, "changeable": "Yes"});
        this.setState({cards: newCards})
    }




    // changeCardText(e){
    //     //console.log(e.key);
    //     // console.log(this.state.cards);
    //     // console.log(e.target.id);
    //     // var cards = this.state.cards;
    //     // cards.map(card => {
    //     //     //console.log(card.id + "DM" + e.target.id);
    //     //     if(card.id==e.target.id){
    //     //         card.text = e.target.value;
    //     //     }
    //     // })
    //     // this.setState({cards : cards});
    // }
    changeCardState(e){
        if(e.key === "Enter"){
            var cards = this.state.cards;
            cards.map(card => {
                //console.log(e.target.value)
                if(card.id==e.target.id){
                    card.text = e.target.value;
                    card.changeable = "No";
                }
            })
            this.setState({cards : cards});
        }
    }




    setToChangeable(e){
        var cards = this.state.cards;
        cards.map(card => {
            //console.log(card.id + "DM" + e.target.id);
            if(card.id==e.target.id){
                card.changeable = "Yes";
            }
        })
        this.setState({cards : cards});
    }



    render(){
        const CardList = () => this.state.cards.map(card => {
                    if(card.changeable=="No"){
                        return(
                            <div>
                                <Input type="button" id={card.id} value={card.text} onClick={e => this.setToChangeable(e)}></Input>
                                <p></p>
                            </div>
                                    
                        );
                    }



                    else{
                        return(
                            <div>
                                <Input type="textarea" id={card.id} defaultValue={card.text} onKeyDown={e => this.changeCardState(e)}></Input>
                                <p></p>
                            </div>
                                    
                        );
                    }
                    
                })
        
        return(
            <div className = "col-12 col-md-3">
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