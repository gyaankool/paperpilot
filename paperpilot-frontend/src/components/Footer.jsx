import React from 'react';
import { Mail, Phone, MapPin, Building2 } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-[#002C79] to-[#175ACD] text-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white">
                PaperPilot
              </h3>
            </div>
            <p className="text-blue-100 text-sm leading-relaxed">
              A product of GyaanKool Research labs private limited
            </p>
            <p className="text-blue-200 text-sm font-medium">
              Empowering Research Excellence
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-blue-200 mt-0.5 flex-shrink-0" />
                <div>
                  <a 
                    href="mailto:gyaankool@gmail.com" 
                    className="text-blue-100 hover:text-white transition-colors duration-300 text-sm"
                  >
                    gyaankool@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-blue-200 mt-0.5 flex-shrink-0" />
                <div>
                  <a 
                    href="tel:+919591009606" 
                    className="text-blue-100 hover:text-white transition-colors duration-300 text-sm"
                  >
                    +91 95910 09606
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Registered Office */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Registered Office</h4>
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-blue-200 mt-0.5 flex-shrink-0" />
              <div className="text-blue-100 text-sm leading-relaxed">
                <p>Om Chambers, 648/A, 4th floor,</p>
                <p>Binnamangala, Indiranagar (Bangalore),</p>
                <p>Karnataka, India, 560038</p>
              </div>
            </div>
          </div>

          {/* Operating Office */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Operating Office</h4>
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-blue-200 mt-0.5 flex-shrink-0" />
              <div className="text-blue-100 text-sm leading-relaxed">
                <p>5/3, ESS CEE Building, MSR Industrial Area,</p>
                <p>12th Main, 2nd Cross, Mathikere Extension,</p>
                <p>Bengaluru, Karnataka 560054</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-blue-200 text-sm">
              © {new Date().getFullYear()} GyaanKool Research Labs Private Limited. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-white/30 rounded-full"></div>
              <p className="text-blue-200 text-sm">
                Transforming Academic Publishing
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
