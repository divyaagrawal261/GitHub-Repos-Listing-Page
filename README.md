# Project Title

This is a website that displays the public Github repositories belonging to any specific user, built using GitHub API.

## Features
- Pagination on the server side, default repos per page is 10 with a maximum of 100.
- When the API calls are in progress, loaders are displayed.

## Demo
![Screenshot 2024-01-22 182242](https://github.com/divyaagrawal261/GitHub-Repos-Listing-Page/assets/121372068/8794474b-3e17-43a7-8302-39ffe0ccefb1)
![Loader](https://github.com/divyaagrawal261/GitHub-Repos-Listing-Page/assets/121372068/51674581-854b-475d-afda-792b2634f7d9)

## How to Run Locally

Follow these steps to run the project on your local machine.

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/)

### Clone the Repository

```bash
git clone https://github.com/divyaagrawal261/GitHub-Repos-Listing-Page.git
```

### Navigate to the project directory
```bash
cd GitHub-Repos-Listing-Page
```

### Create a .env file
```bash
TOKEN="YOUR_TOKEN_HERE" 
```

### Navigate to server directory
```bash
cd server
```
### Install the dependencies
```bash
npm install
```

### Run the server in development mode
```bash
npm run dev
```

### Launch Frontend
```bash
cd ..
cd client
cd src
cd js
```
### Open app.js and make the following changes
Replace `https://github-repos-listing-page.onrender.com` with `http://localhost:7474`

### Open index.html by double-clicking it

## API Reference
Refer to this [link](https://docs.github.com/en/rest/reference) for API documentation
