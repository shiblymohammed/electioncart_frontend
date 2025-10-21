import { NavLink } from 'react-router-dom';

/**
 * A persistent Header component.
 * NavLink is used for navigation. It automatically adds an "active" class
 * to the link that corresponds to the current URL, making styling easy.
 */
const Header = () => {
  const activeLinkStyle = {
    color: '#da3b3b',
    textDecoration: 'underline',
  };

  return (
    <header className="bg-card-bg sticky top-0 z-10 border-b-2 border-beige/20">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="font-display text-3xl text-red tracking-wider">ELECT.IO</div>
        <div className="flex space-x-8 font-body font-semibold">
          <NavLink 
            to="/" 
            style={({ isActive }) => isActive ? activeLinkStyle : undefined}
          >
            Home
          </NavLink>
          <NavLink 
            to="/about"
            style={({ isActive }) => isActive ? activeLinkStyle : undefined}
          >
            About
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Header;
