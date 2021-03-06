import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import { bindActionCreators } from 'redux';
import ItemListAC from '../components/ItemListAC';
import ItemListOffered from '../components/ItemListOffered';
import { Button } from 'react-bootstrap';

class ACDashboard extends Component {
    componentDidMount() {
        console.log('Requesting tickets...');
        this.props.actions.requestTicketsAC('', 'offer-request', '');
        this.props.actions.requestTicketsAC('', 'offer-pending', '');
        this.props.actions.requestTicketsAC('', 'accepted', '');
        this.props.actions.requestTicketsAC('', 'refused', '');
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <h3>Associate Chair Dashboard</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <h4>Requested Tickets</h4>
                        <ItemListAC
                            ticketList={
                                this.props.offerRequestTicketList.tickets
                            }
                        />
                    </div>
                    <div className="col-sm-6">
                        <h4>Offered Tickets</h4>
                        <ItemListOffered
                            ticketList={
                                this.props.offerPendingTicketList.tickets
                            }
                        />
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    // Whatever is returned will show up as props
    return {
        offerRequestTicketList: state.offerRequestTickets,
        offerPendingTicketList: state.offerPendingTickets,
        acceptedTicketList: state.acceptedTickets,
        refusedTicketList: state.refusedTickets
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ACDashboard);
