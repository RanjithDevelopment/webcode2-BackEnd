 const Axios=require("axios");
 const _=require("lodash");
 const cheerio=require("cheerio");
 const mongo =require("../connect")
 //https://www.amazon.in/s?k=iphone+11&i=electronics&crid=292GD773RBFNX&sprefix=%2Celectronics%2C479&ref=nb_sb_ss_recent_1_0_recent

async function scraper(){
    try{
const res=await Axios.get("https://www.amazon.in/s?k=iphone+11&i=electronics&crid=292GD773RBFNX&sprefix=%2Celectronics%2C479&ref=nb_sb_ss_recent_1_0recent");
    const $ = await cheerio.load(res.data);
                  
    $('.s-asin').each((i,el)=> {
        const id = $(el).attr('data-asin');
        const brand = $(el).find('h5 .a-size-base-plus').text();
        const name = $(el).find('h2 span').text();  
        const price = $(el).find('.a-price-whole').text();
        const rating = $(el).find('.a-spacing-top-micro span').attr('aria-label');
        const image = $(el).find('.s-image').attr('src');
        const link = 'https://www.amazon.in'+$(el).find('.a-link-normal').attr('href');
        const datas = {productId:id,brand,name,price,rating,image,link,type:"amazon"};
    
    create(datas);
       
    });
}catch(error){
    console.log("this error",error);
}


}
module.exports = {scraper};

async function create(product){
    let productId = _.get(product,'productId',null)
    let type = _.get(product,'type',null);
    if(productId && type){
   
      // const existingProduct= await  mongo.selectedDB.collection("Products").find({productId:productId,type:type});
      await  mongo.selectedDB.collection("Products").updateOne({productId:productId,type:type}, {$setOnInsert: product},{upsert: true});
    }
    //db.Products.find({productId:"B07YB667CH",type:"amazon"});
//   
}