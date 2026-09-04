export interface Course {
  id: string;
  status: 'PUBLISH' | 'DRAFT';
  title: string;
  slug: string;
  featuredImageUrl: string;
  shortDescription: string;
  categories: string[];
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  language: string[];
  duration: {
    value: number;
    unit: 'HOURS' | 'DAYS' | 'MONTHS';
  };
  certificate: boolean;
  mode: 'ONLINE' | 'OFFLINE' | 'BOTH';
  courseType: 'SINGLE' | 'COMBO';
  includedCourseIds?: string[];
  chapters?: Chapter[];
}

export interface Chapter {
  id: string;
  title: string;
  sortOrder: number;
  topics: ChapterTopic[];
}

export interface ChapterTopic {
  id: string;
  title: string;
  sortOrder: number;
  notes?: {
    title: string;
    url: string;
  }[];
  videos?: TopicVideo[];
}

export interface TopicVideo {
  id: string;
  title: string;
  url: string;
  preview: boolean;
}

export interface Student {
  studentId: string;
  name: string;
  username: string;
  email: string;
  status: 'ACTIVE' | 'INACTIVE';
  joinedAt: string;
}

export interface Certificate {
  id: string; // e.g., MSK-2026-0001
  studentId: string;
  courseSlug: string;
  issueDate: string; // YYYY-MM-DD
  completionDate: string; // YYYY-MM-DD
  grade: string; // e.g. A+
  gradeLabel: string; // e.g. Outstanding
  status: 'valid' | 'revoked';
  instructor: string;
  organization: string;
}

export interface Note {
  id: string;
  title: string;
  category: string;
  description: string;
  tier: 'free' | 'paid';
  downloadUrl?: string;
  price?: string;
  topicsCovered: string[];
}

export type StudyMaterialType = 'tutorial' | 'cheatsheet' | 'note' | 'handbook';

export interface TutorialSection {
  title: string;
  content: string;
  codeSnippet?: string;
  codeLanguage?: string;
}

export interface CheatsheetSection {
  categoryTitle: string;
  items: {
    commandOrSyntax: string;
    explanation: string;
    example?: string;
  }[];
}

export interface HandbookChapter {
  number: number;
  title: string;
  summary: string;
  keyPoints?: string[];
}

export interface TutorialSEO {
  title: string;
  description: string;
  keywords: string[];
}

export interface TutorialItem {
  id: string;
  slug: string;
  courseSlug: string;
  title?: string;
  icon?: string;
  badge?: string;
  tags?: string[];
  documentationTitle?: string;
  shortDescription?: string;
  lessonsCount?: number;
  totalHours?: string;
  topicsCount?: number;
  featured?: boolean;
  githubRepo?: string;
  updatedAt?: string;
  seo: TutorialSEO;
}

export interface TutorialTopicFrontmatter {
  id: string;
  slug: string;
  course: string;
  lesson?: string;
  chapter: number | string;
  topic: string;
  title: string;
  description: string;
  difficulty: string;
  readingTime: number;
  order: number;
  keywords?: string[];
  lastUpdated?: string;
  author?: string;
  version?: string;
}

export interface StudyMaterial {
  id: string;
  type: StudyMaterialType;
  title: string;
  slug?: string;
  category: string; // e.g. "Python", "Web Development", "JavaScript", "MS Office", "Cyber Security"
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  tier: 'free' | 'paid';
  price?: string;
  downloadUrl?: string;
  topicsCovered: string[];
  readTime?: string;
  pages?: number;
  featured?: boolean;
  updatedAt: string;

  // Specific content payload for rich views
  tutorialContent?: {
    summary: string;
    prerequisites?: string[];
    steps: TutorialSection[];
    keyTakeaways: string[];
  };
  cheatsheetContent?: {
    sections: CheatsheetSection[];
  };
  handbookContent?: {
    chapters: HandbookChapter[];
    highlights: string[];
  };
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  category: string;
  featured?: boolean;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedAt: string;
  readTime: string;
  tags: string[];
  content: {
    introduction: string;
    sections: {
      heading: string;
      body: string;
      codeSnippet?: string;
      codeLanguage?: string;
      callout?: string;
    }[];
    conclusion: string;
  };
  relatedCourseSlugs?: string[];
}

export interface SearchResultItem {
  id: string;
  type: 'course' | 'live' | 'tutorial' | 'cheatsheet' | 'note' | 'handbook' | 'blog' | 'career';
  title: string;
  description: string;
  category?: string;
  url: string;
  badge: string;
  actionLabel?: string;
}

export interface LiveClass {
  id: string;
  liveBatcheId: string;
  date: string; // YYYY-MM-DD e.g. "2026-09-01"
  startTime: string; // e.g. "04:30 PM"
  endTime: string; // e.g. "06:00 PM"
  joinUrl: string;
  platform?: string; // Auto-deducted from joinUrl
  topics: string[];

  // Auto-fetched / enriched properties from linked LiveBatch
  title?: string;
  description?: string;
  courseTitle?: string;
  courseSlug?: string;
  instructor?: string;
  instructorPicture?: string;
  instructorData?: Instructor;
  batchTitle?: string;
  durationMinutes?: number;
  offsetDays?: number;
  batch?: LiveBatch;
}

export interface Instructor {
  id: string;
  name: string;
  designation: string;
  qualification?: string;
  experience: string;
  picture: string;
  bio: string;
  specialties: string[];
  social?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    youtube?: string;
  };
  rating?: number;
  studentsCount?: number;
}

export interface LiveBatch {
  id: string;
  courseSlug: string;
  title: string;
  startDate: string; // e.g. "2026-09-15" or "15 September 2026"
  schedule: string; // e.g. "Mon, Wed, Fri (04:30 PM - 06:00 PM)"
  instructorId?: string;
  instructor: string;
  instructorPicture: string;
  price: string;
  originalPrice?: string;
  totalSeats: number;
  leftSeats: number;
  // Optional enriched properties from Course, Instructor or legacy
  startDateOffsetDays?: number;
  courseTitle?: string;
  duration?: string;
  description?: string;
  instructorData?: Instructor;
}

export interface LeadSubmission {
  id?: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  learningMode: 'OFFLINE' | 'ONLINE' | 'BOTH';
  batchId: string;
  batchTitle: string;
  courseTitle: string;
  price: string;
  query?: string;
  submittedAt: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

export type CareerType = 'internship' | 'job';
export type WorkMode = 'On-site' | 'Remote';

export interface CareerOpportunity {
  id: string;
  type: CareerType;
  title: string;
  department: string;
  category: string;
  location: string;
  workType: string;
  mode: WorkMode;
  stipendOrSalary: string;
  duration?: string;
  openings: number;
  experienceLevel: string;
  deadline?: string;
  featured?: boolean;
  active: boolean;
  priority?: 'High' | 'Medium' | 'Optional';
  gender?: string;
  isStage1?: boolean;
  shortDescription: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  skills: string[];
  perks: string[];
  postedAt: string;
  company?: string;
}

export interface CareerApplication {
  id?: string;
  careerId: string;
  careerTitle: string;
  careerType: CareerType;
  name: string;
  phone: string;
  email: string;
  city: string;
  qualification: string;
  collegeOrCompany?: string;
  portfolioUrl?: string;
  resumeUrl?: string;
  coverNote?: string;
  submittedAt: string;
}
