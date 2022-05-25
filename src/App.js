import { useState } from 'react';
import './App.css';
var stringMath = require('string-math');

function App() {

    const [calc,setCalc] = useState('');
    const [result,setResults] = useState('');
    const [reset,setReset] = useState(false)
    const operators = ['/','*','-','+','.']



    // function for update the calculation
    const updateCalc = (value)=>{
      if((operators.includes(value) && calc === '') || (operators.includes(value) && operators.includes(calc.slice(-1)))){
        return ;
      }

      if(reset === true && !operators.includes(value)){
        return;
      }
      setCalc(calc + value)
      setReset(false)
      


      if(!operators.includes(value)){
        setResults(stringMath(calc+value).toString())
      }
    }


    // function for showing the total value
    const lastValue = ()=>{
      setCalc(stringMath(calc).toString())
      setReset(true)
    }



    // function for delete last value
    const deleteLastValue = ()=>{
      if(calc === ''){
        return
      }
      if(reset){
        return;
      }
      setCalc(calc.slice(0,-1))
      // setReset(false)
    }


    // function for restart the calc
    const restartCalc = ()=>{
      if(calc === ''){
        return
      }else {
        setCalc('')
        setResults('')
        setReset(false)
      }
    }

  // create button for numbers 
  const createDigits = ()=>{
    const digits =[]    

    for(let i=1;i<10;i++){
      digits.push(
        <button key={i}  onClick={()=>{updateCalc(i.toString())}}>{i}</button>
      )
    }
    return digits;
  }

  // event listeners

  const numbersKeycodes = ['0','1','2','3','4','5','6','7','8','9']
  const operatorsKeycodes = ['.','+','-','*','/']

    document.addEventListener('keydown', (e)=>{  
      if(numbersKeycodes.includes(e.key)){
        updateCalc(e.key)
        
      }
      if(operatorsKeycodes.includes(e.key)){
        updateCalc(e.key)
      }
      
    })

    // react.useEffect(()=>{
    //   document.addEventListener('keydown', (e)=>{
    //     if(e.key === 'Enter'){
    //       lastValue();
    //       console.log('my code works perfectly fine and i have no idea why these error messages keeps poping up')       
    //       console.log('and the problem is that everything is working normally with mouse XD')       
    //      }
    //   })
    // },[])
  



  return (
    <div className="App">
      <div className="calculator">
        <div className="display">
          <span>({result || '0'})</span>{calc || '0'}
        </div>
        <div className="operators">
          <button onClick={()=>{updateCalc('/')}}>/</button>
          <button onClick={()=>{updateCalc('*')}}>x</button>
          <button onClick={()=>{updateCalc('-')}}>-</button>
          <button onClick={()=>{updateCalc('+')}}>+</button>
          <button onClick={()=>{deleteLastValue()}}>DEL</button>
          <button onClick={()=>{restartCalc()}}>C</button>
        </div>
        <div className="digits">
          {createDigits()}
          <button onClick={()=>{updateCalc('0')}}>0</button>
          <button onClick={()=>{updateCalc('.')}}>.</button>
          <button onClick={()=>{lastValue()}}>=</button>
        </div>
      </div>
    </div>
  );
}

export default App;
