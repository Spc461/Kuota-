export type UserRole = 'student' | 'teacher';

export interface User {
  id: string;
  email: string;
  phone?: string;
  name: string;
  role: UserRole;
  profilePicture?: string;
  createdAt: string;
  updatedAt: string;
}

export type EducationLevel = 'primary' | 'middle' | 'secondary';
export type SchoolYear =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | 'terminal';

export interface Student extends User {
  role: 'student';
  educationLevel: EducationLevel;
  schoolYear: SchoolYear;
  subjects: string[];
  subscriptions: string[];
  wilaya?: string;
}

export interface PricingTier {
  sessionType: 'individual' | 'group';
  duration: number;
  price: number;
}

export interface TeacherSchedule {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  available: boolean;
}

export interface Teacher extends User {
  role: 'teacher';
  subjects: string[];
  levels: EducationLevel[];
  pricing: PricingTier[];
  rating: number;
  totalReviews: number;
  schedule: TeacherSchedule[];
  bio?: string;
  experience?: string;
  qualifications?: string[];
  wilaya?: string;
  sessions: string[];
  totalStudents: number;
  totalEarnings: number;
}

export type SessionStatus = 'scheduled' | 'live' | 'completed' | 'cancelled';
export type SessionType = 'individual' | 'group';

export interface Session {
  id: string;
  teacherId: string;
  teacherName: string;
  teacherPicture?: string;
  studentIds: string[];
  title: string;
  description?: string;
  subject: string;
  startTime: string;
  endTime: string;
  duration: number;
  type: SessionType;
  status: SessionStatus;
  materials: string[];
  meetingUrl?: string;
  maxStudents?: number;
  currentStudents: number;
  createdAt: string;
}

export interface Subscription {
  id: string;
  studentId: string;
  teacherId: string;
  teacherName: string;
  teacherPicture?: string;
  subject: string;
  startDate: string;
  endDate: string;
  sessionsPerWeek: number;
  totalSessions: number;
  completedSessions: number;
  price: number;
  status: 'active' | 'expired' | 'cancelled';
  createdAt: string;
}

export type MaterialType = 'pdf' | 'video' | 'audio' | 'document' | 'link';

export interface Material {
  id: string;
  teacherId: string;
  teacherName: string;
  sessionId?: string;
  type: MaterialType;
  url: string;
  title: string;
  description?: string;
  subject: string;
  level: EducationLevel;
  fileSize?: number;
  duration?: number;
  thumbnailUrl?: string;
  downloadUrl?: string;
  uploadDate: string;
  downloads: number;
}

export interface Review {
  id: string;
  studentId: string;
  studentName: string;
  studentPicture?: string;
  teacherId: string;
  rating: number;
  comment?: string;
  createdAt: string;
  updatedAt: string;
}

export type NotificationType =
  | 'session_reminder'
  | 'session_started'
  | 'session_cancelled'
  | 'new_material'
  | 'new_announcement'
  | 'subscription_expiring'
  | 'payment_received'
  | 'new_review'
  | 'new_student';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: Record<string, unknown>;
  read: boolean;
  timestamp: string;
}

export interface Announcement {
  id: string;
  teacherId: string;
  teacherName: string;
  title: string;
  content: string;
  targetStudents: string[];
  createdAt: string;
  urgent: boolean;
}

export interface StudyPlannerItem {
  id: string;
  studentId: string;
  title: string;
  subject: string;
  dueDate: string;
  completed: boolean;
  notes?: string;
  createdAt: string;
}

export interface Exam {
  id: string;
  name: string;
  type: 'BEM' | 'BAC';
  date: string;
  subject?: string;
}
