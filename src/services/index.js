 

import {v4 as uuid } from 'uuid'

function getProducts(){
    let products = localStorage.getItem('y.data') ? JSON.parse(localStorage.getItem('y.data')) : []
    return products
}


function getSingleProduct(id){
    let products = getProducts();
    products = products.find((item)=>item.id === id)
    return products
} 

function addProducts(data){
    console.log("addProduct",data)
    let products = getProducts();
    products.push({...data, id: uuid()});
    
    localStorage.setItem('y.data', JSON.stringify(products))
    return products
}


function updateProducts(id, data){
    let products = getProducts();
    let productIndex = products.findIndex(product => product.id === id);
    if (productIndex !== -1) {
        products[productIndex] = { ...products[productIndex], ...data }; 
        localStorage.setItem('y.data', JSON.stringify(products));
        return products;
    } else {
        console.error("Product not found");
        return null;
    }
}


function deleteProducts(id){
    let products = getProducts();
   let product= products.filter((ele)=>ele.id!==id);
    localStorage.setItem('y.data', JSON.stringify(product))
    return products
}


export {getProducts, addProducts, updateProducts, deleteProducts, getSingleProduct}
