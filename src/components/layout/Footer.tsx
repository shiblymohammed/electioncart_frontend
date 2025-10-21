/**
 * A persistent Footer component that will appear on all pages using this layout.
 */
const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-12 mt-auto">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="md:col-span-1">
                        <h3 className="text-xl font-bold mb-4">🗳️ Elect.io</h3>
                        <p className="text-gray-300 text-sm">
                            Empowering democracy through secure, transparent, and accessible digital voting solutions.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="/" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
                            <li><a href="/about" className="text-gray-300 hover:text-white transition-colors">About</a></li>
                            <li><a href="/elections" className="text-gray-300 hover:text-white transition-colors">Elections</a></li>
                            <li><a href="/results" className="text-gray-300 hover:text-white transition-colors">Results</a></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="font-semibold mb-4">Support</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="/help" className="text-gray-300 hover:text-white transition-colors">Help Center</a></li>
                            <li><a href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact Us</a></li>
                            <li><a href="/privacy" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
                            <li><a href="/terms" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-semibold mb-4">Contact</h4>
                        <div className="space-y-2 text-sm text-gray-300">
                            <p>📧 support@elect.io</p>
                            <p>📞 1-800-ELECT-IO</p>
                            <p>🏢 123 Democracy Ave<br />Election City, EC 12345</p>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-400 text-sm">
                        &copy; 2025 Elect.io - All Rights Reserved.
                    </p>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                            <span className="sr-only">Facebook</span>
                            📘
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                            <span className="sr-only">Twitter</span>
                            🐦
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                            <span className="sr-only">LinkedIn</span>
                            💼
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
