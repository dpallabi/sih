import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login, register } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      if (isRegister) {
        await register({
          email,
          password,
          first_name: firstName,
          last_name: lastName,
          role: 'student'
        });
      } else {
        await login(email, password);
      }
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Authentication failed');
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] flex items-center justify-center px-4">
      {/* Centered Container - EXACTLY LIKE CODÉDEX */}
      <div className="w-full max-w-md mx-auto">
        {/* Logo Section */}
        <div className="text-center mb-12">
          <div className="text-7xl mb-4 animate-bounce">🎓</div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent mb-3">
            Smart Student
          </h1>
          <p className="text-gray-400 text-lg">Your Gateway to Academic Excellence</p>
        </div>

        {/* Login/Register Toggle */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setIsRegister(false)}
            className={`flex-1 py-3 rounded-xl font-bold text-lg transition-all duration-300 ${
              !isRegister
                ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black shadow-lg shadow-yellow-500/50'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsRegister(true)}
            className={`flex-1 py-3 rounded-xl font-bold text-lg transition-all duration-300 ${
              isRegister
                ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black shadow-lg shadow-yellow-500/50'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            Register
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border-2 border-red-500 rounded-xl text-red-400 text-center font-medium">
            {error}
          </div>
        )}

        {/* Form Card */}
        <div className="bg-[#0D1425] border-2 border-gray-800 rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {isRegister && (
              <>
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wide">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-4 py-3 bg-[#050816] border-2 border-gray-800 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-yellow-500 transition-all font-medium"
                    placeholder="John"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wide">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-4 py-3 bg-[#050816] border-2 border-gray-800 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-yellow-500 transition-all font-medium"
                    placeholder="Doe"
                    required
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wide">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-[#050816] border-2 border-gray-800 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-yellow-500 transition-all font-medium"
                placeholder="student@university.edu"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wide">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[#050816] border-2 border-gray-800 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-yellow-500 transition-all font-medium"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold text-lg rounded-xl transition-all transform hover:scale-105 shadow-lg shadow-yellow-500/50"
            >
              {isRegister ? '✨ Create Account' : '🚀 Sign In'}
            </button>
          </form>
        </div>

        {/* Features List */}
        <div className="mt-8 space-y-3">
          <div className="flex items-center gap-3 text-gray-400">
            <span className="text-2xl">📚</span>
            <span className="text-sm">Access all courses</span>
          </div>
          <div className="flex items-center gap-3 text-gray-400">
            <span className="text-2xl">📝</span>
            <span className="text-sm">Submit assignments</span>
          </div>
          <div className="flex items-center gap-3 text-gray-400">
            <span className="text-2xl">📊</span>
            <span className="text-sm">Track attendance</span>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-600 text-xs mt-8">
          © 2025 Smart Student System
        </p>
      </div>
    </div>
  );
};

export default Login;