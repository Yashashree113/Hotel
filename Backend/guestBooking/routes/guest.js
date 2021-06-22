//const { req, res } = require("express");
const express = require("express");
const mongoose=require('mongoose')
const router = express.Router();
var ObjectId=require('mongoose').Types.ObjectId

var Guest=require('../model/guest')

mongoose.connect('mongodb+srv://guest:9q1DX6GEm0Yq9v2R@cluster0.fxdvc.mongodb.net/guestdata?retryWrites=true&w=majority',
{useNewUrlParser: true}, (err)=>{
    if(!err) {
        console.log('MongoDB connected successfully')
    }
    else{console.log('Error in DB connection: '+err)}
})

//=> localhost:4000/guest
router.get('/',(req,res)=>{
    Guest.find((err,docs)=>{
        if(!err){res.send(docs);
        }
        else{console.log('Error in retriving Guest:'+JSON.stringify(err, undefined, 2));}
    });
})


//Adding new guest
router.post('/guest',(req,res)=>{
    var newguest={
        _id: new mongoose.Types.ObjectId(),
        Code:req.body.Code,
        guest_name:req.body.guest_name,
        phone_no:req.body.phone_no,
        email:req.body.email,
        age:req.body.age,
        gender:req.body.gender,
        address:req.body.address,
        company:req.body.company,  
        room: req.body.room,
        adults:req.body.adults,
        children:req.body.children,
		checkin: req.body.checkin,
		checkout: req.body.checkout,
		paymentmode: req.body.paymentmode,
		totalamount: req.body.totalamount
    }
    var guest= new Guest(newguest)
    guest
        .save()
        .then(()=>{
            console.log("New guest added")
        })
        .catch((err)=>{
            if(err){
                console.log('Error during inserting record:'+err)
            }
        });
        res.send("New guest is added");
})

//listing all guest details
router.get("/guest", (req, res) => {
	Guest.find()
		.then((guest) => {
			res.json(guest);
		})
		.catch((err) => {
			throw err;
		});
});

//Listing new guest details by id 
router.get('/guest/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send('No record with given id: ${req.params.id}')

    Guest.findById(req.params.id,(err,doc)=>{
     if(!err){res.send(doc);
    }
     else{console.log('Error in retriving Guest:'+JSON.stringify(err, undefined, 2));}
    })
 })

//Updating guest details
router.put('/guest/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send('No record with given id: ${req.params.id}')
    var guest={
        
        Code:req.body.Code,
        guest_name:req.body.guest_name,
        phone_no:req.body.phone_no,
        email:req.body.email,
        age:req.body.age,
        gender:req.body.gender,
        address:req.body.address,
        company:req.body.company,
        room: req.body.room,
        adults:req.body.adults,
        children:req.body.children,
		checkin: req.body.checkin,
		checkout: req.body.checkout,
		paymentmode: req.body.paymentmode,
		totalamount: req.body.totalamount
    }
    Guest.findByIdAndUpdate(req.params.id,
        {$set:guest},{new:true},(err,doc)=>{
            if(!err)
            res.send(doc);
            else
                console.log('Error during record updation:'+err) 
        });
})

//Delete guest records
router.delete('/guest/:id',(req,res)=>{
    Guest.findOneAndRemove(req.params.roomId)
		.then(() => {
			res.status(200).json({
				message: 'Guest Deleted'
			});
		})
		.catch((err) => {
			if (err) {
				res.status(401).json({
					message: 'Guest cannot be deleted'
				});
				console.log(err)
			}
		});
})    

module.exports=router;