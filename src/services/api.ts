import { Course, Certificate, Student, Note, LiveClass, LiveBatch, Instructor, StudyMaterial, BlogPost, TutorialItem, TutorialTopicFrontmatter, CareerOpportunity } from '@/types';

// Statically bundled JSON fallbacks for zero-IO, failure-proof loading across Serverless, ISR & SSR
import allCoursesData from '../../public/data/all-courses.json';
import studyMaterialsData from '../../public/data/study-materials.json';
import tutorialsData from '../../public/data/tutorials.json';
import blogsData from '../../public/data/blogs.json';
import careersData from '../../public/data/careers.json';
import certificatesData from '../../public/data/certificates.json';
import instructorsData from '../../public/data/instructors.json';
import liveBatchesData from '../../public/data/live-batches.json';
import notesData from '../../public/data/notes.json';
import studentsData from '../../public/data/students.json';
import announcementsData from '../../public/data/announcements.json';

const LOCAL_DATA_REGISTRY: Record<string, unknown> = {
  'all-courses.json': allCoursesData,
  'study-materials.json': studyMaterialsData,
  'tutorials.json': tutorialsData,
  'blogs.json': blogsData,
  'careers.json': careersData,
  'certificates.json': certificatesData,
  'instructors.json': instructorsData,
  'live-batches.json': liveBatchesData,
  'notes.json': notesData,
  'students.json': studentsData,
  'announcements.json': announcementsData,
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

// Helper to safely load local data in any environment (Serverless lambda, Node SSR, build-time SSG, or browser client)
async function getLocalData<T>(fileName: string): Promise<T> {
  // 1. Running on server: prefer static in-memory bundled registry (zero-IO, impossible to fail with ENOENT)
  if (typeof window === 'undefined') {
    if (LOCAL_DATA_REGISTRY[fileName] !== undefined) {
      return LOCAL_DATA_REGISTRY[fileName] as T;
    }
    try {
      const fs = await import('fs/promises');
      const path = await import('path');
      const filePath = path.join(process.cwd(), 'public', 'data', fileName);
      const fileContent = await fs.readFile(filePath, 'utf8');
      return JSON.parse(fileContent) as T;
    } catch (fsErr) {
      console.warn(`Could not read /public/data/${fileName} from filesystem:`, fsErr);
      throw new Error(`Failed to load ${fileName}`);
    }
  }

  // 2. Running on client: fetch relative path, with fallback to in-memory registry
  try {
    const url = `/data/${fileName}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to load ${fileName}`);
    return (await res.json()) as T;
  } catch (clientErr) {
    if (LOCAL_DATA_REGISTRY[fileName] !== undefined) {
      return LOCAL_DATA_REGISTRY[fileName] as T;
    }
    throw clientErr;
  }
}

export async function fetchCareers(): Promise<CareerOpportunity[]> {
  if (API_BASE_URL) {
    try {
      const res = await fetch(`${API_BASE_URL}/api/careers/`, { next: { revalidate: 1800 } });
      if (res.ok) return await res.json();
    } catch (err) {
      console.warn('API fetch careers failed, falling back to local data:', err);
    }
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
    try {
      const res = await fetch(`${API_BASE_URL}/api/courses/`, { next: { revalidate: 3600 } });
      if (res.ok) return await res.json();
    } catch (err) {
      console.warn('API fetch courses failed, falling back to local data:', err);
    }
  }
  return getLocalData<Course[]>('all-courses.json');
}

export async function fetchTutorials(): Promise<TutorialItem[]> {
  if (API_BASE_URL) {
    try {
      const res = await fetch(`${API_BASE_URL}/api/tutorials/`);
      if (res.ok) return await res.json();
    } catch (err) {
      console.warn('API fetch tutorials failed, falling back to local data:', err);
    }
  }
  return getLocalData<TutorialItem[]>('tutorials.json');
}

