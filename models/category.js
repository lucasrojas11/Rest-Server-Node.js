const {Schema, model } = require('mongoose');

const CategorySchema = Schema ({
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
    }

});

CategorySchema.methods.toJSON = function(){
    const {__v, estado, ...data} = this.toObject();
    return data;
}


module.exports = model ('Category', CategorySchema);