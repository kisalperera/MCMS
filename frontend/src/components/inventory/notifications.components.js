import { Component } from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import AddItem from "./addItem.components";
import '../../App.css';

const NotificationCard = (props) => {
    const  notification  = props.notification;   
  
  
      return(
          <div>{(notification.type=="Low Stock")
          ?<div className="card card-danger" name="consultcard" style={{width:800,height:60,marginTop:-20,paddingLeft:0,backgroundColor:"#b23939",marginTop:10}}>
          
              <div className ="card-body" style={{color:'white',marginTop:3}} >
                  <div className="row">
                    <div className="col-3">
                        <h6 class="card-text">{notification.type.substring(0,10)}</h6>
                    </div>
                    <div className="col-1" style={{marginRight:-10,marginLeft:-10}}>
                        -
                    </div><div className="col-4">
                        <h6 class="card-text">{notification.not_item }</h6>
                    </div>
                    <div className="col-1"style={{marginRight:-10,marginLeft:-10}}>
                        -
                    </div>
                    
                    <div className="col-2"style={{paddingRight:0,paddingLeft:0}}>
                        <h6 class="card-text">{notification.not_value }</h6>
                    </div>
    
                </div>
                               
              </div>
          </div>
          :<div className="card card-danger" name="consultcard" style={{width:800,height:60,marginTop:-20,paddingLeft:0,backgroundColor:"#f0ad4e",marginTop:10}}>
          
          <div className ="card-body" style={{color:'black',marginTop:3}} >
              <div className="row">
                <div className="col-3" >
                    <h6 class="card-text">{notification.type}</h6>
                </div>
                <div className="col-1" style={{marginRight:-10,marginLeft:-10}}>
                    -
                </div><div className="col-4">
                    <h6 class="card-text">{notification.not_item }</h6>
                </div>
                <div className="col-1"style={{marginRight:-10,marginLeft:-10}}>
                    -
                </div>
                
                <div className="col-2"style={{paddingRight:0,paddingLeft:0}}>
                    <h6 class="card-text">{notification.not_value.substring(0,10) }</h6>
                </div>

            </div>
                           
          </div>
      </div>
  
          }

          </div>
        

        
    )
   
  };



export default class Inventory extends Component {
    constructor(props){
        super(props);

        // this.deleteInventoryItem = this.deleteInventoryItem.bind(this);
        this.state ={
            notifications:[],
            search:"",
            addModalShow:false,
            // notification:[]
        };
    }



componentDidMount(){
    axios.get('http://localhost:5000/stocks/get/60f6a9fec0f2521c5caef75f')
    .then(response => {
        var today=new Date();
        today.setDate(today.getDate() + 30)
        var date=new Date(response.data.expire_date)
        if(today<date){
            console.log("No expiry notice" )
        }
        else{
            console.log("Expiry notice" )

        }
       })


axios.get('http://localhost:5000/notifications/getNot')
.then(response => {                                                                            
    this.setState({notifications: response.data})
    console.log(response.data)
})
.catch((error) =>{
    console.log(error);
})

}

// deleteInventoryItem(id){
//     axios.delete('http://localhost:5000/inventoryItems/'+id)
//     .then(res => console.log(res.data));

//     this.setState({
//         inventoryItems: this.state.inventoryItems.filter(el=>el._id!==id)
//     })
// }

notificationList(){
    return this.state.notifications.map(current =>{
        return<NotificationCard notification={current}  key={current._id}/>;
    })
}

   render(){

    let addModalClose=()=>{this.setState({addModalShow:false});
window.location.reload();
}

       return(
           
       <div className="container">
       
      
<br/>
< div >

<h5>New Notifications</h5>
<br/>

{this.notificationList()}
<br/>

<h5>Older</h5>
      
           
           </div> 
           </div>




       )
   } 
}
