import React, { Component } from 'react';
import TicketCard from '../components/TicketCard';
import { PanelGroup, Panel } from 'react-bootstrap';

class ItemList extends Component {
    renderList() {
        return this.props.ticketList.map(ticket => {
            return (
                <TicketCard
                    TID={ticket.TID}
                    applicant={ticket.applicant}
                    ticketStatus={ticket.ticketStatus}
                    ticketType={ticket.ticket_type}
                    notes={ticket.notes}
                    onApproveSubmit={this.props.onApproveSubmit}
                />
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

export default ItemList;
