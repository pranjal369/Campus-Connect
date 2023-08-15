import React, { useState } from 'react'
import './Auth.css'
import Logo from '../../img/pngwing.png'
import { useDispatch, useSelector } from 'react-redux'
// import { logIn } from '../../api/AuthRequest'
import { signUp,logIn } from '../../actions/AuthAction.js'
// import authReducer from '../../Reducers/authReducer'


const Auth = () => {
    const dispatch = useDispatch()
    const loading = useSelector((state) => state.authReducer.loading)
    const [isSignUp, setIsSignUp] = useState(true)

    console.log(loading);

    const [confirmPass, setConfirmPass] = useState(true)
    const [data, setData] = useState({
        firstname: "",
        lastname: "",
        enroll: "",
        branch: "",
        year: "",
        username: "",
        password: "",
        confirmpass: ""
    })


    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });

    };

    const handleSubmit = (e) => {
        setConfirmPass(true);
        e.preventDefault();

        if (isSignUp) {
            data.password === data.confirmpass
                ? dispatch(signUp(data))
                : setConfirmPass(false)
        }
        else // login page...
        {
            dispatch(logIn(data))
        }
    }

    const resetForm = () => {
        setConfirmPass(true);
        setData({
            firstname: "",
            lastname: "",
            enroll: "",
            password: "",
            branch: "",
            year: "",
            username: "",
            confirmpass: "",
        });
    };

    return (
        <div className="Auth">
            {/* left side */}
            <div className="a-left">
                <img src={Logo} alt="" />
                <div className="Webname">
                    <h1>Campus-Connect</h1>
                    <h4>Welcome! Lnctians Connect to your Campus here!!</h4>
                </div>
                {/* <h1>Form</h1> */}

            </div>
            {/* <SignUp /> */}
            {/* <LogIn/> */}

            {/* right side */}
            <div className="a-right">
                <form className='infoForm authForm' onSubmit={handleSubmit}>

                    <h3>{isSignUp ? "Sign-Up" : "LogIn"}</h3>


                    {isSignUp && (
                        <div>
                            <input type="text"
                                placeholder='First name'
                                className='infoInput'
                                name='firstname'
                                onChange={handleChange}
                                value={data.firstname}
                            />
                            <input type="text"
                                placeholder='Last name'
                                className='infoInput'
                                name='lastname'
                                onChange={handleChange}
                                value={data.lastname}
                            />

                        </div>
                    )}
                    {/* {isSignUp && ( */}
                    <div>

                        <input type="text" className='infoInput' name='enroll' placeholder='Enrollment Number' onChange={handleChange} value={data.enroll} />
                    </div>
                    {/* )} */}

                    {isSignUp &&
                        (
                            <div>
                                <input type="text"
                                    className='infoInput'
                                    name='branch'
                                    placeholder='Branch'
                                    onChange={handleChange}
                                    value={data.branch} />
                                <input type="text"
                                    className='infoInput'
                                    name='year'
                                    placeholder='Graduation-Year'
                                    onChange={handleChange}
                                    value={data.year}
                                />
                            </div>
                        )
                    }


                    <div>
                        {isSignUp &&
                            <input type="text" className='infoInput' name='username' placeholder='Username'
                                onChange={handleChange}
                                value={data.username}
                            />
                        }
                        <input type="password" className='infoInput' name='password' placeholder='Password'
                            onChange={handleChange}
                            value={data.password}
                        />


                        {isSignUp &&
                            <input type="password" className='infoInput' name='confirmpass' placeholder='Confirm Password' onChange={handleChange}
                            // value={data.confirmpass}
                            />
                        }

                    </div>

                    <span style={{ display: confirmPass ? "none" : "block", color: "red", fontSize: '12px', alignSelf: 'flex-end', marginRight: "5px" }}>

                        * Confirm Password is not same
                    </span>

                    <div>
                        <span style={{ fontSize: '12px', cursor: "pointer", textDecoration: "underline", color: "blue" }} onClick={() => { setIsSignUp((prev) => !prev); resetForm() }} >{isSignUp ? " Already Have a Account? Login!" : "Don't have an account? SignUp😊"}</span>
                    </div>
                    <button className="button infoButton" type='submit'>{isSignUp ? "SignUp" : "LogIn"}
                    </button>
                </form>
            </div>

        </div>
    )
}

export default Auth
