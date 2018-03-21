import React from 'react';
import { Panel } from 'react-bootstrap';

const TicketCard = ({ TID, applicant, ticketStatus, ticketType }) => {
    return (
        <Panel eventKey={TID}>
            <Panel.Heading>
                <Panel.Title toggle>{applicant}</Panel.Title>
            </Panel.Heading>
            <Panel.Body collapsible>Ticket Status: {ticketStatus}</Panel.Body>
            <Panel.Body collapsible>Ticket Type: {ticketType}</Panel.Body>
        </Panel>
    );
};

export default TicketCard;
