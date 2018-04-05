import React, { Component } from 'react';
import TicketCardFSS from '../components/TicketCardFSS';
import { PanelGroup, Panel } from 'react-bootstrap';

class ItemListFSS extends Component {

    renderList() {
        return this.props.ticketList.map((ticket, i) => {
            console.log("Ticket Note... " + ticket.note)
            return (
                <TicketCardFSS
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
