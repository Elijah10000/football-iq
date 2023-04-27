import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const MainDiv = styled.div<{ isDarkMode?: boolean }>`
  ${({ isDarkMode }) => isDarkMode && 'background-color: black;'};
  overflow: hidden;
`;

export const Container = styled.div<{ isDarkMode?: boolean }>`
  ${({ isDarkMode }) => isDarkMode && 'background-color: black;'};
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

export const Title = styled.h1<{ isDarkMode?: boolean }>`
  ${({ isDarkMode }) => isDarkMode && 'color: white;'};
  font-size: 3rem;
  margin-bottom: 1rem;

  &:hover {
    opacity: 0.7;
  }

  animation: ${fadeIn} 0.5s ease-in-out;
`;

export const Text = styled.p<{ isDarkMode?: boolean }>`
  ${({ isDarkMode }) => isDarkMode && 'color: white;'};
  font-size: 1.2rem;
  line-height: 1.5;
  margin-bottom: 2rem;

  &:hover {
    opacity: 0.7;
  }

  animation: ${fadeIn} 0.5s ease-in-out;
`;

export const LogoDiv = styled.div<{ isDarkMode?: boolean }>`
  ${({ isDarkMode }) => isDarkMode && 'background-color: black;'};
  margin: auto;
  display: flex;
  justify-content: center;
  margin-top: 2%;
  animation: ${fadeIn} 0.5s ease-in-out;

  &:hover {
    opacity: 0.7;
  }
`;

