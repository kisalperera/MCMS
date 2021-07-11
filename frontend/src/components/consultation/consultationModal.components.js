import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Modal, Button } from "react-bootstrap";


const InternalPrescription = pr=>(
    <tr>
        <td>{pr.internalP.inventoryItem_name}</td>
        <td>{pr.internalP.frequency}</td>     
        <td>{pr.internalP.dose}</td>     
        <td>{pr.internalP.duration}</td>     
    </tr>
)

const ExternalPrescription = pr=>(
    <tr>
        <td>{pr.externalP.inventoryItem_name}</td>
        <td>{pr.externalP.frequency}</td>     
        <td>{pr.externalP.dose}</td>     
        <td>{pr.externalP.duration}</td>     
    </tr>
)

export default class ViewConsultModal extends Component {
constructor(props){
    super(props); 

    // this.internalPList = this.internalPList.bind(this);
    // this.externalPList = this.externalPList.bind(this);
   
    this.state ={
        id:props.data,
        consultation_date:'',
        patinet_id:'',
        complaint:'',
        complaint_duration:'',
        pulse:'',
        blood_pressure:'',
        heart_sound:'',
        marmers:'',
        air_entry:'',
        crepitation:'',
        ronchi:'',
        other_exam:'',
        diagnosis:'',
        consultation_charge:'',
        next_visit:'',
        internalP:[],
        externalP:[]
    }
}


// internalPList(){
//         if(this.state.internalP.length>0){
//             return this.state.internalP.map(internalP =>{
//                 return<InternalPrescription internalP={internalP} key={internalP._id}/>;
//             })
//             }          
//             else {return <h7 style={{color:"black", width:800}}>No Internal Prescription Available!</h7>;}
// }
    
// externalPList(){
//         if(this.state.externalP.length>0){
//             return this.state.externalP.map(externalP =>{
//                 return<ExternalPrescription externalP={externalP} key={externalP._id}/>;
//             })
//             }          
//             else {return <h7 style={{color:"black", width:800}}>No External Prescription Available!</h7>;}
// }

