import { Component } from "react";
import {Link} from 'react-router-dom';
import '../../App.css';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import swal from '@sweetalert/with-react';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';


export default class Patients extends Component {
    constructor(props){
        super(props);
        this.addModal = this.addModal.bind(this);

        this.state={
            addModalShow:false,
            result:[],
            data:[{
                title:" ",
                start:"2021-07-05T11:00:00.000+00:00",
                end: "2021-07-05T11:00:00.000+00:00"
            }]
        }
} 

addModal(){
    this.setState({
        addModalShow:true
    })
}

componentDidMount(){
    axios.get('http://localhost:5000/appointments/getAppointment', )
    .then(resp=> {
        this.setState({
            result:resp.data
        },()=>{
            for(let i=0;i<this.state.result.length;i++){
                this.setState({
                   data:[...this.state.data, ...[
                       {title:"", 
                       start:this.state.result[i].date, 
                       end:this.state.result[i].date,
                      }]
                   ]
                })
            } 
        })

           
            
        })
   
}

   render(){
    let addModalClose=()=>{
        this.setState({addModalShow:false})
    }
   
    const localizer = momentLocalizer(moment)

    
       return(       
           <div>   
<div className="row">
   < div className="col-8">
<select className="form-control">
<option>Dr.P.D.R. Deshan</option>
</select>
    
   </div>

   {/* <div className="col"><button type="button" className="btn btn-primary" onClick={()=>{this.addModal()}}>Add Appointment</button>
        <AddAppointment
         show={this.state.addModalShow}
         onHide={addModalClose}

         />
    </div> */}

</div>
<br/>
<div className="container">

               <link href="https://cdn.jsdelivr.net/npm/react-big-calendar@0.19.0/lib/css/react-big-calendar.css" rel="stylesheet"/>

                <Calendar 
                    localizer={localizer}
                    events={this.state.data}
                    startAccessor="start"
                    endAccessor="end"
                    titleAccessor="title"
                    style={{ height: 500 }}
                />
</div>
        </div> 


       )
   } 
}

