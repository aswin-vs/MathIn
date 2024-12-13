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

      // Fetch the PDF
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

      // Create a blob URL for the PDF
      const blob = await response.blob();
      const pdfUrl = URL.createObjectURL(blob);

      // Open the PDF in a new tab
      const newTab = window.open('', '_blank');
      if (newTab) {
        newTab.document.body.innerHTML = `
          <embed src="${pdfUrl}#zoom=65" type="application/pdf" style="width:100%; height:100%;" />
        `;
        newTab.document.title = "MathIn Pro - Certificate";
      } else {
        throw new Error("Unable to open new tab. Please check your browser's popup blocker.");
      }

      // Revoke the blob URL after 1 second
      setTimeout(() => URL.revokeObjectURL(pdfUrl), 1000);

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