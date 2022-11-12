# CrowdPulse
A web application that allows DJs to interact with their audiences in real time.

## Tech Stack
- Frontend: React (using the Vite build tool, because it's better than Create-React-App)
- Backend: Node/Express, Sequelize
- Database: MySQL

## Setup Instructions
1. Clone this git repository
2. In the `backend` directory, create a file called `.env` and copy the contents of `.env.example` into it. Then fill in the placeholders with real values.
3. Open 2 terminals
4. In the first terminal, navigate to the backend folder `cd backend`
5. Install backend dependencies `npm install`
6. Start the backend server `npm start`
7. In the second terminal, navigate to the frontend folder `cd frontend`
8. Install frontend dependencies `npm install`
9. Start the frontend server `npm run dev`
10. Open a web browser and navigate to `http://localhost:5173`
11. You should see a working web app!

## File structure
Here's an explanation of all the important files you'll likely use while developing the app.
All the files/folders not listed here probably won't be modified very often.
- frontend
    - src
        - pages - This folder contains one .jsx file (React component) for every route in the website.
        - components - This folder contains React components that are intended to be reusable throughout the app
        - `main.jsx` - The root React component. You add new routes (URLs) to the app here
        - `App.jsx` - One level down from the root React component. It contains stuff on every page of the app, like the navbar and footer
- backend
    - models - This folder contains one .js file for every table in the database. The package Sequelize manages the database for us. No SQL required!
    - .env - This file doesn't exist by default. You'll have to create it and populate it with the database info (so our password doesn't leak over GitHub)
    - `index.js` - The main backend server file. This is where all of our API endpoints and business logic will go

## Learning React
React has a bit of a learning curve.
Biggest things to remember are:
- This app uses *functional components.* Every React component is a function. These functions have input (props) and output (HTML) that changes based on the props.
- Functional components are a programming paradigm called "functional programming" which is a lot different (and arguably better) than "object-oriented programming."
- When looking up tutorials, make sure the tutorial uses *functional* components, not *class* components.
- I tried to add enough features into the app so that hopefully you can reverse-engineer how React works by looking at my code.
- To start revere-engineering, I'd first study `/App.jsx`, then `/pages/Home.jsx`, then `/pages/Home/SongRequest.jsx`, and finally `/components/SongList.jsx`
- If the component needs to remember something not included in its props (like, say, a count of how many times a button is clicked), you do that by giving it "state" (via the useState hook). State is a way to preserve variables in between component renders.
