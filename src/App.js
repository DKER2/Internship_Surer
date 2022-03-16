import Main from './components/Main';
function App() {
  const maxCardInColumn = 5;
  return (
    <div className="App">
      <Main maxCardInColumn = {maxCardInColumn}/>
    </div>
  );
}

export default App;
