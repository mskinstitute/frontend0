---
id: html-introduction
slug: introduction-to-html
course: html5-complete-course
chapter: 1
topic: 1.1
title: Introduction to HTML
description: Learn what HTML is, how websites work, and understand Tags, Elements, and Attributes in simple English for school students (Classes 8th to 12th).
difficulty: Beginner
readingTime: 8
order: 1
keywords:
  - what is html
  - introduction to html
  - html for school students
  - learn html5
  - web development basics
  - tags elements attributes
lastUpdated: 2026-09-09
author: MSK Institute
version: 2.0
---

# Introduction to HTML

Welcome to the exciting world of **Web Development**! 🎉

If you are a school student in **Class 8th, 9th, 10th, 11th, or 12th** and you want to learn how websites like Google, YouTube, or Wikipedia are created, HTML is your very first step.

Every single website on the internet is built using **HTML**. Without HTML, a web browser cannot display text, images, or buttons.

---

# What is HTML? (Full Form & Meaning)

**HTML** stands for:

- **H** - **Hyper**
- **T** - **Text**
- **M** - **Markup**
- **L** - **Language**

Let us understand each word in simple everyday terms:

1. **HyperText:** 
   This means clickable text containing links. For example, when you search on Google and click on any blue link, a new webpage opens up. That clickable link is called *HyperText*.

2. **Markup:** 
   This means "marking" or labeling your content so the computer knows what it is. Just like you underline a main heading or highlight important points in your school notebook, in HTML we use **tags** to tell the browser: *"This is a heading"*, *"This is a paragraph"*, or *"This is an image"*.

3. **Language:** 
   It is a standard language that every web browser (like Google Chrome, Microsoft Edge, and Mozilla Firefox) easily understands and shows on your screen.

> 💡 **Important Rule to Remember:**
> HTML is **NOT** a programming language. It is a **Markup Language**. It does not have complex mathematics, formulas, loops (`for`, `while`), or decision-making logic (`if-else`). Its only job is to organize and structure content on a webpage.

---

# Real-Life Example: How a Website is Built

To understand how a website works, let us look at the **Human Body** or a **House**:

| Part | Real-Life Example (Human Body) | Real-Life Example (House) | Role on a Website |
|---|---|---|---|
| **HTML** | **Bones & Skeleton** | **Bricks, Walls & Roof** | Creates the basic structure and raw content (headings, text, images). |
| **CSS** | **Skin, Clothes & Hair Style** | **Paint, Tiles & Furniture** | Makes the website look beautiful, colorful, and well-designed. |
| **JavaScript** | **Brain & Muscle Movement** | **Electric Wiring, Switches & Fans** | Adds action and interactivity (what happens when you click a button). |

Without HTML, you cannot put any content on a webpage!

---

# Who Created HTML? (A Quick History)

- HTML was invented in **1991** by **Sir Tim Berners-Lee** at CERN research laboratory in Switzerland.
- He created it so scientists could easily share research documents with each other across computer networks.
- Today, we use **HTML5**, which is the latest, fastest, and most mobile-friendly version of HTML.

---

# How Does HTML Work?

When you create an HTML file on your computer and open it in Google Chrome or Edge:

```text
Your Code (index.html)  ➡️  Web Browser (Chrome/Edge)  ➡️  Clean Webpage on Screen
```

1. The browser reads your file line by line from top to bottom.
2. The browser recognizes the HTML tags.
3. According to the tags, it arranges headings, paragraphs, and images neatly on your screen.

---

# Tags, Elements, and Attributes (Core Concepts)

Many beginner students get confused between these three terms. Let us make them crystal clear:

### 1. What is a Tag?
A tag is a special keyword surrounded by angle brackets `< >`. In HTML, most things have two tags:
- **Opening Tag (Start Tag):** For example, `<p>` (tells the browser: a paragraph starts here).
- **Closing Tag (End Tag):** For example, `</p>` (has a forward slash `/`, tells the browser: the paragraph ends here).

> 📌 **Self-Closing Tags (Void Tags):**
> Some tags do not have closing tags because they do not wrap any text inside them. For example:
> - `<br>`: Adds a line break (jumps to the next line).
> - `<hr>`: Draws a horizontal line across the page.

---

### 2. What is an Element?
An **Element** is the complete package: **Opening Tag + Content in the middle + Closing Tag**.

