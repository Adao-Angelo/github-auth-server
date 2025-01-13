
# News Aggregation GitHub Auth

Welcome to **News Aggregation GitHub Auth**, a backend service that provides authentication using GitHub and integrates seamlessly with your front-end application for user login and session management. This service uses Passport.js and GitHub OAuth2 for secure authentication.

## 🚀 Features

### Completed Features
- **GitHub Authentication**: Users can authenticate through their GitHub account.
- **Session Management**: Sessions are securely managed using Express sessions.
- **User Info**: After login, the user’s GitHub profile is accessible.
- **Logout Functionality**: Users can log out, ending their session.

### Upcoming Features
- **Frontend Integration**: Provide API access to front-end applications for seamless user interaction.
- **User Profile Management**: Extend authentication to allow profile management and settings.
- **Error Handling**: Improve error handling with more user-friendly messages.

## 🛠️ Technologies Used

| Technology         | Description                                              | Icon     |
|--------------------|----------------------------------------------------------|----------|
| Express.js         | Fast, unopinionated, minimalist web framework for Node.js | Express  |
| Passport.js        | Middleware for user authentication                      | Passport |
| GitHub OAuth2      | GitHub's authentication system                          | GitHub   |
| Express-Session    | Session management for Express apps                      | Session  |
| CORS               | Middleware for enabling Cross-Origin Requests            | CORS     |
| dotenv             | Loads environment variables from a `.env` file           | dotenv   |

## 📖 Getting Started

Follow these steps to get the project up and running on your local machine:

1. Clone the repository:

    ```bash
    git clone https://github.com/Adao-Angelo/github-auth-server.git
    ```

2. Navigate to the project directory:

    ```bash
    cd github-auth-server 
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Set up environment variables by creating a `.env` file in the root directory with the following content:

    ```plaintext
    GITHUB_CLIENT_ID=your-github-client-id
    GITHUB_CLIENT_SECRET=your-github-client-secret
    AUTH_SECRET=your-session-secret
    ```

5. Start the server:

    ```bash
    npm start
    ```

6. Open your browser and navigate to:

    [http://localhost:5555](http://localhost:5555)

## 📧 .env Configuration

Ensure your `.env` file contains the following keys:

- `GITHUB_CLIENT_ID`: Your GitHub OAuth application client ID.
- `GITHUB_CLIENT_SECRET`: Your GitHub OAuth application client secret.
- `AUTH_SECRET`: A secret key used for session encryption.


