import React, { useState, ChangeEvent } from 'react';
import { Container, Input, Button, ErrorMessage, Form } from 'styles/login-style';
import index from 'pages/index';
import { BrowserRouter, Route } from 'react-router-dom';
import bcrypt from 'bcryptjs';

interface Props {
    onLogin: (username: string) => void;
}

const Login: React.FC<Props> = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            // Call an API to sign in the user
            const response = await fetch('https://example.com/api/sign-in', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            // Check if the API call was successful
            if (!response.ok) {
                throw new Error('Failed to sign in');
            }

            onLogin(username);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            // Call an API to sign up the user
            const response = await fetch('https://example.com/api/sign-up', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            // Check if the API call was successful
            if (!response.ok) {
                throw new Error('Failed to sign up');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <Container>
            <Form onSubmit={handleSignIn}>
                <Input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                />
                <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <Button type="submit">Sign In</Button>
            </Form>
            {error && <ErrorMessage>{error}</ErrorMessage>}
        </Container>
    );
};

export default Login;




