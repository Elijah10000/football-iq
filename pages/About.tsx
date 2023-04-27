import React from 'react';
import { Container, Title, Text, MainDiv, LogoDiv } from 'styles/about-style';
import Hamburger from 'components/hamburgerBar'
import { useGlobalContext } from 'contexts/GlobalContext';

const About: React.FC = () => {
  const { isDarkMode } = useGlobalContext();
  return (
    <MainDiv isDarkMode={isDarkMode}>
      <Hamburger />
      <LogoDiv>
          <div>
            <h1><a href="/" style={{ color: isDarkMode ? "white" : "black" }}>Football IQ 🧠</a></h1>
          </div>
        </LogoDiv>
      <Container isDarkMode={isDarkMode}>
        <Title isDarkMode={isDarkMode}>About Us</Title>
        <Text isDarkMode={isDarkMode}>
          Welcome to Football IQ, a website dedicated to providing the most comprehensive and up-to-date information on all aspects of the beautiful game. Our site is designed to offer football fans and enthusiasts the opportunity to dive deep into the world of football statistics and to explore the many fascinating stories that are hidden within the numbers.
        </Text>
        <Text isDarkMode={isDarkMode}>
          Our site is built on a foundation of simplicity and user-friendliness, with a focus on providing a seamless user experience that is both informative and enjoyable. We understand that there are many different types of football fans out there, and we aim to cater to all of them with our wide range of features and tools.
        </Text>
        <Text isDarkMode={isDarkMode}>
          At the heart of our site is our search bar, which allows you to easily find the information you are looking for, such as team or player statistics. Our dropdown menu makes it easy to navigate our site and find the information you need quickly and easily.
        </Text>
        <Text isDarkMode={isDarkMode}>
          We also offer a range of customization options, including a sleek and stylish dark mode that is perfect for those late-night browsing sessions. Our hamburger bar provides easy access to all of our extra features and settings, such as a section dedicated to transfer news, making it simple to customize your experience and find the information you need.
        </Text>
        <Text isDarkMode={isDarkMode}>
          One of the key features of our site is the ability to view detailed team and player statistics, with infographics that bring the numbers to life and help you to better understand the numbers. Our comparison feature allows you to compare the statistics of different players, giving you a deeper insight into their strengths and weaknesses.
        </Text>
        <Text isDarkMode={isDarkMode}>
          We understand that football is a social game, and we make it easy to share your favorite stats and stories with friends and fellow fans. Whether you are looking to share a particularly impressive statistic or simply want to discuss the latest transfer news, our site is the perfect place to connect with other football fans from around the world.
        </Text>
        <Text isDarkMode={isDarkMode}>
          At Football IQ, we are committed to providing you with the most comprehensive and accurate information on all aspects of the game. We are constantly updating our site with the latest statistics and news, ensuring that you always have access to the most up-to-date information.
        </Text>
        <Text isDarkMode={isDarkMode}>
          Thank you for visiting Football IQ, and we hope that you enjoy exploring the fascinating world of football statistics with us.
        </Text>
      </Container >
    </MainDiv>
  );
};

export default About;
