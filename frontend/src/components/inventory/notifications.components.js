import { Component } from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import AddItem from "./addItem.components";


const StockNot = props=>(
    <tr>
        <td>{props.notification.itemName}</td>
        <td>{props.notification.category}</td>
        <td>{props.notification.reorderLevel}</td>
        <td>{props.notification.stocks}</td>
    </tr>
    
)

export default class Inventory extends Component {
    constructor(props){
        super(props);

        // this.deleteInventoryItem = this.deleteInventoryItem.bind(this);
        this.state ={
            inventoryItems:[],
            search:"",
            addModalShow:false,
            notification:[]
        };
    }



componentDidMount(){

axios.get('http://localhost:5000/inventoryItems/')
.then(response => {                                                                            
    this.setState({inventoryItems: response.data})
    for(let i=0;i<this.state.inventoryItems.length;i++){
        const stock={
            item_name:this.state.inventoryItems[i].item_name
        }
        axios.post('http://localhost:5000/stocks/getstockunits',stock)
            .then(res1 => {
                if(Number(this.state.inventoryItems[i].reorder_level)>Number(res1.data)){
                    this.setState({
                        notification: [...this.state.notification, ...[
                        {itemName:this.state.inventoryItems[i].item_name, 
                         category:this.state.inventoryItems[i].category, 
                         reorderLevel:this.state.inventoryItems[i].reorder_level,
                         stocks:res1.data
                       }] 
                       ]
                    })
                }
            })
    }
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
    return this.state.notification.map(current =>{
        return<StockNot notification={current}  key={current._id}/>;
    })
}

   render(){

    let addModalClose=()=>{this.setState({addModalShow:false});
window.location.reload();
}

       return(
           
       <div>
       
      
<br/>
< div >

<h5>Critical Stocks</h5>

           <table className="table" >
               <thead className="thead-light">
                 <tr>
                       <th>Item Name</th>
                       <th>Category</th>
                       <th>Reorder Level</th>
                       <th>Stocks</th>
                    
                   </tr>
               </thead>
               <br/>
               <tbody className="p-3 border bg-light rounded" >
                   {this.notificationList()}
               </tbody>

           </table>
           
           </div> 
           </div>




       )
   } 
}
