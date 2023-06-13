import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import Link from '@material-ui/core/Link';
import { useSelector, useDispatch } from 'react-redux';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { logout } from '../../Authentication/AuthActions';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1ecde2',
        },
    },
});


function Navbar() {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth.user);
    const states = useSelector((state) => state);

    const endSession = () => {
        dispatch(logout());
    }

    return (
        <ThemeProvider theme={theme}>

            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6" >
                        <Button href="/" className="text-white">Home</Button>
                        
                        {!user ? <Button href="/login" className="text-white">Login</Button> : '' }
                        {!user ? <Button href="/signup" className="text-white">Signup</Button> : '' }
                        {user ? <Button href="/login" className="text-white" onClick={endSession}>Logout</Button> : '' }
                        
                    </Typography>
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    );

};

export default Navbar;
