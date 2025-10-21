import { Routes, Route } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';

/**
 * AppRouter defines all the routes for the application.
 * The parent <Route> with the "Layout" element establishes the persistent UI.
 * Any <Route> nested inside it will be rendered where the <Outlet /> is placed.
 */
const AppRouter = () => {
  return (
    <Routes>
      {/* This route defines the main layout */}
      <Route path="/" element={<Layout />}>
        {/* The 'index' route is the default page shown at the parent's path ("/") */}
        <Route index element={<HomePage />} />

        {/* This is another page that uses the same layout */}
        <Route path="about" element={<AboutPage />} />
        
        {/* You can add more pages here, e.g., <Route path="contact" element={<ContactPage />} /> */}
      </Route>
    </Routes>
  );
};

export default AppRouter;
