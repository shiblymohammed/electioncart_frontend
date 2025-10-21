import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

/**
 * The Layout component defines the shell of your page.
 * It renders the Navbar, Footer, and the <Outlet />.
 * The <Outlet /> is a placeholder from react-router-dom where the content of
 * the current child route (like HomePage or AboutPage) will be displayed.
 */
const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Outlet /> {/* Child route components will be rendered here */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
