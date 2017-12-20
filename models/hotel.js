var mongoose = require("mongoose");
var hotelSchema = new mongoose.Schema({
    name:String,
    image:String,
    description:String,
    author:{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        },
        username:String
    },
    comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]    
});

module.exports = mongoose.model("hotel",hotelSchema);