import React, { Component } from 'react';
import TicketCardViewFSS from '../components/TicketCardViewFSS';
import { PanelGroup, Panel } from 'react-bootstrap';

class ItemListFSS extends Component {
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
                <TicketCardViewFSS
                    listID={this.props.listID}
                    key={ticket._id}
                    numberLabel={i + 1}
                    TID={ticket._id}
                    applicantID={ticket.applicant_id}
                    ticketStatus={ticket.status}
                    ticketType={ticket.ticket_type}
                    notes={ticket.notes}
                />
            );
        });
    }

    render() {
        return <div>{this.renderList()}</div>;
    }
}

export default ItemListFSS;
