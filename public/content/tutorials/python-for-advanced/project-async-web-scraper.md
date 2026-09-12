# Project: Async Web Scraper

Building a scalable web crawler requires handling thousands of network requests concurrently while strictly respecting rate limits, timeouts, and network failure modes. Sequential scraping is orders of magnitude too slow, while spawning thousands of threads causes memory exhaustion.

In this project, we will construct a production-ready **Asynchronous Web Crawler Engine** using Python's `asyncio` framework. It incorporates non-blocking queues, concurrency throttling with `asyncio.Semaphore`, retry mechanisms with exponential backoff, crawl depth tracking, and structured telemetry.

---

## 1. Asynchronous Crawler Architecture

The crawler architecture uses a **Non-Blocking Producer-Consumer Pipeline**:

```
 [Seed URLs] ──► asyncio.Queue (Pending URLs)
                         │
         ┌───────────────┼───────────────┐
         ▼               ▼               ▼
    Worker Coroutine 1 Worker Coroutine 2 Worker Coroutine 3
         │               │               │
         └───────────────┬───────────────┘
                         ▼
             asyncio.Semaphore(max_concurrency=4)
             (Enforces host connection rate limits)
                         │
                         ▼
             Non-Blocking Async HTTP Fetch
             (Extract Title, Latency, Outlinks)
                         │
                         ▼
             Domain Filter & Visited Set
             (Deduplicates new outlinks)
                         │
                         ▼
             Feeds new links back to asyncio.Queue
```

---

## 2. Production Implementation

```python
import asyncio
import random
import time
from typing import Dict, List, NamedTuple, Optional, Set

# Structured result of a scraped web page
class ScrapeResult(NamedTuple):
    url: str
    status_code: int
    page_title: str
    latency_ms: float
    outlinks_discovered: List[str]

class AsyncWebCrawler:
    """A high-concurrency, asynchronous web scraping and crawling engine."""

    def __init__(self, max_concurrent_requests: int = 3, max_depth: int = 2) -> None:
        self.max_depth = max_depth
        self.semaphore = asyncio.Semaphore(max_concurrent_requests)
        self.queue: asyncio.Queue[tuple[str, int]] = asyncio.Queue()
        self.visited_urls: Set[str] = set()
        self.results: List[ScrapeResult] = []
        self.errors: Dict[str, str] = {}

    async def _mock_fetch(self, url: str) -> ScrapeResult:
        """Simulates an asynchronous, non-blocking HTTP GET request."""
        # Enforce rate-limiting concurrency using the semaphore
        async with self.semaphore:
            print(f"[FETCHING] {url} (Active slots: {self.semaphore._value})")
            
            # Simulate network round-trip latency
            latency = random.uniform(0.05, 0.15)
            await asyncio.sleep(latency)

            # Simulate occasional transient network drops
            if "flaky" in url and random.random() < 0.3:
                raise ConnectionResetError("Remote server closed TCP connection abruptly.")

            # Simulated page parsing and outlink extraction
            clean_name = url.split("/")[-1] or "home"
            discovered_links = [
                f"{url}/subpage_1",
                f"{url}/subpage_2"
            ] if len(url.split("/")) < 5 else []

            return ScrapeResult(
                url=url,
                status_code=200,
                page_title=f"Page Title: {clean_name.capitalize()}",
                latency_ms=latency * 1000,
                outlinks_discovered=discovered_links
            )

    async def _fetch_with_retry(self, url: str, max_retries: int = 2) -> Optional[ScrapeResult]:
        """Wraps HTTP fetch in a retry loop with exponential backoff and timeout."""
        delay = 0.1
        for attempt in range(1, max_retries + 1):
            try:
                # Python 3.11+ timeout wrapper
                async with asyncio.timeout(0.5):
                    return await self._mock_fetch(url)
            except (ConnectionResetError, TimeoutError) as exc:
                if attempt == max_retries:
                    self.errors[url] = str(exc)
                    print(f"[PERMANENT FAILURE] {url} failed after {attempt} attempts: {exc}")
                    return None
                print(f"[RETRY] {url} attempt #{attempt} failed. Backoff {delay:.2f}s...")
                await asyncio.sleep(delay)
                delay *= 2.0
        return None

    async def _worker(self, worker_id: int) -> None:
        """Worker task processing URLs from the queue."""
        while True:
            url, depth = await self.queue.get()
            try:
                if url in self.visited_urls:
                    continue
                self.visited_urls.add(url)

                result = await self._fetch_with_retry(url)
                if result:
                    self.results.append(result)
                    print(f"[SUCCESS] Worker-{worker_id} scraped '{result.page_title}' in {result.latency_ms:.1f}ms")

                    # If depth limit not reached, enqueue newly discovered links
                    if depth < self.max_depth:
                        for outlink in result.outlinks_discovered:
                            if outlink not in self.visited_urls:
                                await self.queue.put((outlink, depth + 1))
            finally:
                self.queue.task_done()

    async def crawl(self, seed_urls: List[str], num_workers: int = 4) -> None:
        """Initializes the crawl pipeline and waits for completion."""
        start_time = time.perf_counter()

        # Enqueue seed URLs at depth 0
        for url in seed_urls:
            await self.queue.put((url, 0))

        # Launch background worker tasks
        worker_tasks = [
            asyncio.create_task(self._worker(i + 1), name=f"ScraperWorker-{i+1}")
            for i in range(num_workers)
        ]

        # Block until all URLs in queue have called task_done()
        await self.queue.join()

        # Cancel idle background worker loops
        for task in worker_tasks:
            task.cancel()
        await asyncio.gather(*worker_tasks, return_exceptions=True)

        elapsed = time.perf_counter() - start_time
        self._print_summary(elapsed)

    def _print_summary(self, elapsed: float) -> None:
        avg_latency = (
            sum(r.latency_ms for r in self.results) / len(self.results)
            if self.results else 0.0
        )
        print("\n=====================================================")
        print("                 CRAWL SUMMARY REPORT                ")
        print("=====================================================")
        print(f"Total Pages Scraped:     {len(self.results)}")
        print(f"Failed URLs:             {len(self.errors)}")
        print(f"Average Request Latency: {avg_latency:.2f} ms")
        print(f"Total Crawl Duration:    {elapsed:.2f} seconds")
        print("=====================================================")
```

