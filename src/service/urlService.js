import url from "../model/urlModel.js";
import shortid from "shortid";
import crypto from 'crypto'

const createUrl = async(req,res) => {
    try{
        const originalUrl = req.body
        const shortUrl = shortid(8)
    
        if(!originalUrl.url) return res.status(400).send({message: "Please enter a URL"})
    
            await url.create({
                shortUrl: shortUrl,
                redirectUrl: originalUrl.url
            })
    
            res.status(201).send({message: "URL created successfully", shortUrl}) 
    }
    catch(error){
        res.status(500).send({message: error.message || "Internal Server Error"})
    }
    
}

const getAllUrls = async(req,res) => {
    try{
        let urls = await url.find()
    
            res.status(200).send({message: "URL retrived successfully", data: urls}) 
    }
    catch(error){
        res.status(500).send({message: error.message || "Internal Server Error"})
    }
    
}

const redirect = async(req,res) => {
    try{
    const {shortUrl} = req.params

    let getUrl = await url.findOne({shortUrl})

    if(getUrl){
        res.status(200).redirect(getUrl.redirectUrl)
    }
    else{
        res.status(400).send({message:"URL Not Found"})

    }
    }
    
    catch(error){
        res.status(500).send({message: error.message || "Internal Server Error"})
    }
}

export default {
    createUrl,
    getAllUrls,
    redirect
}