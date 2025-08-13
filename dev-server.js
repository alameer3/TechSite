#!/usr/bin/env node

import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Starting أكوام كلون Development Environment...');

// Start backend server
const backend = spawn('tsx', ['server/index-simple.ts'], {
  cwd: __dirname,
  stdio: 'inherit'
});

// Wait for backend to initialize
setTimeout(() => {
  // Start frontend server
  const frontend = spawn('vite', ['--host', '0.0.0.0', '--port', '5173'], {
    cwd: path.join(__dirname, 'client'),
    stdio: 'inherit'
  });
  
  console.log('\n✅ Servers started:');
  console.log('   Backend API: http://0.0.0.0:3001');
  console.log('   Frontend App: http://0.0.0.0:5173');
  
  // Handle cleanup
  process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down...');
    backend.kill();
    frontend.kill();
    process.exit(0);
  });
}, 2000);