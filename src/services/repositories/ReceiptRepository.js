import GenericRepositoy from "./GenericRepository.js";
import Receipt from "../../dao/MongoDB/models/Receipt.model.js";

export default class ReceiptRepository extends GenericRepositoy{
    constructor(dao){
        super(dao,Receipt.model)
    }
}