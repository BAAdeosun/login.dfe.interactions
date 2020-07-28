import React from 'react';
import components from '../components';
import { POLICIES } from '../constants/policies';
import { LINK_TYPES } from '../constants/linkTypes';

class ExpiredLink extends React.Component {

    render() {

        let paragraphText;
        let buttonText;

        if (this.props.policy === POLICIES.RESEND_EMAIL) {
            paragraphText = 'The link in your account activation email has expired.';
            buttonText = 'Resend activation email';
        } else if (this.props.policy === POLICIES.PASSWORD_RESET) {
            paragraphText = 'The link in your password reset email has expired.';
            buttonText = 'Resend password reset email';
        }

        const content =
            <div>
                <components.Paragraph>
                    {paragraphText}
                </components.Paragraph>
                <components.Link type={LINK_TYPES.BUTTON} policy={this.props.policy}>{buttonText}</components.Link>
            </div>

        const title = 'Expired link';

        const pageConfig = {
            title: title,
            header: title,
            aboveFormContent: content
        };


        return (
            <div id="expiredLink">
                <components.PageContainer pageConfig={pageConfig} />
            </div>
        )
    }
}

export default ExpiredLink;
