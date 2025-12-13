import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const features = [
    {
      title: 'My Courses',
      description: 'View and manage enrolled courses',
      icon: '📚',
      path: '/courses',
      gradient: 'from-blue-500 to-cyan-500',
      stats: '12 Active'
    },
    {
      title: 'Assignments',
      description: 'Submit and track assignments',
      icon: '📝',
      path: '/assignments',
      gradient: 'from-purple-500 to-pink-500',
      stats: '5 Pending'
    },
    {
      title: 'Attendance',
      description: 'Track attendance records',
      icon: '📊',
      path: '/attendance',
      gradient: 'from-green-500 to-emerald-500',
      stats: '92% Rate'
    }
  ];

  return (
    <div className="min-h-screen bg-[#050816]">
      {/* Top Navigation Bar */}
      <nav className="bg-[#0D1425] border-b-2 border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-10">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Smart Student
              </h1>
              <div className="hidden md:flex gap-2">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="px-5 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-lg"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => navigate('/courses')}
                  className="px-5 py-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg font-medium transition-all"
                >
                  Courses
                </button>
                <button
                  onClick={() => navigate('/assignments')}
                  className="px-5 py-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg font-medium transition-all"
                >
                  Assignments
                </button>
                <button
                  onClick={() => navigate('/attendance')}
                  className="px-5 py-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg font-medium transition-all"
                >
                  Attendance
                </button>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-400 font-medium">
                👋 {user?.first_name || 'Student'}
              </span>
              <button
                onClick={handleLogout}
                className="px-5 py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg font-bold transition-all border-2 border-red-500/30"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content - CENTERED */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Welcome Header */}
        <div className="text-center mb-16">
          <h2 className="text-6xl font-bold text-white mb-4">
            Welcome Back! 🎓
          </h2>
          <p className="text-gray-400 text-xl">
            Everything you need for academic success
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, idx) => (
            <button
              key={idx}
              onClick={() => navigate(feature.path)}
              className="group bg-[#0D1425] border-2 border-gray-800 hover:border-gray-700 rounded-2xl p-8 text-left transition-all transform hover:scale-105 hover:shadow-2xl"
            >
              <div className="text-6xl mb-6">{feature.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-400 mb-6">
                {feature.description}
              </p>
              <div className={`inline-block px-4 py-2 bg-gradient-to-r ${feature.gradient} rounded-full text-white text-sm font-bold`}>
                {feature.stats}
              </div>
            </button>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { label: 'Active Courses', value: '12', icon: '📚' },
            { label: 'Assignments Due', value: '5', icon: '⏰' },
            { label: 'Attendance', value: '92%', icon: '✅' },
            { label: 'GPA', value: '3.8', icon: '⭐' }
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-[#0D1425] border-2 border-gray-800 rounded-xl p-6 text-center"
            >
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className="text-gray-400 text-sm mb-2 uppercase tracking-wide font-bold">
                {stat.label}
              </div>
              <div className="text-4xl font-bold text-white">{stat.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;