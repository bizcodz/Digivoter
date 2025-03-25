import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import React from 'react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />
      
      <main className="pt-32 pb-20">
        {/* Hero Section */}
        <section className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="text-center mb-8 animate-fade-in">
            <div className="badge mb-4 animate-fade-in">
              Rethinking Voter Verification
            </div>
            
            <h1 className="hero-heading mb-8">
              <span className="text-foreground">A Seamless </span>
              <span className="text-primary">Voting Experience</span>
              <br />
              <span className="text-foreground">for Everyone</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in">
              Inspired by modern check-in systems, we've created a faster, more
              secure way to verify voters at polling stations.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 animate-fade-in">
              <Link to="/registration" className="btn-primary">
                Register Now
                <svg className="ml-2 inline-block" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Link>
              <Link to="/verification" className="btn-secondary">
                Try Verification Demo
              </Link>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="container mx-auto px-4 md:px-6 max-w-6xl mt-32">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="section-heading mb-6">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our secure verification system uses QR codes and facial recognition to eliminate voter fraud
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="card-glass p-6 animate-slide-in">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Register Online</h3>
              <p className="text-muted-foreground">
                Create your account and complete your voter registration when it opens. Verify your identity with secure authentication.
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="card-glass p-6 animate-slide-in" style={{ animationDelay: '100ms' }}>
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Receive QR Code</h3>
              <p className="text-muted-foreground">
                After registration, you'll receive a unique QR code that stores your secured voter information for verification.
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="card-glass p-6 animate-slide-in" style={{ animationDelay: '200ms' }}>
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 8a7.002 7.002 0 0 0-7 7"></path>
                  <path d="M9 1v3"></path>
                  <path d="M15 1v3"></path>
                  <path d="M9 20v3"></path>
                  <path d="M15 20v3"></path>
                  <path d="M20 9h3"></path>
                  <path d="M20 15h3"></path>
                  <path d="M1 9h3"></path>
                  <path d="M1 15h3"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Verify at Kiosk</h3>
              <p className="text-muted-foreground">
                At the polling station, scan your QR code and complete facial recognition to verify your identity and prevent fraud.
              </p>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="container mx-auto px-4 md:px-6 max-w-6xl mt-32">
          <div className="bg-blue-50 text-center py-16 px-6 rounded-2xl mx-auto max-w-4xl">
            <h2 className="section-heading mb-6">Ready to Experience Secure Voting?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Join the movement for more secure, efficient, and accessible voting technology.
            </p>
            <Link to="/signup" className="btn-primary inline-block bg-white text-blue-600 border border-blue-600 py-3 px-6 rounded-full text-lg font-medium hover:bg-blue-600 hover:text-white transition">
              Create Your Account
            </Link>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-100 py-6 px-8">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-6 md:mb-0">
              <div className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white font-bold rounded-lg shadow-md">
                V
              </div>
              <span className="text-lg font-bold">DigiVoter</span>
            </div>
            
            <div className="flex space-x-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition">Terms</a>
              <a href="#" className="hover:text-foreground transition">Privacy</a>
              <a href="#" className="hover:text-foreground transition">Contact</a>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} DigiVoter. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
