import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

const getLocalStorage =()=>{
  let list = localStorage.getItem('list')
  if(list){
    return JSON.parse(localStorage.getItem('list'))
  }
  else{
    return []
  }
}
console.log(getLocalStorage())
function App() {
const [name,setName]=useState("")
const [list,setList]=useState(getLocalStorage())
const [isEditing,setISEditing]=useState(false)
const [alert,setAlert]=useState({
  show:false,msg:"",type:"",
})
const [editID,setEditID]=useState(null)

const handleSubmit=(e)=>{
e.preventDefault()
if (!name) {
 showAlert(true,"danger","please enter value")
}
else if (name && isEditing) {
  setList(list.map((item)=>{
    if (item.id === editID) {
      return {...item,title:name}
    }
    return item
  }))
  setName('')
  setEditID(null)
  setISEditing(false)
  showAlert(true,'success','value changed')
}
else{
  showAlert(true,"success","item added")
  const newItem ={id: new Date().getTime().toString(),title:name}
  setList([...list,newItem])
  setName("")
}
}

const showAlert = (show=false,type="",msg="") =>{
  setAlert({
    show,type,msg
  })
}

const clearList = ()=>{
  showAlert(true,'danger','empty list')
  setList([])
}

const removeItem = (id)=>{
showAlert(true,'danger','item removed')
setList(list.filter((item)=>item.id !== id))
}

const editItem =(id)=>{
  const selectedItem = list.find((item)=>item.id === id)
  setISEditing(true)
  setEditID(id)
  setName(selectedItem.title)
}

useEffect(()=>{
localStorage.setItem('list',JSON.stringify(list))
},[list])


  return <section className='section-center'>
  <form onSubmit={handleSubmit} className='grocery-form'>
{alert.show && <Alert {...alert} removeAlert={showAlert}
  list={list}
/>}
<h3>Grocery bud</h3>
<div className="form-control">
  <input type="text" className='grocery' placeholder='e.g. eggs' value={name} onChange={(e)=>setName(e.target.value)}/>
  <button type='submit' className='submit-btn' >
    {isEditing?'edit':'submit'}
  </button>
</div>
  </form>
  {
    list.length >0 && (<div className="grocery-container">
    <List items={list} removeItem={removeItem} editItem={editItem}/>
    <button className='clear-btn' onClick={clearList}>
      clear items
    </button>
  </div>
  )
  }
  
  </section>
}

export default App
