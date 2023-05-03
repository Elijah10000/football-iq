import styled from 'styled-components';

export const HamburgerDiv = styled.div<{ isDarkMode?: boolean }>`
  ${({ isDarkMode }) => isDarkMode && 'background-color: black;'};
  position: relative;
  margin-left: 1%;
  margin-top: 1%;
`;

export const HamburgerButton = styled.button<{ isOpen: boolean; isDarkMode?: boolean }>`
  background-color: ${({ isDarkMode }) => isDarkMode ? 'black' : 'white'};
  display: block;
  width: 30px;
  height: 22px;
  position: relative;
  cursor: pointer;
  border: none;

  &::before,
  &::after,
  span {
    content: "";
    width: 100%;
    height: 2px;
    background-color: ${({ isDarkMode }) => isDarkMode ? 'white' : 'black'};
    position: absolute;
    left: 0;
    transition: transform 0.2s ease-in-out;
  }
  
  &::before {
    top: ${({ isOpen }) => (isOpen ? '50%' : '0')};
    transform: ${({ isOpen }) => (isOpen ? 'rotate(45deg)' : 'rotate(0)')};
  }
  
  &::after {
    top: ${({ isOpen }) => (isOpen ? '50%' : '100%')};
    transform: ${({ isOpen }) => (isOpen ? 'rotate(-45deg)' : 'rotate(0)')};
  }
  
  span {
    transform: translateY(-50%);
  }
`;

export const SidePanel = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  overflow: hidden;
  transition: max-height 0.2s ease-in-out;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

  ul {
    padding: 0;
  }

  li {
    padding-top: 10px;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }
`;

export const StyledButton = styled.button<{ isDarkMode?: boolean }>`
  /* background-color: ${({ isDarkMode }) => isDarkMode ? 'black' : 'white'}; */
  /* color: ${({ isDarkMode }) => isDarkMode ? 'white' : 'black'}; */
  border: none;
  border-radius: 4px;
  padding: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

export const StyledGreeting = styled.button<{ isDarkMode?: boolean }>`
  /* background-color: ${({ isDarkMode }) => isDarkMode ? 'red' : 'red'}; */
  /* color: ${({ isDarkMode }) => isDarkMode ? 'white' : 'black'}; */
  border: none;
  border-radius: 4px;
  padding: 5px;
  font-size: 16px;
  font-style: italic; 
  margin-bottom: 2%;
`;

export const DarkModeDiv = styled.div`
 padding: 5px;
 font-size: 16px;
 font-weight: bold;
 margin-left: 2%;
`;
