# InsightChat

A beautiful, modern React chat application for AI-powered question answering.

## Features

- 💬 Clean and intuitive chat interface
- 🎨 Modern, gradient-based UI design
- 📱 Fully responsive (works on mobile and desktop)
- ⚡ Real-time message updates
- 🔄 Loading indicators for better UX
- 🎯 Easy integration with backend API

## Prerequisites

Before running this application, make sure you have:

- Node.js (version 14 or higher)
- npm (comes with Node.js)
- A running backend server at `http://localhost:8000`

## Installation

1. Navigate to the project directory:
```bash
cd C:\Development\insightchat
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

1. Make sure your backend API is running at `http://localhost:8000`

2. Start the development server:
```bash
npm start
```

3. Open your browser and visit `http://localhost:3000`

The application will automatically reload if you make changes to the code.

## API Integration

The application expects a POST endpoint at:
```
http://localhost:8000/api/ask
```

Request format:
```json
{
  "question": "Your question here"
}
```

Expected response format:
```json
{
  "answer": "The answer to your question"
}
```

or

```json
{
  "response": "The answer to your question"
}
```

## Building for Production

To create a production build:

```bash
npm run build
```

This will create an optimized build in the `build` folder.

## Project Structure

```
insightchat/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── ChatMessage.js
│   │   ├── ChatMessage.css
│   │   ├── ChatInput.js
│   │   └── ChatInput.css
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## Technologies Used

- React 18
- Axios for API calls
- CSS3 with modern gradients and animations
- Create React App

## Customization

### Changing the API Endpoint

Edit the API endpoint in `src/App.js`:

```javascript
const response = await axios.post('YOUR_API_ENDPOINT', {
  question: question
});
```

### Styling

All styles are contained in CSS files:
- `src/App.css` - Main application styles
- `src/index.css` - Global styles
- `src/components/ChatMessage.css` - Message component styles
- `src/components/ChatInput.css` - Input component styles

## License

This project is open source and available for use.

