import Main from './components/Main';
import {BOARDS} from './data/board.js';
import { useSelector, useDispatch } from 'react-redux'
function App() {
  //console.log(useSelector((state) => state.BOARDS));
  //const dispatch = useDispatch();
  //dispatch({type: 'AddBoard', nameOfNewBoard: 'NEW BOARD'} );
  const maxCardInColumn = 5;
  return (
    <div className="App">
      <Main maxCardInColumn = {maxCardInColumn}/>
    </div>
  );
}

export default App;
