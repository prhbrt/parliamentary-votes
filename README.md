# Parliamentary Votes

A React-based web application for visualizing and exploring parliamentary voting data. This project provides an interactive interface to analyze party stances and voting decisions in parliamentary proceedings.

[https://datascience.web.rug.nl/parliamentary-votes/](https://datascience.web.rug.nl/parliamentary-votes/)

## Features

- Interactive visualization of parliamentary votes
- Party stance analysis
- Filtering and search capabilities
- Multilingual support (English/Dutch)
- Responsive design with Material-UI components
- Real-time data processing

## Project Structure

Notable files:

```
parliamentary-votes/
├── notebooks/          # Jupyter notebooks for fetching votes/decisions and processing them through the LLM and merging everything together.
├── webapp/             # React application
│   ├── src/            # Source code
│   │   ├── components/ # React components
│   │   │   ├── layout/ # Most relevant components
│   │   ├── data/       # Data files with votes and decisions
│   │   ├── hooks/      # All the data processing and filtering
```

## Prerequisites

- Node.js (v16 or higher)
- pnpm package manager

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd parliamentary-votes
   ```

2. Install dependencies using pnpm:
   ```bash
   cd webapp
   pnpm install
   ```

## Development

To start the development server:

```bash
cd webapp
pnpm start
```

This will start the webpack dev server and open the application in your default browser.

For development with file watching:

```bash
cd webapp
pnpm run dev
```

## Building for Production

To build the application for production:

```bash
cd webapp
pnpm build
```

The built files will be in the `webapp/dist/` directory.

## Deployment

To deploy manually, build the application for production and serve the contents of the `webapp/dist/` directory on any static hosting service.

## Technologies Used

- **React 18** - UI framework
- **Material-UI** - Component library
- **Webpack** - Build tool
- **Babel** - JavaScript transpiler
- **TypeScript** - Type checking
- **i18next** - Internationalization
- **React Router** - Client-side routing

## Data Processing

The project includes Jupyter notebooks for fetching and processing parliamentary voting data:

- `notebooks/Fetch Stemmingen.ipynb` - Fetches raw voting data
- `notebooks/Process Stemmingen.ipynb` - Processes and analyzes the data

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request
