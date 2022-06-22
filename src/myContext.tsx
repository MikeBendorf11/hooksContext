import React from 'react'

const defaultTheme = {
  color: 'grey'
}

export const MyContext = React.createContext<any>({})

const reducer = (state: any, action: any) => {
  //console.log(state, action)
  switch (action.type){
    case'SETCOLOR': return { ...state, ...action.payload }
  }
}

export const MyContextProvider  = (props: any) => {
  const [theme, dispatch] = React.useReducer(reducer,defaultTheme)
  const value = {theme, dispatch}
  return <MyContext.Provider value={value}>{props.children}</MyContext.Provider>
}
 
/** Enforces signature when using Provider */
type maType = {
  color?:string, 
  backgroundColor?:string
}

