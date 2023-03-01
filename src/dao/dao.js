import mongoose, { Model, mongo } from "mongoose";
// import config from "../config/dotenvConfig.js"
import User from "../dao/MongoDB/models/User.model.js"
import Product from "./MongoDB/models/Product.model.js";
import Receipt from "./MongoDB/models/Receipt.model.js"

export default class Dao {
    constructor(config){
        this.connection = mongoose.connect(`mongodb+srv://${config.mongo.USER}:${config.mongo.PWD}@codercluster.qyce1yj.mongodb.net/${config.mongo.DB}?retryWrites=true&w=majority`)
        const genericTimeStamps = {timestamps:{createdAt:"created_at",updatedAt:"updated_at"}}

        const userSchema = mongoose.Schema(User.schema,genericTimeStamps)
        const productSchema = mongoose.Schema(Product.schema,genericTimeStamps);
        const receiptSchema = mongoose.Schema(Receipt.schema,genericTimeStamps)

        this.models = {
            [User.model] : mongoose.model(User.model,userSchema),
            [Product.model] : mongoose.model(Product.model,productSchema),
            [Receipt.model] : mongoose.model(Receipt.model,receiptSchema)
        }
    }

    get = (options,entity) =>{
        if(!this.models[entity]) throw new Error(`Entity ${entity} not defined in models`);
        return this.models[entity].find(options).lean()
    }

    getBy = (options,entity) =>{
        if(!this.models[entity]) throw new Error(`Entity ${entity} not defined in models`);
        return this.models[entity].findOne(options);
    }

    save = (document,entity) =>{
        if(!this.models[entity]) throw new Error(`Entity ${entity} not defined in models`);
        return this.models[entity].create(document);
    }

    update = (options, document, entity) =>{
        if(!this.models[entity]) throw new Error(`Entity ${entity} not defined in models`);
        return this.models[entity].updateOne(options, document);
    }
}