import React from 'react';
import Enzyme, { configure, shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
global.React = React;
global.shallow = shallow;
global.render = render;
global.mount = mount;

export { shallow, mount, render };
export default Enzyme;
