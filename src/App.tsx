import React from 'react';
import './App.css';
import PrimeComponent from './primeComponent'
import {MyContext, MyContextProvider} from './myContext'
import { Utils } from './Utils'
import {Mid} from './Mid'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function Header(){
  const { state, dispatch } = React.useContext(MyContext)
  //console.log(state)
  return <div style={state}>Title of the App
  <button onClick={()=>{
    dispatch({type:'SETCOLOR',payload:Utils.genStyle('black','white')})
  }}>Change Theme</button>
  </div>
}
function ThemeChanger(){
  const { state, dispatch } = React.useContext(MyContext)
  return <div style={state}>
    Another context
    {/**use portals to share context on different trees */}
    <button onClick={()=>{
    dispatch({type:'SETCOLOR',payload:Utils.genStyle('black','white')})
  }}>Change Theme</button>
  </div>
}
function App() {
  return (
    <BrowserRouter>
    <MyContextProvider>
      <div className="App">
            <div> 
              <Header/>
              {/*<div style={state}>I need a theme too</div> doesn't work not wrapped */}
              <Routes>
                <Route path='/' element={'Welcome to the app'}/>
                <Route path='useMemo' element={<PrimeComponent />}>
                  <Route path='test' element={'testing outlet'} />
                </Route>
              </Routes>
              
            </div>
            <div className="Content">
              <div className="Left">
              {/* <button onClick={()=>{
                dispatch({type:'SETCOLOR',payload:Utils.genStyle('black','white')})
              }}>Change Theme</button> */}
              
                <ThemeChanger/>
                <Link to='/'>Main</Link>
                <Link to='useMemo'>useMemo</Link>
                <Link to='useMemo/test'>useMemo/test</Link>
              
            </div>
            <Mid/>
            <div className="Right"></div>
          </div>
        </div>
    </MyContextProvider>

    </BrowserRouter>
    
  );
}




export default App;
