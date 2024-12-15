// certificate.jsx

import { useState } from 'react';
import PropTypes from 'prop-types';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import '../styles/certificate.css';

const Certificate = ({ onViewed }) => {
  const [isLoading, setIsLoading] = useState(false);

  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const userName = userData.name;
  const userEmail = userData.mail;

  const fetchCertificateId = async (userEmail) => {
    try {
      const userDocRef = doc(db, "passEntries", userEmail);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        return userData.certificateId;
      } else {
        throw new Error("No userdata found !");
      }
    } catch (error) {
      console.error("Error fetching certificateId: ", error);
      throw error;
    }
  };

  const handleCertDownload = async () => {
    setIsLoading(true);

    try {
      const certificateId = await fetchCertificateId(userEmail);
      const requestBody = {
        username: userName,
        certificate_id: certificateId,
        from_date: "01-01-2024",
        to_date: "01-01-2025",
      };

      const response = await fetch("https://mathin-certapi-3cs4.onrender.com/generate-certificate", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': import.meta.env.VITE_MATHIN_CERT_API_KEY,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('Failed to generate certificate. Please try again later !');
      }

      const blob = await response.blob();
      const pdfUrl = URL.createObjectURL(blob);
      const downloadLink = document.createElement('a');
      downloadLink.href = pdfUrl;
      downloadLink.download = `${certificateId}_certificate.pdf`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      setTimeout(() => {
        URL.revokeObjectURL(pdfUrl);
      }, 5000);

      onViewed();
    } catch (error) {
      console.error('Error generating certificate: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="certificate-loader-container">
          <div className="certificate-loader"></div>
        </div>
      ) : (
        <button className="certificate-button" onClick={handleCertDownload}>
          <span>View Certificate</span>
          <img className="certificate-icon" src={`${import.meta.env.BASE_URL}icons/arrowRight.svg`} alt="arrowRightIcon" />
        </button>
      )}
    </>
  );
};

Certificate.propTypes = {
  onViewed: PropTypes.func.isRequired,
};

export default Certificate;