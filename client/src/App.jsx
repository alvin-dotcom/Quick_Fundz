import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import FirstPage from './components/FirstPage';


function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-4 text-gray-800">Welcome to QuickFundz</h1>
      <p className="mb-8 text-gray-600">Sign up or log in to continue</p>
      <div className="space-x-4">
        <Link to="/signup" className="px-4 py-2 bg-blue-500 text-white rounded-lg">SignUp</Link>
        <Link to="/login" className="px-4 py-2 bg-green-500 text-white rounded-lg">Login</Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/firstpage" element={<FirstPage />} />
      </Routes>
    </Router>
  );
}

export default App;
