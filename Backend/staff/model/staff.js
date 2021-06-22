const mongoose=require('mongoose')

var staffSchema= new mongoose.Schema({
  
    employeename:{
        type:String,
        required:'This field is required'
    },
    employeeaddress:{
        type:String,
        required:'This field is required'
    },
    age:{
        type:String,
        required:'This field is required'
    },
    occupation:{
        type:String
    },
    email:{
        type: String
    },
    salary:{
        type:String
    }
})

staffSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

staffSchema.set('toJSON', {
    virtuals: true,
});
/*staffSchema.path('email').validate((val)=>{
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(val).toLowerCase());
}, 'Invalid e-mail')*/

module.exports=mongoose.model('staff',staffSchema)