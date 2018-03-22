import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import { bindActionCreators } from 'redux';
import ItemList from '../components/ItemList';
import { Button } from 'react-bootstrap';

class ACDashboard extends Component {
    componentDidMount() {
        console.log('Requesting tickets...');
        this.props.actions.requestTickets(21);
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <h3>Associate Chair Dashboard</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6 col-sm-push-6">
                        <h4>Domestic Tickets</h4>
                        <ItemList
                            ticketList={this.props.ticketList.tickets}
                            ticketType={'D'}
                            onApproveSubmit={this.props.actions.approveApplicant}
                        />
                    </div>
                    <div className="col-sm-6 col-sm-pull-6">
                        <h4>International Tickets</h4>
                        <ItemList
                            ticketList={this.props.ticketList.tickets}
                            ticketType={'I'}
                           	onApproveSubmit={this.props.actions.approveApplicant}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <input type="file" onChange={this.handleFileUpload} />
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    // Whatever is returned will show up as props
    return {
        ticketList: state.tickets,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ACDashboard);
