# AI Agent - Ticket Management System

A Node.js Express application for managing tickets with AI-powered features, built with MongoDB and integrated email notifications.

## Features

- User authentication and role-based access control
- Ticket creation and management system
- Email notifications via Mailtrap
- AI integration with Google Gemini API
- MongoDB database with Mongoose ODM
- RESTful API architecture

## Project Structure

```
├── .env                    # Environment variables
├── .env.sample            # Environment variables template
├── index.js               # Main application entry point
├── package.json           # Project dependencies and scripts
├── models/
│   ├── ticket.model.js    # Ticket data model
│   └── user.model.js      # User data model
└── utils/
    └── mailer.js          # Email utility functions
```

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Email**: Nodemailer with Mailtrap
- **AI Integration**: Google Gemini API
- **Additional**: Inngest Agent Kit, bcrypt for password hashing

## Setup and Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd AI_Agent
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   - Copy `.env.sample` to `.env`
   - Fill in the required environment variables:
     ```env
     MONGO_URI=mongodb://0.0.0.0/aiagent
     JWT_SECRET=your_jwt_secret_here
     MAILTRAP_SMTP_HOST=sandbox.smtp.mailtrap.io
     MAILTRAP_SMTP_PORT=2525
     MAILTRAP_SMTP_USER=your_mailtrap_user
     MAILTRAP_SMTP_PASS=your_mailtrap_password
     APP_URL=http://localhost:3000
     GEMINI_API_KEY=your_gemini_api_key
     ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

The server will start at `http://localhost:3000`

## Data Models

### User Model
- **email**: Unique user email (required)
- **password**: Hashed password (required)
- **role**: User role (user/moderator/admin)
- **skills**: Array of user skills
- **createdAt**: Account creation timestamp

### Ticket Model
- **title**: Ticket title
- **description**: Ticket description
- **status**: Current status (default: "TODO")
- **createdBy**: Reference to User who created the ticket
- **assignTo**: Reference to assigned User (optional)
- **priority**: Ticket priority level
- **deadline**: Ticket deadline
- **helpfulNotes**: Additional notes
- **relatedSkills**: Array of required skills
- **createdAt**: Ticket creation timestamp

## Email Integration

The application uses [`sendMail`](utils/mailer.js) function from [utils/mailer.js](utils/mailer.js) for sending email notifications through Mailtrap SMTP service.

## API Endpoints

*Note: API routes need to be implemented in the main application file*

## Development

- **Start development server**: `npm run dev`
- **Database**: MongoDB connection configured in [index.js](index.js)
- **CORS**: Enabled for cross-origin requests
- **JSON parsing**: Enabled for request body parsing

## Environment Variables

See [.env.sample](.env.sample) for all required environment variables.

## License

ISC License