import ReviewComponent from '../ReviewComponent';
import { render, screen, cleanup, waitFor, fireEvent, within } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { MockedProvider } from "@apollo/client/testing";
import { CREATE_REVIEW } from '../../helpers/queries';

afterEach(cleanup);

describe('testing the review-component', () => {

    const mocks = [
        {
            request: {
                query: CREATE_REVIEW,
                variables: {
                    star: 5,
                    userName: 'testuser',
                    description: 'I loved this song!'
                },
            },
            newData: jest.fn(() => ({
                data: {
                    addReview: {
                        id: 0,
                        star: 5,
                        userName: 'testuser',
                        description: 'I loved this song!'
                    }
                },
            })),
        },
    ]

    it('renders without crashing', () => {
        render(
            <MockedProvider>
                <ReviewComponent songID={0} />
            </MockedProvider>
        )
    })

    it('tests name field', () => {
        render(
            <MockedProvider>
                <ReviewComponent songID={0} />
            </MockedProvider>
        )
        const username = screen.getByRole('textbox', { name: /name/i })
        act(() => {
            userEvent.type(username, "testuser");
        })
        expect(username).toHaveValue("testuser");
        expect(username).not.toHaveAttribute('disabled');
    })

    it('tests star review', () => {
        render(
            <MockedProvider>
                <ReviewComponent songID={0} />
            </MockedProvider>
        )
        const star = screen.getByTestId('star')
        star.focus()
        act(() => {
            fireEvent.change(star, { value: 4 })
        })
        waitFor(() => expect(star).toHaveValue(4));
    })

    it('tests description', () => {
        render(
            <MockedProvider>
                <ReviewComponent songID={0} />
            </MockedProvider>
        )
        const description = screen.getByRole('textbox', { name: /description/i })
        act(() => {
            userEvent.type(description, "testdescription");
        })
        expect(description).toHaveValue("testdescription");
        expect(description).not.toHaveAttribute('disabled');
    })

    it('tests submit button', () => {
        render(
            <MockedProvider>
                <ReviewComponent songID={0} />
            </MockedProvider>
        )
        const reviewButton = screen.getByRole('button', { name: /submit review/i })
        expect(reviewButton).toBeEnabled();
        expect(reviewButton).not.toBeNull();
    })

    it('tests mutation', async () => {
        const { findByText } = render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <ReviewComponent songID={0} />
            </MockedProvider>
        )
        const addReviewButton = await findByText('Submit review');
        fireEvent.click(addReviewButton);
        const addReviewMutationMock = mocks[0].newData;
        act(() => {
            addReviewButton.click()
        })
        waitFor(() => expect(addReviewMutationMock).toHaveBeenCalled());
    })
})