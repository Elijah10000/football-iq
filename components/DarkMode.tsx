import React from 'react';
import { useGlobalContext } from 'contexts/GlobalContext';
import { ToggleContainer, ToggleLabel, ToggleSwitch, GlobalStyles } from 'styles/darkmode-style';
import { ThemeProvider } from 'styled-components';

const theme = {
  isDarkMode: false,
};

const DarkMode = () => {
  const { isDarkMode, setIsDarkMode } = useGlobalContext();

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsDarkMode(event.target.checked);
  };

  return (
    <ThemeProvider theme={{ ...theme, isDarkMode }}>
      <GlobalStyles isDarkMode={isDarkMode} />
      <ToggleContainer>
      <ToggleLabel htmlFor="darkModeToggle" id="toggleLabel" isDarkMode={isDarkMode}>
          {isDarkMode ? 'Light Mode 🌕' : 'Dark Mode 🌑'}
        </ToggleLabel>
        <ToggleSwitch
          type="checkbox"
          id="toggle-switch"
          checked={isDarkMode}
          onChange={handleToggle}
        />
      </ToggleContainer>
    </ThemeProvider>
  );
};

export default DarkMode;
