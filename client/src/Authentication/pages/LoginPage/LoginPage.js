import React, {useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { authUser } from "../../AuthActions";
import { isTokenExpired } from "../../../util/tokenization";


const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const dispatch = useDispatch();
    const history = useHistory();

    // Checks if token is expired and if it isn't, redirects the user to the home page
    useEffect(() => {
        isTokenExpired()
        .then(isExpired => {
            if (!isExpired) {
                history.push('/');
            }
        })
        .catch(error => {
            console.error('Error checking token expiration:', error);
        });
    }, []); // Empty dependency array to run the effect only once on component mount

    const submitHandler = async (e) => {
        e.preventDefault(); //Avoid page reload

        try {
            // Authenticates the user. If it's a valid user, redirects to home page.
            const result = await dispatch(authUser({email: email, password: password}));
            if (!result.success) {
                setErrorMessage(result);
            }
            else{
                setErrorMessage(result);
                history.push('/');
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
                {/* <img className="mx-3" src={Logo} alt="Logo" style={{ height: '72px'}}/> */}
                <h1 className="mt-4">
                    Login
                </h1>
                </div>
            </div>
            <hr />
            <div className="row w-100 text-center my-0 mx-auto">
                <div className="col">
                    <form onSubmit={submitHandler} className={`d-flex flex-column my-4 mx-auto`}>
                        <TextField autoFocus variant="filled" label="Email" name="email" required onChange={(e)=>{ setEmail(e.target.value)}} />
                        <br/>
                        <TextField type="password" variant="filled" label="Password" name="password" required onChange={(e)=>{ setPassword(e.target.value)}} />
                        { errorMessage ? <div className='mt-4 text-danger text-right'>{ errorMessage.msg }</div> : ''}
                        <div className='mt-4 text-right'>
                            <span className="mx-2">
                                Need an account? <Link to="/signup">Sign up</Link>
                            </span>
                            
                            <span className="mx-2">
                                <Button type="submit" variant="contained" color="primary" disabled={!email || !password} > Login </Button>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
