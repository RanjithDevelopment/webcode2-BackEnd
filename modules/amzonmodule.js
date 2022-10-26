const mongo =require("../connect");
module.exports.getamazondetails= async (req,res)=>{
    const apiresponse= await mongo.selectedDB.collection("Products").find({}).toArray();
    return res.json({
       data:apiresponse
    });
};
