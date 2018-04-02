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
    componentDidMount() {
        console.log('Requesting applicants...');
        this.props.actions.requestApplicants();
    }

    handleSaveNoteSubmit = values => {
        console.log('Clicked note button! ' + values.note);
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
                <MenuItem eventKey={applicant._id}>
                    {i + 1 + '. ' + applicant.fname + ' ' + applicant.lname}
                </MenuItem>
            );
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
                        <div>Notes</div>
                        <DropdownButton
                            bsStyle="default"
                            title={'Select an applicant'}
                            key={this.props.TID}
                            id={`dropdown-basic-${this.props.TID}`}
                            onSelect={evt => console.log(evt)}
                        >
                            {this.renderApplicantList()}
                        </DropdownButton>
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
    })(TicketCardFSS)
);
