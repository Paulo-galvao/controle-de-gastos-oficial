import mongoose from "mongoose";
import 'dotenv/config';
const mongodb = process.env.MONGODB;

async function main() {
    try {
        await mongoose.connect('mongodb+srv://paulogalvaoj21:paulo123@cluster0.uxez3.mongodb.net/controle-de-gastos');
        console.log("Data Base connected");
        
    } catch (error) {
        console.log(error.message);
        
    }  
}

main();

export default mongoose;