const { req, res } = require("express");
const express = require("express");
const mongoose=require('mongoose')
const router = express.Router();
var ObjectId=require('mongoose').Types.ObjectId

var Rooms=require('../model/rooms')

mongoose.connect('mongodb+srv://room:kPeuIN8bYWblCFs7@cluster0.fxdvc.mongodb.net/roomdata?retryWrites=true&w=majority',
{useNewUrlParser: true, useCreateIndex:true, 
    useUnifiedTopology: true}, (err)=>{
    if(!err) {
        console.log('MongoDB connected successfully')
    }
    else{console.log('Error in DB connection: '+err)}
})

//=> localhost:4000/rooms
router.get('/',(req,res)=>{
    Rooms.find((err,docs)=>{
        if(!err){res.send(docs);
        }
        else{console.log('Error in retriving Rooms:'+JSON.stringify(err, undefined, 2));}
    });  
})

//Adding new room details
router.post('/room',(req,res)=>{
        var newRoom = {
            room_no: req.body.room_no,
            room_type: req.body.room_type,
            bed_type: req.body.bed_type,
            // no_of_bed:req.body.no_of_bed,
            // bathrooms: req.body.bathrooms,
            price: req.body.price,
            availability: req.body.availability
        };
        var room=new Rooms(newRoom)
        room
        .save()
        .then(()=>{
            console.log("New Room added")
        })
        .catch((err)=>{
            if(err){
                console.log('Error during inserting record:'+err)
            }
        });
        res.send("New Room is added");
    })

//listing all room details
router.get("/room", (req, res) => {
	Rooms.find()
		.then((room) => {
			res.json(room);
		})
		.catch((err) => {
			throw err;
		});
});

// list room details by id 
router.get('/room/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send('No record with given id: ${req.params.id}')
    
    Rooms.findById(req.params.id,(err,doc)=>{
     if(!err){res.send(doc);
     }
     else{console.log('Error in retriving Rooms:'+JSON.stringify(err, undefined, 2));}
    })
 })

//updating the room details
router.put('/room/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send('No record with given id: ${req.params.id}')
    var room={
            room_no: req.body.room_no,
            room_type: req.body.room_type,
            bed_type: req.body.bed_type,
            // no_of_bed:req.body.no_of_bed,
            // AC: req.body.AC,
            price: req.body.price,
            availability: req.body.availability
    }
    Rooms.findByIdAndUpdate(req.params.id,
        {$set:room},{new:true},(err,doc)=>{
            if(!err)
            res.send(doc);
            else
                console.log('Error during record updation:'+err) 
        });
})

//deleting the room member
/*router.delete('/room/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send('No record with given id: ${req.params.id}')
    Rooms.findByIdAndRemove(req.params.id,
        {$set:room},{new:true},(err,doc)=>{
            if(!err)
            res.send(doc);
            else
                console.log('Error during record deletion:'+err) 
        });
}) */ 

router.delete("/room/:id", (req, res, next) => {
	Rooms.findByIdAndRemove({_id: req.params.id}, function(err, room){
    if(err){
      res.json(err);
    } else{
      res.json(room);
    }
  })
});

module.exports=router;