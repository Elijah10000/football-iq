import { NextPage } from 'next';
import { FormEventHandler, useState } from 'react';
import { signIn, signUp } from 'next-auth/client';
import styles from 'styles/signin.module.css';

interface SignInProps { }

const SignIn: NextPage = (props: SignInProps): JSX.Element => {
  const [userInfo, setUserInfo] = useState({ email: '', password: '' });
  const [isSigningUp, setIsSigningUp] = useState(false);

  const handleSignInSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const res = await signIn('credentials', {
      email: userInfo.email,
      password: userInfo.password,
      redirect: false,
    });

    console.log(res);
  };

  const handleSignUpSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const res = await signUp('credentials', {
      email: userInfo.email,
      password: userInfo.password,
      redirect: false,
    });

    console.log(res);
  };

  return (
    <div className={styles['sign-in-container']}>
      <div className={styles['sign-in-form']}>
        {isSigningUp ? (
          <>
            <h1>Sign Up</h1>
            <form onSubmit={handleSignUpSubmit}>
              <input
                value={userInfo.email}
                onChange={({ target }) =>
                  setUserInfo({ ...userInfo, email: target.value })
                }
                type="email"
                placeholder="example@example.com"
              />
              <input
                value={userInfo.password}
                onChange={({ target }) =>
                  setUserInfo({ ...userInfo, password: target.value })
                }
                type="password"
                placeholder="******"
              />

              <input type="submit" value="sign up" />
            </form>
            <p>
              Already have an account?{' '}
              <a href="#" onClick={() => setIsSigningUp(false)}>
                Sign in
              </a>
            </p>
          </>
        ) : (
          <>
            <h1>Login</h1>
            <form onSubmit={handleSignInSubmit}>
              <input
                value={userInfo.email}
                onChange={({ target }) =>
                  setUserInfo({ ...userInfo, email: target.value })
                }
                type="email"
                placeholder="example@example.com"
              />
              <input
                value={userInfo.password}
                onChange={({ target }) =>
                  setUserInfo({ ...userInfo, password: target.value })
                }
                type="password"
                placeholder="******"
              />

              <input type="submit" value="login" />
            </form>
            <p>
              Don't have an account?{' '}
              <a href="#" onClick={() => setIsSigningUp(true)}>
                Sign up
              </a>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default SignIn;
