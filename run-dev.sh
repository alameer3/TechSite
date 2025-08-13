#!/bin/bash

echo "🚀 Starting أكوام كلون Development Servers..."

# Start backend server
cd server && tsx index-simple.ts &
BACKEND_PID=$!

# Wait for backend to start
sleep 3

# Start frontend server  
cd client && vite --host 0.0.0.0 --port 5173 &
FRONTEND_PID=$!

echo "✅ Backend API: http://0.0.0.0:3001"
echo "✅ Frontend App: http://0.0.0.0:5173"

# Keep script running and handle cleanup
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait