import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #fff;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f2f2f2;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px #ccc;
`;

export const Input = styled.input`
  margin-bottom: 20px;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: none;
  box-shadow: 0px 0px 5px #ccc;
`;

export const Button = styled.button`
  padding: 10px 20px;
  background-color: #333;
  color: #fff;
  font-size: 16px;
  border-radius: 5px;
  border: none;
  box-shadow: 0px 0px 5px #ccc;
  cursor: pointer;
`;

export const ErrorMessage = styled.div`
  margin-top: 10px;
  color: #ff0000;
  font-size: 14px;
`;
