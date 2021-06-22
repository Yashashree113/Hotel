const express=require('express')
const router = express.Router();
var ObjectId=require('mongoose').Types.ObjectId
const mongoose=require('mongoose')

const Staff=require('../model/staff')

mongoose.connect('mongodb+srv://staff:AEhJiElnZn2FaN3W@cluster0.fxdvc.mongodb.net/staffdata?retryWrites=true&w=majority',
{useNewUrlParser: true}, (err)=>{
    if(!err) {
        console.log('MongoDB connected successfully')
    }
    else{console.log('Error in DB connection: '+err)}
})

//=> localhost:8081/staff
router.get('/',(req,res)=>{
    Staff.find((err,docs)=>{
        if(!err){res.send(docs);
        }
        else{console.log('Error in retriving Staff:'+JSON.stringify(err, undefined, 2));}
    });
})

//Adding new staff details
router.post('/staff',(req,res)=>{
    var newstaff= {
        Code:req.body.Code,
        employeename:req.body.employeename,
        employeeaddress:req.body.employeeaddress,
        age:req.body.age,
        occupation:req.body.occupation,
        email:req.body.email,
        salary:req.body.salary
    }
    var staff=new Staff(newstaff)
        staff
        .save()
        .then(()=>{
            console.log("New staff added")
        })
        .catch((err)=>{
            if(err){
                console.log('Error during inserting record:'+err)
            }
        });
        res.send("New staff is added");
})

//listing all staff details
router.get("/staff", (req, res) => {
	Staff.find()
		.then((staff) => {
			res.json(staff);
		})
		.catch((err) => {
			throw err;
		});
});

// list staff details by id 
router.get('/staff/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send('No record with given id: ${req.params.id}')
    
    Staff.findById(req.params.id,(err,doc)=>{
     if(!err){res.send(doc);
     }
     else{console.log('Error in retriving Staff:'+JSON.stringify(err, undefined, 2));}
    })
 })

//updating the staff details
router.put('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send('No record with given id: ${req.params.id}')
    var staff={
        Code:req.body.Code,
        employeename:req.body.employeename,
        employeeaddress:req.body.employeeaddress,
        age:req.body.age,
        occupation:req.body.occupation,
        email:req.body.email,
        salary:req.body.salary
    }
    Staff.findByIdAndUpdate(req.params.id,
        {$set:staff},{new:true},(err,doc)=>{
            if(!err)
            res.send(doc);
            else
                console.log('Error during record updation:'+err) 
        });
})

//deleting the staff member
router.delete("/staff/:id", (req, res, next) => {
	Staff.findByIdAndRemove({_id: req.params.id}, function(err, staff){
    if(err){
      res.json(err);
    } else{
      res.json(staff);
    }
  })
});

/*router.delete('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send('No record with given id: ${req.params.id}')
    Staff.findByIdAndRemove(req.params.id,
        {$set:staff},{new:true},(err,doc)=>{
            if(!err)
            res.send(doc);
            else
                console.log('Error during record deletion:'+err) 
        });
})   
*/
  module.exports=router;

