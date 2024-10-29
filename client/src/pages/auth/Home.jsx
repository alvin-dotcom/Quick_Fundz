import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-100 via-white to-blue-100 relative">
      <div className="absolute w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-2xl opacity-30 top-10 left-20 animate-blob"></div>
      <div className="absolute w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-2xl opacity-30 bottom-20 right-20 animate-blob animation-delay-2000"></div>
      
      <div className="relative z-10 text-center p-8">
        <h1 className="text-5xl font-extrabold mb-4 text-gray-800 drop-shadow-lg">
          Welcome to <span className="text-blue-600">QuickFundz</span>
        </h1>
        <p className="mb-8 text-lg text-gray-700 max-w-md mx-auto drop-shadow">
          The smarter way to fund your dreams. Sign up now and start your journey with us!
        </p>
        <div className="space-x-4">
          <Link 
            to="/auth/signup" 
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg transform transition duration-300 hover:-translate-y-1"
          >
            Sign Up
          </Link>
          <Link 
            to="/auth/login" 
            className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg transform transition duration-300 hover:-translate-y-1"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
