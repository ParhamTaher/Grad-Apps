import React from 'react';

const TicketCard = ({ TID, applicant, ticketStatus }) => {
    return (
        <li key={TID}>
            <div>{applicant}</div>
            <div>{ticketStatus}</div>
        </li>
    );
};

export default TicketCard;
