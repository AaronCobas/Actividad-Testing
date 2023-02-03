import GenericRepositoy from "./GenericRepository.js";
import Product from "../../dao/MongoDB/models/Product.model.js";

export default class ProductRepository extends GenericRepositoy{
    constructor(dao){
        super(dao,Product.model)
    }
}