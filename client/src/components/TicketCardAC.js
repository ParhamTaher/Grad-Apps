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
    MenuItem
} from 'react-bootstrap';

class TicketCardAC extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedApplicantID: 0,
            selectedApplicantName: 'Select an Applicant'
        };
    }

    componentDidMount() {
        console.log('Requesting applicants...');
        this.props.actions.requestApplicants();
    }

    handleSaveNoteSubmit = values => {
        console.log('Clicked note button! ' + values.note);
        this.props.actions.saveNote(values);
    };

    handleSendOfferSubmit = () => {
        console.log('Clicked Send Offer button! ');
        this.props.actions.offerApplicant(0);
    };

    handleRejectSubmit = () => {
        console.log('Clicked Reject Offer button! ');
        this.props.actions.rejectApplicant(0);
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

    renderNotes() {
        return this.props.notesList.notes.map((note, i) => {
            return <div>{note}</div>;
        });
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
                            {this.props.applicant}
                        </div>
                    </Panel.Title>
                </Panel.Heading>
                <Panel.Collapse>
                    <Panel.Body>
                        <form
                            onSubmit={this.props.handleSubmit(
                                this.handleSaveNoteSubmit
                            )}
                        >
                            <Field
                                name="note"
                                component={this.renderField}
                                className="form-control"
                                type="text"
                                label="Enter a note"
                            />
                            <button action="submit" className="btn btn-primary">
                                Save
                            </button>
                        </form>
                        <div>
                            <ul>
                                <li>Note 1</li>
                                <li>Note 2</li>
                            </ul>
                        </div>
                        <Button
                            bsStyle="primary"
                            onClick={this.handleSendOfferSubmit}
                        >
                            Send Offer
                        </Button>
                        <br/>
                        <Button
                            bsStyle="danger"
                            onClick={this.handleRejectSubmit}
                        >
                            Reject
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
        applicantList: state.applicants
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
    })(TicketCardAC)
);
