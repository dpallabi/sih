import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Courses = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
    }
  }, [navigate]);

  const courses = [
    {
      title: 'Web Development',
      description: 'Learn HTML, CSS, JavaScript, and React to build modern web applications',
      progress: 75,
      level: 'INTERMEDIATE',
      gradient: 'from-blue-600 to-cyan-600',
      bgGradient: 'from-blue-500/20 to-cyan-500/20',
      icon: '🌐'
    },
    {
      title: 'Data Structures',
      description: 'Master algorithms and data structures for efficient problem solving',
      progress: 60,
      level: 'ADVANCED',
      gradient: 'from-purple-600 to-pink-600',
      bgGradient: 'from-purple-500/20 to-pink-500/20',
      icon: '🗂️'
    },
    {
      title: 'Machine Learning',
      description: 'Build intelligent systems that learn from data and improve over time',
      progress: 45,
      level: 'INTERMEDIATE',
      gradient: 'from-green-600 to-emerald-600',
      bgGradient: 'from-green-500/20 to-emerald-500/20',
      icon: '🤖'
    },
    {
      title: 'Database Systems',
      description: 'Design and manage relational and NoSQL databases effectively',
      progress: 80,
      level: 'INTERMEDIATE',
      gradient: 'from-orange-600 to-red-600',
      bgGradient: 'from-orange-500/20 to-red-500/20',
      icon: '💾'
    },
    {
      title: 'Mobile Development',
      description: 'Create native and cross-platform mobile apps for iOS and Android',
      progress: 30,
      level: 'BEGINNER',
      gradient: 'from-indigo-600 to-purple-600',
      bgGradient: 'from-indigo-500/20 to-purple-500/20',
      icon: '📱'
    },
    {
      title: 'Cloud Computing',
      description: 'Deploy and scale applications using AWS, Azure, and Google Cloud',
      progress: 55,
      level: 'INTERMEDIATE',
      gradient: 'from-sky-600 to-blue-600',
      bgGradient: 'from-sky-500/20 to-blue-500/20',
      icon: '☁️'
    }
  ];

  const categories = ['All Courses', 'Web Development', 'Data Science', 'Tools', 'Creative Coding', 'Beginner', 'Intermediate'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e27] via-[#1a1f3a] to-[#0a0e27]">
      {/* Navigation Bar */}
      <nav className="bg-gray-900/50 backdrop-blur-xl border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Smart Student
              </h1>
              <div className="hidden md:flex space-x-4">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-all"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => navigate('/courses')}
                  className="px-4 py-2 text-purple-400 bg-purple-500/10 rounded-lg font-medium"
                >
                  Courses
                </button>
                <button
                  onClick={() => navigate('/assignments')}
                  className="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-all"
                >
                  Assignments
                </button>
                <button
                  onClick={() => navigate('/attendance')}
                  className="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-all"
                >
                  Attendance
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <span className="text-4xl">📚</span>
            <h2 className="text-4xl font-bold text-white">All Courses</h2>
          </div>
          <p className="text-gray-400 text-lg">
            View and manage your enrolled courses
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`px-5 py-2 rounded-full font-medium transition-all ${
                index === 0
                  ? 'bg-purple-500/20 text-purple-400 border border-purple-500/50'
                  : 'bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:bg-gray-700/50 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Course Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl overflow-hidden border border-gray-700/50 hover:border-gray-600 transition-all transform hover:scale-105 hover:shadow-2xl"
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${course.bgGradient} opacity-50`}></div>
              
              {/* NEW badge */}
              {index < 3 && (
                <div className="absolute top-4 right-4 z-10">
                  <span className={`px-3 py-1 bg-gradient-to-r ${course.gradient} rounded-full text-white text-xs font-bold uppercase shadow-lg`}>
                    NEW!
                  </span>
                </div>
              )}

              <div className="relative z-10 p-6">
                {/* Icon */}
                <div className="text-6xl mb-4">{course.icon}</div>

                {/* Badge */}
                <div className="mb-3">
                  <span className="inline-flex items-center px-3 py-1 bg-gray-900/70 rounded-lg text-xs font-medium text-gray-300">
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                    {course.level}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-3">
                  {course.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {course.description}
                </p>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-white font-medium">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${course.gradient} transition-all duration-500`}
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Button */}
                <button className={`w-full py-3 bg-gradient-to-r ${course.gradient} hover:opacity-90 text-white font-semibold rounded-xl transition-all transform group-hover:scale-105 shadow-lg`}>
                  Continue Learning
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;