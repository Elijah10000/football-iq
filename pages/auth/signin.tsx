import { NextPage } from 'next';
import { FormEventHandler, useState } from 'react';
// import { SignInForm } from 'styles/signin-style';
import { signIn } from 'next-auth/react';

interface SignInProps { }

const SignIn: NextPage = (props: SignInProps): JSX.Element => {
    const [userInfo, setUserInfo] = useState({email: '', password: ''});
    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {

        e.preventDefault()

       const res = await signIn('credentials', {
            email: userInfo.email,
            password: userInfo.password,
            redirect: false
    });

    console.log(res);
    };

    return (
        // <SignInForm>
            <div className='sign-in-form'>
                <form onSubmit = {handleSubmit}>
                    <h1>Login</h1>
                    <input value= {userInfo.email} onChange={({ target }) => 
                    setUserInfo ({...userInfo, email: target.value })
                } 
                type='email' 
                placeholder='example@example.com' 
                />
                    <input value= {userInfo.password} onChange={({ target }) => 
                    setUserInfo ({...userInfo, password: target.value })
                }
                type='password' 
                placeholder='******' 
                />
                
                <input type='submit' value='login' />
                </form>
            </div>
        // </SignInForm>
    );
};

export default SignIn;
