import { Router } from "express";
import urlService from "../service/urlService.js";

const urlRoute = Router();

urlRoute.post('/',urlService.createUrl)
urlRoute.get('/',urlService.getAllUrls)
urlRoute.get('/:shortUrl',urlService.redirect)


export default urlRoute;