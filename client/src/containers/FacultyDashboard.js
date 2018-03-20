import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import { bindActionCreators } from 'redux';
import ItemList from './ItemList';
import { Button } from 'react-bootstrap';

class FacultyDashboard extends Component {
    handleFileUpload = event => {
        const data = new FormData();
        // console.log(event.target.files[0]);

        this.props.actions.uploadDocumentRequest(event.target.files[0]);
    };

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <h3>Faculty Dashboard</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6 col-sm-push-6">
                        <h4>Domestic Tickets</h4>
                        <ItemList ticketType={'D'} />
                    </div>
                    <div className="col-sm-6 col-sm-pull-6">
                        <h4>International Tickets</h4>
                        <ItemList ticketType={'I'} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <input type="file" onChange={this.handleFileUpload} />
                    </div>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

export default connect(null, mapDispatchToProps)(FacultyDashboard);
