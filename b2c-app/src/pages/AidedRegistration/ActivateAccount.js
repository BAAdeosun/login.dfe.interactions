import React from 'react';
import components from '../../components';

class ActivateAccount extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            password: null,
            day: null,
            month: null,
            year: null,
            tsAndCsAccepted: false,
            showErrors: false,
            errors: []
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        //update error messages
        this.state.errors.forEach((error) => {
            error.visible.text = error.current.text;
            error.visible.showSummaryText = error.current.showSummaryText;
        });
        //do something to validate and decide if we submit or show errors
        if (this.state.password &&
            this.state.day &&
            this.state.month &&
            this.state.year &&
            this.state.tsAndCsAccepted) {
            this.setState({ showErrors: false });
            //everything is valid, set data and submit B2C form
            this.setDataAndSubmit();
        }
        else {
            //show errors in each component
            this.setState({ showErrors: true });
        }
    }

    setDataAndSubmit() {
        //retrieve all elements we will need and set their values
        let b2cPassword = document.getElementById('newPassword');
        let b2cReenteredPassword = document.getElementById('reenterPassword');
        let b2cDobDay = document.getElementById('day');
        let b2cDobMonth = document.getElementById('month');
        let b2cDobYear = document.getElementById('year');
        let b2cTermsAndConditions = document.getElementById('tncCheckbox_true');
        let b2cSubmitButton = document.getElementById('continue');

        if (b2cPassword && b2cReenteredPassword &&
            b2cDobYear && b2cDobMonth && b2cDobYear &&
            b2cTermsAndConditions &&
            b2cSubmitButton) {
            b2cPassword.value = this.state.password;
            b2cReenteredPassword.value = this.state.password;
            b2cDobDay.value = this.state.day;
            b2cDobMonth.value = this.state.month;
            b2cDobYear.value = this.state.year;
            b2cTermsAndConditions.checked = this.state.tsAndCsAccepted;
            //submit B2C form
            b2cSubmitButton.click();
        }
    }

    render() {

        const formContent = [
            <components.CreateNewPassword showErrors={this.state.showErrors} errors={this.state.errors} key="createNewPassword" />,
            <components.Paragraph text='As an extra security check, enter your date of birth.' errors={this.state.errors} key="paragraph" />,
            <components.DateOfBirth showErrors={this.state.showErrors} errors={this.state.errors} key="dob" />,
            <components.TermsAndConditions showErrors={this.state.showErrors} errors={this.state.errors} key="tsAndCs" />
        ];

        return (
            <div id="activateAccount">
                <components.PageContainer
                    pageTitle='Activate your account'
                    formContent={formContent}
                    submitButtonText='Activate account'
                    submitHandler={this.handleSubmit}
                    errors={this.state.errors}
                    errorSummaryContent={<components.PasswordHelp />}
                />
            </div>
        )
    }
}

export default ActivateAccount;