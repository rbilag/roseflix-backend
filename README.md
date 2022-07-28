<p align="center">
  <h1 align="center">Roseflix: A Netflix Clone (Backend)</h1>
  <img src="./readme/Main.png" alt="Roseflix Screenshot">
  <p align="center">
    The server side of my React.js implementation of Netflix. Movie data was pulled from TMDB and trailer videos from Youtube.
    <br /><br />
    <a href="https://www.youtube.com/watch?v=GpHEcxh3ia8"><strong>View Video Demo »</strong></a>
    <br /><br />
    <a href="https://github.com/crookedfingerworks/roseflix-backend/issues">Report Bug</a>
    ·
    <a href="https://github.com/crookedfingerworks/roseflix-backend/issues">Request Feature</a>
  </p>
</p>

<h2 style="display: inline-block">Table of Contents</h2>
<ol>
  <li>
    <a href="#about-the-project">About The Project</a>
    <ul>
      <li><a href="#built-with">Built With</a></li>
    </ul>
  </li>
  <li>
    <a href="#getting-started">Getting Started</a>
    <ul>
      <li><a href="#prerequisites">Prerequisites</a></li>
      <li><a href="#installation">Installation</a></li>
    </ul>
  </li>
  <li><a href="#usage">Usage</a></li>
  <li><a href="#contact">Contact</a></li>
</ol>

## About The Project

### Built With

- [React](https://reactjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- **[Node.js](https://nodejs.org/en/)**
- **[MongoDB](https://www.mongodb.com/)**

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

Install latest version of npm

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the project
   ```sh
   git clone https://github.com/crookedfingerworks/roseflix-backend.git
   ```
2. Go to project directory and Install NPM packages
   ```sh
   npm install
   ```
3. Create config.env file
4. Create database at your preferred service (e.g. MongoDB Atlas) and add url to config.env
   ```sh
   DATABASE_URL=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```
5. Add your preferred SECRET_KEY and PORT at config.env
   ```sh
   PORT=8080
   SECRET_KEY=xxxxxxxxxxxxxxx
   ```
6. Start the application
   ```sh
   npm run dev
   ```

## Usage

**Creating an Account**

![](./readme/Sign_Up.png)

1. Go to Sign Up page.
   - From the homepage, enter your email and click 'Get Started'.
   - From Sign In page, click the 'Sign up now' link below 'Sign In' button.
2. Input the necessary fields. Don't worry. It won't take long.
   - Both email and phone number has to be unique.
   - Display name will be used to autogenerate initial user profile.
3. You'll be redirected to the login page. Enter your newly created credentials.

**Logging In**

![](./readme/Sign_In.png)

1. Go to Sign In page.
   - From the homepage, click 'Sign in' button.
   - From Sign Up page, click the 'Sign in now' link below 'Sign Up' button.
2. Input the necessary fields and proceed.
   - You can sign in using either email or phone number.

**Searching for a Show**

![](./readme/Search.png)

1. Log in and select a profile.
2. Click the appropriate tab for your search.
   - If searching for a movie, click 'Movies' tab in the header.
   - If searching for a series, click 'TV Shows' tab in the header.
3. Click the search icon on the header.
4. Input your search term and press enter.
5. To show all shows again, clear the search input and press enter.

**Adding User Profile**

![](./readme/Add_Profile.png)

1. Log in to your account.
2. Click 'Manage Profiles'.
3. Click 'Add Profile'.
   - You can only add up to 5 profiles for each account.
4. Click the pencil/edit icon and choose your preferred avatar.
5. Enter your preferred display name and click 'Save'.
   - You can't use avatars and names already used by other profiles in the same account.

**Editing User Profile**

![](./readme/Edit_Profile.png)

1. Log in to your account.
2. Click 'Manage Profiles'.
3. Click the profile you wish to edit.
4. Modify the profile as you see fit and click 'Save'.

**Deleting User Profile**

![](./readme/Delete_Profile.png)

1. Log in to your account.
2. Click 'Manage Profiles'.
3. Click the profile you wish to delete.
4. Click 'Delete Profile'.
5. Confirm deletion by clicking 'Yes'.

## Contact

crooked.finger.works@gmail.com

Project Link: [https://github.com/rosebilag/roseflix-backend](https://github.com/rosebilag/roseflix-backend)
