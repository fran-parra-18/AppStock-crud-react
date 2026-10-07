# 📦 Stock Management App

A React application for managing product inventory through a complete CRUD interface.

The project focuses on form handling, validation and product management while applying reusable React components and structured frontend development practices.

## ✨ Features

* ➕ Create products
* 📋 View product inventory
* ✏️ Update existing products from a modal
* 🗑️ Delete products with a confirmation dialog
* 📊 Home dashboard with inventory summary (products, units, total value)
* ⚠️ Low-stock alerts on the dashboard and in the product table
* 🔎 Search by name, sortable columns and pagination
* 🔔 Notifications after creating, editing or deleting a product
* ✅ Form validation
* 🔢 Numeric field validation
* 📱 Responsive UI
* 🧩 Reusable React components

## 🛠️ Tech Stack

* React 19
* TypeScript
* Vite
* React Router
* React Hook Form + Yup
* React Bootstrap
* Axios (REST API on MockAPI)

## 🔄 CRUD Operations

The application implements the four fundamental operations used in data-management systems:

```text
CREATE  → Add a new product
READ    → Display existing products
UPDATE  → Modify product information
DELETE  → Remove a product
```

This provides a simple interface for managing an inventory of products.

## 📝 Form Handling

Product forms are handled using React Hook Form with a Yup validation schema.

Validation prevents invalid information from being submitted and provides feedback when form fields do not satisfy the expected requirements.

Special attention is given to numeric inputs to prevent invalid product values from being stored.

## 🗺️ Routes

```text
/           → Home dashboard
/products   → Product list (search, sort, edit, delete)
/create     → Create a new product
```

## 🏗️ Application Structure

The application follows a component-based React architecture.

```text
src/
├── components/   # CustomForm, Modal, Navbar, TableProducts, Toast
├── hook/         # useApi: generic hook for API calls
├── models/       # Product and API call types
├── pages/        # Home, ShowProducts, CreateProducts
├── service/      # Axios instance and CRUD endpoints
└── utils/        # Formatting helpers
```

Separating these responsibilities makes the application easier to maintain and extend.

## 🚀 Running Locally

### Requirements

* Node.js 20+
* npm

Clone the repository:

```bash
git clone https://github.com/fran-parra-18/AppStock-crud-react.git
cd AppStock-crud-react
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Then open the local URL displayed in the terminal.

Other scripts:

* `npm run build` → type-check and build for production into `dist/`
* `npm run preview` → serve the production build locally
* `npm run lint` → run ESLint

## ☁️ Deployment

The project includes a `vercel.json` that rewrites every route to `index.html`, so React Router works when reloading or opening `/products` or `/create` directly. Vercel detects Vite automatically (build: `npm run build`, output: `dist`).

## 🎯 What I Practiced

This project helped me practice:

* React fundamentals
* CRUD application development
* Form handling with React Hook Form
* Input validation
* Managing application state
* Reusable components
* Conditional rendering
* Handling numeric input correctly
* Organizing frontend application logic

## 🔮 Possible Improvements

Future improvements could include:

* Persistent database storage with a custom backend
* Authentication
* Product categories
* Automated tests

## 👨‍💻 Author

**Francisco Parra**

Software Development student focused on frontend, React, QA and full-stack development.
