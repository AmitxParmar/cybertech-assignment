# 🚀 Mini LinkedIn Clone

A full-stack social platform inspired by LinkedIn, built with modern technologies. This project allows users to register, log in, create posts, view feeds, and manage profiles — all with a clean, responsive UI and robust backend API.

---

## 🛠️ Tech Stack

### **Frontend**

- **Framework**: [Next.js](https://nextjs.org) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com)
- **State Management**: React Query (via `@tanstack/react-query`)
- **Icons**: Lucide React
- **Utilities**: Axios, Zod (for validation), Custom Hooks & Providers

📁 **Client Directories**:

```text
/client
├── app/                   # Pages and routing via Next.js App Router
│   ├── api/               # API routes (if any)
│   ├── profile/
│   └── layout.tsx         # Root layout
├── components/            # Reusable UI components
│   ├── ui/                # ShadCN base components (Button, Card, etc.)
│   └── PostCard.tsx       # Example custom component
├── hooks/                 # Custom React hooks
│   └── useUser.ts         # Example hook
├── lib/
│   ├── api/               # Axios instance and API service
│   │   └── apiClient.ts
│   ├── utils/             # Helper functions
│   │   └── formatTime.ts
│   └── Icons/             # Lucide or React Icons wrappers
│       └── UserIcon.tsx
├── providers/
│   ├── QueryClientProvider.tsx  # React Query provider setup
│   └── ThemeProvider.tsx        # Tailwind dark mode provider
├── types/                 # Shared TypeScript interfaces
│   ├── User.ts
│   ├── Post.ts
│   └── index.ts
└── styles/                # Optional global styles or Tailwind imports
    └── globals.css
```

---

### **Backend**

- **Runtime**: Node.js + Express
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JWT + Secure Cookies
- **Validation**: Zod
- **Security**: Bcrypt, CORS, Cookie-parser
- **Type Safety**: TypeScript

📁 **Backend Structure**:

```text
/src/
├── config/
│   ├── env.ts             # Environment variable validation with Zod
│   └── db.ts              # MongoDB connection via Mongoose
├── models/
│   ├── User.ts            # Mongoose schema for User
│   └── Post.ts            # Mongoose schema for Post
├── controllers/
│   ├── authController.ts  # register, login, logout, me
│   ├── userController.ts  # getUser, updateProfile
│   └── postController.ts  # createPost, getFeed, getUserPosts
├── routes/
│   ├── authRoutes.ts      # /api/auth/*
│   ├── userRoutes.ts      # /api/users/*
│   └── postRoutes.ts      # /api/posts/*
├── middleware/
│   ├── auth.ts            # JWT verification + currentUser
│   └── errorHandler.ts    # Global error handling middleware
├── utils/
│   ├── jwt.ts             # signToken, verifyToken helpers
│   └── validators.ts      # Zod schemas for request validation
├── app.ts                 # Express app setup (middleware, routes)
└── server.ts              # Entry point: starts HTTP server on PORT
```

🔧 **Config Files**:

- \`.env\` – Environment variables
- \`tsconfig.json\` – TypeScript configuration
- \`package.json\` – Scripts & dependencies
- \`pnpm-lock.yaml\` – Package manager lockfile

---

## 🔌 API Endpoints

### 🔐 **Authentication**

| Method   | Endpoint               | Description               | Auth Required |
| -------- | ---------------------- | ------------------------- | ------------- |
| \`POST\` | \`/api/auth/register\` | Register a new user       | No            |
| \`POST\` | \`/api/auth/login\`    | Log in and get JWT cookie | No            |
| \`GET\`  | \`/api/auth/me\`       | Get current user info     | Yes           |
| \`POST\` | \`/api/auth/logout\`   | Clear auth cookie         | Yes           |

### 📝 **Posts**

| Method   | Endpoint                    | Description             | Auth Required |
| -------- | --------------------------- | ----------------------- | ------------- |
| \`GET\`  | \`/api/posts/feed\`         | Get public home feed    | No            |
| \`GET\`  | \`/api/posts/user/:userId\` | Get all posts by a user | No            |
| \`POST\` | \`/api/posts\`              | Create a new post       | Yes           |

### 👤 **Users**

| Method    | Endpoint               | Description              | Auth Required |
| --------- | ---------------------- | ------------------------ | ------------- |
| \`GET\`   | \`/api/users/:userId\` | Get user profile + posts | No            |
| \`PATCH\` | \`/api/users/me\`      | Update name or bio       | Yes           |

---

## 🧪 Testing with cURL

### 🔹 Register

\`\`\`bash
curl -X POST http://localhost:4000/api/auth/register \\
-H "Content-Type: application/json" \\
-d '{"name":"Alice","email":"alice@example.com","password":"secret123","bio":"Hello"}'
\`\`\`

### 🔹 Login (Get Cookie)

\`\`\`bash
curl -X POST http://localhost:4000/api/auth/login \\
-H "Content-Type: application/json" \\
-d '{"email":"alice@example.com","password":"secret123"}' \\
-i
\`\`\`

> 💡 The JWT is stored in an HTTP-only cookie. Use browser or session-aware tools for real testing.

### 🔹 Get Current User (Authenticated)

\`\`\`bash
curl -H "Authorization: Bearer <your_token>" http://localhost:4000/api/auth/me
\`\`\`

### 🔹 Create a Post

\`\`\`bash
curl -X POST http://localhost:4000/api/posts \\
-H "Authorization: Bearer <your_token>" \\
-H "Content-Type: application/json" \\
-d '{"content":"My first post!"}'
\`\`\`

### 🔹 View Feed

\`\`\`bash
curl http://localhost:4000/api/posts/feed
\`\`\`

### 🔹 View User Profile

\`\`\`bash
curl http://localhost:4000/api/users/<userId>
\`\`\`

---

## ⚙️ Environment Variables (.env)

\`\`\`env
PORT=4000
MONGO_URI=mongodb://localhost:27017/mini_linkedin
JWT_SECRET=supersecret_change_me
JWT_EXPIRES_IN=7d
COOKIE_SECURE=false # Set to true in production (HTTPS only)
NODE_ENV=development
\`\`\`

---

## 📦 Commands

| Command            | Description                    |
| ------------------ | ------------------------------ |
| \`pnpm install\`   | Install dependencies           |
| \`pnpm run dev\`   | Start dev server (ts-node-dev) |
| \`pnpm run build\` | Compile TypeScript to JS       |
| \`pnpm start\`     | Start production server        |

---

## 🛠️ Step-by-Step Setup

1. Initialize project:
   \`\`\`bash
   pnpm init
   \`\`\`

2. Install development dependencies:
   \`\`\`bash
   pnpm add -D typescript ts-node-dev @types/node @types/express
   \`\`\`

3. Install runtime dependencies:
   \`\`\`bash
   pnpm add express mongoose jsonwebtoken bcrypt zod cors cookie-parser
   pnpm add -D @types/jsonwebtoken @types/cookie-parser
   \`\`\`

4. Generate \`tsconfig.json\`:
   \`\`\`bash
   npx tsc --init
   \`\`\`
   _(Recommended: Enable strict mode and ES modules)_

5. Create \`.env\` file with the variables above.

6. Run the app:
   \`\`\`bash
   pnpm run dev
   \`\`\`

---

## 🎨 Features Overview

✅ User registration & login with JWT cookies
✅ Protected routes with middleware
✅ Post creation and public feed
✅ User profile with posts
✅ Form validation using Zod
✅ Responsive UI with Tailwind & ShadCN
✅ Dark mode support
✅ Full TypeScript integration (both client & server)

---

## 🌐 Live Demo

Coming soon! (Run locally for now)

---

## 🤝 Contributing

Feel free to fork, improve, and submit PRs!

---

## 📄 License

MIT

---

> Made with ❤️ using **Next.js**, **Express**, and **MongoDB**
> Let your thoughts be posted, not lost. 🚀💬

```

```
