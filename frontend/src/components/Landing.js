import { useState } from 'react'
import { Link } from 'react-router-dom'
import {Container, Form, FormGroup, Label, Input, Button, Card, CardTitle, CardText} from 'reactstrap'

const Landing = ({history}) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [loginError, setLoginError] = useState("")
    
    const baseUrl =  window.location.href.split(window.location.pathname)[0];
    const serverUrl = "http://172.105.51.160"
    const localUrl = "http://localhost:8001"

    const Login = async () => {
        const acceptEmail = checkEmail()
        const acceptPassword = checkPassword()
        if(acceptEmail && acceptPassword) {
            const url = `${process.env.REACT_APP_API_URL}/api/users/login`            
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    email: email,
                    password: password
                })
            }
            const response = await fetch(url, requestOptions)
            const data = await response.json()
            if(data.status === "success") {
                console.log(data)
                setLoginError(data.msg)
                localStorage.setItem("nudgeToken",data.data.accessToken)
                localStorage.setItem("_id_",data.data.id)
                window.location.href = "home"
            }
            else if(data.status === "invalid") {
                setLoginError(data.msg)
            }        
        }
    }


    const mailString = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9]+(\.([a-zA-Z0-9]+))+$/

    const updateEmail = (e) => {
        setEmail(e)
        checkEmail()
    }

    const checkEmail = () => {
        if(!mailString.test(email)) {
            setEmailError("Please Enter Valid Email ID")
            return false
        }
        else {
            setEmailError("")
            return true
        }
    }

    const updatePassword = (e) => {
        setPassword(e)
        checkPassword()
    }

    const checkPassword = () => {
        if(password.length < 5) {
            setPasswordError("Please Enter 6 Characters")
            return false
        }
        else {
            setPasswordError("")
            return true
        }
    }

    return(
        <div>
            <Container className="d-flex flex-wrap justify-content-center align-items-center">
                <Card className="mt-5 px-4 py-4 col-12 col-md-8 col-lg-6 rd-10">
                    <div className="d-flex col-12 justify-content-center">
                        {/* <img style={{width: "200px"}} className="p-3" src="https://giveitanudge.com/wp-content/themes/website4.0/assets/img/logos/ndg-logo--dark.svg" alt="nudge" /> */}
                    </div>
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
                            className={emailError ? "border border-danger" : "mb-1"}
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
                            className={passwordError ? "border border-danger" : " mb-1"}
                            />
                        { passwordError && <CardText className="d-flex justify-content-end fs-6 text-danger">{passwordError}</CardText> }
                        <Label for="password">
                            Password
                        </Label>
                        <Link to="forgotpassword" className="link fs-7 blue-400">
                            Forgot Password?
                        </Link>
                        </FormGroup>
                        {loginError && 
                            <div className="d-flex justify-content-center text-danger" style={{transform: "translateY(-6px)"}}>{loginError}</div>
                        }
                        <Button color="primary" size="lg" className="col-12" onClick={() => Login()}>
                            Submit
                        </Button>
                    </Form>
                    <Container className="d-flex justify-content-center mt-2">
                        <CardText>Dont have an account?</CardText>
                        <Link to="register" className="link blue-400 mx-1">
                            Click Here
                        </Link>
                    </Container>
                </Card>
            </Container>
        </div>
    )
}

export default Landing