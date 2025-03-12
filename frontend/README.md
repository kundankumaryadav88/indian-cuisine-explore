# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


# Frontend Project

## Overview
This is the frontend of the project built with React, Vite, and Tailwind CSS. It includes Radix UI components, TanStack Table, and other essential dependencies.

## Prerequisites
Ensure you have the following installed:
- **Node.js** (Latest LTS recommended)
- **npm** (Comes with Node.js) or **yarn**

## Installation
1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
   or using yarn:
   ```sh
   yarn install
   ```

## Available Scripts

### Start Development Server
```sh
npm run dev
```
Runs the app in development mode. Open `http://localhost:5173/` to view it in the browser.

### Build for Production
```sh
npm run build
```
Builds the app for production. The output is in the `dist/` folder.

### Preview Production Build
```sh
npm run preview
```
Runs the built app in preview mode.

### Lint Code
```sh
npm run lint
```
Checks for linting errors using ESLint.

## Technologies Used
- **Vite**: Fast build tool for modern web applications
- **React**: UI library for building user interfaces
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible and customizable UI components
- **React Router**: Client-side routing for React apps
- **ESLint**: Linter for identifying and fixing JavaScript issues

## Folder Structure
```
frontend/
├── src/              # Source files
│   ├── components/   # Reusable UI components
│   ├── pages/        # Page components
│   ├── assets/       # Static assets
│   ├── styles/       # Global styles
│   ├── App.jsx       # Root component
│   ├── main.jsx      # Entry point
├── public/           # Static files
├── .eslintrc.js      # ESLint configuration
├── tailwind.config.js # Tailwind CSS configuration
├── package.json      # Project dependencies
├── README.md         # Project documentation
```

## Contributing
Feel free to fork the repository and submit pull requests with improvements.

## License
This project is open-source under the [MIT License](LICENSE).