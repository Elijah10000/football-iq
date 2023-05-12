import React from 'react';
import { Container, Title, Text, MainDiv, LogoDiv } from 'styles/about-style';
import Hamburger from 'components/hamburgerBar'
import { useGlobalContext } from 'contexts/GlobalContext';
import { useEffect } from 'react';

const About: React.FC = () => {
  const { isDarkMode, setIsDarkMode } = useGlobalContext();

  useEffect(() => {
    const darkModeOn = localStorage.getItem("isDarkMode");
    if (darkModeOn === "true") {
      setIsDarkMode(true)
    } else {
      setIsDarkMode(false)

    }
  })

  return (
    <MainDiv isDarkMode={isDarkMode}>
      <Hamburger />
      <LogoDiv>
        <div>
          <h1><a href="/" style={{ color: isDarkMode ? "white" : "black" }}>Football IQ 🧠</a></h1>
        </div>
      </LogoDiv>
      <Container isDarkMode={isDarkMode}>
        <Title isDarkMode={isDarkMode}>
          About Us
        </Title>
        <Text isDarkMode={isDarkMode}>
          Welcome to Football IQ, a website dedicated to providing the most comprehensive and up-to-date information on all aspects of the beautiful game. Our site is designed to offer football fans and enthusiasts the opportunity to dive deep into the world of football statistics and to explore the many fascinating stories that are hidden within the numbers.
        </Text>
        <Text isDarkMode={isDarkMode}>
          Our site is built on a foundation of simplicity and user-friendliness, with a focus on providing a seamless user experience that is both informative and enjoyable. We understand that there are many different types of football fans out there, and we aim to cater to all of them with our wide range of features and tools.
        </Text>
        <Text isDarkMode={isDarkMode}>
          At the core of our website lies the powerful search bar that enables you to quickly and easily access information about your favorite football teams. By simply typing in the name of a team, you can instantly discover a wealth of data, making our site user-friendly and enjoyable to use. In addition to the search bar, we also offer a user-friendly dropdown menu that further streamlines site navigation. This feature is particularly useful for users who are looking to quickly find specific information, who don't want to miss a thing. Together, the search bar and dropdown menu make our website the go-to destination for all football enthusiasts, due to it's power and ease of use.
        </Text>
        <Text isDarkMode={isDarkMode}>
          We also offer a range of customization options, including a sleek and stylish dark mode that is perfect for those late-night browsing sessions. Our hamburger bar provides easy access to all of our extra features and settings, such as a section dedicated to the best players in Europe, making it simple to customize your experience and find the information you need.
        </Text>
        <Text isDarkMode={isDarkMode}>
          One of the key features of our site is the ability to view detailed team and player statistics, with infographics that bring the numbers to life and help you to better understand the numbers. Here, you can find key stats that are relevant to each player, along with an in-depth breakdown of other statistics that provide further insight into how your favorite players play!
        </Text>
        <Text isDarkMode={isDarkMode}>
          Our site also uses Google authentication to keep your account safe and secure from hackers. With the built in 2-factor authentication, you'll be notified whenever your account has been used, whether is was you or not. We make sure your information is safe, always!
        </Text>
        <Text isDarkMode={isDarkMode}>
          The comparison feature is an essential tool for anyone interested in analyzing the performance of different players in a given sport or game. It offers a comprehensive analysis of the statistics of each player, allowing you to compare and contrast their strengths and weaknesses. This feature helps you to identify the areas where a player excels and those that they need to work on. With this information, you can make informed decisions when it comes to selecting players for your team or assessing the performance of your opponents. By using the comparison feature, you can gain a deeper insight into the performance of players and make more informed decisions, which can lead to better outcomes in the game or sport.
        </Text>
        <Text isDarkMode={isDarkMode}>
          With our share CTA button, you can now easily share your favorite football stats with your friends and family with just a few clicks. Imagine being able to share goals, and player statistics with your buddies, no matter where they are in the world! Whether you're an aspiring football coach, a die-hard fan, or simply someone who loves to stay on top of the latest stats, our Share via Email feature is the perfect way to take your love of football to the next level. So why wait? Sign up today and start sharing your favorite football stats with the world!
        </Text>
        <Text isDarkMode={isDarkMode}>
          Our 'Top Players' feature that allows users to search for the best players in Europe is an exciting and valuable addition to any sports-focused website. Not only does it provide a great user experience, but it also enhances engagement by keeping you informed. The feature provides player statistics, rankings, and other relevant information, covering the best leagues in Europe so you'll never miss a beat!
        </Text>
        <Text isDarkMode={isDarkMode}>
          At Football IQ, we are committed to providing you with the most comprehensive and accurate information on all aspects of the game. We are constantly updating our site with the latest statistics, ensuring that you always have access to the most up-to-date information.
        </Text>
        <Text isDarkMode={isDarkMode}>
          Thank you for visiting Football IQ, and we hope that you enjoy exploring the fascinating world of football statistics with us.
        </Text>
      </Container >
    </MainDiv>
  );
};

export default About;
