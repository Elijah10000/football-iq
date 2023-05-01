import { useSession } from "next-auth/client";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      id
      email
    }
  }
`;

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [session] = useSession();
  const router = useRouter();

  const [signup, { loading, error }] = useMutation(SIGNUP_MUTATION, {
    onCompleted: () => {
      router.push("/login");
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await signup({ variables: { email, password } });
  };

  if (session) {
    router.push("/");
    return null;
  }

  return (
    <div>
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Sign up"}
        </button>
        {error && <p>{error.message}</p>}
      </form>
    </div>
  );
}