   render(){
  

       return(

<Modal
        {...this.props}
        aria-labelledby="contained-modal-title-vcenter"
        size="xl"
        centered
        
      > <Modal.Header closeButton >
      <Modal.Title>Patient History: {this.props.data.consultation_date}</Modal.Title>
    </Modal.Header>

<div className="container">

<div className="p-3 border bg-light">

<form  >
<div className="p-3 border bg-light">
<div className="row row-cols-2" >

<div className="col"> 
<label for="complaint" className="form-label">Complaint</label>
<textarea type="text" className="form-control" id="complaint"  value ={this.props.data.complaint} style={{height:70}} readOnly></textarea>
</div>

<div className="col"> 
<label for="duration" className="form-label"style={{marginLeft:150}}>Duration</label>
<div className="row row-cols-2" style={{marginTop:10}}>
<div className="col"> 
<input type="text" className="form-control" id="duration" value ={this.props.data.complaint_duration} style={{width:150, marginLeft:150}} readOnly></input>
</div>

</div>
</div>



</div>
</div>

<br/>


<div className="p-3 border bg-light">
<label className="form-label">System Examination</label>

<div className="row" >

<div className="col-3"style={{marginLeft:20}} >
<label for="duration" className="form-label">Pulse</label>
<div className="row row-cols-2" >
<div className="col">
<input type="text" className="form-control" id="duration" value ={this.props.data.pulse} readOnly></input>
</div>
<div className="col">
<label className="form-label"style={{width:10, marginTop:7}}>BPM</label>
</div>
</div>
</div>

<div className="col">
<label for="blood_pressure" className="form-label">Blood Pressure</label>
<div className="row " >
<div className="col-4">
<input type="text" className="form-control" id="blood_pressure_mm" style={{width:150}} value ={this.props.data.blood_pressure} readOnly></input>
</div>
<div className="col-2" style={{ marginLeft:30}} >
<label className="form-label" style={{ marginTop:7}} >mmHg</label>
</div>
</div>
</div>

<div className="col">
<label for="heart_sound" className="form-label">Heart Sound</label>
<br/>
<div className="row">
<div className="col" style={{marginRight:-40}}>
<input type="text" className="form-control"  style={{width:120}} value ={this.props.data.heart_sound} readOnly></input>
</div>
<div className="col" style={{marginTop:-33}}>
<label for="marmers" className="form-label">Marmers</label>
<input type="text" className="form-control" style={{width:120}} value ={this.props.data.marmers} readOnly></input>

</div>
</div>
     
</div>

</div>    
</div>

<br/>

<div className="p-3 border bg-light">
<label className="form-label" >Respiratory Examination</label>

<div className="row" >

<div className="col-3"style={{marginLeft:20}} >
<label for="air_entry" className="form-label">Air Entry</label>
<input type="text" className="form-control" style={{width:120}} value ={this.props.data.air_entry} readOnly></input>

</div>

<div className="col" style={{marginLeft:0}}>
<label for="crepitation" className="form-label">Crepitation</label><br/>
<div className="form-check form-check-inline" style={{marginTop: '7px'}} >
            <input className="form-check-input" type="radio" name="crepitationRadio" id="crepitation1" value="true" checked={this.props.data.crepitation==="true"} readOnly/>
            <label className="form-check-label" for="crepitation1">Yes</label>
            </div>
            <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio"  name="crepitationRadio" id="crepitation2" value="false" checked={this.props.data.crepitation==="false"} readOnly/>
            <label className="form-check-label" for="crepitation2">No</label>
            </div>
</div>

<div className="col" style={{marginLeft:-400}}>
<label className="form-label">Ronchi</label><br/>
<div className="form-check form-check-inline" style={{marginTop: '7px'}} >
            <input className="form-check-input" type="radio" name="ronchiRadio" id="ronchi1" value="true" checked={this.props.data.ronchi==="true"} readOnly />
            <label className="form-check-label" for="ronchi1">Yes</label>
            </div>
            <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio"  name="ronchiRadio" id="ronchi2" value="false" checked={this.props.data.ronchi==="false"} readOnly/>
            <label className="form-check-label" for="ronchi2">No</label>
            </div>
</div>

</div>    
</div>
<br/>

<label for="other_exam" className="form-label">Other Examinations</label>
<textarea style={{height:70}} className="form-control" id="other_exam" value ={this.props.data.other_exam} readOnly  ></textarea>
<br/>
<label for="diagnosis" className="form-label">Diagnosis</label>
<textarea style={{height:70}} className="form-control" id="diagnosis" value ={this.props.data.diagnosis} readOnly ></textarea>


<br/>

<div className="p-3 border bg-light">
<label className="form-label" >Invrestigations</label>
<textarea style={{height:40,width:500}}class="form-control" id="other_investigation" value ={this.props.data.investigations} readOnly ></textarea>

</div>      
<br/>
<div className="p-3 border bg-light">

<table id="table1" className="table"><h6>Internal Prescription</h6>
    <tbody>
{/* {this.internalPList()} */}
    </tbody>  
</table>
<br/>

<table id="table2" className="table"><h6>External Prescription</h6>
    <tbody>
    {/* {this.externalPList()} */}
    </tbody>
</table>
</div>




<br/>



<div className="row">
<div className="col-3"style={{marginRight:30}}>
<label for="consult_charge" className="form-label">Consultation Charge</label>
<input type="text" className="form-control" id="item" value ={this.props.data.consultation_charge} readOnly></input>
</div>

<div className="col-3" >
<label for="consult_charge" className="form-label">Follow up Visit</label>
<input type="text" className="form-control" id="item" value ={this.props.data.next_visit} readOnly></input>
</div>
</div>


  </form>  

     </div>
   </div>
</Modal>
       )
   } 
}