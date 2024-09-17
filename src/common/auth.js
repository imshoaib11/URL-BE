import bcrypt from 'bcrypt';
import 'dotenv/config.js'

const hash = async (password) => {
    try{
        let salt = await bcrypt.genSalt(Number(process.env.SALT))
        
        let hashedPassword = await bcrypt.hash(password,salt)
        return hashedPassword
    }
    catch(err){
        throw err;
    }
}

const compareHash = async (password, hashedPassword) => {
    try{
        return await bcrypt.compare(password, hashedPassword)
    }
    catch(err){
        throw err;
    }
}


export default {
    hash,
    compareHash,
}