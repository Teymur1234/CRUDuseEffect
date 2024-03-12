
import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const url='https://northwind.vercel.app/api/suppliers'
  const [data,setData]=useState([])
  const [product,setProduct]=useState({
    id:'',
    companyName:'',
    contactName:'',
    contactTitle:''
  })
  const fetchData=()=>{
  axios(url).then(data=>setData(data.data))      
  }
  const nameChange=(e)=>{
    setProduct({...product,companyName:e.target.value})
  }
  const contactChange=(e)=>{
    setProduct({...product,contactName:e.target.value})
  }
  const tittleChange=(e)=>{
    setProduct({...product,contactTitle:e.target.value})
  }
  const deleteProduct=(id)=>{
    axios.delete(`https://northwind.vercel.app/api/suppliers/${id}`).then(()=>{
      fetchData()
    })
  }
  const addProduct=(e)=>{
    e.preventDefault()
    if (product.id) {
      edittedProduct({id:product.id,companyName:product.companyName,contactName:product.contactName,contactTitle:product.contactTitle})
    }
    else{
      addedProduct({companyName:product.companyName,contactName:product.contactName,contactTitle:product.contactTitle})
    }
  }
  const edittedProduct=(product)=>{
    axios.put(`https://northwind.vercel.app/api/suppliers/${product.id}`,product).then(()=>{
      fetchData()
    })
    setProduct({id:'',companyName:'', contactName:'', contactTitle:''})

  }
  const addedProduct=(newproduct)=>{
    axios.post(url,newproduct).then(()=>{
      fetchData()
    })
    setProduct({id:'',companyName:'', contactName:'', contactTitle:''})
  }
  const editProduct=(product)=>{
    setProduct(product)
  }
  useEffect(()=>{
    fetchData()
  },[])
  return (
   <>
    <input type='text' value={product.companyName} onChange={nameChange}/>
    <input type='text' value={product.contactName} onChange={contactChange}/>
    <input type='text' value={product.contactTitle} onChange={tittleChange}/>
    <button type='submit' onClick={addProduct}>Add</button>
    <table border={1}>
      <thead>
        <tr>
        <th>Id</th>
        <th>companyName</th>
        <th>contactName</th>
        <th>contactTitle</th>
        </tr>
      </thead>
      <tbody>
        {data && data.map(item=>(
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.companyName}</td>
            <td>{item.contactName}</td>
            <td>{item.contactTitle}</td>
            <button onClick={()=>editProduct({id:item.id,companyName:item.companyName,contactName:item.contactName,contactTitle:item.contactTitle})}>Edit</button>
            <button onClick={()=>deleteProduct(item.id)}>Delete</button>
          </tr>
        ))}
      </tbody>
    </table>
   </>
      
  );
}

export default App;
