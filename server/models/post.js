const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    description: {
        type: String,
       
    },
    posted_by_id: {
        type: String,
       
    },
    posted_by: {
        type: String,
       
    },
    images: {
        type: String,
        
    },
    cloud_id : String ,
    images_url: {
        type: String,
       
    },
    date: String,
     time: String,
     dim:[],
     likes:[],
     comments:[]
})

mongoose.model('Post',postSchema);