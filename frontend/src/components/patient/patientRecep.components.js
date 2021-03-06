import { Component } from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import swal from '@sweetalert/with-react';
import AssignNumber from "./assignNumber.components";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import AddAppointment from './appointment.components';

let nextNumber=1;

function searchPatients(patient) {
    return function (e) {
    return e.patient_name.toLowerCase().includes(patient.toLowerCase()) ||!patient;      
    }
  }

const Patient = props=>(
    <tr>
        {/* <td>{props.patient.patient_id}</td> */}
        <td>{props.patient.patient_name}</td>
        <td>{props.patient.date_of_birth.substring(0,10)}</td>
        <td>{props.patient.gender}</td>
        <td>{props.patient.patient_phone}</td>
        
        <td>         
        <button type="button" class="btn btn-success" style={{width: 70}} onClick={(e) => {
        e.preventDefault();
        window.location="/editPatient/"+props.patient._id;
        
        }}>Edit</button>
             |
         <button type="button" class="btn btn-primary" style={{width: 70}} onClick={()=>{props.assignNumber(props.patient._id)}} >Assign</button>
        {/* <button type="button" class="btn btn-primary" style={{width: 70}} onClick={()=>{props.assignNumber(props.patient._id)}}>Assign</button>   */}
        |         <button type="button" class="btn btn-warning" style={{width: 150}} onClick={()=>{props.appointment(props.patient._id)}} >Appointment</button>
</td>                                                            
    </tr>
)

export default class Patients extends Component {
    constructor(props){
        super(props);
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.assignNumber = this.assignNumber.bind(this);
        this.appointment = this.appointment.bind(this);

        this.state ={
            deps:[],
            addModalShow:false,
            patients:[],
            search:"",
            appModal:false,

        };
    }

onChangeSearch(e) {
    this.setState({
  search: e.target.value
    });
}
appointment(id){
    localStorage.setItem('consideredPatint',id);
this.setState({appModal:true})
}    

componentDidMount(){
axios.get('http://localhost:5000/patients/getPatient')
.then(response => {                                                                            
    this.setState({patients: response.data})
})
.catch((error) =>{
    console.log(error);
})

console.log(this.state.patients.length)

}

assignNumber(id){

    axios.get('http://localhost:5000/patients/getPatientByID/'+id)
    .then(response => {  
        if(response.data.assigned_number==0){
            this.setState({addModalShow:true})
        }
        else{    swal("Already Assigned!", "Want to assign a different Number", "warning",{
            buttons: {
                Yes: {value:"Yes"},
                No: {value: "No" }
              }
        })
        .then((value) => {
            switch (value) {
           
              case "Yes":
                this.setState({addModalShow:true})

                break;
           
              case "No":
                break;
           
              
            }
          });
    }
       })   

localStorage.setItem('consideredPatint',id);
    
}

patientList(){
    return this.state.patients.filter(searchPatients(this.state.search)).map(currentpatient =>{
        return<Patient patient={currentpatient} appointment={this.appointment}
        assignNumber={this.assignNumber} key={currentpatient._id}/>;
    })
}

   render(){
    const {deps}=this.state;
    let addModalClose=()=>{this.setState({addModalShow:false});
window.location.reload();
}
let appClose=()=>{this.setState({appModal:false});
}

    
       return(           
       <div>
           <div className="row -md-6">

         <div className="col-10"><input className="form-control me-2" type="search" placeholder="Search Patient" aria-label="Search" 
         onChange={this.onChangeSearch} value={this.state.search}  /> </div>
        

        <div className="col"><button type="button" className="btn btn-primary"  onClick={(e) => {
      e.preventDefault();
      window.location='/addPatient';
      }}>Add Patient</button>
    </div>

       </div>
      
<br/>
< div className="p-3 border bg-light"  >
    <div style={{margingLeft:400}}>
           <Table  >
               <TableHead>
                   <TableRow>
                       {/* <th>Patient ID</th> */}
                       <TableCell>Patient Name</TableCell>
                       <TableCell>Date of Birth</TableCell>
                       <TableCell>Gender</TableCell>
                       <TableCell>Phone No</TableCell>
                       <TableCell>Actions </TableCell>

                   </TableRow>
               </TableHead>
               <br/>
               <TableBody>
                   {this.patientList()} 
               </TableBody>

           </Table></div>
           <AssignNumber
         show={this.state.addModalShow}
         onHide={addModalClose}
         />
         <AddAppointment
         show={this.state.appModal}
         onHide={appClose}
         />
           </div> 
           </div>




       )
   } 
}
