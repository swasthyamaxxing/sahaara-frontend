# Sahaara Frontend

Frontend for the **Sahaara** project built with **Next.js**.

---

# Prerequisites

Before getting started, make sure you have:

- Node.js (v20 or later recommended)
- npm (comes with Node.js)
- Git

Check your installations:

```bash
node -v
npm -v
git --version
```

---

# Getting Started

## 1. Clone the repository

```bash
git clone https://github.com/swasthyamaxxing/sahaara-frontend.git
```

## 2. Move into the project directory

```bash
cd sahaara-frontend
```

## 3. Install dependencies

```bash
npm install
```

## 4. Start the development server

```bash
npm run dev
```

The application will be available at:

```
http://localhost:3000
```

---

# Common Commands

## Start development server

```bash
npm run dev
```

## Create a production build (Always run before pushing)

```bash
npm run build
```

## Run production build locally

```bash
npm run start
```

## Run linting

```bash
npm run lint
```

---

# Git Workflow

## Before starting any work

Always switch to the `main` branch and pull the latest changes.

```bash
git checkout main
git pull origin main
```

---

## Create a new feature branch

Create a branch from the updated `main` branch.

```bash
git checkout -b feature/your-feature-name
```

Examples:

```bash
git checkout -b feature/login-page
git checkout -b feature/navbar
git checkout -b fix/footer-spacing
```

---

## Switch to an existing branch

```bash
git checkout branch-name
```

Example:

```bash
git checkout feature/login-page
```

---

## Check your current branch

```bash
git branch
```

The current branch will have a `*` next to it.

---

## Push your branch

The first time:

```bash
git push -u origin feature/your-feature-name
```

After that:

```bash
git push
```

---

# Team Rules

✅ Always pull the latest changes from `main` before creating a new branch.

✅ Create a separate branch for every feature or bug fix.

✅ Run the following before every push:

```bash
npm run build
```

If the build fails, fix the errors before pushing.

✅ Commit frequently with meaningful commit messages.

✅ Open a Pull Request (PR) when your feature is complete.

❌ **Never push directly to the `main` branch.**

❌ **Never develop directly on the `main` branch.**

❌ **Do not merge your own Pull Request unless instructed.**

---

# Project Structure

```
src/
├── app/
├── assets/
├── components/
│   ├── shared/
│   ├── ui/
│   └── ...
├── services/
├── hooks/
├── lib/
├── constants/
├── types/
└── utils/
```

---

# Notes

- Run `npm install` whenever new dependencies are added.
- If you encounter unexpected issues, try reinstalling dependencies:

```bash
rm -rf node_modules package-lock.json
npm install
```

(Windows PowerShell)

```powershell
Remove-Item node_modules -Recurse -Force
Remove-Item package-lock.json
npm install
```

- Keep your branch up to date by pulling the latest changes from `main` before starting new work.