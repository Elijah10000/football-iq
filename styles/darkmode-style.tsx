import styled, { createGlobalStyle } from 'styled-components';

export const ToggleContainer = styled.div`
  display: flex;
  align-items: center;  
  margin-top:  1%;
  margin-right: 2%;
`;

interface ToggleLabelProps {
    isDarkMode: boolean;
  }

export const ToggleLabel = styled.label<ToggleLabelProps>`
  color: ${props => (props.isDarkMode ? '#fff' : '#3f3f3f')};
`;

export const ToggleSwitch = styled.input`
  position: relative;
  margin-left: 4%;
  width: 20px;
  height: 20px;
  appearance: none;
  background-color: #ccc;
  border-radius: 20px;
  outline: none;
  cursor: pointer;
  
  &:before {
    content: "";
    position: absolute;
    top: 2px;
    left: 2px;
    width: 16px;
    height: 16px;
    background-color: #fff;
    border-radius: 50%;
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
  