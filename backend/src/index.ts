import {createApp} from './app';
import {config} from './config';
import {initializeWebSocket} from './websocket/server';
import {timerService} from './services/timerService';
import {voteService} from './services/voteService';
import {matchingService} from './services/matchingService';

const app = createApp();

const server = app.listen(config.port, () => {
  console.log(`🚀 Server running on port ${config.port}`);
});

// Initialize WebSocket server
const io = initializeWebSocket(server);

// Set WebSocket server to services
timerService.setIO(io);
voteService.setIO(io);
matchingService.setIO(io);

// Start all active room timers
timerService.startAllActiveTimers();

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});

