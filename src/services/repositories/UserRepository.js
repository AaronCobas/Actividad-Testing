import GenericRepositoy from "./GenericRepository.js";
import User from "../../dao/MongoDB/models/User.model.js";

export default class UserRepository extends GenericRepositoy{
    constructor(dao){
        super(dao,User.model)
    }
}