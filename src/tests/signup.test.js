import '@testing-library/jest-dom/extend-expect'
import { MemoryRouter as Router } from 'react-router'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {SignUp, PostSignup} from "../components/SignUp"
import axios from "axios"
import MockAdapter from "axios-mock-adapter"

const mock = new MockAdapter(axios)

describe("Sign up form", () => {
    test("renders sign up header", () => {
        render(<Router>
            <SignUp />
        </Router>)

        const header = screen.getByText("Sign up")
        expect(header.tagName).toBe("H2")
    })

    test("form inputs are required and update parent state", async ()=> {
        const user = userEvent.setup()

        render(<Router>
            <SignUp />
        </Router>)

        const usernameInput = screen.getByPlaceholderText("Username")
        expect(usernameInput).toBeRequired()
        await user.type(usernameInput, "test user")
        expect(usernameInput.value).toBe("test user")


        const nameInput = screen.getByPlaceholderText("Name")
        expect(nameInput).toBeRequired()
        await user.type(nameInput, "test name")
        expect(nameInput.value).toBe("test name")

        const passwordInput = screen.getByPlaceholderText("Password")
        expect(passwordInput).toBeRequired()
        await user.type(passwordInput, "test password")
        expect(passwordInput.value).toBe("test password")
    })


    test("links to login page", async () => {
        render(<Router>
            <SignUp />
        </Router>)

        const loginLink = screen.getByText("login")

        expect(loginLink).toHaveAttribute("href", "/login")
    })
})

describe("On submit", () => {
    beforeEach(() => {
        mock.onPost("/api/users").reply(200)

    })
    test("post request succeeds with valid inputs and re-renders to post-signup page", async () => {

        render(<Router>
            <SignUp />
        </Router>)

        const user = userEvent.setup()

        const usernameInput = screen.getByPlaceholderText("Username")
        await user.type(usernameInput, "test user")

        const nameInput = screen.getByPlaceholderText("Name")
        await user.type(nameInput, "test name")

        const passwordInput = screen.getByPlaceholderText("Password")
        await user.type(passwordInput, "test password")

        const signupButton = screen.getByText("sign up", {selector: "button"})

        await user.click(signupButton)

        expect(mock.history.post.length).toBe(1)

        screen.getByText("Success!")
    })
})

describe("post sign up page", () => {
    test("links to login page", async () => {

        render(<Router>
            <PostSignup />
        </Router>)

        const loginLink = screen.getByText("continue to login")

        expect(loginLink).toHaveAttribute("href", "/login")

    })


})