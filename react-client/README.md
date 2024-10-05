# MomentumX - Gamified Habit Tracker with Passkey Authentication

This is the front end of the MomentumX web application. It is built using React.

## Setup Locally

### Prerequisites

1. You need to have `node` (preferably version `>=18`) installed on your system to run this locally. <a href="https://nodejs.org">Download</a>.
2. You must set up and start the backend for this app. Find it here <a href="https://github.com/momentumXbyLakshya/express-server">Server</a>.

### Steps to follow

To run this app locally, follow these steps:

1. Clone this repository.
2. Create a `.env.local` file in the root directory and paste the following snippet into that file
   ```
   REACT_APP_HANKO_API_URI=_
   REACT_APP_BACKEND_URI=http://localhost:8080
   ```
   Replace the `_` with the Hanko Cloud API URL that you should have created while setting up the backend server.
3. Install the necessary dependencies using the package manager of your choice.
   ```bash
   npm install
   ```
4. Start the app.
   ```bash
   npm start
   ```
