import { Course, Certificate, Student, Note, LiveClass, LiveBatch, Instructor, StudyMaterial, BlogPost, TutorialItem, TutorialTopicFrontmatter, CareerOpportunity } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

// Helper to read local files on the server or fetch them on the client
async function getLocalData<T>(fileName: string): Promise<T> {
  if (typeof window === 'undefined' && !API_BASE_URL) {
    // Running on server: read directly from the filesystem
    const fs = await import('fs/promises');
    const path = await import('path');
    const filePath = path.join(process.cwd(), 'public', 'data', fileName);
    const fileContent = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContent) as T;
  } else {
    // Running on client: fetch relative path
    const url = `/data/${fileName}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to load ${fileName}`);
    return res.json() as Promise<T>;
  }
}

export async function fetchCareers(): Promise<CareerOpportunity[]> {
  if (API_BASE_URL) {
    const res = await fetch(`${API_BASE_URL}/api/careers/`, { next: { revalidate: 1800 } });
    if (res.ok) return res.json();
  }
  return getLocalData<CareerOpportunity[]>('careers.json');
}

export async function fetchCareerById(id: string): Promise<CareerOpportunity | null> {
  const careers = await fetchCareers();
  const normalized = id.trim().toLowerCase();
  return careers.find(c => c.id.toLowerCase() === normalized) || null;
}

