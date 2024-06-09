import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios';
import './table.css'
import { BiArrowFromBottom } from "react-icons/bi";
import { BiArrowToBottom } from "react-icons/bi" 
import {getProducts,   deleteProducts, getSingleProduct} from './services/index'
import { CiEdit } from "react-icons/ci";
import AddData from './AddData';
import { MdDelete } from "react-icons/md";



const Table = () => {
    const [datas, setData]=useState([]) 
    const[backupData, setBackupData]=useState()
    const [fmodel, setFmodel]=useState(false)
    const[selectedProducts, setSelectedProducts]=useState()


    
//here we get the  data from the local storage
    useEffect(()=>{
        let fetch=async()=>{
             let y= await axios.get('https://fakestoreapi.com/products')
            localStorage.setItem('y.data', JSON.stringify(y.data))
           let local= localStorage.getItem('y.data')
          
           setData(JSON.parse(local))
           setBackupData(JSON.parse(local))
           
            
        }
        fetch()

    },[])
//here in columnData function we filter the  data on the  bases of column
    function columnData(e){
   
      const {name}=e.target
      const idValue=e.target.value
      if(idValue.trim().length>0){
    // if(name=="category"||name=="description"||name=="title") {
    // let x=  backupData.filter((item=>(item[name].toLowerCase().includes(idValue.toLowerCase() ))))
   
    // setData(x)  }

  //  else if(name=='filterID'){
  //   const idValue=e.target.value
  //   let x=  backupData.filter((item=>(item.id.toString().toLowerCase().includes(idValue.toLowerCase() ))))
  //        setData(x)
  //  }
//    else if(name=='title'){
//     const idValue=e.target.value
      
//     let x= backupData.filter((item=>(item.title.toLowerCase().includes(idValue.toLowerCase() ))))
//         setData(x) 
        
//    }

   if(name=="price"||name=="id"||name=="category"|| name=="description"||name=="title"){
    let x=  backupData.filter((item=>(item[name].toString().toLowerCase().includes(idValue.toLowerCase() ))))
     setData(x)

      
                    
   }

   else if( name=='count'){
    let x=  backupData.filter((item=>(item.rating[name].toString().toLowerCase().includes(idValue.toLowerCase() ))))
    setData(x)
   }
  
   else{
    let  glo=backupData.filter((item=>(Object.values({ ...item,...item.rating}).toString().toLowerCase().includes(idValue.toLowerCase() ))))
         setData(glo)
   }

   
//    else if(name=='discription'){
//     const }idValue=e.target.value
//     let x=  backupData.filter((item=>(item.description.toLowerCase().includes(idValue.toLowerCase() ))))
//     setData(x) 
//    }
// else if(name=="rating"){
//   const idValue=e.target.value
//   let x=  backupData.filter((item=>(item.rating.count.toString().toLowerCase().includes(idValue.toLowerCase() ))))
// setData(x) 
// }
}
else{
  setData(backupData)
} 
    
}



const ascending=()=>{
  let sortedPrice = [...datas].sort((a,b)=>a.price-b.price)
  console.log(sortedPrice)
  setData(sortedPrice)
 
}

function decending(){
  let sortedPrice = [...datas].sort((a,b)=>b.price-a.price)
  setData(sortedPrice)

}


//here we filter the  data for gloabal search and also filter the filter data that is coming from the column we display the data on the bases of that 
  // const serching=()=>{
    
    
//    return datas.filter((item=>(Object.values(item).toString().toLowerCase().includes(filterData.toLowerCase() )))
// )


// }

 function closePopup(){
  setSelectedProducts()
  setFmodel(false)
 } 
    

 const loadProducts=()=>{
  let products =getProducts()
  setData(products)
  setBackupData(products)

  
}

const handleDelete=(id)=>{
  if(confirm('Do you really want to delete this product '+id)){
    deleteProducts(id)
    loadProducts()
  }
}


const handleUpdate=(id)=>{
  const product = getSingleProduct(id)
  setSelectedProducts(product)
  setFmodel(true);
}
  return (
    <div onChange={columnData}>
        <div>
        <div>
                 <input type='text' placeholder='....search' id='input' name="gloabal"
                 ></input>
                 <button onClick={()=>{setFmodel(true)}}>addData</button>
        </div>
        <table>
            <tr onChange={columnData} >
             <th> <input placeholder='........ID' name='id'  ></input> </th>
                <th><input placeholder='......Title' name='title' ></input></th>
                
                <th><div className='sortData'><div><input placeholder='......Price' name='price'  ></input></div><div> <span><BiArrowFromBottom onClick={ascending}/></span><span><BiArrowToBottom onClick={decending} /></span></div>  </div></th>
              
                <th><input placeholder='......Discription' name='description' ></input></th>
                <th><input placeholder='......Category'  name='category' ></input></th>
                <th><input placeholder='......Image' name='image'></input></th>
                <th><input placeholder='......Rating' name='count' ></input></th>
            </tr>
            {datas?.map((item)=>(
                 <tr> 
                
                 <td>{item?.id}</td>
                 
                 <td> {item?.title}</td>
                 <td> {item?.price}</td>
                 <td> {item?.description}</td>
                 <td>{item?.category}</td>
                 <td>{<img src={item?.image} style={{width:"80px", height:"80px"}}></img>}</td>
                 <td>{item?.rating?.rate},{item.rating.count}</td>
                 <button onClick={()=>handleDelete(item.id)}><MdDelete style={{width:'30px', height:"30px"}}/></button>
              <td>  <button onClick={()=>handleUpdate(item.id)}><CiEdit style={{width:'30px', height:"30px"}} /></button></td> 
                 </tr>

                  
              ))}
               

        </table>
       lo
        </div>

        
       {fmodel?<AddData  selectedProducts={selectedProducts}  reload = {loadProducts} closePopup={closePopup}></AddData>:''}
       
       
    </div>
  )
}

export default Table
