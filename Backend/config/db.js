import mongoose from "mongoose";

export const connectToDB = async() => {
    try{
       await mongoose.connect(process.env.MONGO_URI).then(console.log(`Database connected successfully`))
    }
    catch(e){
        throw new Error('Error while connecting to Database',e)
    }
}