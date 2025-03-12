# Full Stack Indian Food App

This project consists of both the **frontend** and **backend** services for the Indian Food App. The frontend is built using **React, Vite, and Tailwind CSS**, while the backend is developed using **Node.js, Express, and MongoDB**.

---

## Frontend

### Overview
This is the frontend of the project, built with React, Vite, and Tailwind CSS. It includes Radix UI components, TanStack Table, and other essential dependencies.

### Prerequisites
Ensure you have the following installed:
- **Node.js** (Latest LTS recommended)
- **npm** (Comes with Node.js) or **yarn**

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/kundankumaryadav88/indian-cuisine-explore
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

### Available Scripts

#### Start Development Server
```sh
npm run dev
```
Runs the app in development mode. Open `http://localhost:5173/` to view it in the browser.

#### Build for Production
```sh
npm run build
```
Builds the app for production. The output is in the `dist/` folder.

#### Preview Production Build
```sh
npm run preview
```
Runs the built app in preview mode.

#### Lint Code
```sh
npm run lint
```
Checks for linting errors using ESLint.

### Technologies Used
- **Vite**: Fast build tool for modern web applications
- **React**: UI library for building user interfaces
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible and customizable UI components
- **React Router**: Client-side routing for React apps
- **ESLint**: Linter for identifying and fixing JavaScript issues

### Folder Structure
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

---

## Backend

### Overview
This is the backend service for the Indian Food App, built using **Node.js, Express, and MongoDB**.

### Features
- Fetch all dishes
- Get details of a specific dish
- Find dishes that can be prepared based on available ingredients
- Uses MongoDB with Mongoose ODM

### Project Structure
```
backend/
├── config/        # Database connection
├── controllers/   # Business logic for API routes
├── models/        # Mongoose schemas
├── routes/        # Express API routes
├── scripts/       # Utility scripts (CSV Import)
├── .gitignore     # Ignore unnecessary files
├── .env           # Environment variables
├── package.json   # Dependencies
├── server.js      # Entry point of the backend
```

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Setup environment variables:
   - Create a `.env` file in the backend directory
   - Add the following line with your MongoDB URI:
     ```
     MONGO_URI=your_mongodb_connection_string
     ```
4. Start the server:
   ```bash
   npm run dev
   ```
   The backend runs on **http://localhost:8082**.

### Import CSV Data into MongoDB
1. Place the `indian_food.csv` file in the backend folder.
2. Run the script to import data:
   ```bash
   node scripts/importCsv.js
   ```

### API Endpoints
#### Get All Dishes
```
GET /api/dishes
```
Response:
```json
[
  {
    "_id": "60f7b6c7...",
    "name": "Dosa",
    "ingredients": ["Rice", "Urad dal"],
    "diet": "Veg",
    "prepTime": 20,
    "cookTime": 10,
    "flavor": "Savory",
    "course": "Breakfast",
    "state": "Tamil Nadu",
    "region": "South"
  }
]
```

#### Get Dish by ID
```
GET /api/dishes/:id
```

#### Find Dishes by Ingredients
```
POST /api/dishes/suggest
```
Request:
```json
{
  "ingredients": ["Rice", "Coconut"]
}
```
Response:
```json
[
  { "name": "Modak", "ingredients": ["Rice flour", "Coconut", "Jaggery"] }
]
```

---

## Contributing
Feel free to fork the repository and submit pull requests with improvements.

## License
This project is open-source under the [MIT License](LICENSE).

