const {MongoClient}=require("mongodb");
const dotenv=require("dotenv");

dotenv.config();
module.exports={
    selectedDB:{},
    async connect(){
        try
        {
        
            const DataBase=  await MongoClient.connect(process.env.MONGODB_URL);
           
            this.selectedDB = DataBase.db("Webcode2");
    
        }
        catch(error){
            console.log(error);
        }
    }

}