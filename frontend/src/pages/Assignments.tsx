import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Assignments = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
    }
  }, [navigate]);

  const assignments = [
    {
      title: 'Build a REST API',
      course: 'Web Development',
      dueDate: 'Dec 15, 2025',
      status: 'pending',
      priority: 'high',
      icon: '🌐',
      gradient: 'from-blue-600 to-cyan-600',
      points: 100
    },
    {
      title: 'Binary Search Tree Implementation',
      course: 'Data Structures',
      dueDate: 'Dec 18, 2025',
      status: 'in-progress',
      priority: 'high',
      icon: '🗂️',
      gradient: 'from-purple-600 to-pink-600',
      points: 150
    },
    {
      title: 'Linear Regression Model',
      course: 'Machine Learning',
      dueDate: 'Dec 20, 2025',
      status: 'pending',
      priority: 'medium',
      icon: '🤖',
      gradient: 'from-green-600 to-emerald-600',
      points: 120
    },
    {
      title: 'Database Normalization',
      course: 'Database Systems',
      dueDate: 'Dec 12, 2025',
      status: 'submitted',
      priority: 'low',
      icon: '💾',
      gradient: 'from-orange-600 to-red-600',
      points: 80
    },
    {
      title: 'React Native Todo App',
      course: 'Mobile Development',
      dueDate: 'Dec 25, 2025',
      status: 'pending',
      priority: 'medium',
      icon: '📱',
      gradient: 'from-indigo-600 to-purple-600',
      points: 110
    }
  ];

  const filteredAssignments = assignments.filter(assignment => {
    if (filter === 'all') return true;
    return assignment.status === filter;
  });

  const getStatusBadge = (status: string) => {
    const badges = {
      'pending': { text: 'Pending', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50' },
      'in-progress': { text: 'In Progress', color: 'bg-blue-500/20 text-blue-400 border-blue-500/50' },
      'submitted': { text: 'Submitted', color: 'bg-green-500/20 text-green-400 border-green-500/50' }
    };
    return badges[status as keyof typeof badges] || badges.pending;
  };

  const getPriorityBadge = (priority: string) => {
    const badges = {
      'high': { text: 'High Priority', color: 'bg-red-500/20 text-red-400' },
      'medium': { text: 'Medium Priority', color: 'bg-orange-500/20 text-orange-400' },
      'low': { text: 'Low Priority', color: 'bg-gray-500/20 text-gray-400' }
    };
    return badges[priority as keyof typeof badges] || badges.medium;
  };

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
                  className="px-4 py-2 text-purple-400 bg-purple-500/10 rounded-lg font-medium"
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
            <span className="text-4xl">📝</span>
            <h2 className="text-4xl font-bold text-white">Assignments</h2>
          </div>
          <p className="text-gray-400 text-lg">
            Submit and track your assignments
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 backdrop-blur-xl rounded-xl p-6 border border-yellow-500/30">
            <div className="text-3xl mb-2">⏰</div>
            <div className="text-gray-400 text-sm mb-1">Pending</div>
            <div className="text-3xl font-bold text-white">3</div>
          </div>
          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-xl rounded-xl p-6 border border-blue-500/30">
            <div className="text-3xl mb-2">📊</div>
            <div className="text-gray-400 text-sm mb-1">In Progress</div>
            <div className="text-3xl font-bold text-white">1</div>
          </div>
          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-xl rounded-xl p-6 border border-green-500/30">
            <div className="text-3xl mb-2">✅</div>
            <div className="text-gray-400 text-sm mb-1">Completed</div>
            <div className="text-3xl font-bold text-white">1</div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          {['all', 'pending', 'in-progress', 'submitted'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-5 py-2 rounded-full font-medium transition-all capitalize ${
                filter === status
                  ? 'bg-purple-500/20 text-purple-400 border border-purple-500/50'
                  : 'bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:bg-gray-700/50 hover:text-white'
              }`}
            >
              {status === 'all' ? 'All' : status.replace('-', ' ')}
            </button>
          ))}
        </div>

        {/* Assignments List */}
        <div className="space-y-4">
          {filteredAssignments.map((assignment, index) => (
            <div
              key={index}
              className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-xl p-6 border border-gray-700/50 hover:border-gray-600 transition-all hover:shadow-xl"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="text-4xl">{assignment.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {assignment.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(assignment.status).color}`}>
                        {getStatusBadge(assignment.status).text}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityBadge(assignment.priority).color}`}>
                        {getPriorityBadge(assignment.priority).text}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                      <span>📚 {assignment.course}</span>
                      <span>📅 Due: {assignment.dueDate}</span>
                      <span>⭐ {assignment.points} points</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  {assignment.status !== 'submitted' && (
                    <button className={`px-6 py-3 bg-gradient-to-r ${assignment.gradient} hover:opacity-90 text-white font-semibold rounded-xl transition-all transform hover:scale-105 shadow-lg`}>
                      {assignment.status === 'in-progress' ? 'Continue' : 'Start'}
                    </button>
                  )}
                  {assignment.status === 'submitted' && (
                    <button className="px-6 py-3 bg-green-500/20 text-green-400 font-semibold rounded-xl border border-green-500/50">
                      View Submission
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Assignments;