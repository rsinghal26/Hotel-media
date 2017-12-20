var mongoose = require("mongoose");
var hotl = require("./models/hotel");
var comment = require("./models/comment");

var data = [
        {
            name:"Umaid Bhawan",
            image:"http://www.umaidbhawan.com/upload/UmaidBhawan_Fountain_2.jpg",
            description:"bla,bla , bla umaidbhawan"
        },
        {
            name:"The Taj",
            image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLaZZqSa2qDsrD3Th0YVQmd5LZfEWq6mACTPB15eXNie0JNIsZ",
            description:"bla,bla , bla The taj"
        }
    ]

function seedDB(){
    
    hotl.remove({},function(err){
        if(err){
            console.log(err);
         }
        //     console.log("Remove done..");
        //     data.forEach(function(seed){
        //         hotl.create(seed,function(err,hotel){
        //             if(err){
        //                 console.log(err);
        //             }else{
        //                 console.log("Added done..");
        //                 //add comment
        //                 comment.create(
        //                     {
        //                         text:"Amazing place",
        //                         author:"Raja singhal"
        //                     },function(err,comment){
        //                         if(err){
        //                             console.log(err);
        //                         }else{
        //                             hotel.comments.push(comment);
        //                             hotel.save();
        //                             console.log("Comment added");
        //                         }
        //                     });
        //             }
        //         }); 
        //     });    
        
    });
}

module.exports = seedDB;