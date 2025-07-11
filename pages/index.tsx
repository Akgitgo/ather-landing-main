import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Haptic feedback helper
const triggerHaptic = () => {
  if (typeof window !== 'undefined' && 'vibrate' in window.navigator) {
    window.navigator.vibrate(30);
  }
};

// Simple Book Test Drive Popup Form
function BookTestDriveModal({ open, onClose }: { open: boolean, onClose: () => void }) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  // Reset fields when modal opens
  useEffect(() => {
    if (open) {
      setFullName('');
      setPhone('');
      setLocation('');
      setError('');
    }
  }, [open]);
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^\d]/g, '').slice(0, 10);
    setPhone(val);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length !== 10) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }
    setError('');
    // Submit logic here
    onClose();
  };
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-11/12 max-w-sm relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl font-bold">&times;</button>
        <h2 className="text-xl font-bold mb-4 text-blue-700">Book Test Drive</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label className="text-sm font-medium text-gray-700" htmlFor="fullName">Full Name</label>
          <input id="fullName" className="border border-black rounded px-3 py-2 bg-white text-black font-semibold placeholder-gray-400" placeholder="Enter your full name" value={fullName} onChange={e => setFullName(e.target.value)} autoComplete="off" />

          <label className="text-sm font-medium text-gray-700" htmlFor="phone">Phone Number</label>
          <input id="phone" className="border border-black rounded px-3 py-2 bg-white text-black font-semibold placeholder-gray-400" placeholder="Enter your 10-digit phone number" value={phone} onChange={handlePhoneChange} maxLength={10} inputMode="numeric" autoComplete="off" />

          <label className="text-sm font-medium text-gray-700" htmlFor="location">Location</label>
          <input id="location" className="border border-black rounded px-3 py-2 bg-white text-black font-semibold placeholder-gray-400" placeholder="Enter your location" value={location} onChange={e => setLocation(e.target.value)} autoComplete="off" />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button type="submit" className="bg-blue-600 text-white rounded py-2 font-semibold hover:bg-blue-700 transition">Confirm Test Ride</button>
        </form>
      </div>
    </div>
  );
}

