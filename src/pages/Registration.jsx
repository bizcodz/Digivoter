import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import RegistrationTimer from "../components/RegistrationTimer";
import QRCodeGenerator from "../components/QRCodeGenerator";
import { toPng } from "html-to-image";
import React from "react";

const Registration = () => {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    idNumber: "",
    dateOfBirth: "",
    address: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [voterInfo, setVoterInfo] = useState({ id: "", name: "", idNumber: "" });

  const navigate = useNavigate();
  const registrationOpenDate = new Date(new Date().getTime() + 5000);

  useEffect(() => {
    const savedRegistration = localStorage.getItem("voterRegistration");
    if (savedRegistration) {
      const data = JSON.parse(savedRegistration);
      setRegistrationComplete(true);
      setVoterInfo(data);
    }
  }, []);

  const validateStepOne = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full Name is required";
    if (!formData.idNumber || !/^[A-Z]{3}\d{7}$/.test(formData.idNumber)) newErrors.idNumber = "ID Number must be in the format AAAxxxxxxx";
    if (!formData.dateOfBirth || new Date().getFullYear() - new Date(formData.dateOfBirth).getFullYear() < 18) newErrors.dateOfBirth = "You must be at least 18 years old";
    return newErrors;
  };

  const validateStepTwo = () => {
    const newErrors = {};
    if (!formData.address || formData.address.length < 20 || formData.address.length > 50) newErrors.address = "Address must be between 20 and 50 characters";
    if (!formData.phone || !/^\d{10}$/.test(formData.phone)) newErrors.phone = "Phone Number must be exactly 10 digits";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = step === 1 ? validateStepOne() : validateStepTwo();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (step === 1) {
      setStep(2);
      return;
    }

    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const voterId = `V-${Math.floor(100000 + Math.random() * 900000)}`;

      const newVoterInfo = {
        id: voterId,
        name: formData.fullName,
        idNumber: formData.idNumber,
      };

      localStorage.setItem("voterRegistration", JSON.stringify(newVoterInfo));
      setVoterInfo(newVoterInfo);
      setRegistrationComplete(true);

      // alert("Registration Complete: Your voter registration has been processed successfully");
    } catch (error) {
      alert("Error: Failed to process registration. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadQR = () => {
    const qrElement = document.getElementById("qr-code");
    if (qrElement) {
      toPng(qrElement)
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = `${voterInfo.id}_QRCode.png`;
          link.click();
        })
        .catch((error) => console.error("QR Code Download Failed:", error));
    }
  };

  const restartRegistration = () => {
    localStorage.removeItem("voterRegistration");
    setRegistrationComplete(false);
    setStep(1);
    setFormData({
      fullName: "",
      idNumber: "",
      dateOfBirth: "",
      address: "",
      phone: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />
      <main className="pt-32 pb-20 px-4">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold mb-2">Voter Registration</h1>
            <p className="text-muted-foreground">Register to receive your secure QR code for voting</p>
          </div>

          {!registrationComplete ? (
            <>
              <RegistrationTimer
                registrationOpenDate={registrationOpenDate}
                isOpen={isRegistrationOpen}
                onStatusChange={setIsRegistrationOpen}
              />
              <div className="bg-white shadow-lg rounded-2xl p-8 animate-scale-in">
                {!isRegistrationOpen ? (
                  <div className="text-center py-6">
                    <h3 className="text-xl font-bold mb-2">Registration Not Yet Open</h3>
                    <p className="text-muted-foreground">Please wait until registration opens.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {step === 1 ? (
                      <>
                        <div>
                          <label htmlFor="fullName" className="font-medium">Full Name</label>
                          <input
                            id="fullName"
                            name="fullName"
                            type="text"
                            value={formData.fullName}
                            onChange={handleChange}
                            className="input-field bg-white"
                            placeholder="Enter your full name"
                          />
                          {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
                        </div>
                        <div>
                          <label htmlFor="idNumber" className="font-medium">ID Number</label>
                          <input
                            id="idNumber"
                            name="idNumber"
                            type="text"
                            value={formData.idNumber}
                            onChange={handleChange}
                            className="input-field bg-white"
                            placeholder="Enter your ID number (AAAxxxxxxx)"
                          />
                          {errors.idNumber && <p className="text-red-500 text-sm">{errors.idNumber}</p>}
                        </div>
                        <div>
                          <label htmlFor="dateOfBirth" className="font-medium">Date of Birth</label>
                          <input
                            id="dateOfBirth"
                            name="dateOfBirth"
                            type="date"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            className="input-field bg-white"
                          />
                          {errors.dateOfBirth && <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>}
                        </div>
                        <button type="submit" className="btn-primary w-full">Continue</button>
                      </>
                    ) : (
                      <>
                        <div>
                          <label htmlFor="address" className="font-medium">Residential Address</label>
                          <input
                            id="address"
                            name="address"
                            type="text"
                            value={formData.address}
                            onChange={handleChange}
                            className="input-field bg-white"
                            placeholder="Enter your address (20-50 characters)"
                          />
                          {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                        </div>
                        <div>
                          <label htmlFor="phone" className="font-medium">Phone Number</label>
                          <input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            className="input-field bg-white"
                            placeholder="Enter your phone number (10 digits)"
                          />
                          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                        </div>
                        <button type="submit" className="btn-primary w-full" disabled={isLoading}>
                          {isLoading ? "Processing..." : "Complete Registration"}
                        </button>
                      </>
                    )}
                  </form>
                )}
              </div>
            </>
          ) : (
            <div className="bg-white shadow-lg rounded-2xl p-8 max-w-lg mx-auto text-center animate-fade-in">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Registration Complete</h2>
              <p className="text-gray-500 mb-4">Your voter registration has been processed.</p>
              <div className="bg-gray-100 text-gray-800 text-sm font-medium px-4 py-2 rounded-lg inline-block mb-4">
                Voter ID: {voterInfo.id}
              </div>
              <div id="qr-code" className="flex justify-center mb-4">
                <QRCodeGenerator voterData={voterInfo} />
              </div>
              <div className="flex flex-col space-y-3">
                <button onClick={handleDownloadQR} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition w-full">
                  ⬇️ Download QR Code
                </button>
                <button onClick={restartRegistration} className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition w-full">
                  🔄 Restart Registration
                </button>
                <button onClick={() => navigate('/verification')} className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition w-full">
                  Try Verification Demo
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Registration;