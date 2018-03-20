import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import { bindActionCreators } from 'redux';
import TicketCard from '../components/TicketCard';
import { PanelGroup, Panel } from 'react-bootstrap';

class ItemList extends Component {
    componentDidMount() {
        console.log('Requesting tickets...');
        this.props.actions.requestTickets(21);
    }

    renderList() {
        return this.props.ticketList.tickets.map(ticket => {
            return (
                <Panel eventKey={ticket.TID}>
                    <Panel.Heading>
                        <Panel.Title toggle>{ticket.applicant}</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body collapsible>{ticket.ticketStatus}</Panel.Body>
                </Panel>
            );
        });
    }

    render() {
        return (
            <PanelGroup accordion id="accordion-example">
                {this.renderList()}
            </PanelGroup>
        );
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
