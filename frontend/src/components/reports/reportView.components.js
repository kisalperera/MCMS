import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import { jsPDF } from "jspdf";
import swal from '@sweetalert/with-react';
import DatePicker from "react-datepicker";
import moment  from 'moment';
import html2canvas from 'html2canvas';




export default class AddItem extends Component {
constructor(props){
    super(props);

    this.onChangeType =this.onChangeType.bind(this);
    this.onChangeFrom =this.onChangeFrom.bind(this);
    this.onChangeTo =this.onChangeTo.bind(this);
    this.generateReport =this.generateReport.bind(this);


    this.state ={
       type:'Income Report',
       from:'',
       to:'',
       incomehide:''

    }
}


generateReport(){

    html2canvas(document.getElementById('testIframe').contentWindow).then(
        function(canvas) {
            var doc = new jsPDF('portrait','pt','a4','false');

            doc.setFontSize(5);
        // const testIframe= document.getElementById("testIframe")
        // const testIframeWindow=  testIframe.contentWindow; 
        
        doc.html(canvas,{
            callback:function(pdf){
                pdf.save("in.pdf");
            }
        })
    });

    
}


onChangeType(e) {
    this.setState({
      type: e.target.value
    });

    if(e.target.value=="Income Report"){
        this.setState({
            incomehide:true
        })
    }
    else{
        this.setState({
            incomehide:""
        })
    }
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
    {/* <option selected hidden>--Select Report Type--</option> */}
    <option selected>Income Report</option>
    <option>Stock Report</option>
</select>
</div>

<div className="col-2" style={{marginLeft:0}} hidden>
    
<label className="form-label">From:</label>
<br/>
<DatePicker 
selected={this.state.from}
onChange={this.onChangeFrom}
className="form-control"
maxDate={moment().toDate()}
/> 
</div>

<div className="col-2" style={{marginLeft:50}} hidden>
    
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

<div style={{marginTop:100}}>

<div id="report">
<iframe hidden={!this.state.incomehide} id="testIframe" width="1140" height="500" src="https://app.powerbi.com/reportEmbed?reportId=f7a6fd61-1580-414f-8496-16f15016a19a&autoAuth=true&ctid=aa232db2-7a78-4414-a529-33db9124cba7&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWVhc3QtYXNpYS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D&filterPaneEnabled=False" frameborder="10" allowFullScreen="true">
    
</iframe>
                      

</div>

</div>


</div>     
        )
   } 
}
