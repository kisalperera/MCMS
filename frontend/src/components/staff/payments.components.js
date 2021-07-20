import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import { Modal, Button } from "react-bootstrap";
import swal from '@sweetalert/with-react';




export default class AddPayment extends Component {
constructor(props){
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeSalary = this.onChangeSalary.bind(this);

    this.state ={
      
        salary:"",
        staff_id:"",
        name:'',
        role:''
    }
}


onChangeSalary(e){
    this.setState({
        salary :e.target.value
    });
}

componentWillReceiveProps(){
    this.setState({
        staff_id:localStorage.getItem("payID"),
        salary:localStorage.getItem("paySalary"),
        name:localStorage.getItem("payName"),
        role:localStorage.getItem("payRole"),

    });
}

onSubmit(e){
const pay={
    date:new Date(),
    staff_id:this.state.staff_id,
    amount:this.state.salary
}
axios.post('http://localhost:5000/staffs/addPay', pay)
    .then(res=> {this.props.onHide()})
    
}

   render(){
       return(
        <Modal
        {...this.props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
          <Modal.Header closeButton>
          <Modal.Title>Payments </Modal.Title>
        </Modal.Header>
<div className="container">


<div className="p-3 border bg-light">

<h5>{this.state.role} - {this.state.name}</h5>
<br/>




<label for="staff_name" className="form-label">Enter Amount</label>
<input type="text" className="form-control" value={this.state.salary} onChange={this.onChangeSalary}></input>
<br/>

<button className="btn btn-secondary" type="button" style={{width: 200}}onClick={()=>this.props.onHide()}>Cancel</button> 


<button type="submit" className="btn btn-success me-md-2" style={{marginLeft: '20px',width: 200 }} onClick={this.onSubmit} >Confirm</button>

</div>      
   </div>
</Modal>
       )
   } 
}