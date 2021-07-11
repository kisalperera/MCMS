import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import AddConsultModal from "./addConsultation.components";
import ViewConsultModal from "./showConsultation.components";

const ConsultationCard = (props) => {
  const  consultation  = props.consultation;   

  return(
    <div className="card" name="consultcard" style={{width:800,height:60,marginTop:-20,paddingLeft:0}} onClick={()=>{props.viewModal(consultation._id)}}>
        <div className ="card-body" style={{color:'black',marginTop:3}} >
            <div className="row">
              <div className="col-2">
                  <h6 class="card-text">{consultation.consultation_date.substring(0,10)}</h6>
              </div>
              <div className="col-1" style={{marginRight:-10,marginLeft:-10}}>
                  |
              </div><div className="col-2">
                  <h6 class="card-text">{consultation.diagnosis }</h6>
              </div>
              <div className="col-1"style={{marginRight:-10,marginLeft:-10}}>
                  |
              </div>
              <div className="col-2">
                  <h6 class="card-text">{consultation.other_exam }</h6>
              </div>
              <div className="col-1"style={{marginRight:-10,marginLeft:-10}}>
                  |
              </div>
              <div className="col-2"style={{paddingRight:0,paddingLeft:0}}>
                  <h6 class="card-text">{consultation.consult_doctor }</h6>
              </div>


          </div>
                         
        </div>
    </div>
  )
};

class ShowConsultationList extends Component {
  constructor(props) {
    super(props);
    this.viewModal =this.viewModal.bind(this);
    this.consultModal =this.consultModal.bind(this);


    this.state = {
      consultations: [],
      val:'',
      addModalShow:false,
      viewModal:false,
      patient:[],
      age_now:0
    };
  }

  consultModal(){
    this.setState({addModalShow:true})
}

viewModal(id){
  localStorage.setItem('thisConsultation',id);
  this.setState({viewModal:true})
}


componentDidMount() {
  axios.get('http://localhost:5000/patients/getPatientByID/'+this.props.match.params.id)
  .then(response=> {
    this.setState({
        patient:response.data
    })
    var today = new Date();
    var birthDate = new Date(this.state.patient.date_of_birth); 
    this.setState({
      age_now: Number(today.getFullYear()) - Number(birthDate.getFullYear())
})

  })
  .catch(err=>{
    console.log(err);
  })



    axios
      .get('http://localhost:5000/consultations/getConsultationByID/'+this.props.match.params.id)
      .then(res => {
        this.setState({
          consultations: res.data
        })
      })
      .catch(err =>{
        console.log('Error from ShowConsultationList');
      })

      let patient=this.props.match.params.id;
  localStorage.setItem('Patient',patient);
  };


  render() {

    let addModalClose=()=>{
      this.setState({addModalShow:false})
      // this.props.reset();
      window.location.reload();
      

    };
    let viewModalClose=()=>{
      this.setState({viewModal:false}) 
      localStorage.setItem('thisConsultation',0);
      window.location.reload();      

   };


    const consultations = this.state.consultations;
    console.log("PrintBook: " + consultations);
    let consultationList;

    if(!consultations) {
      consultationList = "there is no staff record!";
    } else {
      consultationList = consultations.map((consultation, k) =>
        <ConsultationCard consultation={consultation} viewModal={this.viewModal} key={k} />
      );
    }

    return (
<div>
        <div className="row -md-6">
         <div className="col-10"> </div>

        <div className="col"><button type="button" className="btn btn-primary"  onClick={()=>{this.consultModal()}}>Add Consultation</button>
      <AddConsultModal
         show={this.state.addModalShow}
         onHide={addModalClose}

         />
         <ViewConsultModal
         show={this.state.viewModal}
         onHide={viewModalClose}
         />
    </div>

       </div>

       <div className="row  p-3 border bg-light" style={{marginTop:10}}>
<div className="col" style={{marginTop:30}}>
<div className="ShowConsultationList">
        <div className="container">

          <div className="listConsultation">
                {consultationList}
          </div>
        </div>
      </div>
</div>


<div className="col" style={{marginTop:20,fontSize:17,marginLeft:30}}>
<br/>

<h4>{this.state.patient.patient_name}</h4><br/>
Gender:
<h5>{this.state.patient.gender}</h5>
Age:
<h5>{this.state.age_now}</h5>
Marital Status:
<h5>{this.state.patient.marital_status}</h5>
Occupation:
<h5>{this.state.patient.occupation}</h5>



</div>


</div>

      </div>
    );
  }
}

export default ShowConsultationList;