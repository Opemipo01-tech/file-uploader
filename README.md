# 📁 File Uploader

A full-stack file management application built with **Node.js, Express, Prisma, PostgreSQL, EJS, Passport.js, Multer, and Cloudinary**.

The application allows authenticated users to create and manage folders, upload files into folders, view file information, and download their files.

This project was built as a learning project to practice working with **Prisma ORM, session-based authentication, file uploads, database relationships, and cloud storage**.

## ✨ Features

* User registration
* User login and logout
* Session-based authentication with Passport.js
* Persistent sessions stored in PostgreSQL
* Create folders
* View user's folders
* View individual folders
* Rename folders
* Delete folders
* Upload files into specific folders
* File validation
* File size restrictions
* Cloudinary file storage
* Store Cloudinary URLs in PostgreSQL
* View file details

  * File name
  * File size
  * Upload date
* Download files
* Users can only access their own folders and files

## 🛠️ Technologies Used

### Backend

* [Node.js](https://nodejs.org/)
* [Express](https://expressjs.com/)
* [Prisma ORM](https://www.prisma.io/)
* PostgreSQL
* [Passport.js](https://www.passportjs.org/)
* Passport Local Strategy
* Express Session
* Prisma Session Store
* bcryptjs

### Frontend

* HTML
* CSS
* EJS

### File Handling

* [Multer](https://github.com/expressjs/multer)
* [Cloudinary](https://cloudinary.com/)

## 🗂️ Project Structure

```text
file-uploader/
│
├── config/
│   └── cloudinary.js
│
├── controllers/
│   └── controller.js
│
├── db/
│   └── prisma.js
│
├── middleware/
│   ├── auth.js
│   └── upload.js
│
├── prisma/
│   ├── migrations/
│   └── schema.prisma
│
├── public/
│   └── css/
│       └── style.css
│
├── routes/
│   └── routes.js
│
├── views/
│   ├── index.ejs
│   ├── signup.ejs
│   ├── login.ejs
│   ├── createFolder.ejs
│   ├── renameFolder.ejs
│   ├── folder.ejs
│   ├── fileUpload.ejs
│   └── fileDetails.ejs
│
├── .env
├── .gitignore
├── package.json
└── index.js
```

## 🗄️ Database Structure

The application uses PostgreSQL with Prisma ORM.

### User

Stores registered users.

```text
User
├── id
├── firstname
├── lastname
├── username
├── password
└── folders
```

### Folder

Each folder belongs to a user.

```text
Folder
├── id
├── name
├── createdAt
├── userId
└── files
```

### File

Each file belongs to a folder.

```text
File
├── id
├── name
├── size
├── url
├── uploadedAt
└── folderId
```

### Session

Stores authenticated user sessions in PostgreSQL.

```text
Session
├── id
├── sid
├── data
└── expiresAt
```

### Relationships

```text
User
 │
 └── has many Folders
          │
          └── has many Files
```

## 🔐 Authentication

Authentication is implemented using **Passport.js with the Local Strategy**.

Passwords are hashed using `bcryptjs` before being stored in the database.

Sessions are persisted in PostgreSQL using a Prisma-compatible session store, allowing users to remain authenticated between requests.

Protected routes check whether a user is authenticated before allowing access to private resources.

## ☁️ File Storage

Files are uploaded using **Multer**.

Multer temporarily stores the uploaded file in memory as a buffer:

```text
Browser
   ↓
Multer
   ↓
File Buffer
   ↓
Cloudinary
   ↓
Cloudinary URL
   ↓
PostgreSQL
```

The actual file is stored on Cloudinary while the database stores information about the file, including its Cloudinary URL.

## 📦 Installation

### 1. Clone the repository

```bash
git clone <your-repository-url>
```

### 2. Enter the project directory

```bash
cd file-uploader
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create your environment variables

Create a `.env` file in the project root:

```env
DATABASE_URL="your-postgresql-connection-string"

SESSION_SECRET="your-session-secret"

CLOUDINARY_CLOUD_NAME="your-cloudinary-cloud-name"
CLOUDINARY_API_KEY="your-cloudinary-api-key"
CLOUDINARY_API_SECRET="your-cloudinary-api-secret"
```

Never commit your `.env` file to GitHub.

### 5. Run Prisma migrations

```bash
npx prisma migrate dev
```

### 6. Generate Prisma Client

```bash
npx prisma generate
```

### 7. Start the application

```bash
node index.js
```

The application should now be available at:

```text
http://localhost:3000
```

## 🧪 Development

During development, Prisma Studio can be used to inspect the database:

```bash
npx prisma studio
```

This allows you to view:

* Users
* Folders
* Files
* Sessions

## 📤 Upload Flow

When a user uploads a file:

1. The user selects a file from the upload form.
2. Multer receives the file.
3. Multer validates the file.
4. The file is kept temporarily in memory.
5. The server uploads the file to Cloudinary.
6. Cloudinary returns a URL.
7. Prisma creates a `File` record.
8. The Cloudinary URL is stored in the database.
9. The user is redirected back to the folder.

## 🔒 File Access

Files and folders are associated with the authenticated user's ID.

For example, when retrieving a folder:

```js
const folder = await prisma.folder.findFirst({
  where: {
    id: folderId,
    userId: req.user.id
  }
});
```

This prevents one authenticated user from accessing another user's folders.

The same principle is applied when retrieving files.

## 📏 File Validation

Uploaded files are validated before being sent to Cloudinary.

The application can restrict:

* File types
* Maximum file size

For example, the current configuration can restrict uploads to a maximum of **10 MB**.

## 🚧 Future Improvements

Possible improvements include:

* Better error messages in the UI
* Improved form validation
* File deletion
* File renaming
* Folder/file search
* Pagination
* File previews
* Better download handling
* Cloudinary cleanup when files are deleted
* Improved responsive design
* Production deployment
* Automated tests
* CSRF protection
* Rate limiting
* Stronger file-content validation

## 🎯 What I Learned

This project was built to gain practical experience with:

* Express.js routing
* MVC-style controllers
* EJS templates
* Session-based authentication
* Passport.js
* Password hashing
* PostgreSQL
* Prisma ORM
* Prisma relationships
* Prisma CRUD operations
* Database migrations
* Multer
* Multipart form data
* Cloudinary
* Cloud file storage
* File validation
* Authorization and ownership checks

## 📄 License

This project is for educational purposes.
