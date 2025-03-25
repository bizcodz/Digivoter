import { useState, useEffect } from 'react';
import React from 'react';

const RegistrationTimer = ({ registrationOpenDate, isOpen, onStatusChange }) => {
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

  useEffect(() => {
    const now = new Date();
    if (registrationOpenDate.getTime() <= now.getTime()) {
      setIsRegistrationOpen(true);
      onStatusChange(true);
    }

    const calculateTimeRemaining = () => {
      const now = new Date();
      const difference = registrationOpenDate.getTime() - now.getTime();

      if (difference <= 0) {
        if (!isRegistrationOpen) {
          setIsRegistrationOpen(true);
          onStatusChange(true);
        }

        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      return { days, hours, minutes, seconds };
    };

    setTimeRemaining(calculateTimeRemaining());

    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, [registrationOpenDate, onStatusChange, isRegistrationOpen]);

  if (isRegistrationOpen || isOpen) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 animate-fade-in">
        <div className="flex items-center text-green-700">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          <span className="font-medium">Registration is now open!</span>
        </div>
        <p className="text-green-600 text-sm mt-1">Complete your registration to receive your voter QR code.</p>
      </div>
    );
  }

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 animate-fade-in">
      <div className="flex items-center text-amber-700">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <span className="font-medium">Registration opens in:</span>
      </div>
      <div className="grid grid-cols-4 gap-2 mt-3">
        <div className="text-center">
          <div className="text-2xl font-bold text-amber-700">{timeRemaining.days}</div>
          <div className="text-xs text-amber-600">Days</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-amber-700">{timeRemaining.hours}</div>
          <div className="text-xs text-amber-600">Hours</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-amber-700">{timeRemaining.minutes}</div>
          <div className="text-xs text-amber-600">Minutes</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-amber-700">{timeRemaining.seconds}</div>
          <div className="text-xs text-amber-600">Seconds</div>
        </div>
      </div>
      <p className="text-amber-600 text-sm mt-3">You will be able to register once the timer reaches zero.</p>
    </div>
  );
};

export default RegistrationTimer;
