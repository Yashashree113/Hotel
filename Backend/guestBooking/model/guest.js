const mongoose=require('mongoose')

var guestbookingSchema= new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Code:{
        type:String
    },
    guest_name:{
        type:String,
        required:'This field is required'
    },
    phone_no:{
        type:String,
        required:'This field is required',
        unique:true
    },
    email:{
        type: String
    },
    age:{
        type:String,
        required:'This field is required'
    },
    gender:{
        type:String,
    },
    address:{
        type:String,
        required:'This field is required'
    },
    company:{
        type:String,
        default:'Capgemini'
    },
    room:{
        type:String
    },
    adults:{
        type:String
    },
    children:{
        type:String
    },
    checkin:{
        type:String
    },
    checkout:{
        type:Date
    },
    paymentmode:{
        type:String
    },
    totalamount:{
        type:Number
    },
    updatedOn: {type: Date, default: Date.now()}
})

/*guestbookingSchema.path('email').validate((val)=>{
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(val).toLowerCase());
}, 'Invalid e-mail')*/

module.exports=mongoose.model('guest',guestbookingSchema)