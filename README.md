# 🧩 Monorepo: Trading Order System (NestJS + Next.js)

Welcome to the **Trading Order System**, a robust full-stack solution built as part of a technical challenge. This project demonstrates a production-ready architecture designed for scalability, type safety, and efficient data management.

## 🎙️ The "Speech": Why this Architecture?

When building modern web applications, the choice of tools defines the project's success. Here is why we chose this specific stack:

### 1. Why a Monorepo?
We used a **pnpm monorepo** structure to keep the backend and frontend tightly coupled but physically separated. This allows us to:
-   **Unified Workflow**: Manage dependencies and run both applications from a single root.
-   **Shared Standards**: Maintain consistent linting, formatting, and TypeScript configurations across the entire codebase.
-   **Future Scalability**: Easily add shared packages (like DTOs or utility functions) that both the API and Web applications can consume.

### 2. Why NestJS for the Backend?
NestJS was the clear choice for the API because:
-   **Modular Architecture**: It enforces a clean separation of concerns using Modules, Controllers, and Services.
-   **Built-in Validations**: Using `class-validator` and `ValidationPipe`, we ensure that every piece of data entering our system is schema-valid.
-   **Developer Experience**: Features like **Swagger UI** (available at `/api/docs`) allow for instant API exploration and testing without external tools.

### 3. Why Next.js for the Frontend?
For the web application, Next.js provides:
-   **Server-Side Capabilities**: Using **Server Actions** and **Server Components**, we reduce the amount of JavaScript sent to the client while keeping the data flow secure.
-   **Localization**: Integrated with `next-intl` to support multiple languages seamlessly.
-   **Modern Design**: Built with **DaisyUI** and **Tailwind CSS**, providing a premium, responsive glassmorphism aesthetic.

---

## 🚀 Main Features

-   **Complex Trade Validations**: Strict logic for **Limit**, **Market**, and **Stop** orders based on real-time market prices (BTCUSD, EURUSD, ETHUSD).
-   **Soft Delete System**: Orders are never truly lost. They are marked as deleted but remain in the database for auditing, visible in the UI with a special badge.
-   **Advanced Pagination**: Efficient data fetching with server-side pagination to handle thousands of orders without performance hits.
-   **Interactive API Docs**: Fully documented REST API using Swagger.
-   **Unit Testing**: Core business logic (validations) is backed by Jest unit tests.

---

## 📁 Project Structure

```text
/
├── apps/
│   ├── api/        # NestJS (Backend) - Port 4000
│   └── web/        # Next.js (Frontend) - Port 3000
├── packages/
│   └── shared/     # (Placeholder for future shared logic)
├── package.json    # Root scripts
└── README.md       # English Documentation
└── README.ES.md    # Spanish Documentation
```

## ⚙️ Installation & Setup

### Prerequisites
-   Node.js 20+
-   pnpm v8+
-   MySQL Database

### Steps
1.  **Clone and Install**:
    ```bash
    git clone <repo-url>
    cd challenge-trading-order
    pnpm install
    ```
2.  **Environment Variables**:
    Configure `.env` in `apps/api` with your MySQL credentials (DB_HOST, DB_NAME, DB_USER, DB_PASS).
3.  **Run Development**:
    ```bash
    pnpm dev
    ```

---

## 🕹️ Usage

-   **Frontend**: [http://localhost:3000](http://localhost:3000)
-   **API Documentation (Swagger)**: [http://localhost:4000/api/docs](http://localhost:4000/api/docs)

---

## 🧑‍🚀 Author

**Max Shtefec**
*Software Architect / Full Stack Developer*
-   [GitHub](https://github.com/maxshdev)
-   [LinkedIn](https://linkedin.com/in/maxshtefec)