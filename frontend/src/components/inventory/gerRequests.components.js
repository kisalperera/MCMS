import { Component } from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import AddItem from "./addItem.components";



const Request = props=>{
    const  request  = props.request;   

    return(

        <div className="card card-danger" name="consultcard" style={{width:1200,height:60,marginTop:-20,paddingLeft:0,backgroundColor:"#0275d8",marginTop:10}}>
          
              <div className ="card-body" style={{color:'white',marginTop:3}} >
                  <div className="row">
                    <div className="col-3">
                        <h6 class="card-text">{request.generic_name}</h6>
                    </div>
                    <div className="col-1" style={{marginRight:-10,marginLeft:-10}}>
                        -
                    </div><div className="col-4">
                        <h6 class="card-text">{request.type }</h6>
                    </div>
                    <div className="col-1"style={{marginRight:-10,marginLeft:-10}}>
                        -
                    </div>
                    
                    <div className="col-2"style={{paddingRight:0,paddingLeft:0}}>
                        <h6 class="card-text">{request.strength }</h6>
                    </div>
                    <div className="col-1"style={{marginRight:-10,marginLeft:-10}}>
                        -
                    </div>
                    
                    <div className="col-2"style={{paddingRight:0,paddingLeft:0}}>
                        <h6 class="card-text">{request.description }</h6>
                    </div>
                    <div className="col-1"style={{marginRight:-10,marginLeft:-10}}>
                        -
                    </div>
                    
                    <div className="col-2"style={{paddingRight:0,paddingLeft:0}}>
                        <h6 class="card-text">{request.doctor_name }</h6>
                    </div>
                    <div className="col-2"style={{paddingRight:0,paddingLeft:0}}>
                     <button type="button" class="btn btn-danger" style={{width: 70}} onClick={()=>{props.deleteRequest(request._id)}}>Decline</button>    
                    </div>
    
                </div>
                               
              </div>
          </div>
    )
    // <tr>
    //     <td>{props.request.generic_name}</td>
    //     <td>{props.request.type}</td>
    //     <td>{props.request.strength}</td>
    //     <td>{props.request.description}</td>
    //     <td>{props.request.doctor_name}</td>


    //     <td>
    //     <button type="button" class="btn btn-danger" style={{width: 70}} onClick={()=>{props.deleteRequest(props.request._id)}}>Decline</button>    
    //     </td>
    // </tr>
}

const OldRequest = pr=>{
    const  request  = pr.request;   

    return(

        <div className="card card-danger" name="consultcard" style={{width:999,height:60,marginTop:-20,paddingLeft:0,backgroundColor:"#6c757d",marginTop:10}}>
          
              <div className ="card-body" style={{color:'white',marginTop:3}} >
                  <div className="row">
                    <div className="col-3">
                        <h6 class="card-text">{request.generic_name}</h6>
                    </div>
                    <div className="col-1" style={{marginRight:-10,marginLeft:-10}}>
                        -
                    </div><div className="col-1" style={{marginRight:-40}}>
                        <h6 class="card-text">{request.type }</h6>
                    </div>
                    <div className="col-1"style={{marginRight:-10,marginLeft:-10}}>
                        -
                    </div>
                    
                    <div className="col-1"style={{paddingRight:0,paddingLeft:0}}>
                        <h6 class="card-text">{request.strength }</h6>
                    </div>
                    <div className="col-1"style={{marginRight:-10,marginLeft:-10}}>
                        -
                    </div>
                    
                    <div className="col-2"style={{paddingRight:0,paddingLeft:0}}>
                        <h6 class="card-text">{request.description }</h6>
                    </div>
                    <div className="col-1"style={{marginRight:-10,marginLeft:-10}}>
                        -
                    </div>
                    
                    <div className="col-2"style={{paddingRight:0,paddingLeft:0}}>
                        <h6 class="card-text">{request.doctor_name }</h6>
                    </div>
                    <div className="col-2"style={{paddingRight:0,paddingLeft:0}}>
                     <button type="button" class="btn btn-danger" style={{width: 70}} onClick={()=>{pr.deleteRequest(request._id)}}>Decline</button>    
                    </div>
    
                </div>
                               
              </div>
          </div>
    )
}
//     <tr>
//         <td>{pr.request.generic_name}</td>
//         <td>{pr.request.type}</td>
//         <td>{pr.request.strength}</td>
//         <td>{pr.request.description}</td>
//         <td>{pr.request.doctor_name}</td>


