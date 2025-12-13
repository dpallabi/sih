import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Attendance = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
    }
  }, [navigate]);

  const attendanceData = [
    {
      course: 'Web Development',
      present: 28,
      absent: 2,
      total: 30,
      percentage: 93,
      icon: '🌐',
      gradient: 'from-blue-600 to-cyan-600'
    },
    {
      course: 'Data Structures',
      present: 24,
      absent: 4,
      total: 28,
      percentage: 86,
      icon: '🗂️',
      gradient: 'from-purple-600 to-pink-600'
    },
    {
      course: 'Machine Learning',
      present: 22,
      absent: 3,
      total: 25,
      percentage: 88,
      icon: '🤖',
      gradient: 'from-green-600 to-emerald-600'
    },
    {
      course: 'Database Systems',
      present: 26,
      absent: 1,
      total: 27,
      percentage: 96,
      icon: '💾',
      gradient: 'from-orange-600 to-red-600'
    },
    {
      course: 'Mobile Development',
      present: 20,
      absent: 5,
      total: 25,
      percentage: 80,
      icon: '📱',
      gradient: 'from-indigo-600 to-purple-600'
    },
    {
      course: 'Cloud Computing',
      present: 23,
      absent: 2,
      total: 25,
      percentage: 92,
      icon: '☁️',
      gradient: 'from-sky-600 to-blue-600'
    }
  ];

  const recentAttendance = [
    { date: 'Dec 12, 2025', course: 'Web Development', status: 'present', icon: '🌐' },
    { date: 'Dec 11, 2025', course: 'Data Structures', status: 'present', icon: '🗂️' },
    { date: 'Dec 10, 2025', course: 'Machine Learning', status: 'absent', icon: '🤖' },
    { date: 'Dec 09, 2025', course: 'Database Systems', status: 'present', icon: '💾' },
    { date: 'Dec 08, 2025', course: 'Mobile Development', status: 'present', icon: '📱' }
  ];

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-400';
    if (percentage >= 75) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getAttendanceBar = (percentage: number) => {
    if (percentage >= 90) return 'from-green-600 to-emerald-600';
    if (percentage >= 75) return 'from-yellow-600 to-orange-600';
    return 'from-red-600 to-pink-600';
  };

  const overallStats = {
    totalClasses: attendanceData.reduce((sum, item) => sum + item.total, 0),
    totalPresent: attendanceData.reduce((sum, item) => sum + item.present, 0),
    totalAbsent: attendanceData.reduce((sum, item) => sum + item.absent, 0)
  };
  const overallPercentage = Math.round((overallStats.totalPresent / overallStats.totalClasses) * 100);

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
                  className="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-all"
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
                  className="px-4 py-2 text-purple-400 bg-purple-500/10 rounded-lg font-medium"
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
            <span className="text-4xl">📊</span>
            <h2 className="text-4xl font-bold text-white">Attendance</h2>
          </div>
          <p className="text-gray-400 text-lg">
            Track your attendance records
          </p>
        </div>

        {/* Overall Stats */}
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-white mb-2">Overall Attendance</h3>
              <p className="text-gray-400">Academic Year 2024-2025</p>
            </div>
            <div className="flex items-center space-x-8">
              <div className="text-center">
                <div className={`text-5xl font-bold ${getAttendanceColor(overallPercentage)}`}>
                  {overallPercentage}%
                </div>
                <div className="text-gray-400 text-sm mt-2">Total</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">{overallStats.totalPresent}</div>
                <div className="text-gray-400 text-sm mt-2">Present</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-400">{overallStats.totalAbsent}</div>
                <div className="text-gray-400 text-sm mt-2">Absent</div>
              </div>
            </div>
          </div>
        </div>

        {/* Course-wise Attendance */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-white mb-6">Course-wise Breakdown</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {attendanceData.map((item, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-xl p-6 border border-gray-700/50 hover:border-gray-600 transition-all hover:shadow-xl"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{item.icon}</span>
                    <div>
                      <h4 className="text-lg font-bold text-white">{item.course}</h4>
                      <p className="text-sm text-gray-400">{item.total} total classes</p>
                    </div>
                  </div>
                  <div className={`text-3xl font-bold ${getAttendanceColor(item.percentage)}`}>
                    {item.percentage}%
                  </div>
                </div>

                <div className="mb-4">
                  <div className="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${getAttendanceBar(item.percentage)} transition-all duration-500`}
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-green-400">✅ Present: {item.present}</span>
                  <span className="text-red-400">❌ Absent: {item.absent}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Attendance */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-6">Recent Activity</h3>
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-xl border border-gray-700/50 overflow-hidden">
            {recentAttendance.map((record, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-4 ${
                  index !== recentAttendance.length - 1 ? 'border-b border-gray-700/50' : ''
                } hover:bg-gray-800/30 transition-all`}
              >
                <div className="flex items-center space-x-4">
                  <span className="text-2xl">{record.icon}</span>
                  <div>
                    <div className="text-white font-medium">{record.course}</div>
                    <div className="text-sm text-gray-400">{record.date}</div>
                  </div>
                </div>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    record.status === 'present'
                      ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                      : 'bg-red-500/20 text-red-400 border border-red-500/50'
                  }`}
                >
                  {record.status === 'present' ? '✅ Present' : '❌ Absent'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;