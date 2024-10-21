// App.jsx
// This project is developed and maintained by 'Aswin V S' (https://github.com/aswin-vs)

import { Routes, Route } from 'react-router-dom';

import Homepage from './components/Homepage';
import Prepare from './components/Prepare';
import Practice0 from './components/Practice0';
import Participate0 from './components/Participate0';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/prepare" element={<Prepare />} />
        <Route path="/practice" element={<Practice0 />} />
        <Route path="/participate" element={<Participate0 />} />
      </Routes>
    </>
  );
}

export default App;