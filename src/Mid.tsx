import { Utils, CustomHook } from './Utils'
import React from 'react';
type Props = {
  text: number,
  visible: boolean
}
/**
 * Basic Hooks Tests (useState, useEffect, custom)
 * @returns 
 */
export function Mid(){
  const [content, setContent] = React.useState('')
  const [clicked, setClicked] = React.useState(false)
  const [visible, setVisible] = React.useState(true)
  const [timestr, setTimestr] = React.useState(Date.now())
  const [counter, setCounter] = React.useState(0);
  //const { theme, dispatch } = React.useContext(MyContext)
  
  const isOnline = CustomHook(5000)
  const isOnline2 = CustomHook(7000)

  React.useEffect(()=>{
    let changeText = async (num?:number) => {
      await Utils.delay(1000)
      let text = await Utils.getText('basic'+num||'')
      setContent(text)
      //console.log('text changed')
    }
    //console.log('app reloaded')
    changeText(1)
    //return ()=> {changeText(1).then(x=>console.log('text changed'))}
    //return ()=> {changeText(3)}
    /**needs empty dependency else reruns with changeText(1) */
  }, []) 
  
  
  return (
    <div className="Mid Test">
    {/* custom hook */}
    <button onClick={() => setCounter((i) => i + 1)}>Re-render</button>
    {isOnline? <span style={Utils.genStyle('brown', 'yellow')}>Online 1</span> : 
      <span style={Utils.genStyle('yellow', 'brown')}>Offline 1</span>} 
    {isOnline2? <span style={Utils.genStyle('brown', 'yellow')}>Online 22</span> : 
      <span style={Utils.genStyle('yellow', 'brown')}>Offline 22</span>} 
    
    {/* async method defined outside of useEffect */}
    <button onClick={async ()=>{
      let text = await Utils.getText('basic2')
      setContent(text)
    }}>change top text</button>
    <button onClick={()=>setClicked(!clicked)}> bttn2</button>
    
    {/* control visibility but not reload component, useEffect return NOT called */}
    <button onClick={async ()=>{ console.log('visible ', visible)
      setVisible(false)
      await Utils.delay(1000)
      setVisible(true)
    }}>bttn 333</button>
    
    {/* force reload component, force call useEffect return */}
    <button onClick={()=>setTimestr(Date.now())}>Change bottom text</button>
    {content + (clicked?'+ bttn clicked':'')}

    {/** visible && <Comp1//will cause rerender **/}
    <Comp1 text={timestr} visible={visible}/>
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