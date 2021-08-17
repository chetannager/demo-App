import { CircularProgress, Container, FormControl, Grid, InputAdornment, Card, Hidden } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { baseAPIUrl } from '../config/endpoints';
import Controls from '../components/Controls'
import { AccountCircle, Lock } from '@material-ui/icons'
import useForm from '../components/useForm'
import axios from 'axios'
import { Notification } from '../components/ui/Noty'
import { BrowserRouter as Router, useHistory, Redirect } from 'react-router-dom'
import { isJwtExpired } from 'jwt-check-expiration';

const initialState = {
    username: '',
    password: ''
}

function Login() {
    const history = useHistory();
    const [isLoading, setisLoading] = useState(false)
    const JWT_TOKEN = localStorage.getItem("JWT_TOKEN")
    const [isLoggedIn, setisLoggedIn] = useState(true)
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('username' in fieldValues)
            temp.username = (/^([A-Za-z0-9\+_\-]+)(\.[A-Za-z0-9\+_\-]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/).test(fieldValues.username) ? "" : "Please enter a email Address!"
        if ('password' in fieldValues)
            temp.password = (/(.|\s)*\S(.|\s)*/).test(fieldValues.password) ? "" : "Please enter a Password!"
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const { values, setValues, errors, setErrors, handleInputChange, resetForm } = useForm(initialState, true, validate)

    const authentication = (e) => {
        e.preventDefault()
        if (validate()) {
            setisLoading(true)
            axios.post(baseAPIUrl + "login", { "emailAddress": values.username, "password": values.password }).then((response) => {
                setisLoading(false)
                if (response.status === 200) {
                    if (response.data.RESPONSE.loggedInOperation && response.data.RESPONSE.isLoggedIn) {
                        localStorage.setItem("JWT_TOKEN", response.data.RESPONSE.token);
                        history.push("/");
                    } else if (!response.data.RESPONSE.loggedInOperation && !response.data.RESPONSE.isLoggedIn) {
                        Notification(response.data.RESPONSE.error_message, "error");
                    }
                } else {
                    Notification("something went wrong, please try again!", "error");
                }
            }).catch(error => {
                setisLoading(false)
                if (error.response.status === 400) {
                    Notification(error.response.data.RESPONSE.error_message, "error");
                } else {
                    Notification("something went wrong, please try again!", "error");
                }
            })
        }
    }

    useEffect(() => {
        if (JWT_TOKEN == null) {
            setisLoggedIn(false);
        } else {
            if (isJwtExpired(JWT_TOKEN)) {
                setisLoggedIn(false);
            } else {
                setisLoggedIn(true);
                history.push("/");
            }
        }
    }, [])

    return (
        <React.Fragment>
            <Card>
                <Grid style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} container justify="center"
                    alignItems="center">

                    <Hidden only={['sm', 'xs']}>
                        <Grid container md={7} justify="center"
                            alignItems="center">
                            <img src="https://dokkanonline.ir/wp-content/uploads/signup.jpg" className="img-fluid" alt="" />
                        </Grid>
                    </Hidden>

                    <Grid container md={5}>
                        <Card>
                            <Container style={{ paddingRight: '100px' }}>
                                <div className="mb-4">
                                    <h1 className="mb-0">Welcome User!</h1>
                                    <div className="mb-2" style={{ borderBottom: '2px solid rgb(63 81 181)', width: '50px' }}></div>
                                    <p>Please enter email &amp; password to verify your account!</p>
                                </div>
                                <div className="mt-5">
                                    <form onSubmit={authentication} autoComplete="off" noValidate>
                                        <Controls.TextField
                                            label="Email Address"
                                            placeholder="Enter email"
                                            fullWidth
                                            name="username"
                                            value={values.username}
                                            onChange={handleInputChange}
                                            error={errors.username}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <AccountCircle />
                                                    </InputAdornment>
                                                )
                                            }}
                                            disabled={isLoading ? true : false}
                                        />

                                        <Controls.TextField
                                            type="password"
                                            label="Password"
                                            placeholder="Enter password"
                                            fullWidth
                                            name="password"
                                            value={values.password}
                                            onChange={handleInputChange}
                                            error={errors.password}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <Lock />
                                                    </InputAdornment>
                                                )
                                            }}
                                            disabled={isLoading ? true : false}
                                        />

                                        <div className="mt-3">
                                            <Controls.Button
                                                text={isLoading ? (<CircularProgress size={30} color="secondary" thickness="5.0" />) : "CONTINUE"}
                                                style={{ borderRadius: '30px', padding: '12px 22px' }}
                                                fullWidth
                                                disabled={isLoading ? true : false}
                                                type="submit"
                                            />
                                            <Controls.Button
                                                text="New User? Register here"
                                                style={{ borderRadius: '30px', padding: '12px 22px' }}
                                                fullWidth
                                                variant="text"
                                                onClick={() => {
                                                    history.push("/register");
                                                }}
                                            />
                                        </div>
                                    </form>
                                </div>
                            </Container>
                        </Card>
                    </Grid>
                </Grid>
            </Card>
        </React.Fragment>
    )
}

export default Login
