import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import QRCodeGenerator from "../components/QRCodeGenerator";
import { toPng } from "html-to-image";
import Registration from "./Registration";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [voterInfo, setVoterInfo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false) // Add loading state
  const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUserData = async () => {
//       setLoading(true); // Set loading to true while fetching data

//       try {
//         const token = localStorage.getItem("authToken");
//         if (!token) {
//           navigate("/login");
//           return;
//         }

//         const response = await fetch("/api/user", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!response.ok) {
//           localStorage.removeItem("authToken");
//           navigate("/login");
//           return;
//         }

//         const userData = await response.json();
//         setUser(userData);

//         const savedRegistration = localStorage.getItem("voterRegistration");
//         if (savedRegistration) {
//           setVoterInfo(JSON.parse(savedRegistration));
//           setRegistrationComplete(true);
//         }
//       } catch (err) {
//         setError("Error fetching user data");
//         console.error("Error fetching user data:", err);
//       } finally {
//         setLoading(false); // Set loading to false after fetching data
//       }
//     };

//     fetchUserData();
//   }, [navigate]);

  const handleDownloadQR = () => {
    const qrElement = document.getElementById("qr-code");
    if (qrElement && voterInfo) {
      toPng(qrElement)
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = `${voterInfo.id}_QRCode.png`;
          link.click();
        })
        .catch((err) => console.error("QR Code Download Failed:", err));
    }
  };

  const restartRegistration = () => {
    localStorage.removeItem("voterRegistration");
    setRegistrationComplete(false);
    setVoterInfo(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("voterRegistration"); // Clear registration data on logout
    navigate("/login");
  };

  const handleRegistrationComplete = (newVoterInfo) => {
    setVoterInfo(newVoterInfo);
    setRegistrationComplete(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div>Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar onLogout={handleLogout} />
      <main className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold mb-2">
              Welcome {user?.username}!
            </h1>
            <p className="text-muted-foreground">Your personalized dashboard.</p>
          </div>

          {!registrationComplete ? (
            <Registration onRegistrationComplete={handleRegistrationComplete} />
          ) : (
            <div className="bg-white shadow-lg rounded-2xl p-8 max-w-lg mx-auto text-center animate-fade-in">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Registration Complete
              </h2>
              <p className="text-gray-500 mb-4">
                Your voter registration has been processed.
              </p>
              {voterInfo && (
                <>
                  <div className="bg-gray-100 text-gray-800 text-sm font-medium px-4 py-2 rounded-lg inline-block mb-4">
                    Voter ID: {voterInfo.id}
                  </div>
                  <div id="qr-code" className="flex justify-center mb-4">
                    <QRCodeGenerator voterData={voterInfo} />
                  </div>
                  <div className="flex flex-col space-y-3">
                    <button
                      onClick={handleDownloadQR}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition w-full"
                    >
                      ⬇️ Download QR Code
                    </button>
                    <button
                      onClick={restartRegistration}
                      className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition w-full"
                    >
                      🔄 Restart Registration
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;