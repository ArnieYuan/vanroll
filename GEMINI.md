
# Gemini Code Assistant Guide for `vanroll`

This document provides a comprehensive overview of the `vanroll` project, designed to assist the Gemini Code Assistant in understanding its architecture, key components, and development workflow.

## Project Overview

`vanroll` is the main marketing and landing page website for vanroll.com. It introduces the features and use cases of the Vanroll tools, specifically "Presenter Mode" and "Creator Mode."

It is part of a larger ecosystem that includes:
*   **`vanroll_app/`**: A simple web application that demonstrates basic webcam functionality.
*   **`vanroll_ext/`**: A Chrome browser extension that allows users to overlay their webcam feed onto any webpage, featuring AI-powered background removal.

## Core Technologies

*   **TypeScript**: The primary language for scripting.
*   **Webpack**: Used for bundling assets and serving the application in development.
*   **Tailwind CSS**: For styling the user interface.
*   **i18next**: For internationalization (i18n).

## Project Structure

```
src/
├── creator.html      # UI for the "Creator Mode" (embedding a webpage)
├── creator.ts        # Logic for creator.html, handles iframe embedding and dragging
├── index.html        # Main landing page
├── index.ts          # Main entry point for the site
├── presenter.html    # Placeholder for the "Presenter Mode" app
└── tailwind.config.js # Tailwind CSS configuration
```

## Key Components

*   **`index.html`**: The main landing page that describes the two primary features.
*   **`creator.html` / `creator.ts`**: Implements the "Creator Mode." This feature allows a user to enter a URL, which is then embedded in a floating, draggable, and resizable iframe. This is useful for keeping notes or reference materials visible on screen.

## Development Workflow

*   **Installation**: `npm install`
*   **Development Server**: `npm run start:dev` (starts a webpack-dev-server on `localhost:4000`)
*   **Production Build**: `npm run build` (bundles files into the `dist/` directory)
*   **Deployment**: `npm run ghpages` (deploys the `dist/` folder to GitHub Pages).
