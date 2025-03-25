import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import React from 'react';
const QRCodeGenerator = ({ voterData }) => {
  const [qrValue, setQrValue] = useState('');

  useEffect(() => {
    const dataString = JSON.stringify(voterData);
    setQrValue(dataString);
  }, [voterData]);

  return (
    <div className="flex flex-col items-center">
      <div className="p-4 bg-white rounded-2xl shadow-md animate-scale-in">
        <QRCodeSVG 
          value={qrValue} 
          size={200} 
          bgColor="#FFFFFF" 
          fgColor="#000000" 
          level="H" 
          includeMargin={true} 
        />
      </div>
      <p className="mt-4 text-sm text-muted-foreground">
        Your unique voter verification QR code
      </p>
      <div className="mt-6 space-y-3">
        <button className="btn-secondary w-full flex justify-center items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          <span>Download QR Code</span>
        </button>
        <button className="btn-secondary w-full flex justify-center items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
          <span>Copy to clipboard</span>
        </button>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
