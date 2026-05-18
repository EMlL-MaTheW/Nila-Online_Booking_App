// Footer 
import {menuSections,conditions,policies} from '../../data/footer';

const Footer: React.FC = () => {

  return (
    <footer id="footer-main" className="bg-gradient-to-b from-[#5a8f6f] to-[#4a7d5f] text-gray-900 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {menuSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-bold text-gray-900 mb-6">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <a href="#" className="text-gray-800 hover:text-white transition-colors font-medium hover:underline">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-6">Connect Us</h3>
            <p className="text-gray-800 font-medium mb-2 text-lg">+91 85909 25353</p>
            <p className="text-gray-800 font-medium mb-6 text-lg">help@nila.me</p>
            <div className="flex gap-4">
              {["facebook-f", "instagram", "linkedin-in", "youtube"].map((icon) => (
                <a
                  key={icon}
                  href="#"
                  className="w-12 h-12 bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white hover:text-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                  aria-label={icon}
                >
                  <i className={`fa-brands fa-${icon} text-white text-sm`}></i>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 pb-12 border-b border-gray-600/50">
          
          <div>
            <h4 className="font-bold text-gray-900 text-lg mb-4">Conditions</h4>
            <ul className="space-y-2 text-sm">
              {conditions.map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-800 hover:text-white transition-colors block py-1 hover:underline">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 text-lg mb-4">Policies</h4>
            <ul className="space-y-2 text-sm">
              {policies.map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-800 hover:text-white transition-colors block py-1 hover:underline">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2 lg:col-span-1 flex flex-col gap-4">
            <div>
              <h4 className="font-bold text-gray-900 text-lg mb-4">Join Our Community</h4>
              <p className="text-gray-800 text-sm mb-6 leading-relaxed">
                Join us at Nila and let's navigate this path together!
              </p>
              <button className="bg-cyan-400 text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-cyan-300 transition-all duration-300 shadow-lg w-full text-sm">
                Join community
              </button>
              <button className="mt-4 border-2 border-cyan-400 text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-cyan-400 hover:text-white transition-all duration-300 shadow-lg w-full text-sm">
                We're Hiring
              </button>
            </div>
          </div>
        </div>

        <div className="text-center pt-8">
          <p className="text-gray-800 text-sm font-medium">
            &copy; 2026 Nila. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
