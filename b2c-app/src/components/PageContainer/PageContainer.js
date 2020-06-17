import React from 'react';
import components from '..';
import { onError } from '../../helpers/pageUpdatesHandler';

class PageContainer extends React.Component {

    constructor(props) {
        super(props);
        this.onError = onError.bind(this);
    }

    componentDidMount() {
        document.title = `${this.props.pageConfig.title} | National Careers Service`;
    }

    render() {

        let pageLevelErrorContainer;
        if (this.props.pageConfig && this.props.pageConfig.errors) {
            pageLevelErrorContainer =
                <components.PageLevelErrorContainer
                    errorItems={this.props.pageConfig.errors}
                    summaryTextContent={this.props.pageConfig.errorSummaryContent}
                    showB2CErrors={this.props.pageConfig.showB2CErrors}
                />
        }

        const pageColumns = this.props.columns.map(
            column => {
                const formContainerClass = this.props.columns.length === 1 ? 'govuk-grid-column-two-thirds' : 'govuk-grid-column-one-half';
                const formContainerHeaderSize = this.props.columns.length === 1 ? 'xl' : 'l';
                let formContent;
                if (column.formContent) {
                    formContent =
                        <form id="customForm" onSubmit={column.submitHandler} noValidate>
                            {column.formContent}
                            <button className="govuk-button" id="preSubmit" type="submit">{column.submitButtonText}</button>
                        </form>
                }

                return (
                    <div className={formContainerClass} key={column.header}>
                        <components.PageTitle size={formContainerHeaderSize} title={column.header} />
                        {column.aboveFormContent}
                        {formContent}
                        {column.belowFormContent}
                    </div>
                )
            }
        );

        return (
            <div className="govuk-width-container">
                <components.Breadcrumbs />
                {pageLevelErrorContainer}
                <main className="govuk-main-wrapper" >
                    <div className="govuk-grid-row">
                        {pageColumns}
                    </div>
                </main>
            </div>
        )
    }
}

export default PageContainer;