export default class Receipt{
    static get model(){
        return "receipts"
    }
    static get schema(){
        return{
            productDetails:Array,
            receiptId:String,
            buyer:String,
            finalPrice:Number
        }
    }
}