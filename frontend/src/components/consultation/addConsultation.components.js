import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import axios from 'axios';
import DatePicker from "react-datepicker";
import moment  from 'moment';
import swal from '@sweetalert/with-react';


export default class addconsult extends Component {
constructor(props){
    super(props);

    this.onChangeComplaint =this.onChangeComplaint.bind(this);
    this.onChangeComplaintDuration =this.onChangeComplaintDuration.bind(this);
    this.onChangePulse =this.onChangePulse.bind(this);
    this.onChangeBloodPressureMM =this.onChangeBloodPressureMM.bind(this);
    this.onChangeBloodPressureHG =this.onChangeBloodPressureHG.bind(this);
    this.onChangeHeartSound =this.onChangeHeartSound.bind(this);
    this.onChangeMarmers =this.onChangeMarmers.bind(this);
    this.onChangeAirEntry =this.onChangeAirEntry.bind(this);
    this.onChangeCrepitation =this.onChangeCrepitation.bind(this);
    this.onChangeRonchi =this.onChangeRonchi.bind(this);
    this.onChangeOtherExam =this.onChangeOtherExam.bind(this);
    this.onChangeDiagnosis =this.onChangeDiagnosis.bind(this);
    this.onChangeConsultationCharge =this.onChangeConsultationCharge.bind(this);
    this.onChangeNextVisit =this.onChangeNextVisit.bind(this);
    this.onChangeTreatmentItem =this.onChangeTreatmentItem.bind(this);
    this.onChangeTreatmentDose =this.onChangeTreatmentDose.bind(this);
    this.onChangeTreatmentDu = this.onChangeTreatmentDu.bind(this);
    this.onChangeTimes = this.onChangeTimes.bind(this);
    this.onChangeCheck = this.onChangeCheck.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.addRow = this.addRow.bind(this);
    this.suggest = this.suggest.bind(this);
    this.itemonblur = this.itemonblur.bind(this);
    this.checkAllergy = this.checkAllergy.bind(this);



    this.state ={

      item_type:'⮟',

      internalP:[],
      internalPSize:0,
      externalP:[],
      externalPSize:0,
      options:[],
      dose:'',
      times:0,
      checkPrice:0,
      treatment_item:'',
      length:'',
      items:[],
      consideringItem:[],
        consult_id:'',
        patinet_id:'',
        complaint:'',
        complaint_duration:'',
        pulse:0,
        blood_pressuremm:'',
        blood_pressureHg:'',
        heart_sound:'',
        mamers:'',
        air_entry:'',
        crepitation:'false',
        ronchi:'false',
        other_exam:'',
        diagnosis:'',
        investigations:'',
        consultation_charge:'',
        consultation_date:'',
        next_visit:'',
        treatment_du:0,
        checkitems:[]
    }
}


onChangeCheck(e){
  var item=""
  item = this.state.checkitems.filter(el=>el==e.target.value);

  if(item==""){
      this.setState({
          checkitems: this.state.checkitems.concat(e.target.value)
        },()=>{console.log(this.state.checkitems)})
  }
  else{
      this.setState({
          checkitems: this.state.checkitems.filter(el=>el!=e.target.value)
        },()=>{console.log(this.state.checkitems)})
  }

  console.log(this.state.checkitems)
}

checkAllergy(){

}

onChangeTimes(e){
if(e.target.value=="EOD"){this.setState({times:Number(1/2)})}
if(e.target.value=="Manne"||e.target.value=="Noctay"||e.target.value=="Daily"){this.setState({times:Number(1)})}
if(e.target.value=="BD"){this.setState({times:Number(2)})}
if(e.target.value=="TDS"){this.setState({times:Number(3)})}
if(e.target.value=="6 Hourly"){this.setState({times:Number(4)})}
}

itemonblur(){
  const checkallergy={
    allergy_item:this.state.treatment_item
  }
  axios.post('http://localhost:5000/allergy/checkallergy/'+localStorage.getItem("thisPatient"),checkallergy)
      .then(response => { 
        if(response.data==1 ){
          swal("Drug Allergy Alert!", "Patient is allergic to this item", "warning");
          this.setState({
            treatment_item:""
          })
        }
        else{

          const item={
            item_name:this.state.treatment_item
          }
        
          axios.post('http://localhost:5000/inventoryItems/Check',item)
            .then(response => {
              if(response.data=="Pill"||response.data=="cream")this.setState({item_type:'mg'})
              if(response.data=="Syrup")this.setState({item_type:'ml'})
            })
        
          axios.post('http://localhost:5000/inventoryDoses/getItemDose',item)
            .then(response => {
             this.setState({
               options:response.data
             })
            })
        }
      })


  

}

onChangeTreatmentDu(e){
  let amount = parseFloat(e.target.value);
  if (isNaN(amount) || amount < 0) {amount = 0;}
  this.setState({treatment_du: amount});

}

onChangeTreatmentDose(e){
  this.setState({
    dose:e.target.value
  })
}

onChangeTreatmentItem(e){
  this.setState({
    treatment_item :e.target.value
});
}

onChangeNextVisit(date){
  this.setState({
      next_visit :date
  });
}
onChangeConsultationCharge(e){
  localStorage.setItem("test",6);

  let amount = parseFloat(e.target.value);
  if (isNaN(amount) || amount < 0) {amount = 0;}
  this.setState({consultation_charge: amount});

}
onChangeDiagnosis(e){
  this.setState({
      diagnosis :e.target.value
  });
}
onChangeOtherExam(e){
  this.setState({
      other_exam :e.target.value
  });
}
onChangeRonchi=e=>{
  this.setState({
      ronchi :e.target.value
  });
}
onChangeCrepitation=e=>{
  this.setState({
      crepitation :e.target.value
  });
}
onChangeAirEntry(e){
  this.setState({
      air_entry :e.target.value
  });
}
onChangeMarmers(e){
  this.setState({
      marmers :e.target.value
  });
}
onChangeHeartSound(e){
  this.setState({
      heart_sound :e.target.value
  });
}
onChangeBloodPressureMM(e){
  let amount = parseFloat(e.target.value);
  if (isNaN(amount) || amount < 0) {amount = 0;}
  this.setState({blood_pressure_mm: amount});
}
onChangeBloodPressureHG(e){
  let amount = parseFloat(e.target.value);
  if (isNaN(amount) || amount < 0) {amount = 0;}
  this.setState({blood_pressure_hg: amount});
}
onChangePulse(e){
  let amount = parseFloat(e.target.value);

  if (isNaN(amount) || amount < 0) {
      amount = 0;
  }

  this.setState({pulse: amount});

}
onChangeComplaint(e){
  localStorage.setItem("test",5);

    this.setState({
      complaint :e.target.value
    });    
}
onChangeComplaintDuration(e){
  let amount = parseFloat(e.target.value);
  if (isNaN(amount) || amount < 0) {amount = 0;}
  this.setState({complaint_duration: amount});
}

addRow()
   {
    var input_1 = document.getElementById('treatment_item');
    var input_2 = document.getElementById('table_freq');
    var input_3 = document.getElementById('treat_dose');
    var input_4 = document.getElementById('treat_duration');

    var temp_row = document.createElement('tr');
    var table_data_1 = temp_row.appendChild(document.createElement('td'))
    var table_data_2 = temp_row.appendChild(document.createElement('td'))
    var table_data_3 = temp_row.appendChild(document.createElement('td'))
    var table_data_4 = temp_row.appendChild(document.createElement('td'))

    table_data_1.innerHTML = input_1.value;
    table_data_2.innerHTML = input_2.value;
    table_data_3.innerHTML = input_3.value;
    table_data_4.innerHTML = input_4.value+" Day(s)";

    const check={
      item_name:this.state.treatment_item
    }
    axios.post('http://localhost:5000/inventoryItems/getItem',check)
         .then(res=> {
           this.setState({
             consideringItem:res.data
           })
          if(res.data.item_name==this.state.treatment_item){

            axios.post('http://localhost:5000/stocks/getstockunits',check)
              .then(res1=> {
                console.log(this.state.consideringItem.strength);
                console.log(this.state.consideringItem.selling_price);
                
                var x=parseFloat(this.state.dose)/parseFloat(this.state.consideringItem.strength)*Number(this.state.times)*Number(this.state.treatment_du);
                var price=parseFloat(x)*Number(this.state.consideringItem.selling_price);
                console.log(x);
                console.log(price);
                
                if(x<res1.data){
                  document.getElementById('table1').appendChild(temp_row);
                  this.setState({
                    internalP: [...this.state.internalP, ...[
                         {itemName:table_data_1.innerHTML, 
                          frequency:table_data_2.innerHTML,
                          dose:table_data_3.innerHTML,
                          duration:table_data_4.innerHTML,
                          price:price,
                        }] 
                        ] ,
                      internalPSize:Number(this.state.internalPSize) +Number(1)
                      },()=>{input_1.value="";
                      input_2.value="";
                      input_3.value="";
                      input_4.value="";}
                      )
                }
                else{
                  document.getElementById('table2').appendChild(temp_row);
                  this.setState({
                    externalP: [...this.state.externalP, ...[
                         {itemName:table_data_1.innerHTML, 
                          frequency:table_data_2.innerHTML,
                          dose:table_data_3.innerHTML,
                          duration:table_data_4.innerHTML,
                          price:price,
                        }] 
                        ] ,
                    externalPSize:Number(this.state.externalPSize) +Number(1)
                      },()=>{input_1.value="";
                      input_2.value="";
                      input_3.value="";
                      input_4.value="";})
                }
              })                     
          }
          
         
        })
        .catch(err=>{alert("Invalid Item!");
        input_1.value="";
          input_2.value="";
          input_3.value="";
          input_4.value="";
      })


}

suggest(){
     
    axios.get('http://localhost:5000/inventoryItems/')
    .then(response => {                                                                       
        this.setState({
          items: response.data
        })
        axios.get('http://localhost:5000/inventoryItems/itemlength')
         .then(res=> {
          this.setState({
            length: res.data
          })
          for(var i=0;i<this.state.length;i++){
            let x = "option" + i;
            x = document.createElement('option');
            x.innerHTML = this.state.items[i].item_name;      
            document.getElementById('datalistOptions').appendChild(x);
          }

        })
        .catch((error) =>{
          console.log(error);})
      })
    .catch((error) =>{
        console.log(error);})

}

onSubmit(e){
  e.preventDefault();

  const consultation ={
    patient_id:localStorage.getItem("thisPatient"),
    consultation_date:Date().toLocaleString(),
    complaint: this.state.complaint,
    complaint_duration:this.state.complaint_duration+" "+document.getElementById("complaint_duration_type").value,
    pulse:this.state.pulse,
    blood_pressure:this.state.blood_pressure_mm+" / "+this.state.blood_pressure_hg,
    heart_sound:this.state.heart_sound,
    marmers: this.state.marmers,
    air_entry:this.state.air_entry,
    crepitation:this.state.crepitation,
    ronchi:this.state.ronchi,
    other_exam:this.state.other_exam,
    diagnosis:this.state.diagnosis,
    investigations:"No investigations",
    consultation_charge:this.state.consultation_charge,
    next_vist: this.state.next_visit,
    consult_doctor:"Dr."+localStorage.getItem("staff_name")
  }
axios.post('http://localhost:5000/consultations/addCounsultation', consultation)
.then(res=>{
  this.setState({
    consult_id:res.data._id
  })
  if(this.state.internalPSize>0){
    const pres={
      consultation_id: res.data._id
    }
    axios.post('http://localhost:5000/prescriptions/addPrescription', pres)
    .then(response=> {
      for(let j=0;j<this.state.internalPSize;j++){
        const InPres={
          prescription_id:response.data,
          inventoryItem_name:this.state.internalP[j].itemName,
          frequency:this.state.internalP[j].frequency,   
          dose:this.state.internalP[j].dose,
          duration:this.state.internalP[j].duration,
          price:this.state.internalP[j].price
        }
        axios.post('http://localhost:5000/prescriptionItems/addPrescriptionItems', InPres)
        .then(resp=> console.log(resp.data));
      }
    });
  } 

  if(this.state.externalPSize>0){
    const pres={
      consultation_id: res.data._id
    }
    axios.post('http://localhost:5000/externalPrescriptions/addExternalPrescription', pres)
    .then(response1=> {
      for(let j=0;j<this.state.externalPSize;j++){
        const ExPres={
          externalPrescription_id:response1.data,
          inventoryItem_name:this.state.externalP[j].itemName,
          frequency:this.state.externalP[j].frequency,   
          dose:this.state.externalP[j].dose,
          duration:this.state.externalP[j].duration,
          price:this.state.externalP[j].price
        }
        console.log(ExPres);
        axios.post('http://localhost:5000/externalPrescriptionItems/addExternalPrescriptionItems', ExPres)
        .then(resp1=> console.log(resp1.data));
      }
    });
  } 
})
.then(
  this.props.onHide()
)
}

onCancel(){
  this.props.onHide();
}

