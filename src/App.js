import Main from './components/Main';
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
