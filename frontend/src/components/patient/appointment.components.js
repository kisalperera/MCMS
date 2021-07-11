import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import { Modal, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import moment  from 'moment';




export default class AddItem extends Component {
constructor(props){
    super(props);

  
    this.onCancel = this.onCancel.bind(this);
    this.onChnageDate = this.onChnageDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);



    this.state ={
       date:'',
    }
}


componentDidMount(){
    
}


onChnageDate(date){
    this.setState({
        date :date
    });
  }


onCancel(){
    this.setState({
        date:''
    })
    this.props.onHide();
}

onSubmit(){
    const app={
        patient_id:localStorage.getItem('consideredPatint'),
        doctor_id:"60ab706f36062226ec67d528",
        date:this.state.date
    }
    axios.post('http://localhost:5000/appointments/addAppointment', app)
        .then(res=> {
            this.props.onHide();
        })
}


   render(){
       return(
        <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
          <Modal.Header closeButton>
          <Modal.Title>Add Appointment</Modal.Title>
        </Modal.Header>
        <div className="container">

<br/>
<div className="p-3 border bg-light">

        <label for="brand_name" className="form-label">Select Doctor</label>
         <select className="form-control">
         <option>Dr.P.D.R. Deshan</option>
         </select>

<br/>
<label for="brand_name" className="form-label">Date</label><br/>
<DatePicker
            selected={moment().toDate()}
            onChange={this.onChnageDate}
            className="form-control"
            id="date_of_birth"
            minDate={moment().toDate()}
            />

<br/>
<br/>

            <button className="btn btn-secondary" type="button" style={{width: 200}}onClick={this.onCancel}>Cancel</button> 
            <button className="btn btn-primary me-md-2" style={{marginLeft: '20px',width: 200 }} onClick={this.onSubmit}>Add Appointment</button>        
            
</div>
   </div>
</Modal>


       )
   } 
}