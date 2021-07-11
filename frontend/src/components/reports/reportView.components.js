import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import { jsPDF } from "jspdf";
import swal from '@sweetalert/with-react';
import DatePicker from "react-datepicker";
import moment  from 'moment';




export default class AddItem extends Component {
constructor(props){
    super(props);

    this.onChangeType =this.onChangeType.bind(this);
    this.onChangeFrom =this.onChangeFrom.bind(this);
    this.onChangeTo =this.onChangeTo.bind(this);
    this.generateReport =this.generateReport.bind(this);


    this.state ={
       type:'',
       from:'',
       to:''

    }
}


generateReport(){
    var doc = new jsPDF('portrait','pt','a4','false');

    doc.setFontSize(5);

doc.html(document.querySelector("#report"),{
    callback:function(pdf){
        pdf.save("in.pdf");
    }
})
}

onChangeType(e) {
    this.setState({
      type: e.target.value
    });
    }
onChangeFrom(date){
        this.setState({
            from :date
        });
      }
onChangeTo(date){
        this.setState({
            to :date
        });
      }



   render(){
       return(

      <div>
<div className="row">
    
<div className="col-3" style={{marginLeft:30}}>
<label className="form-label">Report Type</label>

<select className="form-control" value={this.state.type} onChange={this.onChangeType}>
    <option selected>--Select Report Type--</option>
    <option>Income Report</option>
    <option>Stock Report</option>
</select>
</div>

<div className="col-2" style={{marginLeft:50}}>
    
<label className="form-label">From:</label>
<br/>
<DatePicker
selected={this.state.from}
onChange={this.onChangeFrom}
className="form-control"
maxDate={moment().toDate()}
/> 
</div>

<div className="col-2" style={{marginLeft:50}}>
    
<label className="form-label">To:</label>
<br/>

<DatePicker
selected={this.state.to}
onChange={this.onChangeTo}
className="form-control"
minDate={moment().toDate()}
/>
</div>

<div className="col-1" style={{marginLeft:50,marginTop:15}}>
<button className="btn btn-success"style={{width: 200,height:50}} onClick={this.generateReport}>Generate</button> 
</div>


</div>

<div style={{marginTop:100,marginLeft:400}}>

<div id="report" style={{width:550}}>
this is the test report
<br/>


<table className="table">
    <tr>
        <th>head 1</th>
        <th>head 2</th>

    </tr>
    <tbody>
        <tr>
            <td>1</td>
            <td>2</td>

        </tr>
    </tbody>
</table>
</div>

</div>


</div>     
        )
   } 
}
