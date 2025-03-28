const Footer = () => {
    return (
      <footer className="bg-gradient-to-r from-blue-900 to-blue-700 text-gray-200 py-10 w-full" style={{zIndex: 10}}>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <h3 className="text-white text-xl font-bold mb-4">Vehicle Admin</h3>
              <p className="text-sm leading-relaxed">Empowering vehicle management with innovative solutions and real-time insights.</p>
            </div>
  
            <div>
              <h3 className="text-white text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-blue-300 transition duration-300">Dashboard</a></li>
                <li><a href="#" className="hover:text-blue-300 transition duration-300">Vehicles</a></li>
                <li><a href="#" className="hover:text-blue-300 transition duration-300">Drivers</a></li>
                <li><a href="#" className="hover:text-blue-300 transition duration-300">Support</a></li>
              </ul>
            </div>
  
            <div>
              <h3 className="text-white text-xl font-bold mb-4">Contact Us</h3>
              <p className="text-sm">Email: <a href="mailto:support@vehicleadmin.com" className="hover:text-blue-300">support@vehicleadmin.com</a></p>
              <p className="text-sm mt-2">Phone: <a href="tel:5551234567" className="hover:text-blue-300">(555) 123-4567</a></p>
              <div className="flex space-x-6 mt-4">
                <a href="#" className="text-2xl hover:text-blue-300 transition duration-300"><i className="fab fa-twitter"></i></a>
                <a href="#" className="text-2xl hover:text-blue-300 transition duration-300"><i className="fab fa-facebook"></i></a>
                <a href="#" className="text-2xl hover:text-blue-300 transition duration-300"><i className="fab fa-linkedin"></i></a>
              </div>
            </div>
          </div>
  
          <div className="border-t border-blue-800 mt-10 pt-6 text-center text-sm">
            <p>© {new Date().getFullYear()} Vehicle Admin Dashboard. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;