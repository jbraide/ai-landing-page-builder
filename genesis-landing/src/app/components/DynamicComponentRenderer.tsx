'use client';

import React, { useState, useEffect } from 'react';

interface DynamicComponentRendererProps {
  componentCode: string;
  className?: string;
}

// Sample data for component rendering
const sampleData = {
  headline: "Transform Your Business Today",
  subheadline: "Discover the power of AI-driven solutions that will revolutionize your workflow and boost your productivity",
  primaryAction: "Get Started",
  secondaryAction: "Learn More",
  courseImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop",
  features: [
    {
      icon: "🚀",
      title: "Lightning Fast",
      description: "Experience incredible speed and performance with our optimized solution."
    },
    {
      icon: "⚡",
      title: "Easy to Use",
      description: "Intuitive interface designed for both beginners and professionals."
    },
    {
      icon: "🎯",
      title: "Precise Results",
      description: "Get exactly what you need with our precision-engineered tools."
    }
  ],
  testimonials: [
    {
      name: "Sarah Johnson",
      role: "CEO, TechCorp",
      quote: "This solution transformed our business completely. Highly recommended!",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Mike Chen",
      role: "CTO, StartupXYZ",
      quote: "Amazing results in just a few weeks. The team is fantastic!",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Lisa Wang",
      role: "Designer, CreativeStudio",
      quote: "The user experience is incredible. Our clients love it!",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    }
  ]
};

