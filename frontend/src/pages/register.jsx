import RegisterForm from "../components/register-signin/register";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from "../utils/auth";


export default function SignUp() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(Auth.loggedIn());

    useEffect(() => {
        setIsLoggedIn(Auth.loggedIn());

        if (isLoggedIn) {
            navigate('/collection');
        }
    }, [navigate, isLoggedIn]);

    if (isLoggedIn) {
        return null;
    }

    return (
        <RegisterForm />
    );
}