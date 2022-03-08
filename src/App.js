import Main from './components/Main';
function App() {
  const columns = require('./data/board.json'); 
  return (
    <div className="App">
      <Main columns = {columns}/>
      
    </div>
  );
}

export default App;
