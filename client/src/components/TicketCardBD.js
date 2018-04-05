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
    DropdownButton,
    MenuItem
} from 'react-bootstrap';

class TicketCardBD extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.faculty) {
            this.props.actions.getFacultyNameFromId(this.props.faculty);
        }
    }


    handleGrantTicket = () => {
        console.log(this.props.faculty);
        this.props.actions.grantTicket(this.props.TID);
    };

    render() {
        let isInitial = false;
        if(this.props.ticketStatus=='initial'){
            isInitial = true;
        }


        const button = isInitial ? (
          <button type="button" class="btn btn-primary" onClick={this.handleGrantTicket}>GRANT</button>
        ) : (
          <button type="button" class="btn btn-primary" disabled>ALREADY GRANTED</button>
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
                            {this.props.faculty}
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
