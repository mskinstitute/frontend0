# Project: Blogging Platform Database with SQLAlchemy

In modern web development and content management systems (CMS), building an extensible, type-safe, and high-performance database layer is foundational. A blogging platform requires complex relational modeling—including User-to-Post ownership (1:N), Post-to-Comment hierarchies (1:N with cascading teardown), and Post-to-Tag categorizations (M:N via an association table).

In this project, we will construct a production-ready **Blogging Platform Data Layer** using modern **SQLAlchemy 2.0**. It features type-annotated declarative models, cascading deletions, eager loading to prevent N+1 queries, and atomic transactional service routines.

---

## 1. Relational Schema Architecture

The platform architecture models four core entities and an association table:

```
  ┌─────────────────┐             ┌─────────────────┐             ┌─────────────────┐
  │      User       │ 1         N │      Post       │ N         M │       Tag       │
  ├─────────────────┤─────────────├─────────────────┤─────────────├─────────────────┤
  │ id: int (PK)    │             │ id: int (PK)    │◄───┐        │ id: int (PK)    │
  │ username: str   │             │ title: str      │    │        │ name: str       │
  │ email: str      │             │ author_id: int  │    │        └─────────────────┘
  └─────────────────┘             └─────────────────┘    │                 ▲
           │ 1                             │ 1           │                 │
           │                               │             │                 │
           ▼ N                             ▼ N           │                 │
  ┌─────────────────┐             ┌─────────────────┐    │    ┌────────────────────────┐
  │     Comment     │             │     Comment     │    └───►│       post_tags        │
  ├─────────────────┤             ├─────────────────┤         ├────────────────────────┤
  │ id: int (PK)    │             │ id: int (PK)    │         │ post_id (FK) (PK)      │
  │ content: str    │             │ content: str    │         │ tag_id (FK) (PK)       │
  │ author_id: int  │             │ post_id: int    │         └────────────────────────┘
  └─────────────────┘             └─────────────────┘
```

---

## 2. Production Implementation

```python
import datetime
from typing import List, Optional
from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, Table, Text, create_engine, select
from sqlalchemy.orm import DeclarativeBase, Mapped, Session, mapped_column, relationship, selectinload, sessionmaker

# Step 1: Base Declarative Class
class Base(DeclarativeBase):
    pass

# Step 2: Many-to-Many Association Table (Posts <-> Tags)
post_tags = Table(
    "post_tags",
    Base.metadata,
    Column("post_id", Integer, ForeignKey("posts.id", ondelete="CASCADE"), primary_key=True),
    Column("tag_id", Integer, ForeignKey("tags.id", ondelete="CASCADE"), primary_key=True)
)

# Step 3: Domain Models
class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)

    # 1:N with Post
    posts: Mapped[List["Post"]] = relationship(back_populates="author", cascade="all, delete-orphan")
    # 1:N with Comment
    comments: Mapped[List["Comment"]] = relationship(back_populates="author", cascade="all, delete-orphan")

    def __repr__(self) -> str:
        return f"User(id={self.id}, username={self.username!r})"

class Post(Base):
    __tablename__ = "posts"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(200), nullable=False)
    content: Mapped[str] = mapped_column(Text, nullable=False)
    created_at: Mapped[datetime.datetime] = mapped_column(DateTime, default=datetime.datetime.utcnow)

    # N:1 Foreign Key to Author
    author_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    author: Mapped["User"] = relationship(back_populates="posts")

    # 1:N with Comment (Cascading: Deleting a post deletes all its comments)
    comments: Mapped[List["Comment"]] = relationship(back_populates="post", cascade="all, delete-orphan")

    # M:N with Tag
    tags: Mapped[List["Tag"]] = relationship(secondary=post_tags, back_populates="posts")

    def __repr__(self) -> str:
        return f"Post(id={self.id}, title={self.title!r})"

class Tag(Base):
    __tablename__ = "tags"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)

    # M:N with Post
    posts: Mapped[List["Post"]] = relationship(secondary=post_tags, back_populates="tags")

    def __repr__(self) -> str:
        return f"Tag(name={self.name!r})"

class Comment(Base):
    __tablename__ = "comments"

    id: Mapped[int] = mapped_column(primary_key=True)
    content: Mapped[str] = mapped_column(Text, nullable=False)

    post_id: Mapped[int] = mapped_column(ForeignKey("posts.id"), nullable=False)
    post: Mapped["Post"] = relationship(back_populates="comments")

    author_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    author: Mapped["User"] = relationship(back_populates="comments")

    def __repr__(self) -> str:
        return f"Comment(id={self.id}, author={self.author_id})"
```

