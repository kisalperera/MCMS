const router = require('express').Router();
let staff = require('../models/staff.model');

router.route('/getStaff').get((req,res)=>{
    staff.find()
        .then(staffs => res.json(staffs))
        .catch(err => res.status(400).json('error:' + err));
} );

router.route('/addStaff').post((req,res) => {

    const staff_username=req.body.staff_username;
    const staff_name=req.body.staff_name;
    const staff_address=req.body.staff_address;
    const staff_phone=req.body.staff_phone;
    const staff_password=req.body.staff_password;
    const staff_role=req.body.staff_role;

    //const selling_price = Number(req.body.selling_price);

    const newstaff = new staff({
        staff_username,
        staff_name,
        staff_address,
        staff_phone,
        staff_password,
        staff_role,
    });

    newstaff.save()
    .then(() => res.json('Staff Added!'))
    .catch(err => res.status(400).json('error:' + err));
});

router.route('/getStaffByID/:id').get((req,res)=>{
    staff.findById(req.params.id)
    .then(staff=>res.json(staff))
    .catch(err=>res.status(400).json('Error: '+err));
})

 router.route('/deleteStaffByID/:id').delete((req,res)=>{
     staff.findByIdAndDelete(req.params.id)
     .then(()=>res.json('Staff Deleted'))
     .catch(err=>res.status(400).json('Error: '+err));
 })

 router.route('/updateStaffByID/:id').post((req,res)=>{
    staff.findById(req.params.id)
    .then(staff=>{
        staff.staff_username=req.body.staff_username;
        staff.staff_name=req.body.staff_name;
        staff.staff_address=req.body.staff_address;
        staff.staff_phone=req.body.staff_phone;
        staff.staff_role=req.body.staff_role;
        staff.staff_password=req.body.staff_password;


        staff.save()
        .then(()=>res.json('Staff updated!'))
        .catch(err=>res.status(400).json('Error:' +err));
    })
    .catch(err=>res.status(400).json('Error: '+err));
})

router.route('/reset').post((req,res)=>{
    staff.findOne({staff_username:req.body.staff_username}&&{staff_password:req.body.current_password})
    .then(staff=>{
            staff.staff_password=req.body.new_password;
            staff.save() 
            .then(()=>res.json('true'))
          
    })
    .catch(err=>res.status(400).json('Error: '+err));
})


router.route('/login').post((req,res)=>{
    staff.findOne({staff_username:req.body.staff_username})
    .then(staff=>{
        if(staff.staff_password==req.body.staff_password){
            return res.json(staff)     
          }
        else{return res.json('Password incorrect!')}
    })
    .catch(err=>res.status(400).json('Error: '+err));
})





module.exports = router;  