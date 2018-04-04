import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import { bindActionCreators } from 'redux';
import ItemListFSS from '../components/ItemListFSS';
import { Button } from 'react-bootstrap';

class FacultyDashboard extends Component {
    componentDidMount() {
        console.log('Requesting tickets...');
        this.props.actions.requestTicketsFSS('mzaleski', 'initial', '');
        this.props.actions.requestTicketsFSS('mzaleski', 'offer-request', '');
    }

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
                    <div className="col-sm-4">
                        <h4>Available Tickets</h4>
                        <ItemListFSS
                            ticketList={this.props.initialTicketList.tickets}
                            listID="1"
                            facultyID="mzaleski"
                            ticketStatus="initial"
                            ticketType=""
                        />
                    </div>

                    <div className="col-sm-4">
                        <h4>Offers Pending</h4>
                        <ItemListFSS
                            ticketList={
                                this.props.offerRequestTicketList.tickets
                            }
                            listID="2"
                            facultyID="mzaleski"
                            ticketStatus="offer-request"
                            ticketType=""
                        />
                    </div>
                    <div className="col-sm-4">
                        <h4>Final Offers</h4>
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

function mapStateToProps(state) {
    // Whatever is returned will show up as props
    return {
        initialTicketList: state.initialTickets,
        offerRequestTicketList: state.offerRequestTickets
        //offerPendingTicketList: state.offerPendingTickets,
        //offerAcceptedTicketList: state.offerAcceptedTickets,
        //offerRejectedTicketList: state.offerRejectedTickets
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FacultyDashboard);