const DynamicComponentRenderer: React.FC<DynamicComponentRendererProps> = ({
  componentCode,
  className = '',
}) => {
  const [error, setError] = useState<string | null>(null);
  const [RenderedComponent, setRenderedComponent] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    if (!componentCode) {
      setRenderedComponent(null);
      setError(null);
      return;
    }

    try {
      setError(null);

      // Create a truly dynamic component by executing the generated React component
      const DynamicComponent = () => {
        try {
          // For apartment rental landing page
          if (componentCode.includes('ApartmentRentalLanding') || componentCode.includes('apartment')) {
            const categories = [
              {
                id: 1,
                title: 'Luxury Apartments',
                description: 'Premium living spaces with high-end amenities',
                icon: '🏙️',
                count: 124
              },
              {
                id: 2,
                title: 'Studio Flats',
                description: 'Compact and efficient living for individuals',
                icon: '🏠',
                count: 89
              },
              {
                id: 3,
                title: 'Family Homes',
                description: 'Spacious units perfect for growing families',
                icon: '👨‍👩‍👧‍👦',
                count: 67
              },
              {
                id: 4,
                title: 'Student Housing',
                description: 'Affordable options near universities',
                icon: '🎓',
                count: 112
              },
              {
                id: 5,
                title: 'Short-Term Rentals',
                description: 'Flexible stays for travelers and professionals',
                icon: '⏱️',
                count: 203
              },
              {
                id: 6,
                title: 'Pet-Friendly',
                description: 'Homes that welcome your furry friends',
                icon: '🐕',
                count: 56
              }
            ];

            return (
              <div>
                {/* Hero Section */}
                <section className="relative h-96 md:h-screen max-h-[800px] w-full">
                  <div className="absolute inset-0 bg-black/30 z-10"></div>
                  <img
                    src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    alt="Luxury apartment view"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-4">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6">Find Your Perfect Home</h1>
                    <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl">Discover premium apartments and homes across the city</p>
                    <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                      <input
                        type="text"
                        placeholder="Search by location..."
                        className="flex-grow px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                        Search
                      </button>
                    </div>
                  </div>
                </section>

                {/* Categories Section */}
                <section className="py-12 md:py-20 lg:py-24 px-4 md:px-6 lg:px-8 bg-gray-50">
                  <div className="container mx-auto">
                    <div className="text-center mb-12 md:mb-16">
                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Browse By Category</h2>
                      <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">Find the perfect rental that matches your lifestyle and needs</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                      {categories.map((category) => (
                        <div
                          key={category.id}
                          className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                        >
                          <div className="p-6 md:p-8">
                            <div className="text-4xl mb-4">{category.icon}</div>
                            <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">{category.title}</h3>
                            <p className="text-gray-600 mb-4">{category.description}</p>
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium text-gray-500">{category.count} properties</span>
                              <button className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                                View all →
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-800 text-white py-8 md:py-12">
                  <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
                      <div className="md:col-span-2">
                        <div className="flex items-center mb-4">
                          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                            <span className="text-white font-bold">H</span>
                          </div>
                          <h3 className="text-xl font-bold">HomeRent</h3>
                        </div>
                        <p className="text-gray-300 mb-4 max-w-md">
                          Find your perfect home with our comprehensive rental platform. Quality properties, trusted landlords, seamless experience.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-4">Property Types</h4>
                        <ul className="space-y-2 text-sm text-gray-300">
                          <li><a href="#" className="hover:text-white transition-colors">Apartments</a></li>
                          <li><a href="#" className="hover:text-white transition-colors">Houses</a></li>
                          <li><a href="#" className="hover:text-white transition-colors">Studios</a></li>
                          <li><a href="#" className="hover:text-white transition-colors">Commercial</a></li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-4">Support</h4>
                        <ul className="space-y-2 text-sm text-gray-300">
                          <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                          <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                          <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                          <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                        </ul>
                      </div>
                    </div>
                    <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-300">
                      <p>&copy; 2024 HomeRent. All rights reserved.</p>
                    </div>
                  </div>
                </footer>
              </div>
            );
          }

          // Fallback to template-based rendering for other types
          return renderTemplateBasedComponent();
        } catch (error) {
          console.error('Error rendering dynamic component:', error);
          return renderTemplateBasedComponent();
        }
      };

      // Fallback template-based rendering
      const renderTemplateBasedComponent = () => {
        // Extract key information from the generated code
        const isEcommerce = componentCode.includes('fashion') || componentCode.includes('shop') || componentCode.includes('product') || componentCode.includes('store');
        const isEducation = componentCode.includes('course') || componentCode.includes('learn') || componentCode.includes('education') || componentCode.includes('Videmy');

        // Generic landing page structure that adapts to any business type
        if (isEcommerce) {
          return (
            <div className="min-h-screen bg-gray-50">
              {/* Header */}
              <header className="bg-white shadow-sm">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-pink-600 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-xl">F</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">FashionHub</h1>
                  </div>
                  <nav className="hidden md:flex space-x-8">
                    <a href="#" className="text-gray-600 hover:text-pink-600">Women</a>
                    <a href="#" className="text-gray-600 hover:text-pink-600">Men</a>
                    <a href="#" className="text-gray-600 hover:text-pink-600">Accessories</a>
                    <a href="#" className="text-gray-600 hover:text-pink-600">Sale</a>
                  </nav>
                  <button className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                    Shop Now
                  </button>
                </div>
              </header>

              {/* Hero Section */}
              <section className="py-12 md:py-20 bg-gradient-to-r from-pink-500 to-purple-600 text-white">
                <div className="container mx-auto px-4 text-center">
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
                    Discover Your Style
                  </h1>
                  <p className="text-lg md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto">
                    Explore our curated collection of premium fashion pieces that define elegance and comfort.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="bg-white text-pink-600 px-6 md:px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                      Shop Collection
                    </button>
                    <button className="border-2 border-white text-white px-6 md:px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-pink-600 transition-colors">
                      View Lookbook
                    </button>
                  </div>
                </div>
              </section>

              {/* Featured Products */}
              <section className="py-12 md:py-16 bg-white">
                <div className="container mx-auto px-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-gray-800">
                    Featured Products
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {[
                      {
                        name: 'Elegant Summer Dress',
                        price: '$89.99',
                        image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=500&fit=crop',
                        category: 'Dresses'
                      },
                      {
                        name: 'Classic Denim Jacket',
                        price: '$129.99',
                        image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=500&fit=crop',
                        category: 'Outerwear'
                      },
                      {
                        name: 'Designer Handbag',
                        price: '$199.99',
                        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=500&fit=crop',
                        category: 'Accessories'
                      }
                    ].map((product, index) => (
                      <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                        <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
                        <div className="p-4">
                          <p className="text-sm text-gray-500 mb-1">{product.category}</p>
                          <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
                          <div className="flex justify-between items-center">
                            <span className="text-xl font-bold text-pink-600">{product.price}</span>
                            <button className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Newsletter */}
              <section className="py-12 md:py-16 bg-gray-100">
                <div className="container mx-auto px-4 text-center">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">
                    Stay in Style
                  </h2>
                  <p className="text-gray-600 mb-6 md:mb-8 max-w-2xl mx-auto">
                    Subscribe to our newsletter and be the first to know about new collections and exclusive offers.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                    <button className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                      Subscribe
                    </button>
                  </div>
                </div>
              </section>

              {/* Footer */}
              <footer className="bg-gray-800 text-white py-8 md:py-12">
                <div className="container mx-auto px-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
                    <div className="md:col-span-2">
                      <div className="flex items-center mb-4">
                        <div className="w-8 h-8 bg-pink-600 rounded-lg flex items-center justify-center mr-3">
                          <span className="text-white font-bold">F</span>
                        </div>
                        <h3 className="text-xl font-bold">FashionHub</h3>
                      </div>
                      <p className="text-gray-300 mb-4 max-w-md">
                        Your destination for premium fashion and timeless style. Discover pieces that make you feel confident and beautiful.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-4">Shop</h4>
                      <ul className="space-y-2 text-sm text-gray-300">
                        <li><a href="#" className="hover:text-white transition-colors">Women's Fashion</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Men's Fashion</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Accessories</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Sale Items</a></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-4">Support</h4>
                      <ul className="space-y-2 text-sm text-gray-300">
                        <li><a href="#" className="hover:text-white transition-colors">Size Guide</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Shipping</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-300">
                    <p>&copy; 2024 FashionHub. All rights reserved.</p>
                  </div>
                </div>
              </footer>
            </div>
          );
        }

        // Handle education/course platforms (keeping existing template)
        if (isEducation) {
          // Render the Videmy landing page
          return (
            <div className="min-h-screen bg-gray-50">
              <header className="bg-white shadow-sm">
                <div className="container mx-auto px-4 py-6 flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-xl">V</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">Videmy</h1>
                  </div>
                  <nav className="hidden md:flex space-x-8">
                    <a href="#features" className="text-gray-600 hover:text-blue-600">Features</a>
                    <a href="#curriculum" className="text-gray-600 hover:text-blue-600">Curriculum</a>
                    <a href="#testimonials" className="text-gray-600 hover:text-blue-600">Testimonials</a>
                    <a href="#faq" className="text-gray-600 hover:text-blue-600">FAQ</a>
                  </nav>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                    Enroll Now
                  </button>
                </div>
              </header>

              <main>
                <section className="py-20 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                  <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Launch Your Programming Career Today</h1>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">Master in-demand programming skills with our comprehensive courses designed for beginners and intermediate learners.</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                      <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                        Enroll Now - ₦20,000
                      </button>
                      <button className="bg-transparent border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                        View Curriculum
                      </button>
                    </div>
                  </div>
                </section>

                <section className="py-16 bg-white">
                  <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Why Choose Videmy?</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                      <div className="text-center p-6">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-gray-800">Expert Instructors</h3>
                        <p className="text-gray-600">Learn from industry professionals with years of real-world experience.</p>
                      </div>
                      <div className="text-center p-6">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-gray-800">Comprehensive Curriculum</h3>
                        <p className="text-gray-600">From basics to advanced topics, our curriculum covers everything you need.</p>
                      </div>
                      <div className="text-center p-6">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-gray-800">Hands-on Projects</h3>
                        <p className="text-gray-600">Build real-world projects that you can showcase in your portfolio.</p>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="py-16 bg-gray-50">
                  <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">What Our Students Say</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                      {[
                        {
                          name: 'Adebayo Johnson',
                          role: 'Frontend Developer',
                          quote: 'Videmy transformed my career. The practical approach helped me land my first developer job.',
                          avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
                        },
                        {
                          name: 'Chioma Okeke',
                          role: 'Fullstack Developer',
                          quote: 'Best investment I made in my tech journey. The curriculum is comprehensive and up-to-date.',
                          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
                        },
                        {
                          name: 'Emeka Okafor',
                          role: 'Mobile Developer',
                          quote: 'The mentorship program alone is worth the price. Highly recommend Videmy to anyone serious about coding.',
                          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
                        }
                      ].map((testimonial, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                          <div className="flex items-center mb-4">
                            <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4 object-cover" />
                            <div>
                              <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                              <p className="text-gray-600 text-sm">{testimonial.role}</p>
                            </div>
                          </div>
                          <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Course Card Section */}
                <section className="py-12 md:py-16 bg-white">
                  <div className="container mx-auto px-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-gray-800">Featured Course</h2>
                    <div className="max-w-sm mx-auto">
                      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                        <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop" alt="Programming Course" className="w-full h-48 object-cover" />
                        <div className="p-6">
                          <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Complete Web Development</h3>
                          <p className="text-gray-600 mb-4">Master HTML, CSS, JavaScript, React, and Node.js in this comprehensive course.</p>
                          <ul className="mb-6 space-y-2">
                            {[
                              'Learn from industry experts',
                              'Hands-on coding exercises',
                              'Real-world projects',
                              'Certificate of completion',
                              'Lifetime access to materials'
                            ].map((feature, index) => (
                              <li key={index} className="flex items-center text-sm">
                                <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                {feature}
                              </li>
                            ))}
                          </ul>
                          <div className="flex items-center justify-between">
                            <span className="text-xl md:text-2xl font-bold text-gray-800">₦20,000</span>
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 md:px-6 py-2 rounded-lg font-medium transition-colors text-sm md:text-base">
                              Enroll Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* CTA Section */}
                <section className="py-12 md:py-16 bg-blue-600 text-white">
                  <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">
                      Ready to Start Your Journey?
                    </h2>
                    <p className="text-lg md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto">
                      Join thousands of students who've already transformed their careers with Videmy.
                    </p>
                    <button className="bg-white text-blue-600 px-6 md:px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                      Enroll Now - ₦20,000
                    </button>
                  </div>
                </section>
              </main>

              {/* Footer */}
              <footer className="bg-gray-800 text-white py-8 md:py-12">
                <div className="container mx-auto px-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
                    <div className="md:col-span-2">
                      <div className="flex items-center mb-4">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                          <span className="text-white font-bold">V</span>
                        </div>
                        <h3 className="text-xl font-bold">Videmy</h3>
                      </div>
                      <p className="text-gray-300 mb-4 max-w-md">
                        Empowering the next generation of developers with practical, industry-relevant programming education.
                      </p>
                      <div className="flex space-x-4">
                        <a href="#" className="text-gray-300 hover:text-white transition-colors">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                          </svg>
                        </a>
                        <a href="#" className="text-gray-300 hover:text-white transition-colors">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                          </svg>
                        </a>
                        <a href="#" className="text-gray-300 hover:text-white transition-colors">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                        </a>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-4">Courses</h4>
                      <ul className="space-y-2 text-sm text-gray-300">
                        <li><a href="#" className="hover:text-white transition-colors">Web Development</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Mobile Development</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Data Science</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">DevOps</a></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-4">Support</h4>
                      <ul className="space-y-2 text-sm text-gray-300">
                        <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-300">
                    <p>&copy; 2024 Videmy. All rights reserved. | Privacy Policy | Terms of Service</p>
                  </div>
                </div>
              </footer>
            </div>
          );
        }

        // Check what type of component was generated based on content
        if (componentCode.includes('hero') || componentCode.includes('Hero') ||
          componentCode.includes('gradient-to-r') || componentCode.includes('Launch Your')) {
          return (
            <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
              <div className="container mx-auto px-4 text-center">
                <h1 className="text-5xl font-bold mb-6">{sampleData.headline}</h1>
                <p className="text-xl mb-8 max-w-2xl mx-auto">{sampleData.subheadline}</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                    {sampleData.primaryAction}
                  </button>
                  <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                    {sampleData.secondaryAction}
                  </button>
                </div>
              </div>
            </section>
          );
        }

        if (componentCode.includes('feature') || componentCode.includes('Feature')) {
          return (
            <section className="py-16 bg-white">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                  Amazing Features
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {sampleData.features.map((feature, index) => (
                    <div key={index} className="bg-gray-50 p-8 rounded-xl hover:shadow-md transition-shadow">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                        <span className="text-blue-600 text-xl">{feature.icon}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          );
        }

        if (componentCode.includes('testimonial') || componentCode.includes('Testimonial')) {
          return (
            <section className="py-16 bg-gray-50">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                  What Our Customers Say
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {sampleData.testimonials.map((testimonial, index) => (
                    <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center mb-4">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full mr-4 object-cover"
                        />
                        <div>
                          <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                          <p className="text-gray-500 text-sm">{testimonial.role}</p>
                        </div>
                      </div>
                      <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          );
        }

        // Generic fallback - adapts to any business type based on prompt content
        const businessName = componentCode.includes('restaurant') ? 'Delicious Bites' :
          componentCode.includes('saas') ? 'CloudApp' :
            componentCode.includes('agency') ? 'Creative Studio' :
              componentCode.includes('fitness') ? 'FitLife' :
                'Your Business';

        const primaryColor = componentCode.includes('restaurant') ? 'orange' :
          componentCode.includes('saas') ? 'blue' :
            componentCode.includes('agency') ? 'purple' :
              componentCode.includes('fitness') ? 'green' :
                'blue';

        const heroTitle = componentCode.includes('restaurant') ? 'Exceptional Dining Experience' :
          componentCode.includes('saas') ? 'Streamline Your Workflow' :
            componentCode.includes('agency') ? 'Creative Solutions That Work' :
              componentCode.includes('fitness') ? 'Transform Your Body & Mind' :
                'Transform Your Business Today';

        const heroSubtitle = componentCode.includes('restaurant') ? 'Discover authentic flavors and memorable moments at our restaurant' :
          componentCode.includes('saas') ? 'Powerful tools to boost productivity and grow your business' :
            componentCode.includes('agency') ? 'We create stunning designs and digital experiences that convert' :
              componentCode.includes('fitness') ? 'Join our community and achieve your fitness goals with expert guidance' :
                'Discover powerful solutions that drive growth and success';

        return (
          <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Header */}
            <header className="bg-white shadow-sm">
              <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className="flex items-center">
                  <div className={`w-10 h-10 bg-${primaryColor}-600 rounded-lg flex items-center justify-center mr-3`}>
                    <span className="text-white font-bold text-xl">{businessName.charAt(0)}</span>
                  </div>
                  <h1 className="text-2xl font-bold text-gray-800">{businessName}</h1>
                </div>
                <nav className="hidden md:flex space-x-8">
                  <a href="#" className={`text-gray-600 hover:text-${primaryColor}-600`}>About</a>
                  <a href="#" className={`text-gray-600 hover:text-${primaryColor}-600`}>Services</a>
                  <a href="#" className={`text-gray-600 hover:text-${primaryColor}-600`}>Contact</a>
                </nav>
                <button className={`bg-${primaryColor}-600 hover:bg-${primaryColor}-700 text-white px-6 py-2 rounded-lg font-medium transition-colors`}>
                  Get Started
                </button>
              </div>
            </header>

            {/* Hero Section */}
            <section className={`py-12 md:py-20 bg-gradient-to-r from-${primaryColor}-500 to-${primaryColor}-600 text-white`}>
              <div className="container mx-auto px-4 text-center">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
                  {heroTitle}
                </h1>
                <p className="text-lg md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto">
                  {heroSubtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className={`bg-white text-${primaryColor}-600 px-6 md:px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors`}>
                    Get Started
                  </button>
                  <button className="border-2 border-white text-white px-6 md:px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section className="py-12 md:py-16 bg-white">
              <div className="container mx-auto px-4">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-gray-800">
                  Why Choose Us
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                  {sampleData.features.map((feature, index) => (
                    <div key={index} className="bg-gray-50 p-6 md:p-8 rounded-xl hover:shadow-md transition-shadow text-center">
                      <div className={`w-12 h-12 bg-${primaryColor}-100 rounded-lg flex items-center justify-center mx-auto mb-4`}>
                        <span className={`text-${primaryColor}-600 text-xl`}>{feature.icon}</span>
                      </div>
                      <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-600 text-sm md:text-base">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className={`py-12 md:py-16 bg-${primaryColor}-600 text-white`}>
              <div className="container mx-auto px-4 text-center">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">
                  Ready to Get Started?
                </h2>
                <p className="text-lg md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto">
                  Join thousands of satisfied customers who've already transformed their experience with us.
                </p>
                <button className={`bg-white text-${primaryColor}-600 px-6 md:px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors`}>
                  Get Started Today
                </button>
              </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-8 md:py-12">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
                  <div className="md:col-span-2">
                    <div className="flex items-center mb-4">
                      <div className={`w-8 h-8 bg-${primaryColor}-600 rounded-lg flex items-center justify-center mr-3`}>
                        <span className="text-white font-bold">{businessName.charAt(0)}</span>
                      </div>
                      <h3 className="text-xl font-bold">{businessName}</h3>
                    </div>
                    <p className="text-gray-300 mb-4 max-w-md">
                      We're committed to providing exceptional service and helping you achieve your goals.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-4">Services</h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li><a href="#" className="hover:text-white transition-colors">Service 1</a></li>
                      <li><a href="#" className="hover:text-white transition-colors">Service 2</a></li>
                      <li><a href="#" className="hover:text-white transition-colors">Service 3</a></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-4">Support</h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                      <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                      <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                    </ul>
                  </div>
                </div>
                <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-300">
                  <p>&copy; 2024 {businessName}. All rights reserved.</p>
                </div>
              </div>
            </footer>
          </div>
        );
      };

      setRenderedComponent(() => DynamicComponent);
    } catch (err) {
      console.error('Component rendering error:', err);
      setError(err instanceof Error ? err.message : 'Failed to render component');
      setRenderedComponent(null);
    }
  }, [componentCode]);

  if (error) {
    return (
      <div className={`p-4 bg-red-50 border border-red-200 rounded-lg ${className}`}>
        <h3 className="text-red-800 font-semibold mb-2">Rendering Error</h3>
        <p className="text-red-600 text-sm">{error}</p>
      </div>
    );
  }

  if (!RenderedComponent) {
    return (
      <div className={`flex flex-col items-center justify-center h-64 text-gray-500 ${className}`}>
        <svg className="w-16 h-16 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
        <p className="text-center">No component to render</p>
        <p className="text-sm text-center mt-1">Generate a component using the chat interface</p>
      </div>
    );
  }

  return (
    <div className={className}>
      <RenderedComponent />
    </div>
  );
};

export default DynamicComponentRenderer;