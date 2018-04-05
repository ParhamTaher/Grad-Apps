import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import {
    Button,
    Panel,
    FormControl,
    FormGroup,
    ControlLabel,
    HelpBlock
} from 'react-bootstrap';

class TicketCardFSS extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            applicantName: 'No One',
            noteValue: ''
        };
    }

    componentDidMount() {
        if (this.props.applicantID) {
            var self = this;
            //this.props.actions.getApplicantNameFromId(this.props.applicantID);
            axios.get('/applicants/' + this.props.applicantID).then(function(response) {
                console.log('applicant name: ' + response.data.applicant);
                self.setState({ applicantName: response.data.applicant.fname + ' ' + response.data.applicant.lname })
            });
        }

        console.log('Requesting applicants...');
        this.props.actions.requestApplicants();
    }

    handleSaveNoteSubmit = () => {
        console.log('Clicked note button! ' + this.state.noteValue);
        this.props.actions.saveNote(this.props.TID, this.state.noteValue, this.props.notesList);
    };

    renderField = ({ input, label, type, meta: { touched, error } }) => (
        <fieldset className={`form-group`}>
            <label className="control-label">{label}</label>
            <div>
                <input
                    {...input}
                    placeholder={label}
                    className="form-control"
                    type={type}
                />
            </div>
        </fieldset>
    );

    renderDropDownField = ({
        input,
        label,
        type,
        meta: { touched, error }
    }) => (
        <fieldset className={`form-group`}>
            <label className="control-label">{label}</label>
            <div>
                <input
                    {...input}
                    placeholder={label}
                    className="form-control"
                    type={type}
                />
            </div>
        </fieldset>
    );


    renderNotes() {
        if(this.props.notesList) {
            return this.props.notesList.map((note, i) => {
                return <div>{note}</div>;
            });
        } else {
            return <div> No Notes </div>
        }
    }

    render() {
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
                            {this.state.applicantName}
                        </div>
                    </Panel.Title>
                </Panel.Heading>
                <Panel.Collapse>
                    <Panel.Body>
                    <form>
                        <FormGroup
                          controlId="formBasicText"
                        >
                          <ControlLabel>Notes: </ControlLabel>
                          <FormControl
                            type="text"
                            value={this.state.noteValue}
                            placeholder="Enter text"
                            onChange={(e) => {
                                this.setState({
                                    noteValue: e.target.value
                                });
                            }}
                          />
                          <FormControl.Feedback />
                          <HelpBlock>Validation is based on string length.</HelpBlock>
                        </FormGroup>
                        <Button
                            bsStyle="primary"
                            onClick={this.handleSaveNoteSubmit}
                        >
                            Save
                        </Button>
                    </form>
                        <div>
                            {this.renderNotes()}
                        </div>
                    </Panel.Body>
                </Panel.Collapse>
            </Panel>
        );
    }
}

function mapStateToProps(state) {
    // Whatever is returned will show up as props
    return {
        applicantName: state.appName
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
    })(TicketCardFSS)
);
