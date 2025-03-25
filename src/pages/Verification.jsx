import { useState, useRef, useEffect } from 'react';
import Navbar from '../components/Navbar';
import React from 'react';
// import { useToast } from '@/hooks/use-toast';

const Verification = () => {
  const [step, setStep] = useState(1);
  const [isScanning, setIsScanning] = useState(false);
  const [qrData, setQrData] = useState(null);
  const [isFaceMatching, setIsFaceMatching] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [countdown, setCountdown] = useState(3);
  
  const videoRef = useRef(null);
//   const { toast } = useToast();
  
  useEffect(() => {
    const savedRegistration = localStorage.getItem('voterRegistration');
    if (savedRegistration && step === 2) {
      setTimeout(() => {
        setQrData(JSON.parse(savedRegistration));
        setIsScanning(false);
        setStep(3);
      }, 3000);
    }
  }, [step]);
  
  useEffect(() => {
    if (step === 3 && qrData) {
      const timer = setTimeout(() => {
        if (countdown > 1) {
          setCountdown(countdown - 1);
        } else {
          const isSuccess = Math.random() < 0.8;
          if (isSuccess) {
            setIsFaceMatching(true);
            setIsVerified(true);
          } else {
            setIsFaceMatching(false);
            setIsFailed(true);
          }
          setStep(4);
        }
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [step, countdown, qrData]);
  
  const handleStartScan = () => {
    setIsScanning(true);
    setStep(2);
    
    const savedRegistration = localStorage.getItem('voterRegistration');
    if (!savedRegistration) {
      setTimeout(() => {
        toast({
          title: "No registration found",
          description: "Please complete your voter registration first",
          variant: "destructive",
        });
        setIsScanning(false);
        setStep(1);
      }, 3000);
    }
  };
  
  const handleReset = () => {
    setStep(1);
    setIsScanning(false);
    setQrData(null);
    setIsFaceMatching(false);
    setIsVerified(false);
    setIsFailed(false);
    setCountdown(3);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />
      <main className="pt-32 pb-20 px-4">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold mb-2">Verification Kiosk Demo</h1>
            <p className="text-muted-foreground">Simulate the in-person verification process</p>
          </div>
          <div className="card-glass p-8 animate-scale-in">
            {step === 1 && (
              <div className="text-center py-8">
                <h2 className="text-2xl font-bold mb-6">Welcome to the Voting Station</h2>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  This demo simulates the verification process at a voting kiosk. 
                  Press the button below to begin scanning your QR code.
                </p>
                <button onClick={handleStartScan} className="btn-primary">
                  Start Verification Process
                </button>
              </div>
            )}
            {step === 2 && (
              <div className="text-center py-8 animate-fade-in">
                <h2 className="text-2xl font-bold mb-4 mt-6">Scanning QR Code</h2>
                <p className="text-muted-foreground">
                  Please hold your voter QR code steady in front of the scanner
                </p>
              </div>
            )}
            {step === 3 && qrData && (
              <div className="text-center py-8 animate-fade-in">
                <h2 className="text-2xl font-bold mb-4 mt-6">Face Recognition</h2>
                <p className="text-muted-foreground mb-2">
                  Please look directly at the camera
                </p>
                <div className="bg-primary/5 rounded-lg p-3 inline-block">
                  <p className="text-sm">Verifying: <span className="font-medium">{qrData.name}</span></p>
                  <p className="text-sm">ID: <span className="font-medium">{qrData.idNumber}</span></p>
                </div>
              </div>
            )}
            {step === 4 && (
              <div className="text-center py-8 animate-fade-in">
                {isVerified ? (
                  <>
                    <h2 className="text-2xl font-bold mb-4 text-green-700">Verification Successful</h2>
                    <p className="text-green-600 mb-6">
                      Your identity has been verified. Please proceed to the voting booth.
                    </p>
                  </>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold mb-4 text-red-700">Verification Failed</h2>
                    <p className="text-red-600 mb-6">
                      We couldn't verify your identity. Please see the polling station staff for assistance.
                    </p>
                  </>
                )}
                <button onClick={handleReset} className="btn-primary">
                  Reset Demo
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Verification;
