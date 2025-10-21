import { Link } from 'react-router-dom';

/**
 * A responsive navigation bar component for the election application.
 */
const Navbar = () => {
    return (
        <nav className="bg-blue-900 text-white shadow-lg">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo/Brand */}
                    <div className="flex items-center">
                        <Link to="/" className="text-xl font-bold text-white hover:text-blue-200 transition-colors">
                            🗳️ Elect.io
                        </Link>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden md:flex space-x-8">
                        <Link 
                            to="/" 
                            className="text-white hover:text-blue-200 transition-colors font-medium"
                        >
                            Home
                        </Link>
                        <Link 
                            to="/about" 
                            className="text-white hover:text-blue-200 transition-colors font-medium"
                        >
                            About
                        </Link>
                        <Link 
                            to="/elections" 
                            className="text-white hover:text-blue-200 transition-colors font-medium"
                        >
                            Elections
                        </Link>
                        <Link 
                            to="/results" 
                            className="text-white hover:text-blue-200 transition-colors font-medium"
                        >
                            Results
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button className="text-white hover:text-blue-200 focus:outline-none">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;