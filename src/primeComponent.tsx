import {useMemo,  useEffect, useState } from "react";
import {MyContext} from './myContext'


export default function PrimeComponent() {
  const [number, setNumber] = useState(1);
  const [inc, setInc] = useState(0);
  
  //factorial is kept in memory even after comp re-render
  const factorial = useMemo(() => getFactorial(number), [number]);
  
  //causes factorial to trigger on any re-render button pressed
  //const factorial = factorialOf(number);
  //this didn't fix it
  //useEffect(()=>{console.log(number)},[number])
  
  const onChange = (event: any) => {
    setNumber(Number(event.target.value));
  };
  const onClick = () => setInc((i) => i + 1);
  
  return (
    <div>
      Top Frame reloaded {inc} times
      Factorial of
      <input type="number" value={number} onChange={onChange} />
      is {factorial} <br></br>
      <button onClick={onClick}>Re-render</button>
    </div>
  );
}

function getFactorial(n: number){
  let result = 0
  console.log("factorialOf(n) called!");
  function factorialOf(n:number):number {
    return n <= 0 ? 1 : n * factorialOf(n - 1);
  }
  result = factorialOf(n)
  return result
}