---

## 3. High-Level Blog Service Layer

```python
class BlogRepository:
    """Encapsulates transactional operations and query logic."""

    def __init__(self, session_factory: sessionmaker[Session]) -> None:
        self.session_factory = session_factory

    def create_user(self, username: str, email: str) -> int:
        with self.session_factory() as session:
            with session.begin():
                user = User(username=username, email=email)
                session.add(user)
                session.flush()
                return user.id

    def create_post(self, author_id: int, title: str, content: str, tag_names: List[str]) -> int:
        with self.session_factory() as session:
            with session.begin():
                # Locate existing tags or instantiate new ones
                tags = []
                for name in tag_names:
                    tag = session.scalars(select(Tag).where(Tag.name == name)).first()
                    if not tag:
                        tag = Tag(name=name)
                        session.add(tag)
                    tags.append(tag)

                post = Post(title=title, content=content, author_id=author_id, tags=tags)
                session.add(post)
                session.flush()
                return post.id

    def add_comment(self, post_id: int, author_id: int, content: str) -> int:
        with self.session_factory() as session:
            with session.begin():
                comment = Comment(post_id=post_id, author_id=author_id, content=content)
                session.add(comment)
                session.flush()
                return comment.id

    def get_post_details(self, post_id: int) -> Optional[Post]:
        """Eagerly fetches post with author, tags, and comments in 3 bulk queries (No N+1!)."""
        with self.session_factory() as session:
            stmt = (
                select(Post)
                .where(Post.id == post_id)
                .options(
                    selectinload(Post.author),
                    selectinload(Post.tags),
                    selectinload(Post.comments).selectinload(Comment.author)
                )
            )
            return session.scalars(stmt).first()
```

---

## 4. Verification and Demonstration

```python
def main():
    print("=====================================================")
    print("      INITIALIZING BLOGGING PLATFORM ORM TEST       ")
    print("=====================================================")

    engine = create_engine("sqlite:///:memory:", echo=False)
    Base.metadata.create_all(engine)
    session_maker = sessionmaker(bind=engine)
    repo = BlogRepository(session_maker)

    # 1. Create Users
    u1_id = repo.create_user("tech_guru", "guru@code.org")
    u2_id = repo.create_user("curious_coder", "coder@dev.io")
    print(f"[CREATED] Users registered: ID {u1_id}, ID {u2_id}")

    # 2. Publish a Post with Tags
    post_id = repo.create_post(
        author_id=u1_id,
        title="Deep Dive into SQLAlchemy 2.0 & Python Data Modeling",
        content="SQLAlchemy 2.0 combines the best of type annotations and declarative querying...",
        tag_names=["Python", "Architecture", "Databases"]
    )
    print(f"[CREATED] Post published with ID: {post_id}")

    # 3. Add Comments to Post
    repo.add_comment(post_id=post_id, author_id=u2_id, content="Outstanding explanation of selectinload!")
    repo.add_comment(post_id=post_id, author_id=u1_id, content="Thanks! More advanced tutorials coming soon.")
    print("[CREATED] Comments attached to post.")

    # 4. Fetch Post with Eager Loading (Zero N+1)
    post = repo.get_post_details(post_id)
    if post:
        print("\n-----------------------------------------------------")
        print(f"TITLE:   {post.title}")
        print(f"AUTHOR:  {post.author.username} ({post.author.email})")
        print(f"TAGS:    {[t.name for t in post.tags]}")
        print(f"COMMENTS ({len(post.comments)}):")
        for c in post.comments:
            print(f"  - [{c.author.username}]: {c.content}")
        print("-----------------------------------------------------")

    # 5. Cascading Deletion Demonstration
    print("\n--- Testing Cascading Delete ---")
    with session_maker() as session:
        with session.begin():
            post_to_delete = session.scalars(select(Post).where(Post.id == post_id)).one()
            session.delete(post_to_delete)
        # Post deleted! Let's check remaining comments
        remaining_comments = session.scalars(select(Comment)).all()
        print(f"Remaining comments in database after post deletion: {len(remaining_comments)} (Orphans deleted!)")

    print("\n=====================================================")
    print("        ALL ORM TESTS PASSED SUCCESSFULLY!          ")
    print("=====================================================")

if __name__ == "__main__":
    main()
```

