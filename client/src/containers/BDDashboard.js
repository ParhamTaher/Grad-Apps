import React, { Component } from 'react';
import '../budgetd.css';
import ItemListBD from '../components/ItemListBD';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import { bindActionCreators } from 'redux';

class BDDashboard extends Component {
    componentDidMount() {
        console.log('Requesting tickets...');
        this.props.actions.requestTicketsNew('', '', '');
    }

    render() {
        return (
            <div>
                <div className="text-center">
                    <h2>Budget Director Dashboard</h2>
                </div>
                <hr />
                <div className="container">
                    <div className="row">
                        <div className="col-sm-2 text-center" />
                        <div className="col-sm-6 text-center">
                            <div className="text-center">
                                <h4>Ticket List</h4>
                            </div>
                            <div className="ex11">
                                <ItemListBD
                                    ticketList={this.props.allTickets.tickets}
                                />
                            </div>
                        </div>
                        <div className="col-sm-2 text-center">
                            <button
                                type="button"
                                className="btn btn-primary btn-lg"
                            >
                                Show me GAPF
                            </button>
                            <button
                                type="button"
                                onClick={() =>
                                    this.props.history.push('/createTicket')}
                                className="btn btn-success btn-lg"
                            >
                                Create Ticket
                            </button>
                        </div>
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
        offerRequestTicketList: state.offerRequestTickets,
        offerPendingTicketList: state.offerPendingTickets,
        offerAcceptedTicketList: state.acceptedTickets,
        offerRejectedTicketList: state.refusedTickets,
        allTickets: state.tickets
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BDDashboard);
