import React, { Component } from 'react';
import TicketCardBD from '../components/TicketCardBD';
import { PanelGroup, Panel } from 'react-bootstrap';

class ItemListBD extends Component {
    constructor(props, context) {
        super(props, context);
    }
        renderList() {
        return this.props.ticketList.map((ticket, i) => {
            return (
                <TicketCardBD
                    key={ticket._id}
                    numberLabel={i + 1}
                    TID={ticket._id}
                    applicant={ticket.applicant_id}
                    faculty={ticket.faculty_id}
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

export default ItemListBD;
