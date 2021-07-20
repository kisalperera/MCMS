import { Component } from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import AddItem from "./addItem.components";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';


function searchItem(item) {
    return function (e) {
    return e.item_name.toLowerCase().includes(item.toLowerCase()) ||!item;      
    }
}


const InventoryItem = props=>(
    <tr>
        <td>{props.inventoryItem.item_name}</td>
        <td>{props.inventoryItem.category}</td>
        <td>{props.inventoryItem.strength}</td>
        <td>{props.inventoryItem.unit_price}</td>
        <td>{props.inventoryItem.selling_price}</td>


        <td><button type="button" class="btn btn-warning" style={{width: 70}} onClick={(e) => {
        e.preventDefault();
        localStorage.setItem('itemforStocks',props.inventoryItem.item_name);
        window.location="/stocks/"+props.inventoryItem.item_name;
        }}>Stocks</button>
             |
        <button type="button" class="btn btn-success" style={{width: 70}} onClick={(e) => {
        e.preventDefault();
        window.location="/edit/"+props.inventoryItem._id;
        
        }}>Edit</button>
             |
        <button type="button" class="btn btn-danger" style={{width: 70}} onClick={()=>{props.deleteInventoryItem(props.inventoryItem._id)}}>Delete</button>    
        </td>
    </tr>
)

export default class Inventory extends Component {
    constructor(props){
        super(props);
        this.checkLogin = this.checkLogin.bind(this);
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.createNotification = this.createNotification.bind(this);

        this.deleteInventoryItem = this.deleteInventoryItem.bind(this);
        this.state ={
            inventoryItems:[],
            search:"",
            addModalShow:false,

        };
    }

 
createNotification(type,string){
  

    switch (type) {
      case 'info':
        return(NotificationManager.info(string,'Item Request',3000))
        break;
      case 'success':
        return(NotificationManager.success('Success message', 'Title here'))
        break;
      case 'warning':
        return(NotificationManager.warning(string, 'Close after 3000ms', 3000))
        break;
      case 'error':
        return(NotificationManager.error(string, 'Click me!', 5000))
        break;
    }

  
}   

onChangeSearch(e) {
this.setState({
  search: e.target.value
});
this.createNotification('info')

}

checkLogin(){
 if( localStorage.getItem('staff_role')!='Admin'){
        window.location='/login';
 }
}

componentDidMount(){
this.checkLogin();
console.log("role",localStorage.getItem('staff_role'));
axios.get('http://localhost:5000/inventoryItems/')
.then(response => {                                                                            
    this.setState({inventoryItems: response.data})
})
.catch((error) =>{
    console.log(error);
})

// axios.get('http://localhost:5000/requests/getnewRequest')
// .then(res=>{
//   for(let i=0;i<res.data.length;i++){
//       var string=res.data[i].generic_name+" "+res.data[i].strength
//       this.createNotification('info',string)

//   }
// })

//  return(createNotification('success'))
// this.createNotification('success',"Stock Warning")
// this.createNotification('error',"Stock Error")


}

deleteInventoryItem(id){
    axios.delete('http://localhost:5000/inventoryItems/'+id)
    .then(res => console.log(res.data));

    this.setState({
        inventoryItems: this.state.inventoryItems.filter(el=>el._id!==id)
    })
}

inventoryItemsList(){
    return this.state.inventoryItems.filter(searchItem(this.state.search)).map(currentinventoryItem =>{
        return<InventoryItem inventoryItem={currentinventoryItem} deleteInventoryItem={this.deleteInventoryItem} key={currentinventoryItem._id}/>;
    })
}

   render(){

    let addModalClose=()=>{this.setState({addModalShow:false});
window.location.reload();
}

       return(
           
       <div>
           <NotificationContainer/>
   
           <div className="row -md-6">
         <div className="col-8" style={{width:969}}><input className="form-control me-2" type="search" placeholder="Search Item" aria-label="Search" value={this.state.search} onChange={this.onChangeSearch}  /> </div>

         <div className="col-2" style={{marginRight:-70}}><button type="button" className="btn btn-warning"  onClick={()=>{
             window.location="/order"}
}>Purchase Orders</button>
    </div>


        <div className="col-2"><button type="button" className="btn btn-primary"  onClick={()=>{this.setState({addModalShow:true})}
}>Add Item</button>
      <AddItem
         show={this.state.addModalShow}
         onHide={addModalClose}
         />
    </div>

       </div>
      
<br/>
< div className="p-3 border bg-light" >


           <table className="table" >
               <thead className="thead-light">
                   <tr>
                       {/* <th>Item ID</th> */}
                       <th>Item Name</th>
                       <th>Category</th>
                       <th>Strength</th>
                       <th>Unit Cost (Rs)</th>
                        <th>Selling Price (Rs)</th>
                       <th>Actions </th>

                   </tr>
               </thead>
               <br/>
               <tbody>
                   {this.inventoryItemsList()}
               </tbody>

           </table>
           
           </div> 
           </div>




       )
   } 
}

/**/