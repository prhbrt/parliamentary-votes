# Esther Metting's questionnaire

## Description

React-based web application that provides an interactive questionnaire experience. Users answer a series of yes/no questions, each accompanied by audio prompts in English or Dutch. Based on their responses, the application generates a personalized video and a custom letter/message. The app is designed for outreach and engagement activities, featuring multilingual support and multimedia elements.

## Features

- Interactive questionnaire with audio prompts
- Multilingual support (English and Dutch)
- Personalized video and letter generation based on responses
- Responsive design using Material-UI
- Routing for different pages: Questionnaire, About, Contact, Activities and Outreach

## Anti-features:

 - `MemoryRouter` pages, so no urls paths since we're hosting statically and they won't work on a reload.

## Prerequisites

- Node.js (version 14 or higher)
- pnpm, npm or yarn

## Installation

1. Clone the repository.
2. Navigate to the `webapp` directory.
3. Run `pnpm install` to install dependencies.

## Development

To run the application in development mode:

1. Navigate to the `webapp` directory.
2. Run `pnpm start` to start the development server. This will open the app in your browser at `http://localhost:3000`.


## Building

To build the application for production:

1. Navigate to the `webapp` directory.
2. Run `pnpm run build` to create a production build in the `dist` directory.
3. host the files in `webapp/static/frontend/`

## Deployment

The built files in the `dist` directory can be deployed to any static web server or hosting service that supports serving static files.

## Re-use: adapting to Another Project

This project uses a standard React Router setup with components for each page. To adapt it for another project with a similar layout:

**CLONE**, this repo of course isn't intended to store 10 websites in different branches.

How to reuse for your own mini-page:

1. **Update Routes**: Edit `webapp/src/App.js` or `webapp/src/routes.js` to add, remove, or modify routes. For example, to add a new page:
   - Create a new component in `webapp/src/components/layout/`.
   - Import it in `App.js`.
   - Add a new `<Route>` element.

2. **Modify Components**: Each page component (e.g., `Questionnaire.js`, `About.js`) can be customized. Update the content, logic, and styling as needed.

3. **Update Internationalization**:
   - Adjust translation keys in `webapp/src/i18n.js` for both English and Dutch.
   - Use the `useTranslation` hook in components to access translations.

4. **Remove particuliarities**:
   - Delete all assets first, `webapp/src/assets`, avoid that they are dangling in there.
   - Update / delete the Share links for whatsapp and email in `webapp/src/components/layout/Layout.js`
   - use grep or whatever to find for keywords like esther and metting.


6. **Customize main page**:
   - Adjust `Questionnaire.js` to whatever it should be

This structure allows for customization.
