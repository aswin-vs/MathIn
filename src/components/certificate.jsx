// certificate.jsx

import { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/certificate.css';

const Certificate = ({ onViewed }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenPdf = async () => {
    setIsLoading(true);

    try {
      // Construct the certificate request payload
      const certificateId = "XXXX0123456789YY"; // Replace this with dynamic logic if needed
      const requestBody = {
        username: "Valai Pechu",
        certificate_id: certificateId,
        from_date: "01-01-2024",
        to_date: "01-01-2025",
      };

      // Make the POST request to the API
      const response = await fetch(`${import.meta.env.VITE_MATHIN_CERT_API_URL}/generate-certificate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': import.meta.env.VITE_MATHIN_CERT_API_KEY,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('Failed to generate certificate. Please try again later.');
      }

      // Process the response and create a downloadable link
      const blob = await response.blob();
      const pdfUrl = URL.createObjectURL(blob);

      // Download the PDF file
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = `${certificateId}_certificate.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Open the PDF in a new tab with zoom
      const pdfWithZoom = `${pdfUrl}#zoom=65`;
      const newTab = window.open(pdfWithZoom, '_blank', 'noopener,noreferrer');
      if (newTab) newTab.opener = null;

      // Clean up after the operation
      URL.revokeObjectURL(pdfUrl);

      // Call onViewed callback after success
      setTimeout(() => {
        setIsLoading(false);
        onViewed();
      }, 1000);
    } catch (error) {
      console.error('Error generating certificate:', error);
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
        <button className="certificate-button" onClick={handleOpenPdf}>
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