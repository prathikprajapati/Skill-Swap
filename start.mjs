#!/usr/bin/env node


/**
 * SkillSwap Development Server
 * Runs both frontend (Vite) and backend (Express + WebSocket) simultaneously
 * 
 * Usage:
 *   node start.mjs          - Start both servers
 *   node start.mjs frontend - Start only frontend
 *   node start.mjs backend  - Start only backend
 */

import { spawn } from 'child_process';
import { platform } from 'os';
import { createInterface } from 'readline';

const isWindows = platform() === 'win32';

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

// Prefixes for different servers
const prefixes = {
  frontend: `${colors.cyan}[FRONTEND]${colors.reset}`,
  backend: `${colors.green}[BACKEND]${colors.reset}`,
  system: `${colors.yellow}[SYSTEM]${colors.reset}`,
  error: `${colors.red}[ERROR]${colors.reset}`,
};

// Store child processes
const processes = {
  frontend: null,
  backend: null,
};

// Helper to log with timestamp
function log(prefix, message) {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`${colors.dim}[${timestamp}]${colors.reset} ${prefix} ${message}`);
}

// Helper to spawn a process
function spawnProcess(name, command, args, cwd, env = {}) {
  const isCmd = isWindows && command === 'npm';
  const shell = isWindows;
  
  const child = spawn(command, args, {
    cwd,
    shell,
    stdio: 'pipe',
    env: { ...process.env, ...env },
  });

  child.stdout.on('data', (data) => {
    const lines = data.toString().trim().split('\n');
    lines.forEach(line => {
      if (line.trim()) {
        log(prefixes[name], line);
      }
    });
  });

  child.stderr.on('data', (data) => {
    const lines = data.toString().trim().split('\n');
    lines.forEach(line => {
      if (line.trim()) {
        log(prefixes.error, `[${name.toUpperCase()}] ${line}`);
      }
    });
  });

  child.on('close', (code) => {
    if (code !== 0 && code !== null) {
      log(prefixes.error, `${name} process exited with code ${code}`);
    } else {
      log(prefixes.system, `${name} process stopped`);
    }
  });

  child.on('error', (err) => {
    log(prefixes.error, `Failed to start ${name}: ${err.message}`);
  });

  return child;
}

// Start frontend server (Vite)
function startFrontend() {
  log(prefixes.system, 'Starting frontend server (Vite)...');
  
  const env = {
    FORCE_COLOR: 'true',
  };

  processes.frontend = spawnProcess(
    'frontend',
    'npm',
    ['run', 'dev'],
    '.',
    env
  );

  log(prefixes.system, 'Frontend server starting on http://localhost:5173');
}

// Start backend server (Express + WebSocket)
function startBackend() {
  log(prefixes.system, 'Starting backend server (Express + WebSocket)...');
  
  const env = {
    FORCE_COLOR: 'true',
    NODE_ENV: 'development',
  };

  processes.backend = spawnProcess(
    'backend',
    'npm',
    ['run', 'dev'],
    'backend',
    env
  );

  log(prefixes.system, 'Backend server starting on http://localhost:3000');
  log(prefixes.system, 'WebSocket server starting on ws://localhost:3000');
}

// Stop all processes
function stopAll() {
  log(prefixes.system, 'Shutting down all servers...');
  
  if (processes.frontend) {
    processes.frontend.kill();
    processes.frontend = null;
  }
  
  if (processes.backend) {
    processes.backend.kill();
    processes.backend = null;
  }
  
  log(prefixes.system, 'All servers stopped');
  process.exit(0);
}

// Handle process termination
process.on('SIGINT', stopAll);
process.on('SIGTERM', stopAll);
process.on('exit', stopAll);

// Handle Windows Ctrl+C
if (isWindows) {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on('SIGINT', () => {
    stopAll();
  });
}

// Print banner
console.log(`
${colors.cyan}╔════════════════════════════════════════════════════════════╗${colors.reset}
${colors.cyan}║${colors.reset}           ${colors.bright}SkillSwap Development Server${colors.reset}                  ${colors.cyan}║${colors.reset}
${colors.cyan}╠════════════════════════════════════════════════════════════╣${colors.reset}
${colors.cyan}║${colors.reset}  Frontend: ${colors.cyan}http://localhost:5173${colors.reset}                        ${colors.cyan}║${colors.reset}
${colors.cyan}║${colors.reset}  Backend:  ${colors.green}http://localhost:3000${colors.reset}                        ${colors.cyan}║${colors.reset}
${colors.cyan}║${colors.reset}  WebSocket: ${colors.magenta}ws://localhost:3000${colors.reset}                       ${colors.cyan}║${colors.reset}
${colors.cyan}╚════════════════════════════════════════════════════════════╝${colors.reset}
`);

// Parse command line arguments
const args = process.argv.slice(2);
const command = args[0];

// Start servers based on command
if (command === 'frontend') {
  startFrontend();
} else if (command === 'backend') {
  startBackend();
} else if (!command) {
  // Start both
  startBackend();
  setTimeout(() => startFrontend(), 2000); // Delay frontend to let backend start first
} else {
  console.log(`
Usage:
  node start.mjs          Start both frontend and backend
  node start.mjs frontend Start only frontend
  node start.mjs backend  Start only backend

Press Ctrl+C to stop all servers.
  `);
  process.exit(1);
}

// Keep the script running
setInterval(() => {}, 1000);
