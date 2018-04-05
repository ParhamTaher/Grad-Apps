import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom'
import * as Actions from '../actions';
import { bindActionCreators } from 'redux';

class BDDcreate extends React.Component {

  constructor(props) {
    super(props);
    this.state = {name: '',
                  type: 'D',
                  faculty: '',
                  status: 'initial',
                  number: '1'};

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.props.actions.getAllFaculty();
  }

  handleInputChange(event) {
    const target = event.target;
    let value = target.value;
    const name = target.name;
    if(value === 'domestic'){
      value='D'
    }else if(value==='international'){
      value='I'
    }

    this.setState({
      [name]: value
    });
  }


  handleSubmit(event) {
    event.preventDefault();
    this.props.actions.createTicket(this.state.faculty,
    this.state.type,this.state.status,this.state.number);
    this.props.history.push("/BDDashboard");
  }

    renderFaculty(){
        return this.props.facultyList.faculty.map((faculty, i) => {
            return (
                <option id={faculty._id} value={faculty._id}>
                {faculty.fname + ' ' + faculty.lname}</option>
            );
        });
    }

  render() {
    return (
      <div className="container">
        <div className="col-md-6 col-md-offset-3">
          <h2 className="text-center">Create Ticket</h2>
            <form onSubmit={this.handleSubmit}>
            <div class="form-group row">
              <label for="example-text-input" class="col-2 col-form-label">Faculty Name:</label>
              <div class="col-10">
                <div class="form-group row">
                <select name='status' class="form-control" id="faculty" name='faculty' onChange={this.handleInputChange}>
                  {this.renderFaculty()}
                </select>
            </div>
              </div>
            </div>
            <div class="form-group row">
                <label for="exampleSelect1">Ticket Type</label>
                <select class="form-control" id="exampleSelect1" name='type'  onChange={this.handleInputChange}>
                  <option value='D'>Domestic</option>
                  <option value='I'>International</option>
                </select>
            </div>
            <div class="form-group row">
                <label for="exampleSelect1">Ticket Status</label>
                <select name='status' class="form-control" id="exampleSelect2" onChange={this.handleInputChange}>
                  <option value='initial'>Initial</option>
                  <option value='granted'>Granted</option>
                </select>
            </div>
            <div class="form-group row">
              <label for="example-number-input" class="col-2 col-form-label" >Number of tickets:</label>
              <div class="col-10">
              <input class="form-control" name='number' type="text" onChange={this.handleInputChange} id="example-text-input"/>
              </div>
            </div>
            <input  className="btn btn-primary" type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
    // Whatever is returned will show up as props
    return {
        facultyList: state.faculty
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BDDcreate);
