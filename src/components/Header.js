import React, {Component} from 'react';
import { Form, FormGroup, Label, Input, Container, Button, Row } from 'reactstrap';
class Headers extends Component{
    constructor(props){
        super(props);
        this.state = {
            Boards: [{id: 1,
                            nameOfBoard: "Default Board"}
                        ],
            newBoardName: null
        };
        this.changeNameOfBoard = this.changeNameOfBoard.bind(this);
        this.addNewBoard = this.addNewBoard.bind(this);
        this.updateMessage = this.updateMessage.bind(this);
    }
    changeNameOfBoard(e){
        e.preventDefault();
        e.target.tagName = "INPUT";
        //this
        this.setState({nameOfBoards: ["cac"]})
    }
    addNewBoard(){
        if(this.state.newBoardName==null){
            
        }
        else{
            var newBoards = this.state.Boards;
            var nameOfBoard = this.state.newBoardName;
            var id = newBoards.length + 1;
            var flag = true;
            for(var i = 0; i < this.state.Boards.length; i++){
                if(this.state.Boards[i].nameOfBoard===nameOfBoard){
                    flag = false;
                    alert("Name " + nameOfBoard +" have been used");
                }
            }
            if(flag){
                this.state.Boards.push({id : id, nameOfBoard: nameOfBoard});
                this.setState({Boards : newBoards})
            }
            
        }
        console.log(this.state.newBoardName);
    }
    updateMessage(e){
        console.log(this.state.Boards);
        this.setState({
            newBoardName: e.target.value,
        })
    }
    render(){
        console.log(this.state.newBoardName);
        const ButtonList = () => this.state.Boards.map(Board => {return(
            <Button className = "btn-info" onClick={e => this.changeNameOfBoard(e)} id = {Board.id}>{Board.nameOfBoard}</Button>
        )});
        return(
            <Container>
                
                <ButtonList/>
                <div className = "input-group">
                    <Button className = "btn-info" onClick={() => this.addNewBoard()}>Add</Button>
                    <Input type="text" placeholder='Name Of New Board' onChange={(e) => this.updateMessage(e)} value={this.state.newBoardName}></Input>
                </div>
                
            </Container>
            
        )
    }
}

export default Headers