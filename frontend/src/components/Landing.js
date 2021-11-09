import { useState } from 'react'
import { Link } from 'react-router-dom'
import {Container, Form, FormGroup, Label, Input, Button, Card, CardTitle, CardText} from 'reactstrap'

const Landing = ({history}) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")

    const baseUrl =  window.location.href.split(window.location.pathname)[0];

    const mailString = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9]+(\.([a-zA-Z0-9]+))+$/

    const updateEmail = (e) => {
        setEmail(e)
        if(!mailString.test(email)) {
            setEmailError("Please Enter Valid Email ID")
        }
        else setPasswordError("")
    }

    const updatePassword = (e) => {
        setPassword(e)
        if(password.length < 6) {
            setPasswordError("Please Enter 6 Characters")
        }
        else setPasswordError("")
    }

    const submitHandler = () => {
        window.location.replace("/home")
    }

    return(
        <div>
            <Container className="d-flex justify-content-center align-items-center">
                <Card className="mt-5 px-4 py-4 col-12 col-md-8 col-lg-6 rd-10">
                    <CardTitle tag="h3" className="bold">
                        Login
                    </CardTitle>
                    <CardText>
                        Enter your details below
                    </CardText>
                    <Form inline>
                        <FormGroup floating>
                        <Input
                            id="email"
                            name="email"
                            placeholder="Email"
                            type="email"
                            value={email}
                            onChange = {(e) => updateEmail(e.target.value)}
                        />
                        { emailError && <CardText className="d-flex justify-content-end fs-6 text-danger">{emailError}</CardText> }
                        <Label for="email">
                            Email
                        </Label>
                        </FormGroup>
                        <FormGroup floating>
                        <Input
                            id="password"
                            name="password"
                            placeholder="Password"
                            type="password"
                            value={password}
                            onChange = {(e) => updatePassword(e.target.value)}
                        />
                        { passwordError && <CardText className="d-flex justify-content-end fs-6 text-danger">{passwordError}</CardText> }
                        <Label for="password">
                            Password
                        </Label>
                        <Link to="forgotpassword" className="link fs-7 blue-400">
                            Forgot Password?
                        </Link>
                        </FormGroup>
                        <Button color="success" size="lg" className="col-12" onClick={() => submitHandler()}>
                            Submit
                        </Button>
                    </Form>
                    <Container className="d-flex justify-content-center mt-2">
                        <CardText>Dont have an account?</CardText>
                        <Link to="sigunp" className="link blue-400 mx-1">
                            Click Here
                        </Link>
                    </Container>
                </Card>
            </Container>
        </div>
    )
}

export default Landing