export async function fetchTutorialBySlug(slug: string): Promise<{ tutorial: TutorialItem; course: Course } | null> {
  const [tutorials, courses] = await Promise.all([
    fetchTutorials(),
    fetchCourses(),
  ]);

  const normalized = slug.toLowerCase().trim();
  const tutorial = tutorials.find(
    (t) =>
      t.slug.toLowerCase() === normalized ||
      t.id.toLowerCase() === normalized ||
      (normalized === 'html5-complete-masterclass' && t.slug === 'html5-complete-course')
  );
  if (!tutorial) return null;

  // Match course by courseSlug or by keyword
  const course =
    courses.find((c) => tutorial.courseSlug && c.slug?.toLowerCase() === tutorial.courseSlug.toLowerCase()) ||
    courses.find((c) => c.title?.toLowerCase().includes(tutorial.title?.toLowerCase() || '')) ||
    courses[0];

  return { tutorial, course };
}

export async function fetchCertificateById(id: string): Promise<Certificate | null> {
  if (API_BASE_URL) {
    try {
      const res = await fetch(`${API_BASE_URL}/api/certificates/${id}/`);
      if (res.ok) return await res.json();
    } catch (err) {
      console.warn('API fetch certificate failed, falling back to local data:', err);
    }
  }
  const certificates = await getLocalData<Certificate[]>('certificates.json');
  return certificates.find(c => c.id.trim().toLowerCase() === id.trim().toLowerCase()) || null;
}

export async function fetchStudentById(studentId: string): Promise<Student | null> {
  if (API_BASE_URL) {
    try {
      const res = await fetch(`${API_BASE_URL}/api/students/${studentId}/`);
      if (res.ok) return await res.json();
    } catch (err) {
      console.warn('API fetch student failed, falling back to local data:', err);
    }
  }
  const students = await getLocalData<Student[]>('students.json');
  return students.find(s => s.studentId === studentId) || null;
}

export async function fetchNotes(): Promise<Note[]> {
  if (API_BASE_URL) {
    try {
      const res = await fetch(`${API_BASE_URL}/api/notes/`);
      if (res.ok) return await res.json();
    } catch (err) {
      console.warn('API fetch notes failed, falling back to local data:', err);
    }
  }
  return getLocalData<Note[]>('notes.json');
}

export async function fetchStudyMaterials(): Promise<StudyMaterial[]> {
  if (API_BASE_URL) {
    try {
      const res = await fetch(`${API_BASE_URL}/api/study-materials/`);
      if (res.ok) return await res.json();
    } catch (err) {
      console.warn('API fetch study materials failed, falling back to local data:', err);
    }
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
    try {
      const res = await fetch(`${API_BASE_URL}/api/blogs/`);
      if (res.ok) return await res.json();
    } catch (err) {
      console.warn('API fetch blogs failed, falling back to local data:', err);
    }
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
    try {
      const res = await fetch(`${API_BASE_URL}/api/instructors/`);
      if (res.ok) return await res.json();
    } catch (err) {
      console.warn('API fetch instructors failed, falling back to local data:', err);
    }
  }
  return getLocalData<Instructor[]>('instructors.json');
}

export async function fetchInstructorById(id: string): Promise<Instructor | null> {
  const instructors = await fetchInstructors();
  return instructors.find(i => i.id.toLowerCase() === id.toLowerCase() || i.name.toLowerCase() === id.toLowerCase()) || null;
}