//         <td>
//         <button type="button" class="btn btn-danger" style={{width: 70}} onClick={()=>{pr.deleteRequest(pr.request._id)}}>Decline</button>    
//         </td>
//     </tr>
// )

export default class Inventory extends Component {
    constructor(props){
        super(props);

        this.deleteRequest = this.deleteRequest.bind(this);
        this.requestList = this.requestList.bind(this);
        this.OldrequestList = this.OldrequestList.bind(this);


        this.state ={
            requests:[],
            requestsOld:[],
            hi:0
        };
    }



componentDidMount(){
    axios.get('http://localhost:5000/requests/getoldRequest')
    .then(response => {    

        this.setState({requestsOld: response.data})
        
        axios.get('http://localhost:5000/requests/getnewRequest')
        .then(response => {                                                                            
            this.setState({requests: response.data},()=>{       
        
            for(let i=0;i<this.state.requests.length;i++){
                console.log("came",this.state.requests.length)
                const view={
                    generic_name:this.state.requests[i].generic_name
                }
                axios.post('http://localhost:5000/requests/view',view)
                .then(res => {console.log(res.data)})
                }
            })
        })
        .catch((error) =>{console.log(error); })
    })
.catch((error) =>{console.log(error);})
}

deleteRequest(id){
    axios.delete('http://localhost:5000/requests/deleterequest/'+id)
    .then(res => console.log(res.data));

    this.setState({
        requests: this.state.requests.filter(el=>el._id!==id)
    })
}

requestList(){
    if(this.state.requests.length>0){
        return this.state.requests.map(currentrequest =>{
            return<Request request={currentrequest} deleteRequest={this.deleteRequest} key={currentrequest._id}/>;
        })
    }else{ return "No New Requests Available!"}
  
}

OldrequestList(){
    if(this.state.requestsOld.length>0){
        return this.state.requestsOld.map(currentrequest =>{
            return<OldRequest request={currentrequest} deleteRequest={this.deleteRequest} key={currentrequest._id}/>;
        })
    }else{ return "No Old Requests Available!"}
  
}

   render(){

    const length=this.state.requests.length;

       return(
           
       <div>
           
            <h5 style={{marginLeft:50}}>Item Requests</h5>

      
<br/>
< div  >

           {/* <table className="table" >
               <thead className="thead-light"  >
               <th style={{fontSize:18}} >New Requests</th>

                   <tr >
                       <th>Generic Name</th>
                       <th>Category</th>
                       <th>Strength</th>
                       <th>Description</th>
                        <th>Requested By</th>
                        <th>Actions</th>
                   </tr>
               </thead>
               <br/>
               <tbody> */}
               <h6>New Requests</h6>
                   {this.requestList()}
               {/* </tbody>

           </table> */}
           
           </div> <br/>

           < div >

           {/* <table className="table" >
               <thead className="thead-light" >
               <th style={{fontSize:18}}>Older Requests</th>

                   <tr >
                       <th>Generic Name</th>
                       <th>Category</th>
                       <th>Strength</th>
                       <th>Description</th>
                        <th>Requested By</th>
                        <th>Actions</th>
                   </tr>
               </thead>
               <br/>
               <tbody> */}
                              <h6>Older</h6>

                   {this.OldrequestList()}
               {/* </tbody>

           </table> */}
           
           </div> 



           </div>




       )
   } 
}
