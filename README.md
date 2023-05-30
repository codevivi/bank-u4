# 🪧 Bank-U4

## 📋 About

2023-06-05 assignment

This is 3 page react application with express server and Maria db.
Authorization, login, logout functionality, file (id picture) upload.

[read task in lithuanian](./README-lt.md)

### 🏁 Getting started

**Must have [Node.js](https://nodejs.org)** installed

**Must have Maria DB installed ([Link to XAMPP](https://www.apachefriends.org/))** (DB import files in repository DB-exports folder)

1. Clone the repo
2. Install client NPM packages : run below command in bank-u4-client directory

   ```sh
   npm install
   ```

3. Install server NPM packages : run below command in bank-u4-server directory

   ```sh
   npm install
   ```

4. Add .env file with example.env content in server directory.

5. Create database named bank-u4 and import tables from DB-exports folder;

6. to start server (will run on [http://localhost:5000](http://localhost:5000)) : run below command in bank-u3 server directory

   ```sh
   npm start
   ```

   or (with nodemon)

   ```sh
   npm run dev
   ```

7. to start react application (will run on [http://localhost:3000](http://localhost:3000)) : run below command in bank-u3 client directory

   ```sh
   npm start
   ```

8. Default **login details**: User1 (email: kacius@pele.lt , password: Kacius123); User2 (email: pelius@pele.lt, password: Pelius123);

<!-- ![home screen screenshot](./screenshots/home-screenshot.png)
![login screen screenshot](./screenshots/login-screenshot.png)
![accounts screen screenshot](./screenshots/accounts-screenshot.png) -->

**further default react readme:**

### Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

#### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

#### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

#### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

#### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

#### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

#### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
