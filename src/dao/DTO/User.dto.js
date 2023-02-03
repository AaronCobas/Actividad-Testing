export default class UserDTO{
    static getDbDTOFrom = (user) =>{
        return {
            name: user.name,
            adress:user.adress || "Adress not recieved",
            age: user.age,
            phone_number: user.phone_number,
            imageURL: user.imageURL,
            password: user.password,
            email: user.email,
        }
    }
    static getPresenterFrom = (user)=>{
        return {
            name:user.name,
            email: user.email,
            phone_number: user.phone_number,
            imageURL: user.imageURL,
            age:user.age
        }
    }
}