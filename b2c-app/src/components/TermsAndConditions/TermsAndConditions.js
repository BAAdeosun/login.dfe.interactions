import React from 'react';

import { onError } from '../../helpers/pageUpdatesHandler';

import "./TermsAndConditions.scss";

class TermsAndConditions extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tsAndCsAccepted: false,
            errors: {
                tsAndCs: {
                    current: {
                        text: 'You must accept our Terms and Conditions',
                        showSummaryText: false
                    },
                    visible: {
                        text: '',
                        showSummaryText: false
                    },
                    id: 'tsAndCsCustom'
                }
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.onError = onError.bind(this);
        this.isValidTsAndCs = this.isValidTsAndCs.bind(this);

        //initialise errors in parent component
        this.props.initialiseErrors(this.state.errors);
    }

    handleChange(e) {
        const { name, checked } = e.target;

        this.setState({ [name]: checked }, () => {
            //validate and update value in any case
            this.isValidTsAndCs();
            this.props.onChange({
                tsAndCsAccepted: checked
            });
        });
    }

    isValidTsAndCs() {
        let isValid = true;

        //build new error state
        const newErrorState = {
            tsAndCs: {
                current: {
                    text: '',
                    showSummaryText: false
                },
                visible: {
                    text: '',
                    showSummaryText: false
                },
                id: 'tsAndCsCustom'
            }
        }

        if (!this.state.tsAndCsAccepted) {
            isValid = false;
            newErrorState.tsAndCs.current.text = 'You must accept our Terms and Conditions';
        }

        this.setState({ errors: newErrorState }, () => {
            //call parent to update its state
            this.props.updateErrors(this.state.errors);
        });

        return isValid;
    }

    render() {

        let { errors, showErrors } = this.props;

        let tsAndCsErrorElement;
        if (showErrors && errors.tsAndCs.visible.text.length > 0) {
            tsAndCsErrorElement =
                <span id="tsAndCsError" className="govuk-error-message">
                    <span className="govuk-visually-hidden">Error:</span>
                    {errors.tsAndCs.visible.text}
                </span>
        }

        return (

            <div>
                <h1 className='govuk-heading-m'>Terms and conditions</h1>
                <div className={`govuk-form-group ${showErrors && errors.tsAndCs.visible.text.length > 0 ? "govuk-form-group--error" : ""}`}>
                    {tsAndCsErrorElement}
                    <label className="block-label" htmlFor="tsAndCsCustom">
                        <input id="tsAndCsCustom" name="tsAndCsAccepted" type="checkbox" value={true} aria-invalid="true"
                            checked={this.state.tsAndCsAccepted}
                            onChange={this.handleChange}
                            noValidate />
                        I accept the&nbsp;
                        <a href="https://nationalcareers.service.gov.uk/help/terms-and-conditions" id="tsAndCsLink" target="_blank" rel="noopener noreferrer" >
                            terms and conditions
                        </a>
                        &nbsp;and I am 13 or over
                    </label>
                </div>
            </div>
        )
    }
}

export default TermsAndConditions;