import React from 'react';
import { Panel } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

class TicketCard extends React.Component {
	handleClick() {
		this.props.onApproveSubmit(this.props.TID);
	}

    render() {
	    return (
	        <Panel eventKey={this.props.TID}>
	            <Panel.Heading>
	                <Panel.Title toggle>{this.props.applicant}</Panel.Title>
	            </Panel.Heading>
	            <Panel.Body collapsible>Ticket Status: {this.props.ticketStatus}</Panel.Body>
	            <Panel.Body collapsible>Ticket Type: {this.props.ticketType}</Panel.Body>
	            <Panel.Body collapsible><textarea>{this.props.notes}</textarea></Panel.Body>
	            <Panel.Body collapsible><Button bsStyle="primary" onClick = {this.handleClick}>Primary</Button></Panel.Body>

	        </Panel>
	    );
	}
}

export default TicketCard;
