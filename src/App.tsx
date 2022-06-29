import React from 'react';
import './App.css';
import PrimeComponent from './primeComponent'
import {MyContext, MyContextProvider} from './myContext'
import { Utils, CustomHook } from './Utils'
import {Mid} from './Mid'

function Header(){
  const { theme, dispatch } = React.useContext(MyContext)
  //console.log(theme)
  return <div style={theme}>Title of the App
  <button onClick={()=>{
    dispatch({type:'SETCOLOR',payload:Utils.genStyle('black','white')})
  }}>Change Theme</button>
  </div>
}
function ThemeChanger(){
  const { theme, dispatch } = React.useContext(MyContext)
  return <div style={theme}>
    Another context
    {/**use portals to share context on different trees */}
    <button onClick={()=>{
    dispatch({type:'SETCOLOR',payload:Utils.genStyle('black','white')})
  }}>Change Theme</button>
  </div>
}
function App() {
  return (
    <div className="App">
      <div> 
        <MyContextProvider><Header/></MyContextProvider>
        {/*<div style={theme}>I need a theme too</div> doesn't work not wrapped */}
        <PrimeComponent />
      </div>
      <div className="Content">
        <div className="Left">
          {/* <button onClick={()=>{
            dispatch({type:'SETCOLOR',payload:Utils.genStyle('black','white')})
          }}>Change Theme</button> */}
          <MyContextProvider><ThemeChanger/></MyContextProvider>
        </div>
        <Mid/>
        <div className="Right"></div>

      </div>
    </div>
  );
}



export default App;
