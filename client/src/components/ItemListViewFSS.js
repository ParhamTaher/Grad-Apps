import React, { Component } from 'react';
import TicketCardViewFSS from '../components/TicketCardViewFSS';
import { PanelGroup, Panel } from 'react-bootstrap';

class ItemListFSS extends Component {

    renderList() {
        return this.props.ticketList.map((ticket, i) => {
            return (
                <TicketCardViewFSS
                    listID={this.props.listID}
                    key={ticket._id}
                    numberLabel={i + 1}
                    TID={ticket._id}
                    applicantID={ticket.applicant_id}
                    ticketStatus={ticket.status}
                    ticketType={ticket.ticket_type}
                    notesList={ticket.note}
                />
            );
        });
    }

    render() {
        return <div>{this.renderList()}</div>;
    }
}

export default ItemListFSS;
