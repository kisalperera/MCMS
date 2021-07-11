const router = require('express').Router();
let appoinments = require('../models/appointments.model');

router.route('/getAppointment').get((req,res)=>{
    appoinments.find()
        .then(app => res.json(app))
        .catch(err => res.status(400).json('error:' + err));
} );

router.route('/addAppointment').post((req,res) => {
    const patient_id=req.body.patient_id; 
    const doctor_id=req.body.doctor_id;    
    const date=req.body.date;   
   
    const newappointment = new appoinments({
        patient_id,
        doctor_id,
        date
    });
    newappointment.save()
    .then(() => res.json(newappointment._id))
    .catch(err => res.status(400).json('error:' + err));
});

module.exports = router;