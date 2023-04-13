import { HamburgerContainer } from 'styles/hamburgerBar-style'

interface HamburgerBarProps {
    isOpen: boolean;
    onToggle: () => void;
  }
  
  const HamburgerBar = ({ isOpen, onToggle }: HamburgerBarProps) => {
    return (
        <HamburgerContainer>
      <button
        className={`hamburger-bar ${isOpen ? 'open' : ''}`}
        onClick={onToggle}
      >
      </button>
    </HamburgerContainer>
    );
  };
  
  export default HamburgerBar;