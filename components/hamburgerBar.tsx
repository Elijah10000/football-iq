import { HamburgerDiv, HamburgerButton, SidePanel, StyledButton, StyledGreeting, DarkModeDiv } from 'styles/hamburgerBar-style'
import DarkMode from './DarkMode';
import { useState } from 'react';
import { useGlobalContext } from 'contexts/GlobalContext';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { useSession, signIn, signOut } from 'next-auth/react';

interface HamburgerProps {
  isDarkMode?: boolean;
}

export const Hamburger = (props: HamburgerProps) => {
  const { isDarkMode } = useGlobalContext();
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleToggle = () => {
    setIsOpen(false);
  };

  const handleLogin = () => {
    if (session) {
      signOut();
    } else {
      signIn();
    }
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
              {session ? <StyledGreeting>Hi, {session.user?.name}!</StyledGreeting> : null}
              <li><StyledButton a href="/">Home</StyledButton></li>
              <li>
                <StyledButton onClick={handleLogin}> {session ? 'Sign out' : 'Login'}</StyledButton>
              </li>
              <li><StyledButton a href="/About">About Us</StyledButton></li>
              <li><StyledButton>Transfer News</StyledButton></li>
              <li><DarkModeDiv><DarkMode onToggle={handleToggle} /></DarkModeDiv></li>
            </ul>
          )}
        </SidePanel>
      </HamburgerDiv>
    </ThemeProvider>
  );
};

export default Hamburger;
