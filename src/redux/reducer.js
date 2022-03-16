import {BOARDS} from '../data/board.js';


export const initialState = {
    BOARDS
};

export const Reducer = (state, action) => {
    switch (action.type){
        case "AddBoard": {
            if(action.nameOfBoard===""){
                return state;
            }
            let newBoards = state.BOARDS;
            let flag = true;
            for(let i = 0; i < newBoards.length; i++){
                if(newBoards[i].name===action.nameOfBoard){
                    flag = false;
                    alert("Board " + action.nameOfBoard + " have been used");
                    return state;
                }
            }
            let id = "Board" + (newBoards.length + 1).toString();
            if(flag){

                return{
                    ...state,
                    BOARDS: [...state.BOARDS,
                    {
                        name : action.nameOfBoard,
                        display: "No",
                        id: id,
                        changeable: "No",
                        columns: [
                        {
                        id : "Column1",  
                        columnTitle: "TO-DO",
                        cards: [
                            {
                                id : "Column1Card1",
                                text : "",
                                changeable: "No"
                            }
                        ]},
                        {   
                        id : "Column2",  
                        columnTitle: "IN PROGRESS",
                        cards: [
                            {
                                id : "Column2Card1",
                                text : "",
                                changeable: "No"
                            }
                        ]},
                        {
                        id : "Column3",  
                        columnTitle: "DONE",
                        cards: [
                            {
                                id : "Column3Card1",
                                text : "",
                                changeable: "No"
                            }
                        ]}
                    
                        ]
                    }]
                };


            }
            
            
            
        }



        case "EnableChangingNameOfBoard": {
            let Boards = state.BOARDS;
            Boards.map(Board => {
                if(Board.name === action.name){
                    Board.changeable = "Yes";
                }
            });
            return{
                ...state,
                BOARDS: Boards
            }

        }
        case "DisableChangingNameOfBoard":{
            let Boards = state.BOARDS;
            Boards.map(Board => {
                if(Board.name === action.name){
                    Board.changeable = "No";
                }
            });
            return{
                ...state,
                BOARDS: Boards
            }
        }


        case "EnableChangingNameOfCard":{
            let id = action.id;
            let num1 = 0;
            let idOfColumn = "Column";
            let flag = true;
            for(let i = 1;i < id.length;i++){
                if(!isNaN(id[i-1])&&isNaN(id[i])){
                    break;
                }
                if(!isNaN(id[i])&&flag){
                    num1 = num1*10 + parseInt(id[i]);
                }
            }
            idOfColumn = "Column" + num1.toString();
            let Boards = state.BOARDS;
            Boards.map(Board => {
                if(Board.display === "Yes"){
                    Board.columns.map(column => {
                        if(column.id === idOfColumn){
                            column.cards.map(card => {
                                if(card.id === id){
                                    card.changeable = "Yes";
                                }
                            })
                        }
                    })
                }
            });
            return{
                ...state,
                BOARDS: Boards
            }
        }

        case "DisableChangingNameOfCard":{
            let id = action.id;
            let num1 = 0;
            let idOfColumn = "Column";
            let flag = true;
            for(let i = 1;i < id.length;i++){
                if(!isNaN(id[i-1])&&isNaN(id[i])){
                    break;
                }
                if(!isNaN(id[i])&&flag){
                    num1 = num1*10 + parseInt(id[i]);
                }
            }
            idOfColumn = "Column" + num1.toString();
            let Boards = state.BOARDS;
            Boards.map(Board => {
                if(Board.display === "Yes"){
                    Board.columns.map(column => {
                        if(column.id === idOfColumn){
                            column.cards.map(card => {
                                if(card.id === id){
                                    card.changeable = "No";
                                }
                            })
                        }
                    })
                }
            });
            return{
                ...state,
                BOARDS: Boards
            }
        }
            



        case "AddCard":{
            let Boards = state.BOARDS;
            Boards.map(Board => {
                if(Board.display === "Yes"){
                    Board.columns.map(column => {
                        if(column.id === action.idOfColumn){
                            if(column.cards.length===action.maxCardInColumn){
                                alert("The Number Of Cards In Column Have Met The LIMITATION: " + action.maxCardInColumn.toString())
                            }
                            else{
                                let length = column.cards.length + 1;
                                let id = action.idOfColumn + "Card" + length;
                                column.cards.push(
                                    {
                                        id : id,
                                        text : "",
                                        changeable: "Yes"
                                    }
                                )
                            }
                        }
                    })
                }
            });
            return{
                ...state,
                BOARDS: Boards
            }
        }




        case "TransferData":{
            let toId = action.toId;
            let sourceId = action.sourceId;
            let num1 = 0;
            let idOfToColumn = "Column";
            let flag = true;
            for(let i = 1;i < toId.length;i++){
                if(!isNaN(toId[i-1])&&isNaN(toId[i])){
                    break;
                }
                if(!isNaN(toId[i])&&flag){
                    num1 = num1*10 + parseInt(toId[i]);
                }
            }
            idOfToColumn = "Column" + num1.toString();


            let num2 = 0;
            let idOfSourceColumn = "Column";
            let flag1 = true;
            for(let i = 1;i < sourceId.length;i++){
                if(!isNaN(sourceId[i-1])&&isNaN(sourceId[i])){
                    break;
                }
                if(!isNaN(sourceId[i])&&flag1){
                    num2 = num2*10 + parseInt(sourceId[i]);
                }
            }
            idOfSourceColumn = "Column" + num2.toString();
            

            let availabelToTransfer = true;
            let Boards = state.BOARDS;
            Boards.map(Board => {
                if(Board.display==="Yes"){
                    Board.columns.map(column => {
                        if(column.id === idOfToColumn){
                            if(column.cards.length >= action.maxCardInColumn){
                                availabelToTransfer = false;
                            }
                        }
                    })
                }
            });
            if(availabelToTransfer){
                let data;
                Boards.map(Board => {
                    if(Board.display==="Yes"){
                        Board.columns.map(column => {
                            if(column.id === idOfSourceColumn){
                                let i = 0;
                                let newCards = [];
                                let flag2 = false;
                                column.cards.map(card => {
                                    i++;
                                    if(card.id === sourceId){
                                        data = card;
                                        flag2 = true;
                                    }
                                    else if(flag2 === false){
                                        newCards.push(card);
                                    }
                                    else if(flag2 === true){
                                        card.id = idOfSourceColumn + "Card" + (i-1).toString();
                                        newCards.push(card);
                                    }
                                })
                                column.cards = newCards;
                                
                            }
                        })
                    }
                });
                Boards.map(Board => {
                    if(Board.display==="Yes"){
                        let flag3 = false;
                        Board.columns.map(column => {
                            if(column.id === idOfToColumn){
                                let i = 0;
                                let newCards = [];
                                let flag2 = false;
                                column.cards.map(card => {
                                    i++;
                                    if(card.id === toId){
                                        data.id = idOfToColumn + "Card" + (i).toString();
                                        newCards.push(data);
                                        card.id = idOfToColumn + "Card" + (i+1).toString();
                                        newCards.push(card);
                                        flag3 = true;
                                        flag2 = true;
                                    }
                                    else if(flag2 === false){
                                        newCards.push(card);
                                    }
                                    else if(flag2 === true){
                                        card.id = idOfToColumn + "Card" + (i+1).toString();
                                        newCards.push(card);
                                    }
                                })
                                if(flag3===false){
                                    data.id = idOfToColumn + "Card" + (i+1).toString();
                                    newCards.push(data);
                                }
                                column.cards = newCards;
                            }
                        })
                    }
                });

                
                return{
                    ...state,
                    BOARDS: Boards
                }
            }
            else{
                alert("The Number Of Card In Column Have Met The LIMITATION: " + action.maxCardInColumn.toString());
                return state;
            }
        }

        case "DeleteCard": {
            let id = action.id;
            let num1 = 0;
            let idOfColumn = "Column";
            let flag = true;
            for(let i = 1;i < id.length;i++){
                if(!isNaN(id[i-1])&&isNaN(id[i])){
                    break;
                }
                if(!isNaN(id[i])&&flag){
                    num1 = num1*10 + parseInt(id[i]);
                }
            }
            idOfColumn = "Column" + num1.toString();
            let Boards = state.BOARDS;
            Boards.map(Board => {
                if(Board.display==="Yes"){
                    Board.columns.map(column => {
                        if(column.id === idOfColumn){
                            let newCards = [];
                            let flag1 = false;
                            let i = 0;
                            column.cards.map(card => {
                                i++;
                                if(card.id === id){
                                    flag1 = true;
                                }
                                else if(flag1===false){
                                    newCards.push(card)
                                }
                                else{
                                    card.id = idOfColumn + "Card" + (i-1).toString();
                                    newCards.push(card);
                                }
                            })
                            column.cards = newCards;
                            
                        }
                    })
                }
            });
            return{
                ...state,
                BOARDS: Boards
            }
        }

            


        case "UpdateBOARDS":{
            return{
                ...state,
                BOARDS: action.BOARDS
            }
        }



        case "SaveNameOfBoard":{
            let Boards = state.BOARDS;
            Boards.map(Board => {
                Board.changeable = "No";
            });
            console.log(Boards);
            return{
                ...state,
                BOARDS: Boards
            }
        }


        case "SetDisplay":{
            let Boards = state.BOARDS;
            Boards.map(Board => {
                if(Board.name===action.name){
                    Board.display = "Yes";
                }
                else{
                    Board.display = "No";
                }
            });
            return{
                ...state,
                BOARDS: Boards
            }
        }


        default:
            return state;




    }
} 