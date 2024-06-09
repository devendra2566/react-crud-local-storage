import React, { useEffect, useState } from 'react'
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { PanelType } from "@fluentui/react/lib/Panel";
import { Panel } from '@fluentui/react/lib/Panel';
const buttonStyles = { root: { marginRight: 8 } };
import './addData.css'
import { addProducts, updateProducts, } from './services/index'
const AddData = ({closePopup, selectedProducts,reload}) => {

  const[isOpen,setIsOpen]=useState(false)
  const [title, setTitle] = useState()
  const [price , setPrice] = useState()
  const [description, setDescription] = useState()
  const [category, setcCategory] = useState()
  const [rate, setRate] = useState()
  const [count, setCount] = useState()


    

    useEffect(()=>{
        setIsOpen(true)
    },[])
  
   const dismissPanel=()=>{
    setIsOpen(false)
    closePopup()
   }
    
      const onAddProduct = () => {   
        var data = {
          title: title,
          price: price,
          description: description,
          category: category,
          image: '',
          rating: {
          rate: rate,
          count: count
        }
      }
                                   

          console.log("WWRKJHRU32GRYU3",data)  
          if(selectedProducts){
            updateProducts(selectedProducts.id,data);
            alert('Product Updated Successfully');
          } else {
            addProducts(data);
            console.log("ELSE",data) 
            alert('Product Added Successfully');
          }
          
          reload();
          closePopup();
       }
      
      
       useEffect(()=>{
        if(selectedProducts){
          setTitle(selectedProducts?.title);
          setDescription(selectedProducts?.description);
          setPrice(selectedProducts?.price)
          setcCategory(selectedProducts?.category)
          setRate(selectedProducts?.rating?.rate)
          setCount(selectedProducts?.rating?.count)
        }
       },[selectedProducts])

       const onRenderFooterContent = React.useCallback(() => (
        <div>
          <PrimaryButton onClick={onAddProduct}>{selectedProducts ? 'Edit' :'Add'} Product</PrimaryButton>
          <DefaultButton onClick={dismissPanel}>Cancel</DefaultButton>
        </div>
      ));

return (
<div className='panelData'>
  <Panel
    type={PanelType.small}
        isOpen={isOpen}
        onDismiss={dismissPanel}
        headerText={selectedProducts? 'Edit Product' : 'Add Product'}
        closeButtonAriaLabel="Close"
        onRenderFooterContent={onRenderFooterContent}
        isFooterAtBottom={true}
  >
    <form style={{border:"1px solid black", width:" 200px",  fontFamily:"sans-serif", font:"200px", fontStyle:"bold", gap:'10px'}}>
   
    <div style={{margin:"10px"}}>
        <div className='content'>Enter the title</div>
        <input type='text' placeholder='...enter the Title'
        value={title} 
        onChange={(e)=>setTitle(e.target.value)}
        ></input>
    </div>
    <div style={{margin:"10px"}}>
        <div className='content'>Price</div>
        <input type='text' placeholder='...enter the price'
        value={price}
        onChange={(e)=>setPrice(e.target.value)}></input>
    </div>
    <div style={{margin:"10px"}} >
        <div className='content'>Discription</div>
        <input type='text' placeholder='...enter the Discription'
        value={description} onChange={(e)=>setDescription(e.target.value)}></input>
    </div>
    <div style={{margin:"10px"}}>
        <div className='content'>Category</div>
        <input type='text' placeholder='...enter the Category' value={category} onChange={(e)=>setcCategory(e.target.value)}></input>
    </div>
    
    <div style={{margin:"10px"}}>
        <div className='content'>Rate</div>
        <input type='text' placeholder='...enter the Rating' value={rate} onChange={(e)=>setRate(e.target.value)}></input>
    </div>
    <div style={{margin:"10px"}}>
        <div className='content'>Count</div>
        <input type='text' placeholder='...enter the  count' value={count} onChange={(e)=>setCount(e.target.value)}></input>
    </div>
    
    </form>
  </Panel>
</div>
  )
}

export default AddData