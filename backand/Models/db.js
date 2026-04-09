    const mongoose=require("mongoose");
    require("dotenv").config();

    const mongdb_url=process.env.MONGODB_CONN;  

    mongoose.connect(mongdb_url)
    .then(()=>{
        console.log("Database Connected!!")
    }).catch((e)=>{
        console.log("mongo error", e)
    })