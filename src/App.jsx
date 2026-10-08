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
/*
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

export default App*/
 const INITIAL_COUNTS = [
  { id: crypto.randomUUID(), value: 0 },
  { id: crypto.randomUUID(), value: 0 },
  { id: crypto.randomUUID(), value: 0 }
]


function App() {
  const [counts, setCounts] = useState(INITIAL_COUNTS) //[0,0,0]이니까 최대 3개 만들수 있음
  
   /*
  // index에 해당하는 counts 값을 1 증가시키는 함수
  const onIncrement = (index) => {
  // 상태를 업데이트할 때는 항상 새로운 배열을 만들어서 설정
    setCounts(prevCounts => {
      const newCounts = [...prevCounts] // Spread syntax로 배열 복사
      newCounts[index] += 1

      return newCounts
    })
  }
  */
 //윗코드랑 아래코드랑 똑같은데, 다 아래코드처럼 사용하니까, 이거를 알아둬야함
   // map 메서드를 사용하여 불변성을 유지하면서 특정 인덱스의 값만 증가
  /*const onIncrement = (index) => {
    setCounts(prevCounts =>
      prevCounts.map((count, i) =>
        i === index ? count + 1 : count
      )
    )
  }*/
  // 바로 위에꺼랑 비교하기(시험에 나옴. prevCounts,map,item 빈칸. 변수를 암기하지 말고 이해를 하라는거. 많이 만들어보기)
  // index 대신 id로 변경
  const onIncrement = (id) => {
    setCounts(prevCounts =>
      prevCounts.map(item =>
        item.id === id ? { ...item, value: item.value + 1 } : item
      )
    )
  }

  /* // 배열에 새로운 카운터 값을 추가 (초기값 0)
  const onAddCounter = () => {
    setCounts(prevCounts => [...prevCounts, 0]) 
  }*/

  // 배열에 새로운 카운터 값을 추가 (초기값 0)
  const onAddCounter = () => {
    setCounts(prevCounts => [...prevCounts, { id: crypto.randomUUID(), value: 0 }])
  }

  /*const onRemoveCounter = (index) => {
    setCounts(prevCounts => prevCounts.filter((_, i) => i !== index))
  }*/
 // id가 같으면 필터링하고, 다른 id는 그대로 유지
  const onRemoveCounter = (id) => {
    setCounts(prevCounts => prevCounts.filter(item => item.id !== id))
  }
  
  // counts 배열의 모든 값을 더함
  const total = counts.reduce((sum, current) => sum + current.value, 0)

  return (
    <div>
      <h1>총합: {total}</h1>
      <button onClick={onAddCounter}>
        카운터 추가
      </button>
      {     
        // map 메서드로 counts 배열을 순회하며 Counter 컴포넌트 렌더링
       counts.map((item) => (
          <Counter
            // key는 React에서 항목을 식별하고 렌더링할 때 필요하지만, 
            // Counter 컴포넌트에는 전달되지 않음
            key={item.id} // index를 key로 사용 (실제 앱에서는 고유한 id 사용 권장)
            count={item.value}
            onIncrement={() => { onIncrement(item.id) }}
                     onRemove={() => { onRemoveCounter(item.id) }}
          />
        ))
      }
    </div>
  )
}
 
//function Counter({ count, onIncrement }) {
function Counter({ count, onIncrement, onRemove }) {
  const [bgColor, setBgColor] = useState(
          () => '#' + Math.floor(Math.random()*16777215)
            .toString(16)
            .padStart(6, '0')
  )
  return (
    <div style={{ backgroundColor: bgColor }}>
      <h1>Counter: {count}</h1>
      <button onClick={onIncrement}>
          증가 
      </button>
      <button onClick={onRemove}>
        제거
      </button>
     </div>
  )
}

export default App