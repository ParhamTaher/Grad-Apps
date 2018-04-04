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
                    key={ticket.TID}
                    numberLabel={i + 1}
                    TID={ticket.TID}
                    applicant={ticket.applicant}
                    ticketStatus={ticket.ticketStatus}
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

export default ItemListOffered;
