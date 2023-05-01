import { NextPage } from 'next';
import { FormEventHandler, useState } from 'react';
import { signIn } from 'next-auth/react';
import styles from 'styles/signin.module.css';

interface SignInProps { }

const SignIn: NextPage = (props: SignInProps): JSX.Element => {
  const [userInfo, setUserInfo] = useState({ email: '', password: '' });
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const res = await signIn('credentials', {
      email: userInfo.email,
      password: userInfo.password,
      redirect: false,
    });

    console.log(res);
  };

  return (
    <div className={styles['sign-in-container']}>
      <div className={styles['sign-in-form']}>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
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
          {/* <button href="/auth/signup"> <a>Don't have an account? Sign up here!</a> </button> */}
          <a href="/auth/signup">Don't have an account? Sign up here!</a>

        </form>
      </div>
    </div>
  );
};

export default SignIn;
