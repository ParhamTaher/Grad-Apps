import React, { Component } from 'react';
import '../budgetd.css';
import ItemList from './TicketTable';
import { BrowserRouter as Router } from 'react-router-dom'

class BDDashboard extends Component {

    render() {
        return (
            <div>
	            <div class="text-center">
	                <h2>Budget Director Dashboard</h2>
	            </div>
	            <hr></hr>
	            <div class="container">
				  <div class="row">
				  <div class="col-sm-2 text-center">
				   </div>
				  	<div class="col-sm-6 text-center">
					  	<div class="text-center">
		                	<h4>Ticket List</h4>
		            	</div>
		            	<div class="ex11">
		            		<h5>Domestic</h5>
			            	<ItemList ticketType={'D'} />
			            	<h5>International</h5>
			            	<ItemList ticketType={'I'} />
						</div>
				  	</div>
				    <div class="col-sm-2 text-center">
				    	<button type="button" class="btn btn-primary btn-lg">Show me GAPF</button>
				    	<button type="button" onClick={() => this.props.history.push("/createTicket")} class="btn btn-success btn-lg">Create Ticket</button>
				    </div>
				   </div>
  				</div>
            </div>
        );
    }
}

export default BDDashboard;
