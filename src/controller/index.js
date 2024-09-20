import { Router } from "express";
import 'dotenv/config.js'
import userRoute from "./user.js";
import urlRoute from "./url.js";

const routes = Router()

routes.get('/', (req, res) => {
  res.send(`<div><h1>Home page</h1></div>`);
});

routes.use('/user', userRoute)
routes.use('/url', urlRoute)

export default routes;