export default function Home() {
  // Popup modal state
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!showModal) {
      timer = setTimeout(() => setShowModal(true), 6000);
    }
    return () => clearTimeout(timer);
  }, [showModal]);

  return (
    <div className="min-h-screen bg-[#E6F3FF] overflow-x-hidden">
      {/* Top Navigation Bar (fixed) */}
      <div className="fixed top-0 w-full z-20 flex justify-between items-center px-4 py-2 bg-gray-100 shadow-sm">
        <div className="flex items-center h-10">
          <img src="/assets/raam-logo.png" alt="RAAM GROUP" className="h-7 md:h-10 w-auto object-contain" />
        </div>
        <div className="flex items-center h-10">
          <img src="/assets/ather-logo.png" alt="ATHER" className="h-7 md:h-10 w-auto object-contain" />
        </div>
      </div>
      <div className="h-14" /> {/* Spacer for fixed navbar */}

      {/* Main Content Row: Video left, Buttons right */}
      <div className="flex flex-col md:flex-row w-full max-w-screen-xl mx-auto px-4 py-8 md:py-12 bg-transparent gap-0 md:gap-8">
        {/* Hero Video Section (left) */}
        <div className="w-full md:w-1/2 max-w-xs md:max-w-sm rounded-2xl shadow-xl bg-white/90 p-2 md:p-4 mx-auto md:mx-0">
          <div className="relative w-full aspect-[9/16]">
            <video
              src="/athervideo.mp4"
              className="absolute top-0 left-0 w-full h-full object-contain rounded-xl"
              autoPlay
              loop
              muted
              playsInline
              style={{ background: '#E6F3FF' }}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
        {/* Buttons Section (right, Book Test Drive + Know More) */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center md:min-h-[400px] mt-8 md:mt-0">
          <motion.div
            className="flex flex-col items-center justify-center w-full gap-3"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <motion.button
              className="w-48 py-2 px-4 rounded-lg bg-blue-200 text-blue-900 font-semibold text-base shadow-lg hover:bg-blue-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 active:shadow-2xl active:bg-blue-300 mx-auto"
              whileTap={{ scale: 0.96, boxShadow: '0 0 0 4px #3b82f6', backgroundColor: '#2563eb' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              onTap={() => triggerHaptic()}
              onClick={() => setShowModal(true)}
            >
              Book Test Drive
            </motion.button>
            <a
              href="tel:8929841338"
              className="w-48 py-2 px-4 rounded-lg bg-blue-200 text-blue-900 font-semibold text-base shadow-lg hover:bg-blue-300 transition-colors duration-200 text-center focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 active:shadow-2xl active:bg-blue-300 mx-auto"
              style={{ display: 'block' }}
            >
              Know More
            </a>
          </motion.div>
        </div>
      </div>

      {/* Showrooms Section - Responsive Layout */}
      <div className="w-full max-w-screen-xl mx-auto px-4 pt-4 pb-4">
        {/* Desktop: Heading and first map side by side */}
        <div className="hidden md:flex md:items-start md:gap-8">
          {/* Left: Showroom heading */}
          <div className="md:w-1/3 flex items-center justify-center">
            <span className="map-heading text-center" style={{ fontSize: '1.15rem', marginBottom: 0 }}>📍 Visit Our Showrooms :-</span>
          </div>
          {/* Right: First map (PORUR) */}
          <div className="md:w-2/3" data-aos="fade-up" data-aos-duration="1000">
            <h2 className="map-heading text-center mb-4">📍 PORUR</h2>
            <div className="rounded-lg shadow-lg overflow-hidden hover:scale-[1.01] transition-transform duration-300">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3694.666581196758!2d80.145592!3d13.0362007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526122abfc2be5%3A0x6abc3346966f8622!2sAther%20Electric%20Scooter%20Showroom%20in%2C%20Iyyappanthangal!5e1!3m2!1sen!2sin!4v1752213715310!5m2!1sen!2sin" 
                width="100%" 
                height="400" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Mobile: Stacked layout */}
        <div className="md:hidden">
          {/* Showroom heading for mobile */}
          <div className="w-full flex justify-center mb-4">
            <span className="map-heading text-center" style={{ fontSize: '1.15rem', marginBottom: 0 }}>📍 Visit Our Showrooms :-</span>
          </div>
          {/* PORUR map for mobile */}
          <div data-aos="fade-up" data-aos-duration="1000">
            <h2 className="map-heading text-center mb-4">📍 PORUR</h2>
            <div className="rounded-lg shadow-lg overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3694.666581196758!2d80.145592!3d13.0362007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526122abfc2be5%3A0x6abc3346966f8622!2sAther%20Electric%20Scooter%20Showroom%20in%2C%20Iyyappanthangal!5e1!3m2!1sen!2sin!4v1752213715310!5m2!1sen!2sin" 
                width="100%" 
                height="400" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Additional maps - stacked for both mobile and desktop */}
        <div className="max-w-4xl mx-auto mt-8 md:mt-12">
          {/* NUNGAMBAKKAM */}
          <div data-aos="fade-up" data-aos-duration="1000" className="mb-8">
            <h2 className="map-heading text-center mb-4">📍 NUNGAMBAKKAM</h2>
            <div className="rounded-lg shadow-lg overflow-hidden hover:scale-[1.01] transition-transform duration-300">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3694.2964451372104!2d80.2484966!3d13.060968599999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267be692be009%3A0x1e8d9423b44d1b90!2sAther%20Electric%20Scooter%20Showroom%20in%2C%20Nungambakkam!5e1!3m2!1sen!2sin!4v1752213748615!5m2!1sen!2sin" 
                width="100%" 
                height="400" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
          {/* TIRUVOTTIYUR */}
          <div data-aos="fade-up" data-aos-duration="1000" className="mb-8">
            <h2 className="map-heading text-center mb-4">📍 TIRUVOTTIYUR</h2>
            <div className="rounded-lg shadow-lg overflow-hidden hover:scale-[1.01] transition-transform duration-300">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3692.9361395935816!2d80.29709287484468!3d13.151600587180502!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526f96acaf97e7%3A0x91a0ae416e5f0ee7!2sAther%20Test%20Ride%20Zone%20(RAAM%20ELECTRIC)!5e1!3m2!1sen!2sin!4v1752213984382!5m2!1sen!2sin" 
                width="100%" 
                height="400" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom spacing for mobile safe area */}
      <div className="h-8" />

      {/* Contact Info Section at the bottom */}
      <div className="w-full bg-blue-50 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center gap-2 mb-4 max-w-screen-md mx-auto">
        <div className="flex items-center justify-center gap-2 text-blue-700 text-lg font-medium mb-1">
          <span role='img' aria-label='phone'>📞</span> For more details, call
        </div>
        <a href="tel:8712600675" className="text-2xl font-bold text-blue-900 hover:underline focus:underline transition-colors duration-150 mb-1">8712600675</a>
        <div className="text-blue-700 text-base font-medium mb-1">Email: <a href="mailto:marketing.ch@raamather.com" className="underline">marketing.ch@raamather.com</a></div>
        <div className="text-blue-700 text-base font-medium">Hours: Monday - Saturday: 9:00 AM - 8:00 PM</div>
      </div>

      {/* Book Test Drive Popup Modal */}
      <BookTestDriveModal open={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
