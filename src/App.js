import Board from './components/Board';
function App() {
  const board = require('./data/board.json'); 
  return (
    <div className="App">
      <div><p></p></div>
      <div className='container'>
        <Board board = {board}/>
      </div>
      
    </div>
  );
}

export default App;
