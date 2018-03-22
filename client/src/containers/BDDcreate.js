import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom'

class BDDcreate extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="col-md-6 col-md-offset-3">
          <h2 className="text-center">Create Ticket</h2>
            <form>
            <div class="form-group row">
              <label for="example-text-input" class="col-2 col-form-label">Name</label>
              <div class="col-10">
                <input class="form-control" type="text" value="Name" id="example-text-input"/>
              </div>
            </div>
            <div class="form-group row">
                <label for="exampleSelect1">Ticket Type</label>
                <select class="form-control" id="exampleSelect1">
                  <option>Domestic</option>
                  <option>International</option>
                </select>
            </div>
            <div class="form-group row">
                <label for="exampleSelect1">Ticket Status</label>
                <select class="form-control" id="exampleSelect1">
                  <option>Initial</option>
                  <option>Granted</option>
                </select>
            </div>
            <button onClick={() => this.props.history.push("/BDDashboard")} className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    );
  }
}

export default BDDcreate;
