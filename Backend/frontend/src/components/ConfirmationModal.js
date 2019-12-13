import React, { Component } from 'react';
import {Button, Modal, Form } from 'react-bootstrap'
import axios from 'axios';
import $ from 'jquery'
import config from '../config'

class ConfirmationModal extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this)

    this.state = {  
      show: true,
      email:'',
      name: '',
      phoneNumber: '',
      message: ''

    };
  }
  handleChange(event) {
    const target = event.target;
    const value = event.target.value
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    return (
      <>    
        <Modal className="modal-form " show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
          Thank You For Your Request. We will follow up shortly.
          </Modal.Header>
        </Modal>
        
      </>
    );
  }
}


export default ConfirmationModal;