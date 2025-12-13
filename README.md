# Alon Gerber - Operations Automation Portfolio

A professional portfolio showcasing AI-powered operations automation tools built with React, Tailwind CSS, and Claude API integration.

## Features

- **Smart Document Processor** - Extract structured data from invoices, POs, and contracts
- **Email Command Center** - Turn chaotic emails into clear action items with priority and tags
- **Meeting-to-Action Converter** - Transform meeting transcripts into summaries, decisions, and tasks
- **Proposal Draft Generator** - Create professional proposals in seconds

Each tool includes a "Try with Example" button for immediate demonstration.

## Tech Stack

- React 19 + Vite
- Tailwind CSS v4
- Lucide React (icons)
- React Router DOM
- Claude API (Anthropic)
- html2pdf.js (PDF generation)

## Getting Started

### Prerequisites

- Node.js 18+
- Anthropic API key

### Installation

```bash
npm install
```

### Development

1. Copy `.env.example` to `.env` and add your Anthropic API key:

```bash
cp .env.example .env
```

2. Start the development server:

```bash
npm run dev
```

3. In a separate terminal, start the API server:

```bash
npm run server
```

The frontend runs on `http://localhost:5173` and the API server on `http://localhost:3001`.

### Production Build

```bash
npm run build
npm run preview
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect to Vercel
3. Add environment variable: `ANTHROPIC_API_KEY`
4. Deploy

The `api/analyze.js` file is automatically detected as a serverless function.

### Other Platforms

For platforms without serverless function support, deploy the `server.js` as your backend and configure the frontend to point to your API URL.

## Project Structure

```
├── api/                    # Serverless API functions
├── public/                 # Static assets
├── src/
│   ├── components/
│   │   ├── Home/          # Landing page components
│   │   ├── Layout/        # Header, Footer, Layout wrapper
│   │   ├── Tools/         # Tool modules
│   │   │   ├── DocumentProcessor/
│   │   │   ├── EmailCenter/
│   │   │   ├── MeetingConverter/
│   │   │   └── ProposalGenerator/
│   │   └── shared/        # Reusable UI components
│   ├── data/              # Example data and mock responses
│   ├── pages/             # Page components
│   ├── services/          # API integration
│   └── utils/             # Utility functions
├── server.js              # Development API server
└── package.json
```

## Customization

### Contact Information

Update contact details in:
- `src/components/Home/Contact.jsx`
- `src/components/Layout/Footer.jsx`

### Colors

The color palette is defined in `src/index.css`:
- Navy: `#1e3a5f`
- Accent Blue: `#3b82f6`
- Light Gray: `#f8fafc`

### Resume

Place your resume PDF at `public/resume.pdf`.

## License

MIT
