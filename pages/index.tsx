import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import HeroVideo from "./HeroVideo";

// Simple Book Test Drive Popup Form
function BookTestDriveModal({ open, onClose }: { open: boolean, onClose: () => void }) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Reset fields when modal opens
  useEffect(() => {
    if (open) {
      setFullName('');
      setPhone('');
      setLocation('');
      setError('');
      setIsSubmitting(false);
    }
  }, [open]);
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePhoneChange = (e: any) => {
    const val = e.target.value.replace(/[^\d]/g, '').slice(0, 10);
    setPhone(val);
  };
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      await fetch("https://script.google.com/macros/s/AKfycbxRZjDsSYwJsx5hozOn3Je5BI4PLpnBv8ZoIVKi_UTHD-cijNB-BU-x22c8NrZJfVW7eQ/exec", {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          phone,
          location,
        }),
      });
      
      // Simulate a brief delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert("✅ Test drive booked successfully!");
      setFullName('');
      setPhone('');
      setLocation('');
      localStorage.setItem("testDriveSubmitted", "true");
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("❌ An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (!open) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-11/12 max-w-sm relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl font-bold">&times;</button>
        <h2 className="text-xl font-bold mb-4 text-blue-700">Book Test Drive</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label className="text-sm font-medium text-gray-700" htmlFor="fullName">Full Name</label>
          <input 
            id="fullName" 
            className="border border-black rounded px-3 py-2 bg-white text-black font-semibold placeholder-gray-400" 
            placeholder="Enter your full name" 
            value={fullName} 
            onChange={e => setFullName(e.target.value)} 
            autoComplete="off"
            disabled={isSubmitting}
          />

          <label className="text-sm font-medium text-gray-700" htmlFor="phone">Phone Number</label>
          <input 
            id="phone" 
            className="border border-black rounded px-3 py-2 bg-white text-black font-semibold placeholder-gray-400" 
            placeholder="Enter your 10-digit phone number" 
            value={phone} 
            onChange={handlePhoneChange} 
            maxLength={10} 
            inputMode="numeric" 
            autoComplete="off"
            disabled={isSubmitting}
          />

          <label className="text-sm font-medium text-gray-700" htmlFor="location">Location</label>
          <input 
            id="location" 
            className="border border-black rounded px-3 py-2 bg-white text-black font-semibold placeholder-gray-400" 
            placeholder="Enter your location" 
            value={location} 
            onChange={e => setLocation(e.target.value)} 
            autoComplete="off"
            disabled={isSubmitting}
          />
          
          {error && <div className="text-red-500 text-sm">{error}</div>}
          
          <button 
            type="submit" 
            className={`rounded py-2 font-semibold transition ${
              isSubmitting 
                ? 'bg-gray-400 text-white cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Please wait, your test ride is being registered...
              </div>
            ) : (
              'Confirm Test Ride'
            )}
          </button>
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
    if (!localStorage.getItem("testDriveSubmitted")) {
      if (!showModal) {
        timer = setTimeout(() => setShowModal(true), 6000);
      }
    }
    return () => clearTimeout(timer);
  }, [showModal]);

  return (
    <div className="min-h-screen bg-[#E6F3FF] overflow-x-hidden">
      {/* Top Navigation Bar (fixed) */}
      <div className="fixed top-0 w-full z-20 flex justify-between items-center px-4 py-2 bg-gray-100 shadow-sm">
        <div className="flex items-center h-10">
          <Image src="/assets/raam-logo.png" alt="RAAM GROUP" width={80} height={40} className="h-7 md:h-10 w-auto object-contain" />
        </div>
        <div className="flex items-center h-10">
          <Image src="/assets/ather-logo.png" alt="ATHER" width={80} height={40} className="h-7 md:h-10 w-auto object-contain" />
        </div>
      </div>
      <div className="h-14" /> {/* Spacer for fixed navbar */}

      {/* Hero Row: Video | Model Cards | Know More */}
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-screen-xl mx-auto px-4 py-8 md:py-12 gap-6 md:gap-8">
        {/* Video Section (left) */}
        <div className="w-full md:w-1/3 flex-shrink-0 flex items-center justify-center">
          <div className="w-full max-w-6xl mx-auto px-4">
            <HeroVideo />
          </div>
        </div>
        {/* Model Cards (center) */}
        <div className="w-full md:w-1/2 flex flex-col md:flex-row items-center justify-center gap-6">
          {/* RIZTA */}
          <motion.div
              className="flex-1 bg-[#e6f3ff] rounded-2xl shadow-lg p-6 flex flex-col items-center font-sans"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <div className="text-xl font-bold text-blue-900 mb-2 tracking-tight">ATHER RIZTA</div>
              <Image src="/assets/bike.png" alt="Ather Rizta" width={180} height={100} className="mb-3" />
              <div className="font-semibold text-base text-gray-800 w-full max-w-xs mb-1">🛵 Ather Rizta – Key Highlights</div>
              <ul className="text-base text-gray-800 list-disc pl-5 space-y-1 w-full max-w-xs">
                <li>Family-first design with longest seat and spacious footboard</li>
                <li>SkidControl™ tech for maximum grip in all weather</li>
                <li>Up to 125 km range with practical utility and rugged build</li>
              </ul>
            </motion.div>
            {/* 450 */}
            <motion.div
              className="flex-1 bg-[#e6f3ff] rounded-2xl shadow-lg p-6 flex flex-col items-center font-sans"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <div className="text-xl font-bold text-blue-900 mb-2 tracking-tight">ATHER 450</div>
              <Image src="/assets/450xlr.png" alt="Ather 450" width={180} height={100} className="mb-3" />
              <div className="font-semibold text-base text-gray-800 w-full max-w-xs mb-1">⚡ Ather 450 – Key Highlights</div>
              <ul className="text-base text-gray-800 list-disc pl-5 space-y-1 w-full max-w-xs">
                <li>Warp+ Mode: 0–40 km/h in just 2.6 sec for instant thrill</li>
                <li>Certified 150+ km range with fast charging via Ather Grid</li>
                <li>7” TFT dashboard with Google Maps navigation built-in</li>
              </ul>
          </motion.div>
          </div>
        {/* Know More Button (right) */}
        <div className="w-full md:w-1/6 flex items-center justify-center md:justify-end mt-6 md:mt-0">
          <a
            href="tel:8712600675"
            className="w-48 py-2 px-4 rounded-lg bg-blue-200 text-blue-900 font-semibold text-base shadow-lg hover:bg-blue-300 hover:scale-105 transition-all duration-200 text-center focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 active:shadow-2xl active:bg-blue-300 font-sans"
            style={{ display: 'block' }}
          >
            Know More 📞
          </a>
        </div>
      </div>

      {/* Showrooms Section - Unified Map */}
      <div className="w-full max-w-2xl mx-auto px-4 pt-4 pb-4 flex flex-col items-center">
        <div className="font-bold text-center text-[1.15rem] md:text-2xl text-blue-900 mb-2 leading-snug break-words font-sans" style={{ wordBreak: 'break-word' }}>
          <span className="block">📍 VISIT OUR SHOWROOMS :-</span>
          <span className="block font-bold text-blue-900 text-lg md:text-xl mt-1">
            📍 PORUR <span className="mx-1">|</span> 📍 NUNGAMBAKKAM <span className="mx-1">|</span> 📍 TIRUVOTTIYUR
          </span>
        </div>
        <div style={{ width: '100%', height: '450px', overflow: 'hidden', borderRadius: '12px' }} className="shadow-lg border border-blue-200 rounded-lg">
          <iframe
            src="https://www.google.com/maps/d/embed?mid=1uC3Fe8W9JZnpfJVzjt_S1F_5ei4XzLs&ehbc=2E312F&noprof=1"
            width="100%"
            height="520"
            style={{ border: 0, marginTop: '-70px' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ather Chennai Showrooms Map"
          ></iframe>
        </div>
      </div>

      {/* Contact Info Section at the bottom */}
      <div className="w-full bg-[#e6f3ff] rounded-2xl shadow-lg p-6 flex flex-col items-center text-center gap-2 mb-4 max-w-screen-md mx-auto font-sans">
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
