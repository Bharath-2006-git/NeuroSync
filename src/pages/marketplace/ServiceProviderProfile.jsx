import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const ServiceProviderProfile = () => {
  const { providerId } = useParams();
  const navigate = useNavigate();
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [bookingNotes, setBookingNotes] = useState('');
  const [activeTab, setActiveTab] = useState('about');

  // Mock provider data - In production, fetch from Firebase
  const provider = {
    id: providerId,
    name: 'Dr. Aishwarya Menon',
    title: 'Obstetrician & Gynecologist',
    category: 'Lactation Consultant',
    rating: 4.9,
    reviewCount: 127,
    experience: '12 years',
    verified: true,
    featured: true,
    location: 'Mumbai, Maharashtra',
    distance: '1.6 km',
    price: '₹1,500 - ₹2,500',
    consultationType: ['In-person', 'Video Call', 'Home Visit'],
    availability: ['Mon-Fri: 9 AM - 6 PM', 'Sat: 10 AM - 4 PM'],
    languages: ['English', 'Hindi', 'Marathi'],
    education: ['MBBS - Mumbai University', 'MD Obstetrics - AIIMS Delhi'],
    certifications: ['IBCLC Certified', 'Prenatal Yoga Instructor'],
    specializations: ['High-risk Pregnancy', 'Breastfeeding Support', 'Postpartum Care'],
    about: 'Dr. Aishwarya Menon is a board-certified obstetrician with over 12 years of experience in maternal and child health. She specializes in supporting mothers through their pregnancy journey with compassionate, evidence-based care.',
    services: [
      { name: 'Prenatal Consultation', price: '₹1,500', duration: '45 min' },
      { name: 'Lactation Support Session', price: '₹2,000', duration: '60 min' },
      { name: 'Postpartum Check-up', price: '₹1,800', duration: '30 min' },
      { name: 'Home Visit', price: '₹3,500', duration: '90 min' }
    ],
    photos: [
      'https://via.placeholder.com/400x300/F0FDF4/16A34A?text=Clinic+1',
      'https://via.placeholder.com/400x300/DBEAFE/1E40AF?text=Clinic+2',
      'https://via.placeholder.com/400x300/FEF3C7/B45309?text=Office'
    ],
    reviews: [
      {
        id: 1,
        author: 'Priya Sharma',
        rating: 5,
        date: '2024-11-10',
        comment: 'Excellent care and support during my pregnancy. Dr. Menon is very knowledgeable and patient.',
        helpful: 24
      },
      {
        id: 2,
        author: 'Anjali K.',
        rating: 5,
        date: '2024-11-05',
        comment: 'Helped me tremendously with breastfeeding challenges. Highly recommend!',
        helpful: 18
      },
      {
        id: 3,
        author: 'Meera D.',
        rating: 4,
        date: '2024-10-28',
        comment: 'Professional and caring. Clinic is clean and well-maintained.',
        helpful: 12
      }
    ],
    phone: '+918888888888',
    email: 'dr.menon@example.com',
    website: 'https://drmenon.com'
  };

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) {
      alert('Please select date and time');
      return;
    }

    // In production: Save to Firebase and send notification
    const booking = {
      providerId: provider.id,
      providerName: provider.name,
      date: selectedDate,
      time: selectedTime,
      notes: bookingNotes,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    console.log('Booking submitted:', booking);
    alert(`Booking request sent to ${provider.name}! You'll receive a confirmation shortly.`);
    setShowBookingModal(false);
    navigate('/marketplace');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-10 px-4 max-w-6xl mx-auto">
        {/* Back Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/marketplace')}
          className="mb-4"
        >
          <Icon name="ArrowLeft" size={16} className="mr-2" />
          Back to Marketplace
        </Button>

        {/* Provider Header */}
        <div className="bg-card rounded-2xl p-6 shadow-soft border border-border mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Profile Image */}
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center">
                <Icon name="User" size={64} className="text-primary" />
              </div>
              {provider.verified && (
                <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full p-2">
                  <Icon name="CheckCircle2" size={20} />
                </div>
              )}
            </div>

            {/* Provider Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h1 className="text-3xl font-bold text-foreground">{provider.name}</h1>
                  <p className="text-lg text-muted-foreground">{provider.title}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                      {provider.category}
                    </span>
                    {provider.featured && (
                      <span className="px-3 py-1 bg-warning/10 text-warning rounded-full text-sm font-medium">
                        ⭐ Featured
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <Icon name="Star" size={20} className="text-warning fill-warning" />
                  <span className="font-semibold">{provider.rating}</span>
                  <span className="text-muted-foreground">({provider.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="MapPin" size={20} className="text-muted-foreground" />
                  <span className="text-muted-foreground">{provider.location}</span>
                  <span className="text-primary">• {provider.distance}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Award" size={20} className="text-muted-foreground" />
                  <span className="text-muted-foreground">{provider.experience} experience</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3 mt-6">
                <Button size="lg" onClick={() => setShowBookingModal(true)}>
                  <Icon name="Calendar" size={20} className="mr-2" />
                  Book Appointment
                </Button>
                <Button variant="outline" size="lg" onClick={() => window.open(`tel:${provider.phone}`)}>
                  <Icon name="Phone" size={20} className="mr-2" />
                  Call
                </Button>
                <Button variant="outline" size="lg" onClick={() => window.open(`https://wa.me/${provider.phone.replace(/\+/g, '')}`)}>
                  <Icon name="MessageCircle" size={20} className="mr-2" />
                  WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-card rounded-2xl shadow-soft border border-border overflow-hidden">
          <div className="flex border-b border-border overflow-x-auto">
            {['about', 'services', 'reviews', 'photos'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 font-medium capitalize whitespace-nowrap transition-colors ${
                  activeTab === tab
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-6">
            {/* About Tab */}
            {activeTab === 'about' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">About</h3>
                  <p className="text-muted-foreground leading-relaxed">{provider.about}</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Specializations</h3>
                  <div className="flex flex-wrap gap-2">
                    {provider.specializations.map((spec, i) => (
                      <span key={i} className="px-3 py-1 bg-secondary text-foreground rounded-lg text-sm">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Education</h3>
                  <ul className="space-y-2">
                    {provider.education.map((edu, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Icon name="GraduationCap" size={20} className="text-primary mt-0.5" />
                        <span className="text-muted-foreground">{edu}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Certifications</h3>
                  <ul className="space-y-2">
                    {provider.certifications.map((cert, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Icon name="Award" size={20} className="text-primary mt-0.5" />
                        <span className="text-muted-foreground">{cert}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {provider.languages.map((lang, i) => (
                      <span key={i} className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-sm font-medium">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Availability</h3>
                  <ul className="space-y-2">
                    {provider.availability.map((time, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Icon name="Clock" size={20} className="text-muted-foreground" />
                        <span className="text-muted-foreground">{time}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Services Tab */}
            {activeTab === 'services' && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold mb-4">Services Offered</h3>
                <div className="grid gap-4">
                  {provider.services.map((service, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-secondary/50 rounded-xl">
                      <div>
                        <div className="font-semibold text-foreground">{service.name}</div>
                        <div className="text-sm text-muted-foreground">{service.duration}</div>
                      </div>
                      <div className="text-xl font-bold text-primary">{service.price}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">Reviews</h3>
                  <Button variant="outline" size="sm">
                    Write Review
                  </Button>
                </div>

                <div className="space-y-4">
                  {provider.reviews.map((review) => (
                    <div key={review.id} className="p-4 bg-secondary/30 rounded-xl">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="font-semibold text-foreground">{review.author}</div>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Icon
                                  key={i}
                                  name="Star"
                                  size={16}
                                  className={i < review.rating ? 'text-warning fill-warning' : 'text-muted'}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {new Date(review.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-3">{review.comment}</p>
                      <button className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1">
                        <Icon name="ThumbsUp" size={14} />
                        Helpful ({review.helpful})
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Photos Tab */}
            {activeTab === 'photos' && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Photos</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {provider.photos.map((photo, i) => (
                    <img
                      key={i}
                      src={photo}
                      alt={`Clinic ${i + 1}`}
                      className="w-full h-48 object-cover rounded-xl"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Book Appointment</h2>
              <button onClick={() => setShowBookingModal(false)} className="text-muted-foreground hover:text-foreground">
                <Icon name="X" size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Select Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-2 bg-input border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Select Time</label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full px-4 py-2 bg-input border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Choose time slot</option>
                  <option value="09:00">09:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="14:00">02:00 PM</option>
                  <option value="15:00">03:00 PM</option>
                  <option value="16:00">04:00 PM</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Notes (Optional)</label>
                <textarea
                  value={bookingNotes}
                  onChange={(e) => setBookingNotes(e.target.value)}
                  placeholder="Any specific concerns or requests..."
                  rows={3}
                  className="w-full px-4 py-2 bg-input border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button variant="outline" onClick={() => setShowBookingModal(false)} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={handleBooking} className="flex-1">
                  Confirm Booking
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceProviderProfile;
