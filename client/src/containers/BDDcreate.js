import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom'

class BDDcreate extends React.Component {

  constructor(props) {
    super(props);
    this.state = {name: '',
                  type: 'domestic',
                  status: 'initial'};

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    //alert(value);

    this.setState({
      [name]: value
    });
  }


  handleSubmit(event) {
    alert('A ticket form was submitted: ' + this.state.name + ' ' 
      + this.state.type + ' ' + this.state.status );
    //alert(this.state.type);
    event.preventDefault();
  }

  render() {
    return (
      <div className="container">
        <div className="col-md-6 col-md-offset-3">
          <h2 className="text-center">Create Ticket</h2>
            <form onSubmit={this.handleSubmit}>
            <div class="form-group row">
              <label for="example-text-input" class="col-2 col-form-label">Name:</label>
              <div class="col-10">
                <input class="form-control" name='name' type="text" onChange={this.handleInputChange}  id="example-text-input"/>
              </div>
            </div>
            <div class="form-group row">
                <label for="exampleSelect1">Ticket Type</label>
                <select class="form-control" id="exampleSelect1" name='type'  onChange={this.handleInputChange}>
                  <option value='domestic'>Domestic</option>
                  <option value='international'>International</option>
                </select>
            </div>
            <div class="form-group row">
                <label for="exampleSelect1">Ticket Status</label>
                <select name='status' class="form-control" id="exampleSelect2" onChange={this.handleInputChange}>
                  <option value='initial'>Initial</option>
                  <option value='granted'>Granted</option>
                </select>
            </div>
            <input className="btn btn-primary" type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default BDDcreate;
