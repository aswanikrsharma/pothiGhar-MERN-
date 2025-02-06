import mongoose from 'mongoose';
import { MONGO_URL } from './serverConfig.js';

async function dbConnect(){
    try{
        await mongoose.connect(MONGO_URL);
        console.log('Connected to MongoDB successfully');
    }
    catch(error){
        console.log(error);
    }
}
export default dbConnect;