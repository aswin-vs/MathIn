// App.jsx
// This project is developed and maintained by 'Aswin V S' (https://github.com/aswin-vs)

import { Routes, Route, Navigate } from 'react-router-dom';
import { HashRouter } from 'react-router-dom'; // Import HashRouter

import Homepage from './components/homepage';
import Prepare from './components/prepare';
import Practice0 from './components/practice0';
import Participate0 from './components/participate0';
import CertificateVerify from "./components/certificateVerify";

const App = () => {
  return (
    <Routes>
      {/* Regular BrowserRouter routes */}
      <Route path="/" element={<Homepage />} />
      <Route path="prepare" element={<Prepare />} />
      <Route path="practice" element={<Practice0 />} />
      <Route path="participate" element={<Participate0 />} />

      {/* For /verify, use HashRouter */}
      <Route path="verify/*" element={
        <HashRouter> {/* Use HashRouter for /verify route */}
          <Routes>
            <Route path=":certificateId" element={<CertificateVerify />} />
          </Routes>
        </HashRouter>
      } />

      {/* Redirect to homepage if no match */}
      <Route path="*" element={<Navigate to="/" replace={true} />} />
    </Routes>
  );
};

export default App;