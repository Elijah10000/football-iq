import styled from 'styled-components';

export const SignInForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;

  h1 {
    margin-bottom: 1rem;
  }

  input {
    margin-bottom: 1rem;
    padding: 0.5rem;
    border: none;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    outline: none;

    &:focus {
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    }
  }

  input[type="submit"] {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 5px;
    background-color: #0070f3;
    color: #fff;
    font-weight: bold;
    cursor: pointer;

    &:hover {
      background-color: #0060df;
    }

    &:active {
      background-color: #004fbf;
    }
  }
`;
