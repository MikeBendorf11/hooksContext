import React from 'react';
import './App.css';
import PrimeComponent from './primeComponent'
type Props = {
  text: number,
  visible: boolean
}
function delay(m: number){
  return new Promise(r=>setTimeout(r,m))
}
const getText = async (filename: string)=> {
  let req = await fetch(filename)
  let txt = await req.text()
  return txt     
}

function App() {
  const [content, setContent] = React.useState('')
  const [clicked, setClicked] = React.useState(false)
  const [visible, setVisible] = React.useState(true)
  const [timestr, setTimestr] = React.useState(Date.now())
  const [counter, setCounter] = React.useState(0);
  const isOnline = useMaHook(5000)
  const isOnline2 = useMaHook(7000)

  React.useEffect(()=>{
    let changeText = async (num?:number) => {
      await delay(1000)
      let text = await getText('basic'+num||'')
      setContent(text)
      //console.log('text changed')
    }
    console.log('app reloaded')
    changeText(1)
    //return ()=> {changeText(1).then(x=>console.log('text changed'))}
    //return ()=> {changeText(3)}
    /**needs empty dependency else reruns with changeText(1) */
  }, []) 

  return (
    <div className="App">
      <div>
        Welcome to the app {counter} <br></br>
        <PrimeComponent />
      </div>
      
      <div className="Content">
        <div className="Left"></div>
        <div className="Mid"></div>
        <div className="Right"></div>
        {/* custom hook */}
        <button onClick={() => setCounter((i) => i + 1)}>Re-render</button>
        {isOnline? <span style={{color:'black', backgroundColor:'white'}}>Online 1</span> : 
          <span style={{color:'white', backgroundColor:'black'}}>Offline 1</span>} 
        {isOnline2? <span style={{color:'black', backgroundColor:'white'}}>Online 22</span> : 
          <span style={{color:'white', backgroundColor:'black'}}>Offline 22</span>} 
        
        {/* async method defined outside of useEffect */}
        <button onClick={async ()=>{
          let text = await getText('basic2')
          setContent(text)
        }}>change top text</button>
        <button onClick={()=>setClicked(!clicked)}> bttn2</button>
        
        {/* control visibility but not reload component, useEffect return NOT called */}
        <button onClick={async ()=>{ console.log('visible ', visible)
          setVisible(false)
          await delay(1000)
          setVisible(true)
        }}>bttn 333</button>
        
        {/* force reload component, force call useEffect return */}
        <button onClick={()=>setTimestr(Date.now())}>Change bottom text</button>
        {content + (clicked?'+ bttn clicked':'')}

        {/** visible && <Comp1//will cause rerender **/}
        <Comp1 text={timestr} visible={visible}/>
      </div>
    </div>
  );
}

function Comp1({text, visible}: Props) {
  React.useEffect(()=>{
    //fetch('bing.com') //triggers twice
    return ()=>{
      fetch('bing.com') //triggers once
    }
  },[text]) //trigger on change of this prop
  return (
    visible? //doesn't cause rerender
    <span>I'm component 1 + {text}</span>: <></>
  )
}

//custom hook can be instantiated on separate components
function useMaHook(delay: number){
  const [isOnline, setIsOnline] = React.useState(false)
  
  React.useEffect(()=>{
    setTimeout(()=>{
      setIsOnline(!isOnline)
      console.log('switching '+ delay)
    },delay)
    
  },[])
  
  return isOnline
}

export default App;
