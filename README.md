# CyberShield Hub

CyberShield Hub is a modern, responsive educational web application dedicated to cyber security awareness. It features information on common threats, best practices, interactive tools, and a full-fledged blog system with role-based authentication.

## Features

- **Modern UI/UX**: Dark mode by default with neon accents, fully responsive layout.
- **Educational Content**: Detailed pages on Threats, Defense, and Careers.
- **Interactive Tools**: Real-time Password Strength Checker and a Phishing Awareness Quiz.
- **Full Blog System**: List view, category filtering, search, and single post view with comments.
- **Authentication**: JWT-based auth with bcrypt password hashing (Login, Register, Dashboard).
- **Role-based Access**: Admins can Create, Edit, and Delete blog posts from their dashboard.

## Tech Stack

- **Frontend**: HTML5, CSS3 (Vanilla, Custom properties, Flexbox/Grid), EJS Templating.
- **Backend**: Node.js, Express.js.
- **Database**: SQLite (local, file-based for easy setup).
- **Security**: Helmet, express-rate-limit, bcrypt, JWT in httpOnly cookies.

## Project Structure

\`\`\`
/cybershield-hub
│
├── /controllers        # Route logic and database interaction
├── /db                 # Database connection and initialization
├── /middleware         # Authentication and security middleware
├── /public             # Static assets (CSS, JS, Images)
├── /routes             # Express route definitions
├── /views              # EJS templates and partials
│   ├── /pages          # Main pages and auth/blog pages
│   └── /partials       # Reusable UI components (header, footer)
│
├── server.js           # Main application entry point
├── seed.js             # Database seeder (creates admin and posts)
├── .env                # Environment variables
└── package.json
\`\`\`

## Installation & Setup

1. **Install Dependencies**:
   Open a terminal in the project root and run:
   \`\`\`bash
   npm install
   \`\`\`

2. **Seed the Database**:
   Populate the SQLite database with the default admin user and 8 sample blog posts:
   \`\`\`bash
   node seed.js
   \`\`\`
   *Note: The default admin credentials are:*
   - **Email:** admin@example.com
   - **Password:** Admin@123

3. **Start the Application**:
   Run the development server:
   \`\`\`bash
   npm start
   # or
   npm run dev (if nodemon is configured)
   # or simply
   node server.js
   \`\`\`

4. **Access the App**:
   Open your browser and navigate to \`http://localhost:3000\`

## Deliverables Checklist Completed

- [x] Node + Express Backend
- [x] SQLite DB for Users and Posts
- [x] JWT + Bcrypt Authentication
- [x] Dark, modern "hacker" aesthetic UI
- [x] Home Page with stats and animated background
- [x] About Page with CIA Triad SVG
- [x] Threats Page with Accordion
- [x] Defense Page with Interactive Checklist
- [x] Careers Page
- [x] Interactive Tools (Password checker, Quiz)
- [x] Blog CRUD system for Admins
- [x] Auth Pages (Login, Register, Dashboard, Forgot Password)
- [x] Seed script
- [x] Responsive design and accessibility considerations
