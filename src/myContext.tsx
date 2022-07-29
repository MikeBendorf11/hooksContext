import React from 'react'

const initialState: State = {
  color: 'grey'
}

export const MyContext = React.createContext<any>({})

const reducer = (state: State, action: Action) => {
  //console.log(state, action)
  switch (action.type){
    case'SETCOLOR': return { ...state, ...action.payload }
  }
}

export const MyContextProvider  = ({children}: Props) => {
  //console.log(children)
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const value = {state, dispatch}
  return <MyContext.Provider value={value}>{children}</MyContext.Provider>
}
 
/** Enforces signature on reducer */
type State = {
  color?:string, 
  backgroundColor?:string
}
type Action = 
  | { type: 'SETCOLOR', payload: Object }

interface Props {
    children?: React.ReactNode
    // any props that come into the component
}