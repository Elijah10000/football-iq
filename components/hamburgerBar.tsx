import { HamburgerDiv, HamburgerButton, SidePanel, StyledButton, StyledGreeting, DarkModeDiv, GreetingText, GreetingImage } from 'styles/hamburgerBar-style'
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
            <ul> {session ? (<StyledGreeting> <GreetingText>Hi, {session.user?.name.split(' ')[0]}!</GreetingText>{session.user?.image && <GreetingImage src={session.user.image} alt={session.user.name} />} </StyledGreeting>
            ) : null}
              <li><StyledButton><a href="/">Home</a></StyledButton></li>
              <li>
                <StyledButton onClick={handleLogin}> {session ? 'Sign out' : 'Login'}</StyledButton>
              </li>
              <li><StyledButton><a href="/About">About Us</a></StyledButton></li>
              <li><StyledButton><a href="/topPlayers">Top Players</a></StyledButton></li>
              <li><DarkModeDiv><DarkMode onToggle={handleToggle} /></DarkModeDiv></li>
            </ul>
          )}
        </SidePanel>
      </HamburgerDiv>
    </ThemeProvider>
  );
};

export default Hamburger;
