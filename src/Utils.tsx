import React from 'react';

export class Utils{
  static delay = (m: number) => {
    return new Promise(r=>setTimeout(r,m))
  } 
  static getText = async (filename: string)=> {
    console.log(filename)
    let req = await fetch(filename)
    let txt = await req.text()
    return txt     
  }
  static genStyle = (fg:string,bg:string) => {return {color:fg, backgroundColor:bg}}
  
  //custom hook can be instantiated on separate components
  customHook = (delay: number) =>{
    const [isOnline, setIsOnline] = React.useState(false)
    
    React.useEffect(()=>{
      setTimeout(()=>{
        setIsOnline(!isOnline)
        //console.log('switching '+ delay)
      },delay)
      
    },[])
    
    return isOnline
  }
  
}

export const CustomHook = (delay: number) =>{
  const [isOnline, setIsOnline] = React.useState(false)
  
  React.useEffect(()=>{
    setTimeout(()=>{
      setIsOnline(!isOnline)
      //console.log('switching '+ delay)
    },delay)
    
  },[])
  
  return isOnline
}




