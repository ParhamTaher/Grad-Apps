import React, { Component } from 'react';
import TicketCardOffered from '../components/TicketCardOffered';
import { PanelGroup, Panel } from 'react-bootstrap';

class ItemListOffered extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleSelect = this.handleSelect.bind(this);

        this.state = {
            activeKey: '1'
        };
    }

    handleSelect(activeKey) {
        console.log('Acitive Key: ' + activeKey);
        this.setState({ activeKey });
    }

    renderList() {
        return this.props.ticketList.map((ticket, i) => {
            return (
                <TicketCardOffered
                    listID={this.props.listID}
                    key={ticket._id}
                    numberLabel={i + 1}
                    TID={ticket._id}
                    applicantID={ticket.applicant_id}
                    facultyID={ticket.faculty_id}
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

export default ItemListOffered;