export async function fetchCourses(): Promise<Course[]> {
  if (API_BASE_URL) {
    const res = await fetch(`${API_BASE_URL}/api/courses/`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error('Failed to load courses');
    return res.json();
  }
  return getLocalData<Course[]>('all-courses.json');
}

export async function fetchTutorials(): Promise<TutorialItem[]> {
  return getLocalData<TutorialItem[]>('tutorials.json');
}

export async function fetchTutorialBySlug(slug: string): Promise<{ tutorial: TutorialItem; course: Course } | null> {
  const [tutorials, courses] = await Promise.all([
    fetchTutorials(),
    fetchCourses(),
  ]);

  const tutorial = tutorials.find(
    (t) => t.slug.toLowerCase() === slug.toLowerCase() || t.id.toLowerCase() === slug.toLowerCase()
  );
  if (!tutorial) return null;

  // Match course by courseSlug or by keyword
  const course =
    courses.find((c) => c.slug.toLowerCase() === tutorial.courseSlug.toLowerCase()) ||
    courses.find((c) => c.title.toLowerCase().includes(tutorial.title?.toLowerCase() || '')) ||
    courses[0];

  return { tutorial, course };
}

export async function fetchCertificateById(id: string): Promise<Certificate | null> {
  if (API_BASE_URL) {
    const res = await fetch(`${API_BASE_URL}/api/certificates/${id}/`);
    if (!res.ok) return null;
    return res.json();
  }
  const certificates = await getLocalData<Certificate[]>('certificates.json');
  return certificates.find(c => c.id.trim().toLowerCase() === id.trim().toLowerCase()) || null;
}

export async function fetchStudentById(studentId: string): Promise<Student | null> {
  if (API_BASE_URL) {
    const res = await fetch(`${API_BASE_URL}/api/students/${studentId}/`);
    if (!res.ok) return null;
    return res.json();
  }
  const students = await getLocalData<Student[]>('students.json');
  return students.find(s => s.studentId === studentId) || null;
}

export async function fetchNotes(): Promise<Note[]> {
  if (API_BASE_URL) {
    const res = await fetch(`${API_BASE_URL}/api/notes/`);
    if (!res.ok) throw new Error('Failed to load notes');
    return res.json();
  }
  return getLocalData<Note[]>('notes.json');
}

export async function fetchStudyMaterials(): Promise<StudyMaterial[]> {
  if (API_BASE_URL) {
    const res = await fetch(`${API_BASE_URL}/api/study-materials/`);
    if (res.ok) return res.json();
  }
  return getLocalData<StudyMaterial[]>('study-materials.json');
}

export async function fetchStudyMaterialById(idOrSlug: string): Promise<StudyMaterial | null> {
  const materials = await fetchStudyMaterials();
  const normalized = idOrSlug.trim().toLowerCase();
  return materials.find(m => m.id.toLowerCase() === normalized || (m.slug && m.slug.toLowerCase() === normalized)) || null;
}

export async function fetchBlogs(): Promise<BlogPost[]> {
  if (API_BASE_URL) {
    const res = await fetch(`${API_BASE_URL}/api/blogs/`);
    if (res.ok) return res.json();
  }
  return getLocalData<BlogPost[]>('blogs.json');
}

export async function fetchBlogBySlug(slug: string): Promise<BlogPost | null> {
  const blogs = await fetchBlogs();
  const normalized = slug.trim().toLowerCase();
  return blogs.find(b => b.slug.toLowerCase() === normalized || b.id.toLowerCase() === normalized) || null;
}

export async function fetchInstructors(): Promise<Instructor[]> {
  if (API_BASE_URL) {
    const res = await fetch(`${API_BASE_URL}/api/instructors/`);
    if (!res.ok) throw new Error('Failed to load instructors');
    return res.json();
  }
  return getLocalData<Instructor[]>('instructors.json');
}

export async function fetchInstructorById(id: string): Promise<Instructor | null> {
  const instructors = await fetchInstructors();
  return instructors.find(i => i.id.toLowerCase() === id.toLowerCase() || i.name.toLowerCase() === id.toLowerCase()) || null;
}

export async function fetchLiveBatches(): Promise<LiveBatch[]> {
  if (API_BASE_URL) {
    const res = await fetch(`${API_BASE_URL}/api/live-batches/`);
    if (!res.ok) throw new Error('Failed to load live batches');
    return res.json();
  }
  const [batches, courses, instructors] = await Promise.all([
    getLocalData<LiveBatch[]>('live-batches.json'),
    getLocalData<Course[]>('all-courses.json'),
    fetchInstructors().catch(() => [] as Instructor[]),
  ]);

  // Enrich batches with course data and instructor data
  return batches.map((batch) => {
    const matchedCourse = courses.find((c) => c.slug === batch.courseSlug);
    const matchedInstructor = instructors.find(
      (inst) => inst.id === batch.instructorId || inst.name.toLowerCase() === batch.instructor?.toLowerCase()
    );

    return {
      ...batch,
      courseTitle: matchedCourse?.title || batch.courseTitle || batch.title,
      duration: matchedCourse ? `${matchedCourse.duration.value} ${matchedCourse.duration.unit}` : batch.duration || '3 Months',
      description: matchedCourse?.shortDescription || batch.description || '',
      instructor: matchedInstructor?.name || batch.instructor,
      instructorPicture: matchedInstructor?.picture || batch.instructorPicture,
      instructorData: matchedInstructor,
    };
  });
}

export async function fetchLiveBatchById(id: string): Promise<{ batch: LiveBatch; course: Course | null; includedCourses: Course[]; instructor: Instructor | null } | null> {
  const [allBatches, allCourses, allInstructors] = await Promise.all([
    fetchLiveBatches(),
    fetchCourses(),
    fetchInstructors().catch(() => [] as Instructor[]),
  ]);

  const batch = allBatches.find((b) => b.id.toLowerCase() === id.toLowerCase());
  if (!batch) return null;

  const course = allCourses.find((c) => c.slug === batch.courseSlug) || null;
  const isCombo = course?.courseType === 'COMBO';
  const includedCourses: Course[] = isCombo && course?.includedCourseIds
    ? course.includedCourseIds
        .map((cId) => allCourses.find((c) => c.id === cId))
        .filter((c): c is Course => Boolean(c))
    : [];

  const instructor = allInstructors.find(
    (inst) => inst.id === batch.instructorId || inst.name.toLowerCase() === batch.instructor.toLowerCase()
  ) || batch.instructorData || null;

  return { batch, course, includedCourses, instructor };
}

export function deductPlatformFromUrl(url?: string): string {
  if (!url) return 'MSK Live';
  const lower = url.toLowerCase();
  if (lower.includes('meet.google.com')) return 'Google Meet';
  if (lower.includes('youtube.com') || lower.includes('youtu.be')) return 'YouTube Live';
  if (lower.includes('zoom.us') || lower.includes('zoom.com')) return 'Zoom';
  if (lower.includes('teams.microsoft.com') || lower.includes('teams.live.com')) return 'Microsoft Teams';
  return 'MSK Live';
}

export function parseTimeToMinutes(timeStr: string): number {
  if (!timeStr) return 0;
  const [timeVal, modifier] = timeStr.trim().split(' ');
  let [hours, minutes] = (timeVal || '0:0').split(':').map(Number);
  if (modifier === 'PM' && hours < 12) hours += 12;
  if (modifier === 'AM' && hours === 12) hours = 0;
  return (hours || 0) * 60 + (minutes || 0);
}

export function calculateDurationMinutes(startTime?: string, endTime?: string): number {
  if (!startTime || !endTime) return 60;
  try {
    const start = parseTimeToMinutes(startTime);
    const end = parseTimeToMinutes(endTime);
    const diff = end - start;
    return diff > 0 ? diff : 60;
  } catch {
    return 60;
  }
}

export async function fetchLiveClasses(): Promise<LiveClass[]> {
  if (API_BASE_URL) {
    const res = await fetch(`${API_BASE_URL}/api/live-classes/`);
    if (!res.ok) throw new Error('Failed to load live classes');
    return res.json();
  }
  const [classesData, enrichedBatches] = await Promise.all([
    getLocalData<LiveClass[] | { classes: LiveClass[] }>('live-classes.json'),
    fetchLiveBatches(),
  ]);

  const rawClasses = Array.isArray(classesData) ? classesData : (classesData?.classes || []);

  return rawClasses.map((c) => {
    const matchedBatch = enrichedBatches.find((b) => b.id === c.liveBatcheId);
    const detectedPlatform = deductPlatformFromUrl(c.joinUrl);
    const duration = calculateDurationMinutes(c.startTime, c.endTime);
    const autoTitle = c.title || (c.topics && c.topics.length > 0 ? c.topics.slice(0, 2).join(' & ') : matchedBatch?.title || 'Live Interactive Class');

    return {
      ...c,
      platform: c.platform || detectedPlatform,
      durationMinutes: c.durationMinutes || duration,
      title: autoTitle,
      description: c.description || matchedBatch?.description || '',
      courseTitle: matchedBatch?.courseTitle || c.courseTitle || 'Live Computer Course',
      courseSlug: matchedBatch?.courseSlug || '',
      instructor: matchedBatch?.instructor || c.instructor || 'Er. Sumit Kumar',
      instructorPicture: matchedBatch?.instructorPicture || c.instructorPicture || '',
      instructorData: matchedBatch?.instructorData,
      batchTitle: matchedBatch?.title || '',
      batch: matchedBatch,
    };
  });
}

export async function fetchLiveSchedule(): Promise<{ classes: LiveClass[]; batches: LiveBatch[] }> {
  const [enrichedClasses, enrichedBatches] = await Promise.all([
    fetchLiveClasses(),
    fetchLiveBatches(),
  ]);

  return {
    classes: enrichedClasses,
    batches: enrichedBatches,
  };
}


