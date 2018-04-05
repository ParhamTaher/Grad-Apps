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

class TicketCardFSS extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedApplicantID: null,
            selectedApplicantName: 'Select an Applicant',
            noteValue: ''
        };
    }

    componentDidMount() {
        if (this.props.applicantID) {
            this.props.actions.getApplicantNameFromId(this.props.applicantID);
        }

        console.log('Requesting applicants...');
        this.props.actions.requestApplicants();
    }

    handleSaveNoteSubmit = () => {
        console.log('Clicked note button! ' + this.state.noteValue);
        this.props.actions.saveNote(this.props.TID, this.state.noteValue, this.props.notesList);
    };

    handleNoteChange(e) {
      this.setState({
          selectedApplicantID: this.state.selectedApplicantID,
          selectedApplicantName: this.state.selectedApplicantName,
          noteValue: e.target.value
      })
    }

    handleAssignSubmit = () => {
        console.log('Clicked Assign button! ');
        this.props.actions.offerRequest(
            this.props.TID,
            this.state.selectedApplicantID
        );
    };

    handleUnassignSubmit = () => {
        console.log('Clicked Unassign button! ');
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

    renderApplicantList() {
        console.log('app list: ' + this.props.applicantList.applicants);
        return this.props.applicantList.applicants.map((applicant, i) => {
            return (
                <MenuItem
                    key={applicant._id}
                    eventKey={applicant._id}
                    title={applicant.fname + ' ' + applicant.lname}
                    onSelect={(eventKey, event) => {
                        this.setState({
                            selectedApplicantID: applicant._id,
                            selectedApplicantName:
                                applicant.fname + ' ' + applicant.lname
                        });
                    }}
                >
                    {i + 1 + '. ' + applicant.fname + ' ' + applicant.lname}
                </MenuItem>
            );
        });
    }

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
                            {this.props.applicantName.appName || 'No one'}
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
                        <DropdownButton
                            bsStyle="default"
                            title={this.state.selectedApplicantName}
                            key={this.props.TID}
                            id={`dropdown-basic-${this.props.TID}`}
                        >
                            {this.renderApplicantList()}
                        </DropdownButton>
                        <Button
                            bsStyle="primary"
                            onClick={this.handleAssignSubmit}
                        >
                            Assigned
                        </Button>
                        <Button
                            bsStyle="primary"
                            onClick={this.handleUnassignSubmit}
                        >
                            Unassigned
                        </Button>
                    </Panel.Body>
                </Panel.Collapse>
            </Panel>
        );
    }
}

function mapStateToProps(state) {
    // Whatever is returned will show up as props
    return {
        applicantList: state.applicants,
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
