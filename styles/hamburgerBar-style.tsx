import styled from 'styled-components';

export const HamburgerDiv = styled.div<{ isDarkMode?: boolean }>`
  ${({ isDarkMode }) => isDarkMode && 'background-color: black;'};
  position: relative;
  margin-left: 1%;
  margin-top: 1%;
`;

 export const HamburgerButton = styled.button<{ isOpen: boolean }>`
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
    background-color: #000;
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
  width: 10%;
  max-height: ${({ isOpen }) => (isOpen ? '200px' : '0')};
  overflow: hidden;
  transition: max-height 0.2s ease-in-out;
  background-color: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    padding-top: 10px;
    cursor: pointer;

    &:hover {
      background-color: #f5f5f5;
    }
  }
`;