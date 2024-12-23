// App.jsx
// This project is developed and maintained by 'Aswin V S' (https://github.com/aswin-vs)

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';

import Homepage from './components/homepage';
import Prepare from './components/prepare';
import Practice0 from './components/practice0';
import Participate0 from './components/participate0';
import CertificateVerify from "./components/certificateVerify";

const App = () => {
  return (
    <>
      {/* Use HashRouter specifically for the /verify path */}
      <HashRouter>
        <Routes>
          <Route path="/verify/:certificateId" element={<CertificateVerify />} />
        </Routes>
      </HashRouter>

      {/* Use BrowserRouter for most routes */}
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="prepare" element={<Prepare />} />
          <Route path="practice" element={<Practice0 />} />
          <Route path="participate" element={<Participate0 />} />
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;