const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    size: [{
            name: String,
            quantity: Number,
        },
    ],
    quantity: {
        type: Number,
        required: true,
    },
    category: [String],
    //Trường dữ liệu phức tạp.
    price:{
        type: Number,
        required: true,
    },
    discount:{
        type: Number,
        required: true,
    },
    // purchase_parking_pass:{

    // },
    image:{
        type: String,
    },
    description:{
        type: String,
        required: true,
    },
    comments:[
        {
            type: mongoose.Schema.ObjectId,
            ref:'comment'
        }
    ],
    like:{
        type: Number,
        required: true,
    },
});
module.exports = mongoose.model('Product', productSchema);
