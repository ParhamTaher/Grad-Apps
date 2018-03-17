import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import { bindActionCreators } from 'redux';
import TicketCard from '../components/TicketCard';

class ItemList extends Component {
    componentDidMount() {
        console.log('Requesting tickets...');
        this.props.actions.requestTickets(21);
    }

    renderList() {
        return this.props.ticketList.tickets.map(ticket => {
            return (
                <TicketCard
                    TID={ticket.TID}
                    applicant={ticket.applicant}
                    ticketStatus={ticket.ticketStatus}
                />
            );
        });
    }

    render() {
        return <ul className="list-group col-sm-4">{this.renderList()}</ul>;
    }
}

function mapStateToProps(state) {
    // Whatever is returned will show up as props
    return {
        ticketList: state.tickets
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
