import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import { bindActionCreators } from 'redux';
import TicketCard from '../components/TicketCard';
import { PanelGroup, Panel } from 'react-bootstrap';

class ItemList extends Component {
    componentDidMount() {
        console.log('Requesting tickets...');
        this.props.actions.requestTickets(21);
    }

    renderList() {
        return this.props.ticketList.tickets.map(ticket => {
            return (

                <div class = "panel panel-default">
                   <div class = "panel-heading">
                      <h3 class = "panel-title">
                         {ticket.applicant}
                      </h3>
                   </div>
                
                   <div class = "panel-body">
                   <table class="table">
                      <tr>
                      <td>{ticket.ticketStatus}</td>
                      <td><button type="button" class="btn btn-primary btn-sm">EDIT</button></td>
                    </tr>
                    </table>
                   </div>
                </div>
            );
        });
    }

    render() {
        return (
            <PanelGroup accordion id="accordion-example">
                {this.renderList()}
            </PanelGroup>
        );
    }
}

function mapStateToProps(state) {
    // Whatever is returned will show up as props
    return {
        ticketList: state.tickets
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
