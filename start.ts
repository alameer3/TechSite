#!/usr/bin/env tsx

import { spawn } from 'child_process';
import path from 'path';

async function startServers() {
  console.log('🚀 Starting أكوام كلون Development Servers...');
  
  // Start backend server
  const backendProcess = spawn('tsx', ['server/index-simple.ts'], {
    cwd: process.cwd(),
    stdio: 'inherit'
  });

  // Wait a bit for backend to start
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Start frontend server
  const frontendProcess = spawn('vite', ['--host', '0.0.0.0', '--port', '5173'], {
    cwd: path.join(process.cwd(), 'client'),
    stdio: 'inherit'
  });

  console.log('✅ Backend API: http://0.0.0.0:3001');
  console.log('✅ Frontend App: http://0.0.0.0:5173');
  console.log('📝 Test: curl http://0.0.0.0:3001/api/test');

  // Handle process termination
  process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down servers...');
    backendProcess.kill();
    frontendProcess.kill();
    process.exit(0);
  });

  // Keep the script running
  await new Promise(() => {});
}

startServers().catch(console.error);