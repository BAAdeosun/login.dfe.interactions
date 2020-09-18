import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import components from '..';

it('renders without crashing', () => {
    shallow(<components.NavigationLink />);
});

it('renders correctly', () => {
    const tree = renderer
        .create(<components.NavigationLink title='this is a test' />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});