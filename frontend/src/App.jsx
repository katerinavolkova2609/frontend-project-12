import { Routes, Route, Link } from 'react-router-dom';
import Main from './pages/Main.jsx';
import Autorization from './pages/Autorization.jsx';
import NotFound from './pages/NotFound.jsx';
import SignUp from './pages/SignUp.jsx';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Autorization />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
