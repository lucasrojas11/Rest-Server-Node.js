const {Schema, model } = require('mongoose');

const ProductSchema = Schema ({
    name:{
        type: String,
        required: [true, "The name is required"],
        unique: true
    },
    estado:{
        type: Boolean,
        default: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    price: {
        type: Number,
        default: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        require: true
    },
    description:{type: String},
    available: {type: Boolean, default: true}

});

ProductSchema.methods.toJSON = function(){
    const {__v, estado, available,...data} = this.toObject();
    return data;
}


module.exports = model ('Product', ProductSchema);