   render(){
    // document.body.addEventListener("click",this.suggest,{once:true});

    const{crepitation}=this.state;
    const{ronchi}=this.state;

    const options=this.state.options;


    return(

      <Modal
        {...this.props}
        aria-labelledby="contained-modal-title-vcenter"
        size="xl"
        centered
        
      >  <Modal.Header closeButton >
      <Modal.Title>Add Consultation</Modal.Title>
    </Modal.Header>
<div className="container">


<div className="p-3 border bg-light">

        
<form onSubmit={this.onSubmit} >
<div className="p-3 border bg-light">
<div className="row row-cols-2" >

<div className="col"> 
<label for="complaint" className="form-label">Complaint</label>
<input type="text" list="complaintlist" className="form-control" id="complaint" value ={this.state.complaint} onChange={this.onChangeComplaint} style={{height:70}}></input>
<datalist id="complaintlist"  >
  <option>Fever</option>
  <option>Cough</option>
  <option>Headache</option>
  <option>Disuria</option>
  <option>Vomiting</option>
  <option>Diarrhea</option>
  <option>Loss of appetite</option>
  <option>Back ache</option>
  <option>Constipation</option>
  <option>Joint pain</option>
  <option>Chest pain</option>


</datalist></div>

<div className="col"> 
<label for="duration" className="form-label"style={{marginLeft:150}}>Duration</label>
<div className="row row-cols-2" style={{marginTop:10}}>
<div className="col"> 
<input type="text" className="form-control" id="duration" value ={this.state.complaint_duration} onChange={this.onChangeComplaintDuration}style={{width:100, marginLeft:150}}></input>
</div>
<div className="col"> 
<select className="form-control" aria-label=".form-select-lg example" id="complaint_duration_type" style={{width:100}}>
            <option value="" disable selected hidden> </option>
            <option >Days</option>
            <option >Weeks</option>
            <option >Months</option>
            </select>
</div>
</div>
</div>



</div>
</div>

{/*second section*/}
<br/>


<div className="p-3 border bg-light">
<label className="form-label">System Examination</label>

<div className="row" >

<div className="col-3"style={{marginLeft:20}} >
<label for="duration" className="form-label">Pulse</label>
<div className="row row-cols-2" >
<div className="col">
<input type="text" className="form-control" id="duration" value ={this.state.pulse} onChange={this.onChangePulse}></input>
</div>
<div className="col">
<label className="form-label"style={{width:10, marginTop:7}}>BPM</label>
</div>
</div>
</div>

<div className="col">
<label for="blood_pressure" className="form-label">Blood Pressure</label>
<div className="row " >
<div className="col-2">
<input type="text" className="form-control" id="blood_pressure_mm" style={{width:60}} value ={this.state.blood_pressure_mm} onChange={this.onChangeBloodPressureMM}></input>
</div>
<div className="col-1"style={{marginRight:-10}}>
<label className="form-label" style={{fontSize:30,marginTop:-7,marginLeft:3}} >/</label>
</div>
<div className="col-2">
<input type="text" className="form-control" id="blood_pressure_hg" style={{width:60}}value ={this.state.blood_pressure_hg} onChange={this.onChangeBloodPressureHG}></input>
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
<select className="form-control" aria-label=".form-select-lg example" id="heart_sound" value ={this.state.heart_sound} onChange={this.onChangeHeartSound} style={{width:140}}>
<option value="" disable selected hidden> </option>
            <option >Normal</option>
            <option >Abnormal</option>
            </select>
</div>
<div className="col" style={{marginTop:-33}}>
<label for="marmers" className="form-label">Marmers</label>
<select className="form-control" aria-label=".form-select-lg example" id="marmers" value ={this.state.marmers} onChange={this.onChangeMarmers} style={{width:140}}>
<option value="" disable selected hidden> </option>
 <option >No-Marmers</option>
            <option >Marmers</option>
            </select>
</div>
</div>
     
</div>

</div>    
</div>

{/*third section*/}
<br/>

<div className="p-3 border bg-light">
<label className="form-label" >Respiratory Examination</label>

<div className="row" >

<div className="col-3"style={{marginLeft:20}} >
<label for="air_entry" className="form-label">Air Entry</label>
<select className="form-control" aria-label=".form-select-lg example" id="air_entry" value ={this.state.air_entry} onChange={this.onChangeAirEntry} style={{width:140}}>
<option value="" disable selected hidden> </option>
<option >Equal</option>
            <option >Left-Low</option>
            <option >Right-Low</option>
            </select>
</div>

<div className="col" style={{marginLeft:0}}>
<label for="crepitation" className="form-label">Crepitation</label><br/>
<div className="form-check form-check-inline" style={{marginTop: '7px'}} >
            <input className="form-check-input" type="radio" name="crepitationRadio" id="crepitation1" value="true" checked={crepitation==="true"} onChange={this.onChangeCrepitation}/>
            <label className="form-check-label" for="crepitation1">Yes</label>
            </div>
            <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio"  name="crepitationRadio" id="crepitation2" value="false" checked={crepitation==="false"} onChange={this.onChangeCrepitation}/>
            <label className="form-check-label" for="crepitation2">No</label>
            </div>
</div>

<div className="col" style={{marginLeft:-400}}>
<label className="form-label">Ronchi</label><br/>
<div className="form-check form-check-inline" style={{marginTop: '7px'}} >
            <input className="form-check-input" type="radio" name="ronchiRadio" id="ronchi1" value="true" checked={ronchi==="true"} onChange={this.onChangeRonchi} />
            <label className="form-check-label" for="ronchi1">Yes</label>
            </div>
            <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio"  name="ronchiRadio" id="ronchi2" value="false" checked={ronchi==="false"} onChange={this.onChangeRonchi}/>
            <label className="form-check-label" for="ronchi2">No</label>
            </div>
</div>

</div>    
</div>
<br/>

<label for="other_exam" className="form-label">Other Examinations</label>
<textarea style={{height:70}} className="form-control" id="other_exam" value ={this.state.other_exam} onChange={this.onChangeOtherExam}  ></textarea>
<br/>
<label for="diagnosis" className="form-label" >Diagnosis</label>
<input type="text" style={{height:70}} list="thisdiagnosis" id="diag" className="form-control" id="diagnosis" onClick={this.suggest} value ={this.state.diagnosis} onChange={this.onChangeDiagnosis}  ></input>
<datalist id="thisdiagnosis" >
  <option>Viral Fever</option>
  <option>Gastroentraritis</option>
  <option>Chronic Headache</option>
  <option>Artharitis</option>
  <option>Hypertension</option>
  <option>Asthma</option>
  <option>Diabitis Mallitus</option>
  <option>Eczeema</option>
  <option>Psorisis</option>
  <option>Chicken Pox</option>
  <option>Congunctivities</option>
</datalist>

{/*4th section investigatons*/}
<br/>

<div className="p-3 border bg-light">
<label className="form-label" >Invrestigations</label>
<br/>

  <input class="form-check-input" style={{zoom:1.7}} type="checkbox" onChange={this.onChangeCheck} value="FBC" id="FBC"/>
  <label class="form-check-label" for="FBC" style={{marginRight:15,marginTop:7}}>
FBC  </label>

<input class="form-check-input" style={{zoom:1.7}}type="checkbox" onChange={this.onChangeCheck} value="Liver Profile" id="FBS"/>
  <label class="form-check-label" for="FBS"style={{marginRight:15,marginTop:7}}>
Liver Profile  </label>

<input class="form-check-input"style={{zoom:1.7,marginLeft:1}} type="checkbox" onChange={this.onChangeCheck}  value="BU" id="BU"/>
  <label class="form-check-label" for="BU"style={{marginRight:15,marginTop:7}}>
BU  </label>

<input class="form-check-input" style={{zoom:1.7,marginLeft:5}}type="checkbox" onChange={this.onChangeCheck}  value="CRP" id="CRp"/>
  <label class="form-check-label" for="CRp"style={{marginRight:15,marginTop:7}}>
CRP  </label>

<input class="form-check-input" style={{zoom:1.7}} type="checkbox" onChange={this.onChangeCheck}   value="Scr" id="Scr"/>
  <label class="form-check-label" for="Scr" style={{marginRight:15,marginTop:7}}>
Scr  </label>

<input class="form-check-input" style={{zoom:1.7,marginLeft:3}}type="checkbox" onChange={this.onChangeCheck}  value="FBS" id="FBS"/>
  <label class="form-check-label" for="FBS"style={{marginRight:15,marginTop:7}}>
  FBS  </label>

<br/>

  <input class="form-check-input" style={{zoom:1.7}} type="checkbox" onChange={this.onChangeCheck}   value="SE" id="SE"/>
  <label class="form-check-label" for="SE" style={{marginRight:15,marginTop:7}}>
SE  </label>

<input class="form-check-input" style={{zoom:1.7,marginLeft:6}}type="checkbox" onChange={this.onChangeCheck}  value="lipid profile" id="lipid_profile"/>
  <label class="form-check-label" for="lipid_profile"style={{marginRight:15,marginTop:7}}>
Lipid Profile  </label>

<input class="form-check-input"style={{zoom:1.7}} type="checkbox" onChange={this.onChangeCheck}  value="TSH" id="TSH"/>
  <label class="form-check-label" for="TSH"style={{marginRight:15,marginTop:7}}>
TSH  </label>

<input class="form-check-input" style={{zoom:1.7,marginLeft:1}}type="checkbox" onChange={this.onChangeCheck}  value="ESR" id="ESR"/>
  <label class="form-check-label" for="ESR"style={{marginRight:15,marginTop:7}}>
ESR  </label>

<input class="form-check-input"style={{zoom:1.7,marginLeft:1}} type="checkbox" onChange={this.onChangeCheck}  value="CXR" id="CXR"/>
  <label class="form-check-label" for="CXR"style={{marginRight:15,marginTop:7}}>
CXR  </label>

<input class="form-check-input" style={{zoom:1.7}}type="checkbox" onChange={this.onChangeCheck}  value="X-RAY" id="X-RAY"/>
  <label class="form-check-label" for="X-RAY"style={{marginRight:15,marginTop:7}}>
X-RAY  </label>


<br/>
<br/>
<label class="form-check-label" for="other_investigation"style={{marginRight:15}}>Other Investigations</label>
<textarea style={{height:40,width:500}}class="form-control" id="other_investigation"></textarea>

</div>      
<br/>

{/*treatment section*/}

<div className="p-3 border bg-light">
<label className="form-label" >Treatment</label>
<br/>
<div className="row">
<div className="col-15">

<div className="row">
<label for="table_item" className="form-label">Item</label>
<input type="text" className="form-control" id="treatment_item" list="datalistOptions" onBlur={this.itemonblur} value ={this.state.treatment_item} onChange={this.onChangeTreatmentItem} style={{marginLeft:10,width:600}}></input>
<datalist id="datalistOptions" >
</datalist>



</div>
<br/>

<div className="row">
<div className="col-2" style={{marginRight:20}}>
<label for="table_freq" className="form-label">Frequency</label>
<select className="form-control" aria-label=".form-select-lg example" id="table_freq" onChange={this.onChangeTimes}>
<option selected>TDS</option>
            <option >BD</option>
            <option >6 Hourly</option>
            <option selected>Manne</option>
            <option >Noctay</option>
            <option >Daily</option>
            <option >EOD</option>

            </select>
</div>
<div className="col-3">
<label for="dose" className="form-label">Dose</label>


<div className="col-8">
<div class="input-group mb-3" >
<select id="treat_dose" className="form-control" aria-label=".form-select-lg example" value={this.state.dose} onChange={this.onChangeTreatmentDose}>{
  this.state.options.map(item=>{
    return<option>{item}</option>
  })
}
</select>
<div class="input-group-prepend"><span class="input-group-text" id="basic-addon1">{this.state.item_type}</span></div>
</div>
</div>


</div>

<div className="col-2" style={{marginLeft:-20}} >
<label for="treatment_duration" className="form-label">Duration</label>

<div className="row">

<div className="col-9" style={{marginRight:-20}}>
<input type="text" className="form-control" id="treat_duration" value={this.state.treatment_du} onChange={this.onChangeTreatmentDu} ></input>
</div>

<div className="col-2">
<label  className="form-label" style={{marginTop:7}}>days</label>
</div>

</div>

</div>

</div>
</div>


<div className="col" style={{marginLeft: -400, marginTop:55}}>

<button className="btn btn-success" type="button" style={{height: 80, width:80}} onClick={this.addRow}>Add Item</button> 

</div>

</div>
<br/>
<table id="table1" className="table"><h6>Internal Prescription</h6><thead></thead><tbody></tbody></table>
<br/>
<table id="table2" className="table"><h6>External Prescription</h6><thead></thead><tbody></tbody></table>

</div>

<br/>

<div className="row">
<div className="col-3"style={{marginRight:30}}>
<label for="consult_charge" className="form-label">Consultation Charge</label>
<input type="text" className="form-control" id="item" value ={this.state.consultation_charge} onChange={this.onChangeConsultationCharge} ></input>
</div>

<div className="col-3" >
<label for="consult_charge" className="form-label">Next Visit</label>
<DatePicker
            selected={this.state.next_visit}
            onChange={this.onChangeNextVisit}
            className="form-control"
            id="date_of_birth"
            minDate={moment().toDate()}
            />  

</div>
</div>


{/*submit section*/}

            <br/>
           
            <button className="btn btn-secondary" type="button" style={{width: 200}}onClick={this.onCancel}>Cancel</button> 


            <button type="submit" className="btn btn-primary me-md-2" style={{marginLeft: '20px',width: 200 }} >Add Consultation</button>
                   
            
    </form>  
     </div>
   </div>
   </Modal>
       )
   } 
}



