import { Router } from "express";
import 'dotenv/config.js'
import userRoute from "./user.js";

const routes = Router()

routes.get('/', (req, res) => {
  res.send(`<div><h1>Home page</h1></div>`);
});

routes.use('/user', userRoute)

export default routes;