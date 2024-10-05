# MomentumX - Gamified Habit Tracker App

This is the backend for MomentumX Web Application. It is built using Express.js framework.

## Local Setup

### Prerequisites

- **Node.js:** Ensure you have Node.js installed (preferably >= `v18`). You can download it from [here](https://nodejs.org/).

### Installation

1. Clone and navigate into the repository.
   
2. Create a `.env` file in the root directory and paste the following snippet into that file:
   ```
   MONGODB_URI=_
   HANKO_API_URI=_
   JWT_SECRET=_
   PORT=8080
   FRONTEND_URL=http://localhost:3000
   ```
   a. You must create a MongoDB Cluster on <a href="https://www.mongodb.com/atlas/database">MongoDB Atlas</a> and configure it such that it allows localhost to connect. Replace the `_` in front       of `MONGODB_URI` with your database's URI. <br />
   b. You must create a <a href="https://cloud.hanko.io/">Hanko Cloud Project</a>. Sign to this platform and create a project specifying the front end of the project as `http://localhost:3000`.       Replace the `_` in front of `HANKO_API_URI` with your project's URL. <br />
   c. Replace the `_` in front of `JWT_SECRET` with any secret of your choice.

6. Install the dependencies.
   ```bash
   npm install
   ```

7. Start the app.
   ```bash
   npm start
   ```
   
## Usage

Once the server is running, you can interact with the API endpoints using tools like Postman or by <a href="https://github.com/momentumXbyLakshya/react-client">MomentumX Client</a>

