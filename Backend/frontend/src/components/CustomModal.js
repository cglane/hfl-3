import React, { Component } from 'react';
import {Button, Modal, Form } from 'react-bootstrap'
import axios from 'axios';
import $ from 'jquery'
import config from '../config'
import ConfirmationModal from './ConfirmationModal'

class CustomModal extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.componentWillUnmount = this.componentWillUnmount.bind(this)

    this.state = {  
      show: false,
      email:'',
      name: '',
      phoneNumber: '',
      message: '',
      showConfirmation:false,
      showEmailError: false
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
  componentWillUnmount() {
    this._isMounted = false;
  }
  handleSubmit(event){
    if( this.state.email){
      event.preventDefault();
      let data = {
        email: this.state.email,
        name: this.state.name,
        phoneNumber: this.state.phoneNumber,
        message: this.state.message,
        agentEmail: this.props.agent.email,
        streetAddress: (this.props.streetAddress || 'Not Set') 
      }
      axios.post(`${config.domain}/email`,  data)
      .then((res) => {
        this.handleClose()
        setTimeout(()=> {
          this.setState({showConfirmation: true})
        })
        
      }).catch((err)=> {
        this.handleClose()
        alert('An error has occurred:' +  err)
      })
    }else{
      this.setState({showEmailError: true})
    }
      
  }

  render() {
    return (
      <>    
        {(this.state.showConfirmation)? <ConfirmationModal/>: ''}
        <i className="material-icons" onClick={this.handleShow}>
            message
        </i>
        <Modal className="modal-form " show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Request More Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="text-center">
              <div className="g-recaptcha" data-sitekey="6Lcf5JgUAAAAAIHIjbf44QUWYwc7vOzKsJ_dSEW0"></div>

              <input 
                className="form-control form-control-lg" 
                type="text" 
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
                placeholder="Name"/>
                {
                  (this.state.showEmailError)? <span className="email-required"> Email is required</span>: ''
                }
              <input 
                className="form-control form-control-lg" 
                type="email" 
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
                required={true}
                placeholder="Email Address"/>
              <input 
                className="form-control form-control-lg" 
                type="text" 
                name="phoneNumber"
                value={this.state.phoneNumber}
                onChange={this.handleChange}
                placeholder="Phone Number"/>

              <textarea className="form-control" 
                id="exampleFormControlTextarea1" 
                placeholder="Your Message...."
                name="message"
                value={this.state.message}
                onChange={this.handleChange}
                rows="3"></textarea>
              <button className="modal-submit text-center"onClick={this.handleSubmit}>Submit</button>

            </form>

          </Modal.Body>
        </Modal>
        
      </>
    );
  }
}


export default CustomModal;