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
            //console.log(state.BOARDS);
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
            var Boards = state.BOARDS;
            Boards.map(Board => {
                if(Board.name === action.name){
                    Board.changeable = "Yes";
                }
            });
            // console.log(action.nameOfBoard);
            // console.log(Boards);
            console.log(state.BOARDS);
            return{
                ...state,
                BOARDS: Boards
            }

        }
        case "DisableChangingNameOfBoard":{
            var Boards = state.BOARDS;
            Boards.map(Board => {
                if(Board.name === action.name){
                    Board.changeable = "No";
                }
            });
            // console.log(action.nameOfBoard);
            // console.log(Boards);
            //console.log(state.BOARDS);
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
            var Boards = state.BOARDS;
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
            console.log(Boards);
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
            var Boards = state.BOARDS;
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
            console.log(Boards);
            return{
                ...state,
                BOARDS: Boards
            }
        }
            



        case "AddCard":{
            var Boards = state.BOARDS;
            Boards.map(Board => {
                if(Board.display === "Yes"){
                    Board.columns.map(column => {
                        if(column.id === action.idOfColumn){
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
                    })
                }
            });
            console.log(Boards);
            return{
                ...state,
                BOARDS: Boards
            }
        }






        case "UpdateBOARDS":{
            //console.log(action.BOARDS);
            return{
                ...state,
                BOARDS: action.BOARDS
            }
        }




        case "SetDisplay":{
            let BOARDS = state.BOARDS;
            BOARDS.map(Board => {
                if(Board.name===action.name){
                    Board.display = "Yes";
                }
                else{
                    Board.display = "No";
                }
            });
            console.log("DM");
            return{
                ...state,
                BOARDS: BOARDS
            }
        }


        default:
            return state;




    }
} 