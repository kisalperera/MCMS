import { Component } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { light } from "@material-ui/core/styles/createPalette";
import NotificationBadge from 'react-notification-badge';
import {Effect} from 'react-notification-badge';


export default class Navbar extends Component {
      constructor(props){
            super(props);
            this.logout=this.logout.bind(this);

            this.state={
                  count:0,
            }
      }

     

      logout(){
            localStorage.setItem('staff_role',"");
            window.location='/login'
      }

render(){
      let person=localStorage.getItem('staff_name');
      let personRole=localStorage.getItem('staff_role');

    return(
<div>

<div style={{height:80,backgroundColor:"#1976d2"}}>
<div className="row">
  <div className="col-4"style={{marginLeft:20, marginTop:25}}>
    <h4 style={{color:'white'}}>{person} | {personRole}</h4>
  </div>
  <div className="col"style={{marginLeft:600, marginTop:22, marginRight:-40}}>
  <button type="button" class="btn btn-secondary" onClick={(e) => {
                e.preventDefault();
  window.location="/ediStaff/"+localStorage.getItem('staff_id');}} style={{backgroundColor:'#607d8b'}}>Account</button>
  </div>
  <div className="col"style={{marginTop:22}}>
  <button type="button" class="btn btn-danger" onClick={this.logout} >Sign Out</button>
  </div>

        </div>
      </div>
      
      
        <nav className="navbar navbar-dark navbar-expand-lg" style={{backgroundColor:'black'}}>
      <div className="collapse navbar-collapse" >
      <ul className="navbar-nav mr-auto">
            
      {/* <li className="navbar-item">
          <Link to="/login" className="nav-link">Login</Link>
    </li>  */}

      <li className="navbar-item" style={{marginLeft:30}}>
          <Link to="/inventory" className="nav-link">Home</Link>  
        </li> 
      
        <li className="navbar-item" style={{marginLeft:50}}>
          <Link to="/inventory" className="nav-link">Inventory</Link>
        </li> 

       <li className="navbar-item" style={{marginLeft:50}}>
          <Link to="/supplier" className="nav-link">Suppliers</Link>
      </li> 

    <li className="navbar-item" style={{marginLeft:50}}>
          <Link to="/staff" className="nav-link">Staff</Link>
    </li> 

   


    <li className="navbar-item" style={{marginLeft:50}}>
    <Link to="/request" className="nav-link" style={{width:130}} >Item Requests</Link>
    </li>  { 
        (this.state.count >0)
          ? <span style={{height:20,marginTop:10,marginLeft:-10}} className="translate-middle badge rounded-pill bg-danger">
          {this.state.count}
        </span> 
          : <span style={{height:20,marginTop:10,marginLeft:-10}} >
        </span> 
      }
    
    
    
    


    <li className="navbar-item" style={{marginLeft:50}}>
          <Link to="/notifications" className="nav-link">Notifications</Link>

    </li> 
    { 
        (this.state.count >0)
          ? <span style={{height:20,marginTop:10,marginLeft:7}} className="translate-middle badge rounded-pill bg-danger">
          {this.state.count}
        </span> 
          : <span style={{height:20,marginTop:10,marginLeft:7}} >
        </span> 
      }
    
    
    <li className="navbar-item" style={{marginLeft:50}}>
          <Link to="/reports" className="nav-link">Reports</Link>

    </li> 
        
      </ul>
    </div>
 
</nav>

</div>
    );

};
}

