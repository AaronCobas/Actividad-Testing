export default class User {
    static get model(){
        return "users"
    }

    static get schema(){
        return{
            name:String,
            adress:String,
            age:Number,
            phone_number:String,
            imageURL:String,
            email:{
                type:String,
                unique:true
            },
            password:String,
            cart:Array,
        }
    }
}