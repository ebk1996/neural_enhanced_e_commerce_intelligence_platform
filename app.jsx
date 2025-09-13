import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search, Star, TrendingUp, Brain, Zap, Users, DollarSign, Eye, Heart, Filter } from 'lucide-react';

const ECommerceIntelligencePlatform = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [analytics, setAnalytics] = useState({
    totalRevenue: 12500000,
    conversions: 47.3,
    activeUsers: 125000,
    aiAccuracy: 89.4
  });

  // Mock products with AI-enhanced features
  const products = [
    {
      id: 1,
      name: "AI-Optimized Wireless Headphones",
      price: 299.99,
      originalPrice: 399.99,
      category: "electronics",
      rating: 4.8,
      reviews: 2456,
      image: "🎧",
      aiScore: 94,
      trending: true,
      description: "Neural-enhanced audio processing with personalized sound profiles",
      features: ["AI Noise Cancellation", "Adaptive EQ", "Smart Battery"],
      inStock: 47
    },
    {
      id: 2,
      name: "Smart Fitness Tracker Pro",
      price: 199.99,
      originalPrice: 249.99,
      category: "fitness",
      rating: 4.6,
      reviews: 1834,
      image: "⌚",
      aiScore: 91,
      trending: true,
      description: "AI-powered health monitoring with predictive wellness insights",
      features: ["Heart Rate AI", "Sleep Analysis", "Workout Prediction"],
      inStock: 23
    },
    {
      id: 3,
      name: "Intelligent Coffee Maker",
      price: 449.99,
      originalPrice: 549.99,
      category: "home",
      rating: 4.9,
      reviews: 892,
      image: "☕",
      aiScore: 96,
      trending: false,
      description: "AI learns your preferences and brews perfect coffee automatically",
      features: ["Taste Learning", "Schedule Optimization", "Bean Analysis"],
      inStock: 15
    },
    {
      id: 4,
      name: "Neural Gaming Laptop",
      price: 1899.99,
      originalPrice: 2299.99,
      category: "electronics",
      rating: 4.7,
      reviews: 3421,
      image: "💻",
      aiScore: 92,
      trending: true,
      description: "AI-enhanced gaming performance with adaptive cooling",
      features: ["Performance AI", "Thermal Intelligence", "Frame Optimization"],
      inStock: 8
    },
    {
      id: 5,
      name: "Smart Garden System",
      price: 329.99,
      originalPrice: 399.99,
      category: "home",
      rating: 4.5,
      reviews: 567,
      image: "🌱",
      aiScore: 88,
      trending: false,
      description: "AI monitors and optimizes plant growth automatically",
      features: ["Growth AI", "Nutrient Optimization", "Weather Integration"],
      inStock: 31
    },
    {
      id: 6,
      name: "AI Photography Drone",
      price: 899.99,
      originalPrice: 1199.99,
      category: "electronics",
      rating: 4.8,
      reviews: 1245,
      image: "🚁",
      aiScore: 95,
      trending: true,
      description: "Intelligent flight patterns with AI-assisted cinematography",
      features: ["Auto Cinematography", "Object Tracking", "Wind Adaptation"],
      inStock: 12
    }
  ];

  const categories = [
    { id: 'all', name: 'All Products', icon: '🛍️' },
    { id: 'electronics', name: 'Electronics', icon: '📱' },
    { id: 'fitness', name: 'Fitness', icon: '💪' },
    { id: 'home', name: 'Smart Home', icon: '🏠' }
  ];

  // AI-powered recommendation engine simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      const recommended = products
        .filter(p => p.aiScore > 90)
        .sort((a, b) => b.aiScore - a.aiScore)
        .slice(0, 3);
      setRecommendations(recommended);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filter products based on category and search
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const getTotalItems = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="relative mb-4">
        <div className="text-6xl text-center mb-2">{product.image}</div>
        {product.trending && (
          <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs flex items-center">
            <TrendingUp size={12} className="mr-1" />
            Trending
          </div>
        )}
        <div className="absolute top-0 left-0 bg-blue-500 text-white px-2 py-1 rounded-full text-xs flex items-center">
          <Brain size={12} className="mr-1" />
          AI {product.aiScore}%
        </div>
      </div>
      
      <h3 className="font-bold text-lg mb-2 text-gray-800">{product.name}</h3>
      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
      
      <div className="flex items-center mb-3">
        <div className="flex items-center text-yellow-500 mr-2">
          <Star size={16} fill="currentColor" />
          <span className="ml-1 text-sm font-medium">{product.rating}</span>
        </div>
        <span className="text-gray-500 text-sm">({product.reviews} reviews)</span>
      </div>
      
      <div className="flex flex-wrap gap-1 mb-4">
        {product.features.map((feature, idx) => (
          <span key={idx} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            {feature}
          </span>
        ))}
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-2xl font-bold text-green-600">${product.price}</span>
          {product.originalPrice > product.price && (
            <span className="text-gray-500 line-through ml-2">${product.originalPrice}</span>
          )}
        </div>
        <span className="text-sm text-gray-500">{product.inStock} in stock</span>
      </div>
      
      <button
        onClick={() => addToCart(product)}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center font-medium"
      >
        <ShoppingCart size={18} className="mr-2" />
        Add to Cart
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="flex items-center mr-8">
                <Brain className="text-blue-600 mr-2" size={32} />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Neural Commerce
                </h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="AI-powered search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="relative">
                <ShoppingCart className="text-gray-600 hover:text-blue-600 cursor-pointer" size={24} />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {getTotalItems()}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* AI Analytics Dashboard */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center">
              <DollarSign className="text-green-500 mr-3" size={24} />
              <div>
                <p className="text-gray-600 text-sm">AI-Generated Revenue</p>
                <p className="text-2xl font-bold text-gray-800">${(analytics.totalRevenue / 1000000).toFixed(1)}M+</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center">
              <TrendingUp className="text-blue-500 mr-3" size={24} />
              <div>
                <p className="text-gray-600 text-sm">Conversion Rate</p>
                <p className="text-2xl font-bold text-gray-800">{analytics.conversions}%</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center">
              <Users className="text-purple-500 mr-3" size={24} />
              <div>
                <p className="text-gray-600 text-sm">Active Users</p>
                <p className="text-2xl font-bold text-gray-800">{(analytics.activeUsers / 1000).toFixed(0)}K+</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-orange-500">
            <div className="flex items-center">
              <Brain className="text-orange-500 mr-3" size={24} />
              <div>
                <p className="text-gray-600 text-sm">AI Accuracy</p>
                <p className="text-2xl font-bold text-gray-800">{analytics.aiAccuracy}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* AI Recommendations Section */}
        {recommendations.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Zap className="text-yellow-500 mr-2" size={24} />
              <h2 className="text-2xl font-bold text-gray-800">AI Recommendations for You</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recommendations.map(product => (
                <ProductCard key={`rec-${product.id}`} product={product} />
              ))}
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-blue-50 border border-gray-200'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🤖</div>
            <h3 className="text-xl font-bold text-gray-600 mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your search or category filter</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Brain className="text-blue-400 mr-2" size={28} />
              <h3 className="text-2xl font-bold">Neural Commerce Intelligence</h3>
            </div>
            <p className="text-gray-400 mb-6">AI-Powered E-Commerce Platform</p>
            <div className="flex justify-center space-x-8 text-sm">
              <div>
                <strong className="text-blue-400">2.3B+</strong>
                <p className="text-gray-400">Annual Transactions</p>
              </div>
              <div>
                <strong className="text-green-400">99.9%</strong>
                <p className="text-gray-400">Uptime</p>
              </div>
              <div>
                <strong className="text-purple-400">100K+</strong>
                <p className="text-gray-400">Concurrent Users</p>
              </div>
              <div>
                <strong className="text-yellow-400">45ms</strong>
                <p className="text-gray-400">Avg Response Time</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ECommerceIntelligencePlatform;
