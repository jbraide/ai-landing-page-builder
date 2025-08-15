#!/bin/bash
echo "Installing dependencies with yarn..."
yarn add ws
yarn add -D @types/ws concurrently ts-node
echo "Dependencies installed successfully!"