import { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/certificate.css';

const Certificate = ({ onViewed }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleCertDownload = async () => {
    setIsLoading(true);

    try {
      // Fetch user data
      const userData = JSON.parse(sessionStorage.getItem("userData"));
      const certificateId = "XXXX0123456789YY";
      const requestBody = {
        username: userData.name,
        certificate_id: certificateId,
        from_date: "01-01-2024",
        to_date: "01-01-2025",
      };

      // Fetch the PDF from the API
      const response = await fetch(`${import.meta.env.VITE_MATHIN_CERT_API_URL}/generate-certificate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': import.meta.env.VITE_MATHIN_CERT_API_KEY,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('Failed to generate certificate. Please try again later!');
      }

      // Create a blob URL from the response
      const blob = await response.blob();
      const pdfUrl = URL.createObjectURL(blob);

      // Auto-download the PDF
      const downloadLink = document.createElement('a');
      downloadLink.href = pdfUrl;
      downloadLink.download = `${certificateId}_certificate.pdf`; // Sets the filename
      document.body.appendChild(downloadLink);
      // downloadLink.click();
      document.body.removeChild(downloadLink);

      // Open the PDF in a new tab
      const newTab = window.open(pdfUrl, '_blank', 'noopener,noreferrer');
      if (!newTab) {
        throw new Error("Unable to open new tab. Please check your browser's popup blocker.");
      }

      // Cleanup the blob URL after a short delay
      setTimeout(() => {
        URL.revokeObjectURL(pdfUrl);
      }, 5000);

      setIsLoading(false);
      onViewed();
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
        <button className="certificate-button" onClick={handleCertDownload}>
          <span>Download & View Certificate</span>
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