import { HamburgerDiv, HamburgerButton, SidePanel } from 'styles/hamburgerBar-style'
import DarkMode from './DarkMode';
import { useState } from 'react';
import { useGlobalContext } from 'contexts/GlobalContext';
import React from 'react';


interface HamburgerProps {}

export const Hamburger = (props: HamburgerProps) => {
  const { isDarkMode } = useGlobalContext();
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
     <HamburgerDiv isDarkMode={isDarkMode}>
      <HamburgerButton isOpen={isOpen} onClick={toggleMenu}>
        <span></span>
      </HamburgerButton>
      <SidePanel isOpen={isOpen}>
        {isOpen && (
          <ul>
          <li><a href="login">Login</a></li>
            <li><DarkMode /></li>
            <li>Option 3</li>
            <li>Option 4</li>
          </ul>
        )}
      </SidePanel>
    </HamburgerDiv>
  );
};
  
export default Hamburger;