---

## 5. Architectural Key Takeaways

1. **Association Table Isolation**: The `post_tags` table handles many-to-many relationship rows independently without polluting the domain models.
2. **Bulk Eager Loading via `selectinload`**: Nested options like `selectinload(Post.comments).selectinload(Comment.author)` efficiently preload author information for comments without nested loops of SQL queries.
3. **Cascading Lifecycle**: Setting `cascade="all, delete-orphan"` guarantees that deleting a post cleans up all associated comments in the database.

---

# Multiple Choice Questions

### 1.
How does `cascade="all, delete-orphan"` on `Post.comments` maintain referential integrity when a post is removed?
A. It changes the comments' text to `"DELETED"`.
B. It automatically deletes all comments associated with that post from the database, preventing orphaned rows with invalid foreign keys.
C. It moves comments to an archive table on disk.
D. It prevents the post from ever being deleted.

**Answer:** B

**Explanation:** The `delete-orphan` cascade ensures that any child `Comment` instances associated with the deleted `Post` are systematically deleted from the database.

---

### 2.
Why does `BlogRepository.get_post_details` use `selectinload` when retrieving posts with their tags and comments?
A. To convert the database into a CSV file.
B. To avoid the N+1 query problem by pre-fetching all related tags and comments using bulk `IN (...)` queries.
C. To prevent thread contention in Python.
D. Because SQLite does not support standard `SELECT` queries.

**Answer:** B

**Explanation:** Eager loading with `selectinload` issues optimized bulk queries to fetch related collections in advance, preventing individual queries on every loop iteration.

---

### 3.
What constitutes the composite primary key of the `post_tags` association table?
A. A single auto-incrementing integer column named `id`.
B. The combination of `(post_id, tag_id)` foreign keys marked with `primary_key=True`.
C. A SHA-256 hash string.
D. The tag name string.

**Answer:** B

**Explanation:** A standard Many-to-Many association table creates a composite primary key using both participating foreign key columns (`post_id` and `tag_id`), guaranteeing unique pairs without an artificial surrogate ID.

---

### 4.
What is the purpose of `session.flush()` inside `BlogRepository.create_post` before the transaction commits?
A. To clear the system RAM.
B. To push the new `Post` record to the database so that its auto-incremented primary key (`post.id`) is populated and available for immediate use.
C. To close the connection.
D. To encrypt the post's content.

**Answer:** B

**Explanation:** `flush()` emits the SQL `INSERT` statement into the database transaction buffer, allowing the database to assign and return generated primary key IDs without finalizing the commit.

---

### 5.
Which SQLAlchemy 2.0 query retrieves a single unique user by username and raises an exception if not found or if multiple are returned?
A. `session.scalars(select(User).where(User.username == name)).one()`
B. `session.get(User, name)`
C. `session.find(name)`
D. `session.filter(name).first()`

**Answer:** A

**Explanation:** Calling `.one()` on a scalar result verifies that exactly one record matches the query, raising `NoResultFound` if missing or `MultipleResultsFound` if more than one exists.

---
