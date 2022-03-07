import Board from './components/Board';
function App() {
  const columns = require('./data/board.json'); 
  return (
    <div className="App">
      <div><p></p></div>
      <div className='container'>
        <Board columns = {columns}/>
      </div>
      
    </div>
  );
}

export default App;
