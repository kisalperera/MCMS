const mongoose = require('mongoose');
const { type } = require('os');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    date: {type:Date, required: true}, 
    staff_id: {type:String, required: true},    
    amount:{type:String, required: true},   
},
{    timestamp: true,}
);

const staffpayment = mongoose.model('staffpayment', paymentSchema );

module.exports = staffpayment;