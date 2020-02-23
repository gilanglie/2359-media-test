import React from 'react';
import { shallow, mount, render } from '../enzyme';
import { TextField, Button, Grid } from '@material-ui/core';
import "whatwg-fetch";
import fetchMock from "fetch-mock";
import { act } from "react-test-renderer";
import renderer from 'react-test-renderer';
import { renderHook } from "@testing-library/react-hooks";

import App from '../App';

let wrapper, props, useEffect;
const mockUseEffect = () => {
    useEffect.mockImplementationOnce(f => f());
  };
  const posts = [{ id: 1, title: "a post", body: "the body" }];

beforeEach(() => {
    useEffect = jest.spyOn(React, "useEffect");

    props = {
        fetchData: jest.fn().mockResolvedValue(posts)
    };
    mockUseEffect();
    wrapper = shallow(<App {...props} /> );
});


describe('ProgressBar Test', () => {
    beforeAll(() => {
        global.fetch = fetch;
    });
    afterAll(() => {
        jest.clearAllMocks();
    });
    
    it('matches the snapshot', () => {
        const tree = renderer.create(<App />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("rendered", () => {
        shallow(<App />);
    });

    it("displays loading", () => {
        expect(wrapper.exists(".loading"));
    });

    it('should render 2 <Grid />', () => {
        expect(wrapper.find(Grid)).toHaveLength > 0;
    });
    // it('should render 2 <Button />', () => {
    //     const setState = jest.fn();
    //     const useStateSpy = jest.spyOn(React, 'useState')
    //     expect(props.fetchData).toHaveBeenCalled();

    //     useStateSpy.mockImplementation((init) => [init, setState]);
    //     expect(setState).toHaveLength > 0;
    //     const tree = renderer.create(<App />).toJSON();
    //     expect(tree).toMatchSnapshot();
    // });
});

describe('<Button /> interactions', () => {
    it('should call the onClick function whenbutton is clicked', () => {
        expect(wrapper.find(Button).onClick);
    });
})
      

