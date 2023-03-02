import express from "express";
import { addLogger, logger } from "./utils/logger.js";
import __dirname from "./utils.js";
import MongoStore from "connect-mongo"
import session from "express-session"
import config from "./config/dotenvConfig.js"
import viewsRouter from "./routes/views.router.js"
import sessionsRouter from "./routes/sessions.router.js"
import passport from "passport";
import initializePassport from "./config/passportConfig.js";
import swaggerJSDOC from "swagger-jsdoc";
import swaggerUIEpress from "swagger-ui-express";

const app = express()
const PORT = process.env.PORT || config.app.PORT || 8080

const swaggerOptions = {
    definition: {
        openapi: "3.0.1",
        info:{
            title:"Products Store",
            description: "Private API for ecommerce use"
        }
    },
    apis:[`${__dirname}/docs/**/*.yaml`]
}
const specs = swaggerJSDOC(swaggerOptions);

app.use(express.static(__dirname+"/public"));
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(addLogger)
app.set("views",__dirname+"/public/ejs");
app.set("view engine","ejs");
app.use("/api-docs",swaggerUIEpress.serve, swaggerUIEpress.setup(specs))

app.use(session({
    store:MongoStore.create({
        mongoUrl:`mongodb+srv://${config.mongo.USER}:${config.mongo.PWD}@codercluster.qyce1yj.mongodb.net/${config.mongo.DB}?retryWrites=true&w=majority`,
        ttl:6000,
    }),
    secret:`${config.sessions.SECRET}`,
    saveUnitialized:false,
    resave:false
}))

initializePassport();
app.use(passport.initialize());
app.use(passport.session())

app.use("/",viewsRouter)
app.use("/",sessionsRouter)

app.listen(PORT,()=>logger.info(`Listening on ${PORT}`))
