import { CodeTemplate, SupportedLanguage } from './types';

export const STARTER_TEMPLATES: Record<SupportedLanguage, CodeTemplate[]> = {
  python: [
    {
      id: 'py-welcome',
      title: 'Welcome & Print Statements',
      language: 'python',
      description: 'Introductory Python program demonstrating output formatting and variables.',
      code: `# Welcome to MSK Institute Python Playground!
# Powered by Monaco Editor & Pyodide WebAssembly

name = "Er. Sumit Kumar"
institute = "MSK Institute of Technology, Shikohabad"
batch_year = 2026

print("========================================")
print(f"🚀 Learning Python at {institute}")
print(f"👨‍🏫 Mentor: {name}")
print(f"📅 Session: {batch_year}")
print("========================================\\n")

students = ["Aman", "Priya", "Rahul", "Neha", "Vikas"]
print("Registered Batch Students:")
for idx, student in enumerate(students, 1):
    print(f"  {idx}. {student} - Enrolled in Python Masterclass")

print("\\n✅ Try editing this code and press 'Run Code' (Ctrl + Enter)!")
`,
    },
    {
      id: 'py-marksheet',
      title: 'Student Marksheet & Grading',
      language: 'python',
      description: 'Calculate total, percentage, and grade for student exams.',
      code: `# MSK Institute - Student Performance Calculator
def calculate_grade(marks):
    total = sum(marks.values())
    percentage = total / len(marks)
    
    if percentage >= 85:
        grade = "A+ (Outstanding)"
    elif percentage >= 75:
        grade = "A (Excellent)"
    elif percentage >= 60:
        grade = "B (Good)"
    elif percentage >= 50:
        grade = "C (Pass)"
    else:
        grade = "Fail (Needs Improvement)"
        
    return total, percentage, grade

student_marks = {
    "Python Programming": 92,
    "Web Technologies": 88,
    "Database & SQL": 85,
    "Data Structures": 79
}

total, pct, grade = calculate_grade(student_marks)

print("🎓 MSK INSTITUTE REPORT CARD")
print("-" * 35)
for subject, mark in student_marks.items():
    print(f"{subject.ljust(22)}: {mark}/100")
print("-" * 35)
print(f"Total Marks Obtained  : {total}/400")
print(f"Final Percentage      : {pct:.2f}%")
print(f"Awarded Grade         : {grade}")
`,
    },
    {
      id: 'py-fibonacci',
      title: 'Fibonacci & Prime Numbers',
      language: 'python',
      description: 'Algorithmic loop demonstration for Fibonacci series and prime checks.',
      code: `# Fibonacci Series & Prime Number Checker
def generate_fibonacci(n):
    fib = [0, 1]
    while len(fib) < n:
        fib.append(fib[-1] + fib[-2])
    return fib[:n]

def is_prime(num):
    if num <= 1:
        return False
    for i in range(2, int(num ** 0.5) + 1):
        if num % i == 0:
            return False
    return True

print("🔢 First 10 Fibonacci Numbers:")
print(generate_fibonacci(10))

print("\\n🔍 Checking Prime Numbers between 1 and 30:")
primes = [n for n in range(1, 31) if is_prime(n)]
print(primes)
`,
    },
  ],
  html: [
    {
      id: 'web-card',
      title: 'Modern Course Card (HTML/CSS/JS)',
      language: 'html',
      description: 'Interactive responsive card with CSS styling and JavaScript click effect.',
      code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>MSK Institute Course Card</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: system-ui, -apple-system, sans-serif; }
    body {
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .card {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 20px;
      padding: 28px;
      max-width: 380px;
      width: 100%;
      color: white;
      box-shadow: 0 20px 40px rgba(0,0,0,0.4);
      transition: transform 0.3s ease, border-color 0.3s ease;
    }
    .card:hover {
      transform: translateY(-5px);
      border-color: #38bdf8;
    }
    .badge {
      display: inline-block;
      background: #0284c7;
      color: #fff;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      padding: 4px 10px;
      border-radius: 20px;
      margin-bottom: 14px;
    }
    h2 { font-size: 22px; font-weight: 800; margin-bottom: 8px; color: #f8fafc; }
    p { font-size: 13px; line-height: 1.6; color: #94a3b8; margin-bottom: 20px; }
    .btn {
      width: 100%;
      padding: 12px;
      background: linear-gradient(135deg, #0284c7, #2563eb);
      color: white;
      border: none;
      border-radius: 12px;
      font-weight: 700;
      font-size: 14px;
      cursor: pointer;
      box-shadow: 0 4px 14px rgba(2, 132, 199, 0.4);
      transition: opacity 0.2s;
    }
    .btn:hover { opacity: 0.9; }
    .status { margin-top: 14px; font-size: 12px; text-align: center; color: #38bdf8; min-height: 18px; }
  </style>
</head>
<body>
  <div class="card">
    <span class="badge">🔥 Popular Track</span>
    <h2>Python Full-Stack Mastery</h2>
    <p>Master Python, Django, REST APIs, and modern frontend development with Er. Sumit Kumar at MSK Institute.</p>
    <button class="btn" id="demoBtn">Book Free Demo Class</button>
    <div class="status" id="statusMsg"></div>
  </div>

  <script>
    const btn = document.getElementById('demoBtn');
    const msg = document.getElementById('statusMsg');
    let clicks = 0;

    btn.addEventListener('click', () => {
      clicks++;
      console.log('User clicked Book Demo button! Count:', clicks);
      msg.textContent = '🎉 Demo seat requested! Inquiry sent successfully.';
    });
  </script>
</body>
</html>
`,
    },
    {
      id: 'web-counter',
      title: 'Interactive Counter Widget',
      language: 'html',
      description: 'Clean HTML, CSS, and JS counter demonstrating DOM events.',
      code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: system-ui; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 90vh; background: #f1f5f9; }
    .box { background: white; padding: 32px; border-radius: 16px; box-shadow: 0 10px 25px rgba(0,0,0,0.08); text-align: center; width: 280px; }
    h1 { font-size: 54px; margin: 16px 0; color: #0f172a; }
    .btns { display: flex; gap: 12px; justify-content: center; }
    button { padding: 10px 18px; font-size: 18px; font-weight: bold; border-radius: 8px; border: none; cursor: pointer; }
    .dec { background: #fee2e2; color: #ef4444; }
    .inc { background: #dcfce7; color: #16a34a; }
    .rst { background: #e2e8f0; color: #475569; font-size: 13px; margin-top: 14px; width: 100%; }
  </style>
</head>
<body>
  <div class="box">
    <h3>Live Counter</h3>
    <h1 id="count">0</h1>
    <div class="btns">
      <button class="dec" id="btnDec">-</button>
      <button class="inc" id="btnInc">+</button>
    </div>
    <button class="rst" id="btnRst">Reset</button>
  </div>

  <script>
    let val = 0;
    const countEl = document.getElementById('count');
    document.getElementById('btnInc').onclick = () => { val++; update(); };
    document.getElementById('btnDec').onclick = () => { val--; update(); };
    document.getElementById('btnRst').onclick = () => { val = 0; update(); };
    function update() {
      countEl.textContent = val;
      console.log("Current Counter Value:", val);
    }
  </script>
</body>
</html>
`,
    },
  ],
  javascript: [
    {
      id: 'js-array-methods',
      title: 'Array Methods (Map, Filter, Reduce)',
      language: 'javascript',
      description: 'Essential functional array operations used in modern web development.',
      code: `// Modern JavaScript Array Processing Demo
// MSK Institute JavaScript Mastery

const courses = [
  { id: 1, name: "Python Masterclass", category: "Programming", fee: 4999, students: 120 },
  { id: 2, name: "MERN Stack Full-Time", category: "Web Dev", fee: 8999, students: 85 },
  { id: 3, name: "NIELIT CCC Certification", category: "Govt Exam", fee: 2499, students: 230 },
  { id: 4, name: "Data Analytics with Python", category: "Programming", fee: 6499, students: 60 },
  { id: 5, name: "ADCA 1-Year Diploma", category: "Diploma", fee: 7999, students: 140 }
];

console.log("📊 Total Registered Courses:", courses.length);

// 1. FILTER: Find all Programming track courses
const programmingCourses = courses.filter(c => c.category === "Programming");
console.log("\\n1. Programming Track Courses:");
console.log(programmingCourses.map(c => c.name));

// 2. MAP: Course Titles with Formatted Fees
const formattedCatalog = courses.map(c => \`\${c.name} - ₹\${c.fee}\`);
console.log("\\n2. Formatted Catalog:");
console.log(formattedCatalog);

// 3. REDUCE: Total Enrollment & Gross Academy Revenue
const totalStudents = courses.reduce((sum, c) => sum + c.students, 0);
const totalRevenue = courses.reduce((sum, c) => sum + (c.fee * c.students), 0);

console.log("\\n3. Academy Statistics:");
console.log("Total Active Students:", totalStudents);
console.log("Estimated Cumulative Value: ₹" + totalRevenue.toLocaleString("en-IN"));
`,
    },
    {
      id: 'js-async-demo',
      title: 'Async/Await & Promises',
      language: 'javascript',
      description: 'Simulate asynchronous data fetching with async/await and try/catch.',
      code: `// Asynchronous Programming in Modern JavaScript
async function fetchBatchSchedule(batchId) {
  console.log(\`⏳ Fetching live schedule for batch: \${batchId}...\`);
  
  // Simulate network latency
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return {
    batchId: batchId,
    title: "Python Fast-Track Morning Batch",
    instructor: "Er. Sumit Kumar",
    timing: "08:00 AM - 09:30 AM IST",
    days: "Mon, Wed, Fri",
    location: "Lab Room 2, MSK Institute Shikohabad",
    nextClassTopic: "Object-Oriented Programming (Classes & Inheritance)"
  };
}

async function run() {
  try {
    const data = await fetchBatchSchedule("BATCH-PY-2026");
    console.log("\\n✅ Schedule Retrieved Successfully!");
    console.log("Course:", data.title);
    console.log("Instructor:", data.instructor);
    console.log("Timing:", data.timing);
    console.log("Next Topic:", data.nextClassTopic);
  } catch (err) {
    console.error("Failed to load batch:", err);
  }
}

run();
`,
    },
  ],
  typescript: [
    {
      id: 'ts-interfaces',
      title: 'TypeScript Interfaces & Generics',
      language: 'typescript',
      description: 'Type-safe programming patterns in TypeScript.',
      code: `// TypeScript Interface and Generic Data Repository
interface Student {
  id: string;
  name: string;
  course: string;
  isEnrolled: boolean;
  score?: number;
}

class StudentRegistry<T extends Student> {
  private items: T[] = [];

  addStudent(student: T): void {
    this.items.push(student);
    console.log(\`✅ Enrolled: \${student.name} into \${student.course}\`);
  }

  getEnrolled(): T[] {
    return this.items.filter(s => s.isEnrolled);
  }
}

const registry = new StudentRegistry<Student>();
registry.addStudent({ id: "S101", name: "Aman Sharma", course: "Python Masterclass", isEnrolled: true });
registry.addStudent({ id: "S102", name: "Pooja Verma", course: "MERN Stack", isEnrolled: true });

console.log("Total Enrolled Students:", registry.getEnrolled().length);
`,
    },
  ],
  css: [
    {
      id: 'css-flex-grid',
      title: 'CSS Modern Layouts & Animations',
      language: 'css',
      description: 'Modern CSS styling properties.',
      code: `/* Modern Glassmorphism & Neon Glow CSS */
.msk-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 2rem;
  background: #090d16;
}

.msk-card {
  background: rgba(30, 41, 59, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.msk-card:hover {
  transform: translateY(-6px) scale(1.02);
  border-color: #0284c7;
  box-shadow: 0 12px 36px rgba(2, 132, 199, 0.25);
}
`,
    },
  ],
  cpp: [
    {
      id: 'cpp-oop',
      title: 'C++ Classes & Objects',
      language: 'cpp',
      description: 'Object-Oriented Programming in C++ with constructors and methods.',
      code: `// MSK Institute - C++ Object-Oriented Programming
#include <iostream>
#include <string>
#include <vector>

using namespace std;

class Student {
private:
    string name;
    string course;
    int rollNo;

public:
    Student(string n, string c, int r) : name(n), course(c), rollNo(r) {}

    void displayDetails() {
        cout << "Roll No: " << rollNo << " | Name: " << name << " | Course: " << course << endl;
    }
};

int main() {
    cout << "MSK Institute - C++ Student Database" << endl;
    cout << "------------------------------------" << endl;

    Student s1("Aman Kumar", "Data Structures with C++", 101);
    Student s2("Ravi Singh", "C++ Masterclass", 102);

    s1.displayDetails();
    s2.displayDetails();

    return 0;
}
`,
    },
  ],
  c: [
    {
      id: 'c-basics',
      title: 'C Programming - Pointers & Arrays',
      language: 'c',
      description: 'Pointer arithmetic and array processing in C.',
      code: `// MSK Institute - C Programming Core
#include <stdio.h>

void calculateStats(int arr[], int size, int *sum, float *avg) {
    *sum = 0;
    for (int i = 0; i < size; i++) {
        *sum += *(arr + i); // Pointer arithmetic
    }
    *avg = (float)(*sum) / size;
}

int main() {
    int marks[] = {85, 92, 78, 89, 95};
    int size = sizeof(marks) / sizeof(marks[0]);
    int sum;
    float avg;

    printf("MSK Institute - Lab Evaluation in C\\n");
    calculateStats(marks, size, &sum, &avg);

    printf("Total Marks: %d\\n", sum);
    printf("Average Score: %.2f\\n", avg);

    return 0;
}
`,
    },
  ],
  java: [
    {
      id: 'java-basics',
      title: 'Java OOP - Inheritance & Polymorphism',
      language: 'java',
      description: 'Core Java OOP concepts.',
      code: `// MSK Institute - Java Programming
class InstituteMember {
    protected String name;
    protected String role;

    public InstituteMember(String name, String role) {
        this.name = name;
        this.role = role;
    }

    public void introduce() {
        System.out.println("Hello, I am " + name + " (" + role + ") at MSK Institute.");
    }
}

class Instructor extends InstituteMember {
    private String subject;

    public Instructor(String name, String subject) {
        super(name, "Senior Instructor");
        this.subject = subject;
    }

    @Override
    public void introduce() {
        super.introduce();
        System.out.println("Specialization: " + subject);
    }
}

public class Main {
    public static void main(String[] args) {
        Instructor sumitSir = new Instructor("Er. Sumit Kumar", "Full Stack Development & Python");
        sumitSir.introduce();
    }
}
`,
    },
  ],
};
