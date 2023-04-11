import styled, { createGlobalStyle } from 'styled-components';

export const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1rem 0;
`;

interface ToggleLabelProps {
    isDarkMode: boolean;
  }

export const ToggleLabel = styled.label<ToggleLabelProps>`
  font-size: 1.2rem;
  color: ${props => (props.isDarkMode ? '#fff' : '#000')};
  margin-right: 1rem;
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
  