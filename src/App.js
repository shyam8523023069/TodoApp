import React, {useEffect, useState, useRef} from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const firstrender = useRef('true')
  const [inputvalue, setinputvalue] = useState("");
  const [todos, setTodo] = useState([]);
  const addTodo = (e)=> { 
    e.preventDefault();
    if(inputvalue.trim()=== '')return;
    setTodo([
      ...todos,{
        text: inputvalue,
        id: uuidv4(),
      }])
      setinputvalue('');
  }
  const removetodo=(id)=>{ 
    setTodo(todos.filter((todo)=>todo.id !== id));
  };
  useEffect(() => {
    if(firstrender.current){
      console.log('true')
      firstrender.current =false
    }else{
      localStorage.setItem("Todo", JSON.stringify([...todos]));
      console.log('not first page loder')
    }
    
  },[todos]);

  useEffect(() =>{
    if(localStorage.getItem("Todo") !== null){
      const newTodo =localStorage.getItem("Todo");
      setTodo(JSON.parse([...todos, newTodo]))
    }
  }, [])

  return (
    <div className="App">
      <div className="container">
     <form  onSubmit= {addTodo}>
       <div>
         <input type='text' 
         placeholder='TodoText'
         value={inputvalue}
         onChange={(e) => setinputvalue(e.target.value)} 
         />
         <button type='submit' >add</button>
       </div>
     </form>
     {todos.map((todo)=>(
       <div key={todo.id} >
         <p>{todo.text}</p>
         <i onClick={()=> removetodo(todo.id)} className="fas fa-trash"></i>
       </div>
     ))}
    </div>
    </div>
  );
}

export default App;