export async function fetchLiveBatches(): Promise<LiveBatch[]> {
  if (API_BASE_URL) {
    try {
      const res = await fetch(`${API_BASE_URL}/api/live-batches/`);
      if (res.ok) return await res.json();
    } catch (err) {
      console.warn('API fetch live batches failed, falling back to local data:', err);
    }
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

export function formatGoogleSheetCsvUrl(rawUrl: string): string {
  if (!rawUrl) return '';
  const trimmed = rawUrl.trim();

  // If already a CSV export url
  if (trimmed.includes('output=csv') || trimmed.includes('tqx=out:csv')) {
    return trimmed;
  }

  // If standard Google Sheet edit or share link
  // e.g. https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit#gid=0
  const match = trimmed.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if (match && match[1]) {
    const sheetId = match[1];
    const gidMatch = trimmed.match(/[#&?]gid=([0-9]+)/);
    const gidParam = gidMatch && gidMatch[1] ? `&gid=${gidMatch[1]}` : '';
    return `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv${gidParam}`;
  }

  // If just the ID is provided
  if (!trimmed.includes('/') && trimmed.length > 20) {
    return `https://docs.google.com/spreadsheets/d/${trimmed}/gviz/tq?tqx=out:csv`;
  }

  return trimmed;
}

export function parseGoogleSheetCsv(csvText: string): LiveClass[] {
  if (!csvText || typeof csvText !== 'string') return [];

  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentCell = '';
  let inQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        currentCell += '"';
        i++; // skip escaped quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      currentRow.push(currentCell.trim());
      currentCell = '';
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++; // skip \n in \r\n
      }
      currentRow.push(currentCell.trim());
      if (currentRow.some((cell) => cell.length > 0)) {
        rows.push(currentRow);
      }
      currentRow = [];
      currentCell = '';
    } else {
      currentCell += char;
    }
  }

  if (currentCell.length > 0 || currentRow.length > 0) {
    currentRow.push(currentCell.trim());
    if (currentRow.some((cell) => cell.length > 0)) {
      rows.push(currentRow);
    }
  }

  if (rows.length < 2) return [];

  // Parse headers - support courseid, date, starttime, endtime, joinurl, chapter
  const rawHeaders = rows[0].map((h) => h.trim().toLowerCase().replace(/[^a-z0-9]/g, ''));
  const headerMap: Record<string, number> = {};

  rawHeaders.forEach((header, idx) => {
    if (header === 'id') {
      headerMap['id'] = idx;
    } else if (
      header === 'courseid' ||
      header === 'course' ||
      header === 'courseslug' ||
      header === 'livebatcheid' ||
      header === 'livebatchid' ||
      header === 'batchid' ||
      header === 'batch'
    ) {
      headerMap['courseId'] = idx;
    } else if (header === 'date') {
      headerMap['date'] = idx;
    } else if (header === 'starttime' || header === 'start') {
      headerMap['startTime'] = idx;
    } else if (header === 'endtime' || header === 'end') {
      headerMap['endTime'] = idx;
    } else if (header === 'joinurl' || header === 'url' || header === 'link') {
      headerMap['joinUrl'] = idx;
    } else if (header === 'chapter' || header === 'topic' || header === 'topics') {
      headerMap['chapter'] = idx;
    }
  });

  const parsedClasses: LiveClass[] = [];

  for (let r = 1; r < rows.length; r++) {
    const row = rows[r];
    const getVal = (key: string): string => {
      const idx = headerMap[key];
      if (idx !== undefined && idx < row.length) {
        return row[idx].trim();
      }
      return '';
    };

    const courseId = getVal('courseId');
    const date = getVal('date');
    const startTime = getVal('startTime');
    const endTime = getVal('endTime');
    const joinUrl = getVal('joinUrl');
    const chapter = getVal('chapter');
    const explicitId = getVal('id');

    // Skip empty rows
    if (!courseId && !joinUrl && !chapter && !date) continue;

    const cleanCourseKey = (courseId || 'class').replace(/[^a-zA-Z0-9_-]/g, '');
    const cleanTimeKey = (startTime || '').replace(/[^a-zA-Z0-9]/g, '');
    const generatedId = explicitId || `live-${cleanCourseKey}-${date || r}-${cleanTimeKey || r}`;

    parsedClasses.push({
      id: generatedId,
      courseId: courseId || '',
      liveBatcheId: courseId || '',
      date: date || new Date().toISOString().split('T')[0],
      startTime: startTime || '04:30 PM',
      endTime: endTime || '06:00 PM',
      joinUrl: joinUrl || '',
      chapter: chapter || '',
      topics: chapter ? [chapter] : [],
    });
  }

  return parsedClasses;
}

export const DEFAULT_GOOGLE_SHEET_LIVE_CLASSES_URL =
  'https://docs.google.com/spreadsheets/d/1IMLDtXqnuM1A35xpboR_IrcYh5563ZCy55dzl1vGW1A/edit?usp=sharing';

export async function fetchLiveClasses(): Promise<LiveClass[]> {
  let rawClasses: (LiveClass & { courseid?: string })[] = [];

  // 1. Fetch live classes directly from Google Sheet
  const sheetUrl =
    process.env.GOOGLE_SHEET_LIVE_CLASSES_URL ||
    process.env.NEXT_PUBLIC_GOOGLE_SHEET_LIVE_CLASSES_URL ||
    DEFAULT_GOOGLE_SHEET_LIVE_CLASSES_URL;

  if (sheetUrl) {
    try {
      const csvUrl = formatGoogleSheetCsvUrl(sheetUrl);
      const res = await fetch(csvUrl, { next: { revalidate: 60 } });
      if (res.ok) {
        const csvText = await res.text();
        const parsed = parseGoogleSheetCsv(csvText);
        if (parsed.length > 0) {
          rawClasses = parsed;
        }
      }
    } catch (sheetErr) {
      console.warn('API fetch live classes from Google Sheet failed:', sheetErr);
    }
  }

  // 2. Check external API if configured and sheet didn't return classes
  if (rawClasses.length === 0 && API_BASE_URL) {
    try {
      const res = await fetch(`${API_BASE_URL}/api/live-classes/`);
      if (res.ok) {
        rawClasses = await res.json();
      }
    } catch (err) {
      console.warn('API fetch live classes failed:', err);
    }
  }

  // 3. Enrich with batch, course, instructor & calculated fields
  const [enrichedBatches, allCourses] = await Promise.all([
    fetchLiveBatches(),
    getLocalData<Course[]>('all-courses.json'),
  ]);

  return rawClasses.map((c, index) => {
    const lookupKey = (c.courseId || c.courseid || c.liveBatcheId || '').trim().toLowerCase();

    // Match batch by batch id or batch courseSlug
    const matchedBatch = enrichedBatches.find(
      (b) =>
        b.id.toLowerCase() === lookupKey ||
        b.courseSlug.toLowerCase() === lookupKey
    );

    // Match course by course id, course slug, or matched batch's courseSlug
    const matchedCourse = allCourses.find(
      (crs) =>
        crs.id.toLowerCase() === lookupKey ||
        crs.slug.toLowerCase() === lookupKey ||
        (matchedBatch && crs.slug.toLowerCase() === matchedBatch.courseSlug.toLowerCase())
    );

    // If batch was not matched directly, resolve batch by matched course's slug
    const resolvedBatch =
      matchedBatch ||
      (matchedCourse ? enrichedBatches.find((b) => b.courseSlug.toLowerCase() === matchedCourse.slug.toLowerCase()) : undefined);

    const detectedPlatform = deductPlatformFromUrl(c.joinUrl);
    const duration = calculateDurationMinutes(c.startTime, c.endTime);
    const chapterTopics = c.chapter ? [c.chapter] : (c.topics && c.topics.length > 0 ? c.topics : []);
    const courseTitle = matchedCourse?.title || resolvedBatch?.courseTitle || c.courseTitle || 'Live Computer Course';
    const courseSlug = matchedCourse?.slug || resolvedBatch?.courseSlug || c.courseSlug || '';
    const autoTitle = c.title || c.chapter || (chapterTopics.length > 0 ? chapterTopics.slice(0, 2).join(' & ') : resolvedBatch?.title || courseTitle || 'Live Interactive Class');
    const instructor = resolvedBatch?.instructor || c.instructor || 'Er. Sumit Kumar';
    const instructorPicture = resolvedBatch?.instructorPicture || c.instructorPicture || '';

    const cleanCourseKey = (courseSlug || lookupKey || 'class').replace(/[^a-zA-Z0-9_-]/g, '');
    const cleanTimeKey = (c.startTime || '').replace(/[^a-zA-Z0-9]/g, '');
    const classId = c.id || `live-${cleanCourseKey}-${c.date}-${cleanTimeKey || index + 1}`;

    return {
      ...c,
      id: classId,
      courseId: c.courseId || c.courseid || lookupKey,
      liveBatcheId: resolvedBatch?.id || c.liveBatcheId || lookupKey,
      chapter: c.chapter || (chapterTopics.length > 0 ? chapterTopics[0] : ''),
      topics: chapterTopics,
      platform: c.platform || detectedPlatform,
      durationMinutes: c.durationMinutes || duration,
      title: autoTitle,
      description: c.description || resolvedBatch?.description || matchedCourse?.shortDescription || '',
      courseTitle,
      courseSlug,
      instructor,
      instructorPicture,
      instructorData: resolvedBatch?.instructorData,
      batchTitle: resolvedBatch?.title || '',
      batch: resolvedBatch,
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


