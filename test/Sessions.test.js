import chai, { use } from "chai";
import supertest from "supertest";

const expect = chai.expect;
const requester = supertest("http://localhost:8080")

describe("Server-level testing",()=>{
    describe("Users test",()=>{
        it("The POST endpoint /register must be able to create a new user in the database",async()=>{
            const userMock = {
                name:"TestName",
                adress:"TestPlace 123",
                age: 20,
                phone_number:"11 2345-6789",
                email:"supertest@test.com",
                password:"123"
            }
            const result = await requester.post("/register")
            .field("name",userMock.name)
            .field("adress",userMock.adress)
            .field("age",userMock.age)
            .field("phone_number",userMock.phone_number)
            .field("email",userMock.email)
            .field("password",userMock.password)
            .attach("image","./test/testimage.png")

            expect(result.status).to.be.equal(200)
            expect(result._body.payload).to.have.property("_id")
            expect(result._body.payload.imageURL).to.be.ok
        }).timeout(4000) // Tuve que poner este timeout porque el post tardaba más de los 2000ms que espera por default (el post tarda aprox 2127ms)
    })
    describe("Login test",()=>{
        let cookie
        it("The POST endpoint /login must be able to log in a user correctly AND add a cookie",async ()=>{
            const userMock = {
                email: "aaroncobas2017@gmail.com",
                password:"123"
            }
            const response = await requester.post("/login").send(userMock);
            const cookieHeader = response.headers["set-cookie"][0]
            expect(cookieHeader).to.be.ok
            expect(response.status).to.be.equal(302) //Pongo que sea 302 porque hace un redirect
            cookie = {
                name: cookieHeader.split("=")[0],
                value: cookieHeader.split("=")[1]
            }
            expect(cookie.name).to.be.ok.and.eql("connect.sid")
        })
    })
})