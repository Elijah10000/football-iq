import { HamburgerDiv, HamburgerButton, SidePanel } from 'styles/hamburgerBar-style'
import DarkMode from './DarkMode';
import { useState } from 'react';
import { useGlobalContext } from 'contexts/GlobalContext';
import React from 'react';
import { ThemeProvider } from 'styled-components';

interface HamburgerProps {
  isDarkMode?: boolean;
}

export const Hamburger = (props: HamburgerProps) => {
  const { isDarkMode } = useGlobalContext();
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleToggle = () => {
    setIsOpen(false);
  };

  return (
    <ThemeProvider theme={{ isDarkMode }}>
      <HamburgerDiv isDarkMode={isDarkMode}>
        <HamburgerButton isOpen={isOpen} onClick={toggleMenu} isDarkMode={isDarkMode}>
          <span></span>
        </HamburgerButton>
        <SidePanel isOpen={isOpen}>
          {isOpen && (
            <ul>
              <li><a href="login">Login</a></li>
              <li><DarkMode onToggle={handleToggle} /></li>
              <li>Option 3</li>
              <li>Option 4</li>
            </ul>
          )}
        </SidePanel>
      </HamburgerDiv>
    </ThemeProvider>
  );
};
  
export default Hamburger;