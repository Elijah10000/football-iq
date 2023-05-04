import React from 'react';
import { useGlobalContext } from 'contexts/GlobalContext';
import { ToggleContainer, ToggleLabel, ToggleSwitch, GlobalStyles } from 'styles/darkmode-style';
import { ThemeProvider } from 'styled-components';

interface DarkModeProps {
  onToggle: () => void;
}

const theme = {
  isDarkMode: false,
};

const DarkMode = ({ onToggle }: DarkModeProps) => {
  const { isDarkMode, setIsDarkMode } = useGlobalContext();

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsDarkMode(event.target.checked);
    onToggle();
};

  return (
    <ThemeProvider theme={{ ...theme, isDarkMode }}>
      <GlobalStyles isDarkMode={isDarkMode} />
      <ToggleContainer>
      <ToggleLabel htmlFor="darkModeToggle" id="toggleLabel" isDarkMode={isDarkMode}>
          {isDarkMode ? 'Light 🌞' : 'Dark 🌑'}
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
