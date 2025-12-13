import api from './api';
import type { Course } from '../types';

export const courseService = {
  async getAllCourses(): Promise<Course[]> {
    const response = await api.get<Course[]>('/courses/');
    return response.data;
  },

  async getCourse(courseId: number): Promise<Course> {
    const response = await api.get<Course>(`/courses/${courseId}`);
    return response.data;
  },

  async createCourse(courseData: Partial<Course>): Promise<Course> {
    const response = await api.post<Course>('/courses/', courseData);
    return response.data;
  },

  async updateCourse(courseId: number, courseData: Partial<Course>): Promise<Course> {
    const response = await api.put<Course>(`/courses/${courseId}`, courseData);
    return response.data;
  },

  async deleteCourse(courseId: number): Promise<void> {
    await api.delete(`/courses/${courseId}`);
  },

  async enrollStudent(studentId: number, courseId: number): Promise<void> {
    await api.post('/courses/enroll', { student_id: studentId, course_id: courseId });
  },
};