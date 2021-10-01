# WorkNet

## A Social Network for Professionals

[![GitHub license](https://badgen.net/github/license/Naereen/Strapdown.js)](https://github.com/Naereen/StrapDown.js/blob/master/LICENSE)[![Latest release](https://badgen.net/github/release/Naereen/Strapdown.js)](https://github.com/Naereen/Strapdown.js/releases)

![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101) ![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)

[WorkNet](https://michaelvol-worknet.herokuapp.com/) is a JavaScript Project built in ReactJS and NodeJS (using the ExpressJS framework) designed to provide a business-oriented social-networking experience. Users can create posts sharing their thoughts on the Dashboard, connect with other users,provide their Work Experience,Education and Skills in their own Personal Info Page, chat with their connected users, create Job Posts and many more...

![Landing Page](media/LandingPage.png)

### :hammer_and_wrench: Installation & Setup

---

1. Install the backend NodeJS dependencies

```[bash]
cd server && npm install
```

2. Go to the client directory and install the frontend dependency (with the --legacy-peer-deps option due to dependency conflicts)

```[bash]
cd ../client && npm install --legacy-peer-deps
```

3. Build the production mode of the React App

```[bash]
npm run build
```

4. Go to the root of the folder and run the node server

```[bash]
cd ../ && npm run start
```

The server will start (defaults at port 5000) and will serve both the backend API and the frontend production code statically.

### :package: Packages, Services and Frameworks

The web app was created using the MERN stack with the following technologies:

**Backend:**

-   MongoDB as the main database for storing most of the user-created content because of the scalability it provides in collections and mongoose because the straight forward ODM for storing user data.
-   NodeJS & ExpressJS
-   JsonWebTokens (JWT) for user authentication
-   Bcrypt for hashing user passwords before storing them in the database
-   Multer for uploading media files(mainly images)
-   Socket.io for achieving real-time user communication in chats

    **Frontend**:

-   ReactJS
-   Rsuite as a UI Framework
-   react-app-rewired for overriding Rsuite base variables
-   Sass
-   Redux for state management
-   Axios as api client
-   socket-io-client for connecting to the socket io instance running in the backend https server
-   AWS SDK for connecting to an AWS-S3 bucket to store and stream user uploaded videos
