import React, { useState } from 'react';
import { useGlobalContext } from 'contexts/GlobalContext';

const DarkMode = () => {
  const { isDarkMode, setIsDarkMode } = useGlobalContext();

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsDarkMode(event.target.checked);
  };

  return (
    <div>
      <div className="toggle-container">
        <label htmlFor="toggle-switch" id="toggle-label">
          Dark Mode 🌑
        </label>
        <input
          type="checkbox"
          id="toggle-switch"
          checked={isDarkMode}
          onChange={handleToggle}
        />
      </div>
    </div>
  );
};

export default DarkMode;