import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../App.css';
import AddStaff from "./addStaff.components";
import "bootstrap/dist/css/bootstrap.min.css";


const StaffCard = (props) => {
  const  staff  = props.staff;   

  return(
      <div className="card bg-light">
          <img src="./images/user.png" class="card-img-top" ></img>
          <div className ="card-body" style={{color:'black'}} >
          <h5 class="card-title">{staff.staff_name}</h5>
              <h6 class="card-text">Role: {staff.staff_role }</h6>
              <h6 class="card-text">Username: {staff.staff_username}</h6>
              
<div className="row row-col-2"style={{marginTop:10}}>

  <div className="col"><button className="btn btn-success" style={{width:90}}>Edit</button></div>
  <div className="col"><button className="btn btn-danger" style={{width:90}} 
  onClick={()=>{props.deleteStaff(staff._id)}}>
      Delete</button></div>
  
</div>
             
          </div>
      </div>
  )
};


class ShowStaffList extends Component {
  constructor(props) {
    super(props);
    
    this.deleteStaff = this.deleteStaff.bind(this);

    this.state = {
      staffs: [],
      addModalShow:false,

    };
  }

deleteStaff(id){
    axios.delete('http://localhost:5000/staffs/deleteStaffByID/'+id)
    .then(res => console.log(res.data));

    this.setState({
        staffs: this.state.staffs.filter(el=>el._id!==id)
    })
}

  componentDidMount() {
    axios
      .get('http://localhost:5000/staffs/getStaff')
      .then(res => {
        this.setState({
          staffs: res.data
        })
      })
      .catch(err =>{
        console.log('Error from ShowStaffList');
      })
  };


  render() {

    let addModalClose=()=>{this.setState({addModalShow:false});
    }

    const staffs = this.state.staffs;
    console.log("PrintBook: " + staffs);
    let staffList;

    if(!staffs) {
      staffList = "there is no staff record!";
    } else {
      staffList = staffs.map((staff, k) =>
        <StaffCard staff={staff} deleteStaff={this.deleteStaff} key={k} />
      );
    }

    return (
<div>
        <div className="row -md-6">
        {/* <div className="col"><button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#example">Modal</button></div> */}
         <div className="col-10"><input className="form-control me-2" type="search" placeholder="Search Staff" aria-label="Search"  /> </div>

        <div className="col"><button type="button" className="btn btn-primary"  onClick={()=>{this.setState({addModalShow:true})}}>Add Staff</button>
      <AddStaff
         show={this.state.addModalShow}
         onHide={addModalClose}
         />
    </div>

       </div>

      <div className="ShowStaffList">
        <div className="container">

          <div className="list">
                {staffList}
          </div>
        </div>
      </div>

<div className="modal" id="example" tabindex="-1"  role="dialog"   aria-labelledby="myModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      haiyoooo
    </div>
  </div>
</div>

      </div>
    );
  }
}

export default ShowStaffList;