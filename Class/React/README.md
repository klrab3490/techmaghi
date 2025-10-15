# React Frontend Projects

This directory contains all React frontend-related code, components, projects, and learning materials from the Techmaghi course.

## 📁 Project Structure

All React frontend code will be organized in this folder, including:
- React components and hooks
- Frontend applications
- UI/UX implementations
- State management examples
- Routing implementations

## 🚀 Getting Started

### Prerequisites

Before starting any React project, ensure you have the following installed:

```bash
# Check Node.js version (should be 14+)
node --version

# Check npm version
npm --version
```

### Creating a New React Project

#### Using Vite (Recommended for faster development)
```bash
# Create a new React app with Vite
npm create vite@latest my-react-app -- --template react

# Navigate to the project directory  
cd my-react-app

# Install dependencies
npm install

# Start the development server
npm run dev
```

#### Using Next.js (For full-stack React applications)
```bash
# Create a new Next.js app
npx create-next-app@latest my-nextjs-app

# Navigate to the project directory
cd my-nextjs-app

# Start the development server
npm run dev
```

## 📦 Package Management

### Installing Dependencies

```bash
# Install a production dependency
npm install package-name

# Install a development dependency
npm install --save-dev package-name

# Install multiple packages
npm install react-router-dom axios styled-components

# Install specific version
npm install react@18.2.0
```

### Common React Packages

#### Essential Packages
```bash
# Routing
npm install react-router-dom

# HTTP Client
npm install axios

# State Management
npm install redux @reduxjs/toolkit react-redux
# OR
npm install zustand

# Form Handling
npm install react-hook-form

# UI Component Libraries
npm install @mui/material @emotion/react @emotion/styled
# OR
npm install antd
# OR
npm install react-bootstrap bootstrap
```

#### Styling Packages
```bash
# CSS-in-JS
npm install styled-components
# OR
npm install @emotion/react @emotion/styled

# Utility-first CSS
npm install tailwindcss postcss autoprefixer
npx tailwindcss init -p

# CSS Modules (usually built-in with CRA/Vite)
# Sass/SCSS support
npm install sass
```

#### Development Tools
```bash
# ESLint and Prettier
npm install --save-dev eslint prettier eslint-config-prettier eslint-plugin-react

# Testing
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event

# Type checking (if using TypeScript)
npm install --save-dev typescript @types/react @types/react-dom
```

## 🏗️ Project Setup Guide

### 1. Initialize a New Project

```bash
# Create project directory
mkdir my-react-project
cd my-react-project

# Initialize npm
npm init -y

# Install React and ReactDOM
npm install react react-dom

# Install build tools (if not using CRA)
npm install --save-dev webpack webpack-cli babel-loader @babel/core @babel/preset-react
```

### 2. Basic Project Structure

```
my-react-project/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── common/          # Reusable components
│   │   ├── layout/          # Layout components
│   │   └── pages/           # Page components
│   ├── hooks/               # Custom hooks
│   ├── context/             # React Context
│   ├── services/            # API services
│   ├── utils/               # Utility functions
│   ├── styles/              # CSS/SCSS files
│   ├── assets/              # Images, fonts, etc.
│   ├── App.js
│   └── index.js
├── package.json
├── README.md
└── .gitignore
```

### 3. Environment Setup

Create a `.env` file in the project root:
```bash
# API Configuration
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_API_KEY=your-api-key

# Feature Flags
REACT_APP_ENABLE_ANALYTICS=true
```

### 4. Essential Configuration Files

#### package.json scripts
```json
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "lint": "eslint src/",
    "lint:fix": "eslint src/ --fix",
    "format": "prettier --write src/"
  }
}
```

#### .gitignore
```
node_modules/
build/
dist/
.env.local
.env.development.local
.env.test.local
.env.production.local
npm-debug.log*
yarn-debug.log*
yarn-error.log*
```

## 🧪 Testing Setup

```bash
# Install testing dependencies
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event

# Run tests
npm test

# Run tests with coverage
npm test -- --coverage
```

## 🚀 Deployment

### Build for Production
```bash
# Create production build
npm run build

# Serve production build locally (for testing)
npx serve -s build
```

### Deployment Platforms
- **Netlify**: Drag and drop the `build` folder
- **Vercel**: Connect your GitHub repository
- **GitHub Pages**: Use `gh-pages` package
- **Firebase Hosting**: Use Firebase CLI

## 📚 Learning Resources

- [React Official Documentation](https://react.dev/)
- [React Tutorial](https://react.dev/learn)
- [Create React App Documentation](https://create-react-app.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Next.js Documentation](https://nextjs.org/docs)

## 🛠️ Development Workflow

1. **Create a new branch** for each feature/lesson
2. **Follow naming conventions** for components (PascalCase)
3. **Use functional components** with hooks
4. **Implement proper error boundaries**
5. **Write tests** for components
6. **Document complex logic** with comments
7. **Use TypeScript** for larger projects

## 📝 Code Standards

- Use functional components with hooks
- Follow React best practices
- Implement proper prop validation
- Use meaningful component and variable names
- Keep components small and focused
- Implement proper error handling

---

**Note**: This directory will be continuously updated with new React projects, components, and learning materials throughout the Techmaghi course.