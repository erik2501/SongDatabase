import Searchbar from '../Searchbar';
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { RecoilRoot, useRecoilValue } from 'recoil';
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { useEffect } from 'react';
import { searchWordAtom, yearAtom, orderAtom } from '../../shared/globalState';
import { GET_DISTINCT_YEARS } from '../../helpers/queries';
import { MockedProvider } from '@apollo/client/testing';

const RecoilObserver = ({ node, onChange }: { node: any, onChange: any }) => {
    const value = useRecoilValue(node);
    useEffect(() => onChange(value), [onChange, value]);
    return null;
};

const mocks = [{
    request: {
        query: GET_DISTINCT_YEARS,
        variables: {}
    },
    result: {
        data: {
            getDistinctYears: [
                1999, 2000, 2001, 2002, 2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019

            ]
        }
    }
}];

afterEach(cleanup);

describe('testing the searchbar', () => {

    it('render without crashing', () => {
        render(
            <RecoilRoot>
                <MockedProvider mocks={mocks} addTypename={false}>
                    <Searchbar />
                </MockedProvider>
            </RecoilRoot>
        )
    })

    it('testing input field', () => {
        render(
            <RecoilRoot>
                <MockedProvider mocks={mocks} addTypename={false}>
                    <Searchbar />
                </MockedProvider>
            </RecoilRoot>
        )
        const input = screen.getByRole('textbox', {
            name: /search for song or artist/i
        })
        act(() => {
            userEvent.type(input, "Britney Spears");
        })
        expect(input).toHaveValue("Britney Spears");
    })

    it('testing input field works with store', () => {
        const onChange = jest.fn();
        render(
            <RecoilRoot>
                <RecoilObserver node={searchWordAtom} onChange={onChange} />
                <MockedProvider mocks={mocks} addTypename={false}>
                    <Searchbar />
                </MockedProvider>
            </RecoilRoot>
        )
        screen.getByRole('textbox', {
            name: /search for song or artist/i
        })

        fireEvent.change(screen.getByRole('textbox', {
            name: /search for song or artist/i
        }), { target: { value: 'Britney Spears' } });

        screen.findAllByText(/britney Spears/i)

        expect(onChange).toHaveBeenCalledTimes(2);
        expect(onChange).toHaveBeenCalledWith(''); // Initial state on render.
        expect(onChange).toHaveBeenCalledWith("Britney Spears"); // New value on change.
    })

    it('testing year select', () => {
        const onChange = jest.fn();
        render(
            <RecoilRoot>
                <RecoilObserver node={yearAtom} onChange={onChange} />
                <MockedProvider mocks={mocks} addTypename={false}>
                    <Searchbar />
                </MockedProvider>
            </RecoilRoot>
        )

        act(() => {
            screen.getByRole('button', { name: /year all years/i }).click()
        })

        expect(onChange).toHaveBeenCalledTimes(1);
    })

    it('testing order select', () => {
        const onChange = jest.fn();
        render(
            <RecoilRoot>
                <RecoilObserver node={orderAtom} onChange={onChange} />
                <MockedProvider mocks={mocks} addTypename={false}>
                    <Searchbar />
                </MockedProvider>
            </RecoilRoot>
        )

        act(() => {
            screen.getByRole('button', { name: /order newest first/i }).click()
        })

        expect(onChange).toHaveBeenCalledTimes(1);
    })

    it('testing clear button', () => {
        render(
            <RecoilRoot>
                <MockedProvider mocks={mocks} addTypename={false}>
                    <Searchbar />
                </MockedProvider>
            </RecoilRoot>
        )

        const input = screen.getByRole('textbox', {
            name: /search for song or artist/i
        })
        act(() => {
            userEvent.type(input, "Britney Spears");
        })
        expect(input).toHaveValue("Britney Spears");

        act(() => {
            screen.getByTestId("clearbutton").click()
        })
        expect(input).toHaveValue("");
    })
})