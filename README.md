# app_resolve_multas
APP criado no stack MERN, com código gerado pelo chatGPT.
First, set up a new MERN project. We'll start by creating the backend with Node.js, Express, and MongoDB, then move on to the frontend with React.

# Backend Setup:
- Initialize the Node.js project (bash):
-- mkdir business-website
-- cd business-website
-- npm init -y
  
- Install required packages (bash):
-- npm install express mongoose dotenv cors
  
- Create the project structure (bash):
-- mkdir server
-- cd server
-- mkdir models routes config
-- touch server.js

- Configure MongoDB connection (server/config/db.js):
-- db.js

- Set up the Express server (server/server.js):
-- server.js

- Create a .env file for environment variables (makefile):
-- .env

# Frontend Setup:
- Set up the React application (bash):
-- npx create-react-app client
-- cd client
-- npm install axios react-router-dom

- Create the project structure (bash):
-- mkdir src/components src/pages src/styles
-- touch src/styles/global.css

- Set up React Router (src/App.js):
-- App.js

