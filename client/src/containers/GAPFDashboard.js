import React, { Component } from 'react';
import '../budgetd.css';
import { BrowserRouter as Router } from 'react-router-dom'
import { connect } from 'react-redux';
import * as Actions from '../actions';
import { bindActionCreators } from 'redux';

class BDDashboardGAPF extends Component {
	componentDidMount() {
        console.log('Requesting tickets...');
        this.props.actions.getAllFilesGAPF();
    }

    renderFiles() {
        if (this.props.allFiles) {
        	console.log("GAPF");
        	console.log(this.props.allFiles);
            return this.props.allFiles.map((gapf, i) => {
                return <div>{gapf.filename}</div>
            });
        } else {
            return <div> No Notes </div>;
        }
    }


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
		                	<h4>GAPF File List</h4>
		            	</div>
		            	<div class="ex11">
			            	{this.renderFiles()}
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

function mapStateToProps(state) {
    // Whatever is returned will show up as props
    return {
        initialTicketList: state.initialTickets,
        offerRequestTicketList: state.offerRequestTickets,
        offerPendingTicketList: state.offerPendingTickets,
        offerAcceptedTicketList: state.acceptedTickets,
        offerRejectedTicketList: state.refusedTickets,
        allTickets: state.tickets,
        allFiles: state.gapf
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BDDashboardGAPF);
