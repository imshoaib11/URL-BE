import mongoose from './index.js'

const urlSchema = new mongoose.Schema({
        shortUrl:{
            type: String,
            required: true,
            unique: true
        },
        redirectUrl:{
            type: String,
            required: true,
        }
},

    {
        collection: 'url',
        versionKey: false
    }
   
)

const url = new mongoose.model('url',urlSchema)

export default url