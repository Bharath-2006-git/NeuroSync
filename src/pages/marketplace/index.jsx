import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import Input from '../../components/ui/Input';
import SkeletonLoader from '../../components/ui/SkeletonLoader';

const ProviderCard = ({ provider, onClick, isFavorite, onToggleFavorite }) => (
  <div className="bg-card rounded-xl p-5 shadow-soft border border-border hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer group relative overflow-hidden">
    {/* Featured Badge */}
    {provider.featured && (
      <div className="absolute top-0 right-0 bg-gradient-to-l from-warning to-warning/80 text-warning-foreground px-3 py-1 rounded-bl-xl text-xs font-bold">
        ⭐ FEATURED
      </div>
    )}
    
    <div className="flex items-start gap-4" onClick={onClick}>
      {/* Provider Avatar with Online Status */}
      <div className="relative">
        <div className="w-20 h-20 bg-gradient-to-br from-primary/30 via-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-md">
          <Icon name="User" size={36} className="text-primary" />
        </div>
        {provider.online && (
          <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-card rounded-full" />
        )}
      </div>

      {/* Provider Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-foreground truncate">{provider.name}</h3>
              {provider.verified && (
                <div className="bg-primary/10 rounded-full p-1 animate-pulse">
                  <Icon name="CheckCircle2" size={16} className="text-primary" />
                </div>
              )}
            </div>
            <p className="text-sm text-muted-foreground font-medium">{provider.category}</p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(provider.id);
            }}
            className="text-muted-foreground hover:text-red-500 transition-colors"
          >
            <Icon name="Heart" size={20} className={isFavorite ? 'fill-red-500 text-red-500' : ''} />
          </button>
        </div>

        {/* Stats with improved styling */}
        <div className="flex items-center gap-4 mt-3 text-sm">
          <div className="flex items-center gap-1.5 bg-warning/10 px-2 py-1 rounded-lg">
            <Icon name="Star" size={16} className="text-warning fill-warning" />
            <span className="font-bold text-warning">{provider.rating}</span>
            <span className="text-muted-foreground">({provider.reviews})</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Icon name="MapPin" size={14} />
            <span className="font-medium">{provider.distance}</span>
          </div>
          {provider.responseTime && (
            <div className="flex items-center gap-1 text-green-600">
              <Icon name="Clock" size={14} />
              <span className="text-xs">{provider.responseTime}</span>
            </div>
          )}
        </div>

        {/* Tags with enhanced styling */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {provider.tags.slice(0, 2).map((tag, i) => (
            <span key={i} className="px-2.5 py-1 bg-gradient-to-r from-primary/10 to-primary/5 text-primary rounded-full text-xs font-semibold border border-primary/20">
              {tag}
            </span>
          ))}
        </div>

        {/* Price with CTA */}
        <div className="mt-4 flex items-center justify-between pt-3 border-t border-border/50">
          <div>
            <span className="text-xs text-muted-foreground block">Starting from</span>
            <span className="text-lg font-bold text-primary">{provider.priceRange.split(' - ')[0]}</span>
          </div>
          <Button size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors shadow-md">
            <Icon name="Calendar" size={14} className="mr-1" />
            Book Now
          </Button>
        </div>
      </div>
    </div>
  </div>
);

const Marketplace = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recommended');
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favoriteProviders');
    return saved ? JSON.parse(saved) : [];
  });
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  // Simulate data loading
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [selectedCategory]);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('favoriteProviders', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (providerId) => {
    setFavorites(prev => 
      prev.includes(providerId) 
        ? prev.filter(id => id !== providerId)
        : [...prev, providerId]
    );
  };

  const categories = [
    { id: 'all', label: 'All Services', icon: 'Store', color: 'primary' },
    { id: 'lactation', label: 'Lactation', icon: 'Baby', color: 'blue' },
    { id: 'doula', label: 'Doulas', icon: 'Heart', color: 'pink' },
    { id: 'sleep', label: 'Sleep Training', icon: 'Moon', color: 'purple' },
    { id: 'massage', label: 'Massage', icon: 'Hand', color: 'green' },
    { id: 'nanny', label: 'Childcare', icon: 'Users', color: 'orange' },
    { id: 'nutrition', label: 'Nutrition', icon: 'Apple', color: 'red' }
  ];

  // Mock providers data - In production, fetch from Firebase
  const allProviders = useMemo(() => [
    {
      id: '1',
      name: 'Dr. Aishwarya Menon',
      category: 'Lactation Consultant',
      rating: 4.9,
      reviews: 127,
      distance: '1.6 km',
      priceRange: '₹1,500 - ₹2,500',
      verified: true,
      featured: true,
      online: true,
      responseTime: '~2h',
      tags: ['IBCLC Certified', 'Home Visits', '24/7 Support'],
      categoryId: 'lactation'
    },
    {
      id: '2',
      name: 'Priya Sharma',
      category: 'Postpartum Doula',
      rating: 4.8,
      reviews: 89,
      distance: '2.3 km',
      priceRange: '₹3,000 - ₹5,000',
      verified: true,
      featured: true,
      online: false,
      responseTime: '~4h',
      tags: ['12 Years Exp', 'Night Care', 'Certified Doula'],
      categoryId: 'doula'
    },
    {
      id: '3',
      name: 'Sleep Solutions',
      category: 'Pediatric Sleep Trainer',
      rating: 4.7,
      reviews: 64,
      distance: 'Online',
      priceRange: '₹2,000 - ₹4,000',
      verified: true,
      featured: false,
      online: true,
      responseTime: '~1h',
      tags: ['Video Sessions', 'Follow-ups', 'Custom Plans'],
      categoryId: 'sleep'
    },
    {
      id: '4',
      name: 'Wellness Touch',
      category: 'Prenatal Massage Therapist',
      rating: 4.9,
      reviews: 143,
      distance: '3.5 km',
      priceRange: '₹1,800 - ₹3,000',
      verified: true,
      featured: false,
      online: true,
      responseTime: '~3h',
      tags: ['Certified', 'Home Service', 'Aromatherapy'],
      categoryId: 'massage'
    },
    {
      id: '5',
      name: 'Care Angels',
      category: 'Nanny Services',
      rating: 4.6,
      reviews: 201,
      distance: '1.2 km',
      priceRange: '₹15,000/month',
      verified: true,
      featured: false,
      online: false,
      responseTime: '~6h',
      tags: ['Background Check', 'Full-time', 'First Aid'],
      categoryId: 'nanny'
    },
    {
      id: '6',
      name: 'NutriMom Clinic',
      category: 'Pediatric Nutritionist',
      rating: 4.8,
      reviews: 76,
      distance: 'Online',
      priceRange: '₹1,200 - ₹2,000',
      verified: true,
      featured: false,
      online: true,
      responseTime: '~2h',
      tags: ['Custom Plans', 'Online', 'Diet Charts'],
      categoryId: 'nutrition'
    },
    {
      id: '7',
      name: 'Maya Doula Services',
      category: 'Birth Doula',
      rating: 5.0,
      reviews: 42,
      distance: '4.1 km',
      priceRange: '₹20,000 - ₹35,000',
      verified: true,
      featured: true,
      online: true,
      responseTime: '~1h',
      tags: ['Birth Support', 'Prenatal', 'Postnatal'],
      categoryId: 'doula'
    },
    {
      id: '8',
      name: 'Dr. Anjali Kumar',
      category: 'Lactation Specialist',
      rating: 4.9,
      reviews: 98,
      distance: '2.8 km',
      priceRange: '₹1,800 - ₹2,800',
      verified: true,
      featured: false,
      online: false,
      responseTime: '~5h',
      tags: ['Hospital Visits', 'Emergencies', 'NICU Support'],
      categoryId: 'lactation'
    }
  ], []);

  // Filter providers with useMemo for performance
  const filteredProviders = useMemo(() => {
    return allProviders
      .filter(p => selectedCategory === 'all' || p.categoryId === selectedCategory)
      .filter(p => 
        searchQuery === '' || 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'reviews') return b.reviews - a.reviews;
        if (sortBy === 'distance') {
          const aNum = parseFloat(a.distance) || 999;
          const bNum = parseFloat(b.distance) || 999;
          return aNum - bNum;
        }
        // recommended: featured first, then rating
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return b.rating - a.rating;
      });
  }, [allProviders, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-10 px-4 max-w-7xl mx-auto">
        {/* Header with gradient */}
        <div className="mb-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-purple-500/5 to-pink-500/5 rounded-3xl" />
          <div className="relative p-6">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Trusted Services Marketplace
            </h1>
            <p className="text-muted-foreground text-lg">Connect with verified, background-checked maternal & child care professionals</p>
          </div>
        </div>

        {/* Search & Filters with improved design */}
        <div className="bg-gradient-to-br from-card to-card/50 rounded-2xl p-6 shadow-lg border border-border mb-6 backdrop-blur-sm">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search with icon animation */}
            <div className="flex-1">
              <div className="relative group">
                <Icon name="Search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  type="text"
                  placeholder="Search services, providers, or specializations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 bg-background/50 border-2 focus:border-primary transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <Icon name="X" size={18} />
                  </button>
                )}
              </div>
            </div>

            {/* View Toggle & Sort */}
            <div className="flex gap-2">
              <div className="flex bg-secondary rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-2 rounded transition-colors ${viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}
                >
                  <Icon name="Grid" size={18} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-2 rounded transition-colors ${viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}
                >
                  <Icon name="List" size={18} />
                </button>
              </div>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="lg:w-48 px-4 py-2 bg-background/50 border-2 border-border hover:border-primary rounded-lg outline-none focus:ring-2 focus:ring-primary transition-all font-medium"
              >
                <option value="recommended">⭐ Recommended</option>
                <option value="rating">🏆 Highest Rated</option>
                <option value="reviews">📊 Most Reviews</option>
                <option value="distance">📍 Nearest</option>
              </select>
            </div>
          </div>

          {/* Categories with enhanced design */}
          <div className="flex gap-2 mt-5 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-xl whitespace-nowrap transition-all font-semibold shadow-sm hover:shadow-md transform hover:-translate-y-0.5 ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground scale-105'
                    : 'bg-secondary/80 text-foreground hover:bg-secondary'
                }`}
              >
                <Icon name={cat.icon} size={20} />
                <span className="text-sm">{cat.label}</span>
                {selectedCategory === cat.id && (
                  <span className="bg-primary-foreground/20 px-2 py-0.5 rounded-full text-xs">
                    {filteredProviders.length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Results with improved stats */}
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <p className="text-sm text-muted-foreground font-medium">
              <span className="text-lg font-bold text-foreground">{filteredProviders.length}</span> provider{filteredProviders.length !== 1 ? 's' : ''} found
            </p>
            {favorites.length > 0 && (
              <span className="px-3 py-1 bg-red-500/10 text-red-500 rounded-full text-xs font-semibold">
                {favorites.length} ❤️ Favorites
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate('/marketplace/favorites')} className="shadow-sm">
              <Icon name="Heart" size={16} className="mr-2 text-red-500" />
              My Favorites
            </Button>
            <Button variant="outline" size="sm" className="shadow-sm">
              <Icon name="Filter" size={16} className="mr-2" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Providers Grid/List with loading state */}
        {loading ? (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <SkeletonLoader key={i} type="card" />
            ))}
          </div>
        ) : filteredProviders.length > 0 ? (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
            {filteredProviders.map((provider) => (
              <ProviderCard
                key={provider.id}
                provider={provider}
                onClick={() => navigate(`/marketplace/provider/${provider.id}`)}
                isFavorite={favorites.includes(provider.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-secondary/20 rounded-2xl">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
              <Icon name="Search" size={40} className="text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-2">No providers found</h3>
            <p className="text-muted-foreground mb-6">Try adjusting your search or filters</p>
            <Button onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}>
              <Icon name="RotateCcw" size={16} className="mr-2" />
              Reset Filters
            </Button>
          </div>
        )}

        {/* Info Banner with enhanced design */}
        <div className="mt-10 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-l-4 border-primary rounded-2xl p-6 shadow-lg">
          <div className="flex items-start gap-5">
            <div className="bg-primary text-primary-foreground rounded-2xl p-4 shadow-md">
              <Icon name="Shield" size={32} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-xl text-foreground mb-3 flex items-center gap-2">
                Trust & Safety Guaranteed
                <Icon name="CheckCircle2" size={20} className="text-primary" />
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                All service providers are thoroughly vetted, background-checked, and verified. 
                We only list professionals with proper certifications and positive user reviews.
                Your safety and satisfaction are our top priorities.
              </p>
              <div className="flex flex-wrap gap-4 mt-4">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Icon name="ShieldCheck" size={16} className="text-primary" />
                  <span>Background Verified</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Icon name="Award" size={16} className="text-primary" />
                  <span>Certified Professionals</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Icon name="Star" size={16} className="text-primary" />
                  <span>Top Rated</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Marketplace;
