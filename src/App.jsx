import './App.css'
import { useState } from 'react'

/*function App() {
  return (
    <div>
      <Counter/>
      <Counter/>
    </div>
  )
}

function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button 
        onClick={ () => setCount( prev => prev + 1 ) }>
          증가
      </button>
    </div>
  )
}

export default App

//이거 이해해야함*/
//윗 코딩을 state hoisting하면 아래처럼
function App() {
  const [count1, setCount1] = useState(0)
  const [count2, setCount2] = useState(0)
  return (
    <div>
      <h1>총합: {count1 + count2}</h1>
      <Counter
        count = {count1}
        onIncrement={
          () => setCount1(prev => prev+1)
        }
      />
      <Counter
        count = {count2}
        onIncrement={
          () => setCount2(prev => prev+1)
        }
      />
      </div>
  )
}

function Counter({ count, onIncrement }) {

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button 
        onClick={onIncrement}>
          증가
      </button>
    </div>
  )
}

export default App