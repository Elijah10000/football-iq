import styled, { createGlobalStyle } from 'styled-components';

export const ToggleContainer = styled.div`
  display: flex;
  align-items: center;  
  justify-content: flex-end;
  margin-top:  1%;
  margin-right: 2%;
`;

interface ToggleLabelProps {
    isDarkMode: boolean;
  }

export const ToggleLabel = styled.label<ToggleLabelProps>`
  color: ${props => (props.isDarkMode ? '#fff' : '#3f3f3f')};
  margin-right: 0.5rem;
  margin-bottom: 0.2rem;
`;

export const ToggleSwitch = styled.input`
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
  margin: 0;
  appearance: none;
  background-color: #ccc;
  border-radius: 20px;
  outline: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:before {
    content: "";
    position: absolute;
    top: 2px;
    left: 2px;
    width: 16px;
    height: 16px;
    background-color: #fff;
    border-radius: 50%;
    transition: transform 0.2s ease;
  }
  
  &:checked:before {
    transform: translateX(20px);
  }
  
  &:checked {
    background-color: green;
  }
`;

interface GlobalStylesProps {
    isDarkMode: boolean;
  }
  
  export const GlobalStyles = createGlobalStyle<GlobalStylesProps>`
    body {
      background-color: ${props => props.isDarkMode ? 'black' : 'white'};
      color: ${props => props.isDarkMode ? 'white' : 'black'};
    }
  `;
  