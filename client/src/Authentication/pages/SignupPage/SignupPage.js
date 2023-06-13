import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useHistory } from 'react-router-dom';
import { signup } from "../../AuthActions";


const SignupPage = () => {

    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    

    const dispatch = useDispatch();
    const history = useHistory();

    const submitHandler = async (e) => {
        e.preventDefault();
        
        // Password match validation
        if (password !== passwordRepeat) {
            setErrorMessage('Both passwords must be the same.');
            return;
        }
        //TODO: Email format check
        //TODO: Username format check
        //TODO: Password security check

        try {
            // It tries to create the account, if the account is created, we redirect the user to the login page
            const result = await dispatch(signup({fullName: fullName, username: username, email: email, password: password}));

            if (!result.success) {
                setErrorMessage(result.msg);
            }
            else{
                setErrorMessage(result.msg);
                // TODO: Prefill user's email on the login page
                history.push('/login');
            }
        }
        catch (error) {
            console.log("Uncaught error:  ", error);
        }
    }


    return (
        <div className="container">
            <div className="row">
                <div className="col-12 d-flex align-items-center">
                <h1 className="mt-4">
                    Sign up
                </h1>
                </div>
            </div>
            <hr />
            <div className="row w-100 text-center my-0 mx-auto">
                <div className="col">
                    <form onSubmit={submitHandler} className={`d-flex flex-column my-4 mx-auto`}>
                        <TextField autoFocus variant="filled" label="Full name" name="fullName" required onChange={(e)=>{ setFullName(e.target.value)}} />
                        <br/>
                        <TextField type="email" variant="filled" label="Email" name="email" required onChange={(e)=>{ setEmail(e.target.value)}} />
                        <br/>
                        <TextField variant="filled" label="Username" name="username" required onChange={(e)=>{ setUsername(e.target.value)}} />
                        <br/>
                        <TextField type="password" variant="filled" label="Password" name="password" required onChange={(e)=>{ setPassword(e.target.value)}} />
                        <br/>
                        <TextField type="password" variant="filled" label="Repeat password" name="passwordRepeat" required onChange={(e)=>{ setPasswordRepeat(e.target.value)}} />
                        { errorMessage ? <div className='mt-4 text-danger text-right'>{ errorMessage }</div> : ''}
                        <div className='mt-4 text-right'>
                            <span className="mx-2">
                                Already have an account? <Link to="/login">Login</Link>
                            </span>
                            
                            <span className="mx-2">
                                <Button type="submit" variant="contained" color="primary" disabled={!fullName || !email || !username || !password || !passwordRepeat} > Sign up </Button>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
