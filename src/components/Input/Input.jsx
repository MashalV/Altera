import React from 'react'
import "./Input.scss";

function Input({setTitleOne, setTitleTwo, setTitleThree, onGenerate}) {
    // const handleSubmit = (e) => {
    //     e.preventDefault(); 
    //     onGenerate(); 
        
    //   };
  
  
return (
    <>  
        <form className= "intake" onSubmit={onGenerate}>
            <h3 className= "intake__title">Title:</h3> 
            <input className = "intake__book" name= "title 1" type= "text" placeholder="Please enter a book title" onChange={(e) => setTitleOne(e.target.value)}></input>
            <h3 className= "intake__title">Title:</h3> 
            <input className = "intake__book" name= "title 2" type= "text" placeholder="Please enter a book title" onChange={(e) => setTitleTwo(e.target.value)}></input>
            <h3 className= "intake__title">Title:</h3> 
            <input className = "intake__book" name= "title 3" type= "text" placeholder="Please enter a book title" onChange={(e) => setTitleThree(e.target.value)}></input>
            <button className= "intake__button"type="submit">Generate</button>
        </form>
    </>
    
  )
}

export default Input