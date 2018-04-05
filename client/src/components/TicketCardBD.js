import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import { bindActionCreators } from 'redux';
import {
    Button,
    Panel,
    FormControl,
    FormGroup,
    ControlLabel,
    HelpBlock,
} from 'react-bootstrap';
import axios from 'axios';

class TicketCardBD extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            facultyName: 'No One'
        };
    }

    componentDidMount() {
        if (this.props.faculty) {
            var self = this;
            axios.get('/faculty/' + this.props.faculty).then(function(response) {
                console.log('faculty name: ' + response.data.faculty);
                self.setState({facultyName: response.data.faculty.fname + ' ' + response.data.faculty.lname})
            });
        }
    }


    handleGrantTicket = () => {
        console.log(this.props.faculty);
        this.props.actions.grantTicket(this.props.TID);
        window.location.reload();

    };

    render() {
        let isInitial = false;
        if(this.props.ticketStatus=='initial'){
            isInitial = true;
        }


        const button = isInitial ? (
          <button type="button" className="btn btn-primary" onClick={this.handleGrantTicket}>GRANT</button>
        ) : (
          <button type="button" className="btn btn-primary" disabled>ALREADY GRANTED</button>
        );

        return (
            <Panel id={this.props.TID}>
                <Panel.Heading>
                    <Panel.Title toggle>
                        <div>
                            {this.props.numberLabel}.
                            <b>
                                {this.props.ticketType == 'D'
                                    ? ' Domestic'
                                    : ' International'}{' '}
                                | {this.props.ticketStatus}
                            </b>
                        </div>
                        <div>
                            &nbsp;&nbsp;&nbsp;&nbsp;Assigned to{' '}
                            {this.state.facultyName}
                        </div>
                    </Panel.Title>
                </Panel.Heading>
                <Panel.Collapse>
                    <Panel.Body>
                        {button}
                    </Panel.Body>
                </Panel.Collapse>
            </Panel>
        );
    }
}

function mapStateToProps(state) {
    // Whatever is returned will show up as props
    return {
        facultyName: state.fName
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: 'ticket-form'
    })(TicketCardBD)
);
