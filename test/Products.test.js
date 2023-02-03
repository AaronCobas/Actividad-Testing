import Dao from "../src/dao/dao.js"
import ProductRepository from "../src/services/repositories/ProductRepository.js"
import assert from "assert"

const config ={
    mongo:{
        USER: "CoderUser",
        PWD: "123",
        DB: "ProyectoFinal3DB",
    }
}

const dao = new Dao(config)
const productService = new ProductRepository(dao)

describe("Test of ProductRepository",()=>{
    it("The repository must be able to create an product based on its DAO",async function(){
        const result = await productService.save({
            title:"TestProduct",
            description:"Product made for testing ProductService",
            code:Math.random().toString(16).slice(2),
            thumbnail:"https://economipedia.com/wp-content/uploads/test-de-estrés.png",
            price:123,
            stock:12,
        })
        assert.ok(result._id)
    }) //Cada it es una prueba
    it("The repository must be able to obtain all products in Array form", async function (){
        const result = await productService.getAll()
        assert.equal(Array.isArray(result),true)
    })
    it("The repository must be able to obtain only ONE product based on a single parameter: email", async function(){
        const result = await productService.getBy({email:"aaroncobas2017@gmail.com"})
        assert.ok(result._id)
    })
})
// La función flecha no permite el uso interno de un "this"