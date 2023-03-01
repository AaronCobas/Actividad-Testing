const quantityInput = document.getElementById("quantity")

function imposeMinMax(el){
    if(el.value != ""){
    if(parseInt(el.value) < parseInt(el.min)){
        el.value = el.min;
    }
    if(parseInt(el.value) > parseInt(el.max)){
        el.value = el.max;
    }
    }
}
const addProduct = async(productId) =>{
    const obj = {quantity: quantityInput.value}
    fetch(`/products/${productId}`,{
                method:"POST",
                body: JSON.stringify(obj),
                headers:{
                    'Content-Type': 'application/json'
                }
            }).then(Swal.fire({
                title:'Product added to cart',
                icon:'success',
                footer: '<a href="/cart">Go to cart</a>'
}))
}
// const addProduct = async(productId) =>{
//     id = productId
// }

// form.addEventListener("submit",evt=>{
//     evt.preventDefault();
//     console.log(id)
//     const data = document.getElementById("quantity").value
//     fetch(`/products/${id}`,{
//         method:"POST",
//         body: data
//     }).then(result=>result.json()).then(json=>console.log(json))
// })

// const addProduct = async(productId) =>{
//     const id = productId
//     form.addEventListener("submit",evt=>{
//         evt.preventDefault();
//         console.log(id)
//         const data = document.getElementById("quantity").value
//         console.log(data)
//         fetch(`/products/${id}`,{
//             method:"POST",
//             body: data
//         }).then(result=>result.json()).then(json=>console.log(json))
//     })
// }