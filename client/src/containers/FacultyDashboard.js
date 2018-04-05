import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import { bindActionCreators } from 'redux';
import ItemListFSS from '../components/ItemListFSS';
import { Button } from 'react-bootstrap';

class FacultyDashboard extends Component {
    componentDidMount() {
        console.log('Requesting tickets...');
        this.props.actions.requestTicketsNew('mzaleski', 'initial', '');
        this.props.actions.requestTicketsNew('mzaleski', 'offer-pending', '');
        this.props.actions.requestTicketsNew('mzaleski', 'accepted', '');
        this.props.actions.requestTicketsNew('mzaleski', 'refused', '');
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
                                this.props.offerPendingTicketList.tickets
                            }
                            listID="2"
                            facultyID="mzaleski"
                            ticketStatus="offer-pending"
                            ticketType=""
                        />
                    </div>
                    <div className="col-sm-4">
                        <h4>Final Offers</h4>
                        <ItemListFSS
                            ticketList={
                                this.props.offerAcceptedTicketList.tickets
                            }
                            listID="2"
                            facultyID="mzaleski"
                            ticketStatus="offer-pending"
                            ticketType=""
                        />
                        <ItemListFSS
                            ticketList={
                                this.props.offerRejectedTicketList.tickets
                            }
                            listID="2"
                            facultyID="mzaleski"
                            ticketStatus="offer-pending"
                            ticketType=""
                        />
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
        offerPendingTicketList: state.offerPendingTickets,
        offerAcceptedTicketList: state.acceptedTickets,
        offerRejectedTicketList: state.refusedTickets
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FacultyDashboard);
