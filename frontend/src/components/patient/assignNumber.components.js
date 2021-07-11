
import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

var nextNumber=1;


export default class AssignNumbers extends Component {
  constructor(props) {
    super(props);
    this.onConfirm = this.onConfirm.bind(this);

  }

  componentDidMount(){


    
    axios.get('http://localhost:5000/patients/getNextNumber')
    .then((res) => {nextNumber =res.data});

  }

  onConfirm(id){


        const patient ={
            assigned_number:nextNumber
        
        }

        axios.post('http://localhost:5000/patients/assignNumber/'+localStorage.getItem('consideredPatint'),patient)
        .then(res => {
          console.log(res.data);
          this.props.onHide();
        }
        );
        
        
          
  }

  render() {
    return (
        <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >        <Modal.Header closeButton>
          <Modal.Title>Assign Number</Modal.Title>
        </Modal.Header>
      
        <Modal.Body>
          <h3>Number: {nextNumber}</h3><br></br>

        </Modal.Body>
      
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.onHide}>Close</Button>
          <Button variant="primary" onClick={this.onConfirm}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

// export default AssignNumbers;







