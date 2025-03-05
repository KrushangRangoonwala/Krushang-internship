import { useState } from 'react'
import './App.css'
import { getDatabase, ref, set } from 'firebase/database'
import { app } from './firebase'

const db = getDatabase(app);

function Prac00() {
  const [count, setCount] = useState(0)

  function putData() {
    set(ref(db, 'user/data'), {  
      id: 1,
      name: 'test00',
      age: 22
    });
  }

  return (
    <>
      <button onClick={putData}> Add Data </button>
    </>
  )
}

export default Prac00
