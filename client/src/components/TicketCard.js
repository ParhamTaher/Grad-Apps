import React from 'react';

const TicketCard = ({ TID, applicant, ticketStatus }) => {
    return (
        <li className="list-group-item" key={TID}>
            <div>{applicant}</div>
            <div>{ticketStatus}</div>
        </li>
    );
};

export default TicketCard;
