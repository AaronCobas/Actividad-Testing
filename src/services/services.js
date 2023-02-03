import UserRepository from "./repositories/UserRepository.js";
import ReceiptRepository from "./repositories/ReceiptRepository.js";
import ProductRepository from "./repositories/ProductRepository.js";
import config from "../config/dotenvConfig.js"
import Dao from "../dao/dao.js";

const dao = new Dao(config);

export const userService = new UserRepository(dao);
export const receiptService = new ReceiptRepository(dao);
export const productService = new ProductRepository(dao);