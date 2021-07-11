import { Component } from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import AddItem from "./addItem.components";



const Request = props=>(
    <tr>
        <td>{props.request.generic_name}</td>
        <td>{props.request.type}</td>
        <td>{props.request.strength}</td>
        <td>{props.request.description}</td>
        <td>{props.request.doctor_name}</td>


        <td>
        <button type="button" class="btn btn-danger" style={{width: 70}} onClick={()=>{props.deleteRequest(props.request._id)}}>Decline</button>    
        </td>
    </tr>
)

const OldRequest = pr=>(
    <tr>
        <td>{pr.request.generic_name}</td>
        <td>{pr.request.type}</td>
        <td>{pr.request.strength}</td>
        <td>{pr.request.description}</td>
        <td>{pr.request.doctor_name}</td>


        <td>
        <button type="button" class="btn btn-danger" style={{width: 70}} onClick={()=>{pr.deleteRequest(pr.request._id)}}>Decline</button>    
        </td>
    </tr>
)

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
}
        )
})
.catch((error) =>{
    console.log(error);
})

axios.get('http://localhost:5000/requests/getoldRequest')
.then(response => {                                                                            
    this.setState({requestsOld: response.data})
})
.catch((error) =>{
    console.log(error);
})

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
< div className="p-3 border bg-light" >

           <table className="table" >
               <thead className="thead-light"  >
               <th style={{fontSize:18}} >New Requests</th>

                   <tr >
                       {/* <th>Item ID</th> */}
                       <th>Generic Name</th>
                       <th>Category</th>
                       <th>Strength</th>
                       <th>Description</th>
                        <th>Requested By</th>
                        <th>Actions</th>
                   </tr>
               </thead>
               <br/>
               <tbody>
                   {this.requestList()}
               </tbody>

           </table>
           
           </div> <br/>

           < div className="p-3 border bg-light" >

           <table className="table" >
               <thead className="thead-light" >
               <th style={{fontSize:18}}>Older Requests</th>

                   <tr >
                       {/* <th>Item ID</th> */}
                       <th>Generic Name</th>
                       <th>Category</th>
                       <th>Strength</th>
                       <th>Description</th>
                        <th>Requested By</th>
                        <th>Actions</th>
                   </tr>
               </thead>
               <br/>
               <tbody>
                   {this.OldrequestList()}
               </tbody>

           </table>
           
           </div> 



           </div>




       )
   } 
}
