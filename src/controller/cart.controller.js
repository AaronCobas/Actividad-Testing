import { userService, productService, receiptService } from "../services/services.js"
import MailingService from "../services/MailingService.js"
import { json } from "express"
const mailer = new MailingService()


const addToCart = async(req,res)=>{
    const pid = JSON.parse(req.params.id)
    const userInfo = req.session.user.email;
    const exists = await userService.getBy({$and:[{email:userInfo},{cart:{$elemMatch:{productId:pid}}}]}).count()
    if (exists === 0){
        await userService.update({email:userInfo},{$push:{cart:{productId:pid,quantity:1}}})
    }else{
        await userService.update({email:userInfo, "cart.productId":pid},{$inc:{"cart.$.quantity":1}})
    }
    res.redirect("/products")
}

const deleteProductFromCart = async(req,res)=>{
const pid = JSON.parse(req.params.id)
const userInfo =req.session.user.email
await userService.update({email:userInfo},{$pull:{cart:{productId:pid}}})
res.redirect("/cart")
}

const deleteCart = async(req,res)=>{
const userInfo = req.session.user.email
await userService.update({email:userInfo},{$set:{cart:[]}})
res.redirect("/cart")
}

const buyCart = async(req,res)=>{

    const userInfo = req.session.user.email
    const user = await userService.getBy({email:userInfo})
    const products = []
    for (let index = 0; index < user.cart.length; index++) {
        const oneProduct = await productService.getBy({id:user.cart[index].productId})
            const finalProduct = {
                title:oneProduct.title,
                thumbnail:oneProduct.thumbnail,
                price:oneProduct.price*user.cart[index].quantity,
                quantity: user.cart[index].quantity,
                productId:user.cart[index].productId
            }
            products.push(finalProduct)
    }
    const sum = products.reduce((accumulator, object) => {
        return accumulator + object.price;
    }, 0);
    const receipt = {
        productDetails:products,
        receiptId: Math.random().toString(16).slice(2),
        buyer:userInfo,
        finalPrice:sum,
    }
    await receiptService.save(receipt)
    await userService.update({email:userInfo},{$set:{cart:[]}})
    const html = receipt.productDetails.map(products=>`
    <div>
    <h2>${products.title}</h2>
    <p>Amount: ${products.quantity}</p>
    <h3>Subtotal:${products.price}</h3>
    </div>
    `).join("")
    mailer.sendSimpleMail({
        from:"ecommerce Aaron",
        to:userInfo,
        subject:`New order from ${req.session.user.name}, email ${userInfo}`,
        html:`
        <div id="details">${html}</div>
        <h1>Final price: ${receipt.finalPrice}</h1>
        <p>Your recepit id:${receipt.receiptId}<p>
        `
    })
    res.redirect("/cart")
}

export default {
    addToCart,
    deleteProductFromCart,
    deleteCart,
    buyCart
}