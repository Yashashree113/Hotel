const mongoose=require('mongoose')

var roomsSchema= new mongoose.Schema({
    room_no:{
        type:String,
        required:'This field is required'  
    },
    room_type:{
        type:String,  
        required:'This field is required'
    },
    bed_type:{
        type:String
    },
    price:{
        type:String,
        required:'This field is required'
    },
    availability:{
        type:String,
        required:'This field is required'
    },
    updatedOn: {type: Date, default: Date.now()}
})

roomsSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

roomsSchema.set('toJSON', {
    virtuals: true,
});


module.exports=mongoose.model('rooms',roomsSchema)