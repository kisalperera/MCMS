import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import PasswordModal from "./resetPassword.components";

export default class AddItem extends Component {
constructor(props){
    super(props);

    this.onChangeStaffUsername =this.onChangeStaffUsername.bind(this);
    this.onChangeStaffName =this.onChangeStaffName.bind(this);
    this.onChangeStaffAddress =this.onChangeStaffAddress.bind(this);
    this.onChangeStaffPhoneNo =this.onChangeStaffPhoneNo.bind(this);
    this.onChangeStaffRole =this.onChangeStaffRole.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.passwordModal = this.passwordModal.bind(this);


    this.state ={
        staff_username:'',
        staff_name:'',
        staff_address:'',
        staff_phone:'',
        staff_password:'',
        staff_role:'',
        passwordModalShow:false,

    }
}

passwordModal(e){
    e.preventDefault();

    this.setState({passwordModalShow:true})
}

componentDidMount(){
    axios.get('http://localhost:5000/staffs/getStaffByID/'+this.props.match.params.id)
    .then(response=> {
        this.setState({
            staff_username:response.data.staff_username,
            staff_name:response.data.staff_name,
            staff_address:response.data.staff_address,
            staff_phone:response.data.staff_phone,
            staff_password:response.data.staff_password,
            staff_role:response.data.staff_role
        })
    })
    .catch(function (error){
        console.log(error);
    })
}
onChangeStaffUsername(e){
    this.setState({
        staff_username :e.target.value
    });
}

onChangeStaffName(e){
    this.setState({
        staff_name :e.target.value
    });
}

onChangeStaffAddress(e){
    this.setState({
        staff_address :e.target.value
    });
}

onChangeStaffPhoneNo(e){
    this.setState({
        staff_phone :e.target.value
    });
}



onChangeStaffRole(e){
    this.setState({
        staff_role :e.target.value
    });
}

onSubmit(e){
    e.preventDefault();

    const staff ={
        staff_username:this.state.staff_username,
        staff_name:this.state.staff_name,
        staff_address:this.state.staff_address,
        staff_phone:this.state.staff_phone,
        // staff_password:this.state.staff_password,
        staff_role:this.state.staff_role

    }

    axios.post('http://localhost:5000/staffs/updateStaffByID/'+this.props.match.params.id, staff)
        .then(res=> {
            if(localStorage.getItem('staff_role')=='Admin'){ window.location='/inventory'}
            if(localStorage.getItem('staff_role')=='Doctor'){ window.location='/patientDr'}
            if(localStorage.getItem('staff_role')=='Receptionist'){ window.location='/patientRc'}
            if(localStorage.getItem('staff_role')=='Dispenser'){ window.location='/issueDrugs'}
        });
        

   

}

onCancel(){
    if(localStorage.getItem('staff_role')=='Admin'){ window.location='/inventory'}
    if(localStorage.getItem('staff_role')=='Doctor'){ window.location='/patientDr'}
    if(localStorage.getItem('staff_role')=='Receptionist'){ window.location='/patientRc'}
    if(localStorage.getItem('staff_role')=='Dispenser'){ window.location='/issueDrugs'}

    }

   render(){
    let passwordModalClose=()=>this.setState({passwordModalShow:false});

       return(
<div className="container">
    <div className="row">
<div className="col-10">
<h4>Account Details:</h4>
</div>

<div className="col">
<div className="mb-3" >
            <button  className="btn btn-warning"  onClick={this.passwordModal}  >Reset Password</button>
            <PasswordModal
            show={this.state.passwordModalShow}
            onHide={passwordModalClose}
            />
            </div>
</div>

    </div>

<br/>

<div className="p-3 border bg-light">

        
<form >
            <div className="mb-3">

            <div className="mb-3">
            <label for="staff_role" className="form-label">Role</label>
            <input type="text" className="form-control" aria-label=".form-select-lg example" id="staff_role" value ={this.state.staff_role} onChange={this.onChangeStaffRole} readOnly>
            </input>
            </div>

            <label for="staff_name" className="form-label">Name</label>
            <input type="text" className="form-control" id="staff_name" value ={this.state.staff_name} onChange={this.onChangeStaffName}></input>
            </div>

            <div className="mb-3">
            <label for="staff_address" className="form-label">Address</label>
            <input type="text" className="form-control" id="staff_address" value ={this.state.staff_address} onChange={this.onChangeStaffAddress}></input>
            </div>

            <div className="mb-3">
            <label for="staff_phone" className="form-label">Phone No</label>
            <input type="text" className="form-control" id="staff_phone" value ={this.state.staff_phone} onChange={this.onChangeStaffPhoneNo}></input>
            </div>

            <div className="mb-3">
            <label for="staff_username" className="form-label">Username</label>
            <input type="text" className="form-control" id="staff_username" value ={this.state.staff_username} onChange={this.onChangeStaffUsername}></input>
            </div>


            

            <br/>
           
            <button className="btn btn-secondary" type="button" style={{width: 200}} onClick={this.onCancel}>Cancel</button> 


            <button onClick={this.onSubmit} className="btn btn-primary me-md-2" style={{marginLeft: '20px',width: 200 }} >Update Account</button>
                   
            
    </form>  
     </div>
   </div>

       )
   } 
}