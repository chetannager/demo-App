import { CircularProgress, Container, FormControl, Grid, InputAdornment, Card, Hidden } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { baseAPIUrl } from '../config/endpoints';
import Controls from '../components/Controls'
import { AccountCircle, Lock, Person, MonetizationOn } from '@material-ui/icons'
import useForm from '../components/useForm'
import axios from 'axios'
import { Notification } from '../components/ui/Noty'
import { BrowserRouter as Router, useHistory, Redirect } from 'react-router-dom'
import { isJwtExpired } from 'jwt-check-expiration';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialState = {
    fullName: '',
    username: '',
    password: '',
    score: '',
}

const getJWTToken = () => {
    return localStorage.getItem("JWT_TOKEN");
}
function Register() {
    const history = useHistory();
    const [isLoading, setisLoading] = useState(false)
    const JWT_TOKEN = localStorage.getItem("JWT_TOKEN")
    const [isLoggedIn, setisLoggedIn] = useState(false)

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('fullName' in fieldValues)
            temp.fullName = (/(.|\s)*\S(.|\s)*/).test(fieldValues.fullName) ? "" : "Please enter a FullName!"
        if ('username' in fieldValues)
            temp.username = (/^([A-Za-z0-9\+_\-]+)(\.[A-Za-z0-9\+_\-]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/).test(fieldValues.username) ? "" : "Please enter a email!"
        if ('password' in fieldValues)
            temp.password = (/(.|\s)*\S(.|\s)*/).test(fieldValues.password) ? "" : "Please enter a Password!"
        if ('score' in fieldValues)
            temp.score = (/(.|\s)*\S(.|\s)*/).test(fieldValues.score) ? "" : "Please enter a Score!"

        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const { values, setValues, errors, setErrors, handleInputChange, resetForm } = useForm(initialState, true, validate)

    const register = (e) => {
        e.preventDefault()
        if (validate()) {
            if (navigator.onLine) {
                setisLoading(true)
                axios.post(baseAPIUrl + "register", { "profileImage": "", "fullName": values.fullName, "emailAddress": values.username, "password": values.password, "score": values.score }).then((response) => {
                    setisLoading(false)
                    if (response.status === 200) {
                        if (response.data.RESPONSE.isVerified) {
                            toast.error(response.data.RESPONSE.message, {
                                position: "top-right",
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: false,
                                draggable: true,
                                progress: undefined,
                            });
                        } else if (response.data.RESPONSE.registerOperation) {
                            toast.success(response.data.RESPONSE.message, {
                                position: "top-right",
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: false,
                                draggable: true,
                                progress: undefined,
                            });
                            resetForm({});
                        } else {
                            toast.error(response.data.RESPONSE.error_message, {
                                position: "top-right",
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: false,
                                draggable: true,
                                progress: undefined,
                            });
                        }
                    }
                }).catch(error => {
                    setisLoading(false)
                    if (error.response.status === 400) {
                        toast.error("something went wrong, please try again!", {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: false,
                            draggable: true,
                            progress: undefined,
                        });
                    }
                })
            } else {
                toast.error("You are Offline! 🌐", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
            }
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
            <Grid container justify="center"
                alignItems="center">
                <Grid container md={4}>
                    <Card>
                        <Container>
                            <div className="mb-4">
                                <h1 className="mb-0">Register</h1>
                                <div className="mb-2" style={{ borderBottom: '2px solid rgb(63 81 181)', width: '50px' }}></div>
                                <p>Please enter details below to create account!</p>
                            </div>
                            <div className="mt-5">
                                <form onSubmit={register} autoComplete="off" noValidate>
                                    <Controls.TextField
                                        label="FullName"
                                        placeholder="Enter full name"
                                        fullWidth
                                        name="fullName"
                                        value={values.fullName}
                                        onChange={handleInputChange}
                                        error={errors.fullName}
                                        // inputRef={input => input && input.focus()}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Person />
                                                </InputAdornment>
                                            )
                                        }}
                                        disabled={isLoading ? true : false}
                                    />
                                    <Controls.TextField
                                        label="Email Address"
                                        placeholder="Enter email address"
                                        fullWidth
                                        name="username"
                                        value={values.username}
                                        onChange={handleInputChange}
                                        error={errors.username}
                                        // inputRef={input => input && input.focus()}
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

                                    <Controls.TextField
                                        label="Score"
                                        placeholder="Enter score"
                                        fullWidth
                                        name="score"
                                        value={values.score}
                                        onChange={handleInputChange}
                                        error={errors.score}
                                        // inputRef={input => input && input.focus()}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <MonetizationOn />
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
                                            color="secondary"
                                        />
                                        <Controls.Button
                                            text="Already have account? Login"
                                            style={{ borderRadius: '30px', padding: '12px 22px' }}
                                            fullWidth
                                            variant="text"
                                            onClick={() => {
                                                history.push("/login");
                                            }}
                                        />
                                    </div>
                                </form>
                            </div>
                        </Container>
                    </Card>
                </Grid>

                <Hidden only={['sm', 'xs']}>
                    <Grid container md={8} justify="center"
                        alignItems="center">
                        <img src="https://farmsoc.com/wp-content/uploads/2020/04/mobile-login-concept-illustration_114360-135.jpg" className="img-fluid" alt="" />
                    </Grid>
                </Hidden>
            </Grid>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
            />
        </React.Fragment>
    )
}

export default Register
