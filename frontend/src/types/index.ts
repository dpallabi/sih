export interface User {
  user_id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: 'student' | 'teacher' | 'admin';
  is_active: boolean;
  created_at: string;
}

export interface Course {
  course_id: number;
  course_code: string;
  course_name: string;
  description?: string;
  credits: number;
  teacher_id: number;
  semester: string;
  year: number;
  created_at: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  role: 'student' | 'teacher';
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

export interface Assignment {
  assignment_id: number;
  course_id: number;
  title: string;
  description?: string;
  due_date: string;
  total_points: number;
  assignment_type?: string;
  file_url?: string;
  created_at: string;
  is_published: boolean;
}

export interface Submission {
  submission_id: number;
  assignment_id: number;
  student_id: number;
  submission_date: string;
  file_url: string;
  points_earned?: number;
  grade?: string;
  feedback?: string;
  status: string;
  graded_at?: string;
  graded_by?: number;
}

export interface Attendance {
  attendance_id: number;
  course_id: number;
  student_id: number;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  notes?: string;
  marked_by: number;
  marked_at: string;
}

export interface PlagiarismCheckRequest {
  text1: string;
  text2: string;
  student1_name?: string;
  student2_name?: string;
}

export interface PlagiarismCheckResponse {
  similarity_percentage: number;
  is_plagiarized: boolean;
  confidence: string;
  verdict: string;
}