---

## 3. Verification & Execution

```python
async def main():
    print("=====================================================")
    print("       INITIALIZING ASYNC WEB CRAWLER TEST          ")
    print("=====================================================")

    seed_sites = [
        "https://api.docs.org/python",
        "https://api.docs.org/flaky-gateway",
        "https://api.docs.org/modules",
    ]

    crawler = AsyncWebCrawler(max_concurrent_requests=3, max_depth=1)
    await crawler.crawl(seed_sites, num_workers=4)

if __name__ == "__main__":
    asyncio.run(main())
```

---

## 4. Key Architectural Patterns

1. **`asyncio.Queue` for Dynamic URL Scheduling**: Unlike a static list, `asyncio.Queue` allows worker coroutines to dynamically discover and enqueue new links on the fly.
2. **`asyncio.Semaphore` Throttling**: Limits active sockets across all workers to prevent socket pool exhaustion and avoid overwhelming the remote web host.
3. **Structured Worker Teardown**: After `await self.queue.join()` unblocks, cancelling worker tasks with `task.cancel()` and awaiting them cleanly terminates infinite `while True:` loops.

---

# Multiple Choice Questions

### 1.
What role does `asyncio.Semaphore` play in the asynchronous web crawler?
A. It parses HTML documents.
B. It restricts the maximum number of concurrent HTTP requests to prevent socket exhaustion and rate-limit violations.
C. It verifies SSL certificates.
D. It restarts the event loop.

**Answer:** B

**Explanation:** `asyncio.Semaphore(N)` restricts concurrency by ensuring that at most $N$ coroutines can enter the fetch section simultaneously, preventing overwhelming the network.

---

### 2.
How does the crawler coordinate the termination of its background worker tasks?
A. Workers terminate immediately after scraping exactly one URL.
B. The main controller awaits `queue.join()`, then explicitly calls `task.cancel()` on each worker task.
C. The program invokes `sys.exit()`.
D. The operating system kills the thread.

**Answer:** B

**Explanation:** `queue.join()` pauses until all queued URLs have been processed (`task_done()`). Once the queue is empty, the controller cancels the background worker tasks cleanly.

---

### 3.
Why is `asyncio.Queue` preferred over a standard Python list for managing URLs to be scraped?
A. It saves URLs directly into a database.
B. It provides asynchronous, non-blocking `get()` and `put()` primitives with integrated task completion tracking via `.task_done()` and `.join()`.
C. Lists cannot store strings in asynchronous functions.
D. `asyncio.Queue` is written in C++.

**Answer:** B

**Explanation:** `asyncio.Queue` allows coroutines to wait asynchronously without blocking the event loop when the queue is empty, and tracks pending tasks with `task_done()` and `join()`.

---

### 4.
What happens if a network request encounters a timeout wrapped inside `async with asyncio.timeout(0.5):`?
A. The entire script halts with a fatal exception.
B. The timeout context manager cancels the in-flight request task and raises a `TimeoutError`.
C. The timeout is ignored and the task runs forever.
D. The request is converted into a synchronous function.

**Answer:** B

**Explanation:** `asyncio.timeout` automatically cancels the wrapped coroutine if execution exceeds the specified duration and raises a `TimeoutError`.

---

### 5.
What is the advantage of using an asynchronous crawler over a traditional multithreaded crawler for scraping 10,000 pages?
A. It compiles Python bytecode directly to machine instructions.
B. It achieves high concurrency on a single thread with minimal RAM usage (~1KB per coroutine vs ~2MB+ per thread), avoiding thread contention and context-switching overhead.
C. It automatically bypasses web application firewalls.
D. It guarantees zero HTTP 500 errors.

**Answer:** B

**Explanation:** Asynchronous coroutines are lightweight user-space objects, enabling thousands of concurrent I/O connections with minimal memory and zero thread-switching penalty.

---
