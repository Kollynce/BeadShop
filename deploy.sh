#!/bin/bash

# Install gh-pages if not already installed
npm install --save-dev gh-pages

# Build and deploy
npm run deploy

echo "Deployed to GitHub Pages successfully!"
