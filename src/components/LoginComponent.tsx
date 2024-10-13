import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useAuth} from "./context/AuthContext";

import {Box, Button, Chip, FormControl, Input, InputAdornment, InputLabel, Paper, TextField,} from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';
import IconButton from '@mui/material/IconButton';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LoginIcon from "@mui/icons-material/Login";


const LoginComponent = () => {
    // Password field
    const [showPassword, setShowPassword] = useState(false);
    // Input data
    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    // Input errors
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const navigate = useNavigate();
    const { login } = useAuth();

    // Validation
    const handleUsername = () => {
        if (
            !usernameInput ||
            usernameInput.length < 5 ||
            usernameInput.length > 12
        ) {
            setUsernameError(true);
            return;
        }
        setUsernameError(false);
    }

    const handlePassword = () => {
        if (
            !passwordInput ||
            passwordInput.length < 5 ||
            passwordInput.length > 12
        ) {
            setPasswordError(true);
            return;
        }
        setPasswordError(false);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (usernameInput === "fakeuser" && passwordInput === "fakepass") {
            localStorage.setItem("isAuth", "true");
            login();
            navigate("/tasks");
        } else {
            alert('Invalid login or password');
        }
        console.log({ username: usernameInput, password: passwordInput });
    }

    // Show password action
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <Box
            height="93vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            <Paper elevation={3} style={{ maxWidth: "300px", padding: "10px", gap: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Chip icon={<LockIcon />}
                      label="Login"
                      color="primary"
                      variant="outlined"
                />
                <TextField
                    id="standard-basic"
                    label="username"
                    variant="standard"
                    fullWidth
                    size="small"
                    error={usernameError}
                    value={usernameInput}
                    onBlur={handleUsername}
                    onChange={(e) => setUsernameInput(e.target.value)}
                />
                <FormControl sx={{ m: 1 }} variant="standard" fullWidth>
                    <InputLabel htmlFor="standard-adornment-password" error={passwordError}>password</InputLabel>
                    <Input
                        id="standard-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        error={passwordError}
                        value={passwordInput}
                        onBlur={handlePassword}
                        onChange={(e) => setPasswordInput(e.target.value)}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    onMouseUp={handleMouseUpPassword}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <Button variant="contained"
                        fullWidth
                        endIcon={<LoginIcon />}
                        onClick={handleSubmit}
                >
                    Login
                </Button>
            </Paper>
        </Box>
    );
};

export default LoginComponent;