```text
<p>  Welcome to MSK Institute!  </p>
───  ─────────────────────────  ────
 │               │                │
Start Tag     Content          End Tag
└─────────────────────────────────────┘
             HTML Element
```

- **Tag:** Just `<p>` or `</p>`.
- **Element:** `<p>Welcome to MSK Institute!</p>` (The entire combination).

---

### 3. What is an Attribute?
An attribute gives **extra information** about a tag.

- Attributes are always written inside the **Opening Tag**.
- They follow the format: `name="value"`.

**Example:**
```html no-try no-copy  preview-enable mdn="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a"
<a href="https://google.com">Go to Google</a>
```

- Here, `<a>` is the link tag.
- `href` is the **Attribute**, which tells the browser the exact website address to open when someone clicks on the link.

---

# Your Very First HTML Code

Look at this simple example:

```html
<h1>Hello World!</h1>
<p>My name is Aman and I am learning HTML5 at MSK Institute.</p>
```

### What does this code do?
- `<h1>...</h1>`: This is a **Heading 1 Element**. The browser displays this text big and bold.
- `<p>...</p>`: This is a **Paragraph Element**. The browser displays this text as regular body text.

---

# Common Beginner Mistakes to Avoid

1. ⚠️ **Forgetting the Closing Tag:**
   - ❌ Wrong: `<p>My name is Aman.`
   - ✅ Correct: `<p>My name is Aman.</p>`

2. ⚠️ **Spelling Mistakes in Tags:**
   - ❌ Wrong: `<paragraf>Hello</paragraf>` or `<headding>Title</headding>`
   - ✅ Correct: `<p>Hello</p>` and `<h1>Title</h1>`

3. ⚠️ **Using Capital Letters:**
   - HTML works even if you write `<P>` in uppercase, but modern standard coding practice requires writing all tags in **lowercase (small letters)**: `<p>`, `<h1>`.

---

# Quick Summary

- ✅ **HTML** stands for **HyperText Markup Language**.
- ✅ HTML builds the **structure** of every webpage.
- ✅ HTML is a **markup language**, not a programming language.
- ✅ **Tag:** `<p>` or `</p>`.
- ✅ **Element:** Opening Tag + Content + Closing Tag.
- ✅ **Attribute:** Extra details written inside the opening tag (`name="value"`).
- ✅ **HTML5** is the latest and standard version of HTML.

---

# Practice Quiz

Test your understanding with these multiple-choice questions:

### 1. What is the full form of HTML?
A. Hyper Text Markup Language
B. High Tech Modern Language
C. Hyperlink Text Making Language
D. Home Tool Markup Language
**Answer:** A
**Explanation:** HTML stands for HyperText Markup Language. It is the standard markup language used to create web pages.

---

### 2. What do you call the combination of an opening tag, content, and a closing tag?
A. Attribute
B. Element
C. Variable
D. Function
**Answer:** B
**Explanation:** An HTML Element consists of the start tag, the content in between, and the end tag.

---

### 3. Which of the following statements about HTML is true?
A. HTML is a programming language with loops and calculations
B. HTML requires special paid software to run
C. HTML is a markup language that defines the structure of a webpage
D. HTML was created by Google in 2020
**Answer:** C
**Explanation:** HTML is a markup language created by Sir Tim Berners-Lee in 1991 that defines the layout and structure of webpages.

---

### 4. Who invented HTML in the year 1991?
A. Bill Gates
B. Steve Jobs
C. Sir Tim Berners-Lee
D. Mark Zuckerberg
**Answer:** C
**Explanation:** Sir Tim Berners-Lee invented the World Wide Web and HTML in 1991 at CERN.

---

### 5. What file extension must be used when saving an HTML document?
A. `.txt`
B. `.docx`
C. `.html` or `.htm`
D. `.css`
**Answer:** C
**Explanation:** Web browsers recognize HTML documents by their `.html` (or `.htm`) extension.

---

# Practice Challenge (Try It Yourself)

1. Open **Notepad** on your computer.
2. Type the following code:
   ```html
   <h1>My First Webpage</h1>
   <p>I am a Class 10 student and I am excited to learn web development!</p>
   ```
3. Click `File -> Save As` and name the file: `mypage.html` (make sure to include `.html` at the end).
4. Go to the folder where you saved it, and double-click `mypage.html`.
5. Your very first webpage will open right inside your web browser! 🚀
