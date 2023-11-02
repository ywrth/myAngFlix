# myFlix Angular Application

Welcome to the myFlix Angular application! This single-page application allows users to access information about different movies, directors, and genres. Users can also create a profile to save their favorite movies.

## Features

- User registration and login
- View list of all movies
- View details of a single movie
- View details about directors and genres
- User profile creation and management

## Demo

Check out the live demo of the application here: [myFlix Live Demo](https://<USERNAME>.github.io/<REPOSITORY-NAME>/)

## Technical Stack

- **Frontend Framework**: Angular (v9+)
- **Styling**: Angular Material
- **Documentation**: Typedoc, JSDoc

## Getting Started

### Prerequisites

You will need the latest version of Node.js and npm installed on your machine.

- Node.js
- npm

## 
# Check Node.js and npm versions

```bash 
node -v
npm -v 
```

# Installation
- Clone the repository:

```bash 
git clone https://github.com/<USERNAME>/<REPOSITORY-NAME>.git
cd <REPOSITORY-NAME>
```

- Install project dependencies:

```bash 
npm install
```

- Start the development server:

```bash 
ng serve
```

- Navigate to http://localhost:4200/ in your browser.

# Usage

1. Register: Create a new user account by clicking on the "Sign Up" button on the welcome page.
2. Login: If you already have an account, click on the "Login" button to enter your credentials.
3. View Movies: After logging in, browse the list of available movies.
4. Movie Details: Click on any movie to get detailed information.
5. Director and Genre Information: Inside the movie details, use the provided buttons to learn more about the director and the genre of the movie.
6. Profile: Access and edit your user profile from the top-right profile link.

## Documentation
The codebase is fully documented with Typedoc and JSDoc. You can generate the documentation by running:

# Generate Typedoc documentation
```bash 
npx typedoc --out docs/ts
# Generate JSDoc documentation
npx jsdoc -c jsdoc.conf.json
```

## Deployment
This application is deployed on GitHub Pages. You can deploy your own version by running:

```bash 
ng deploy --base-href="https://<USERNAME>.github.io/<REPOSITORY-NAME>/"
```
Make sure to replace <USERNAME> and <REPOSITORY-NAME> with your GitHub username and repo name.