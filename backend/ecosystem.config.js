/**
 * PM2 Ecosystem Configuration
 * 
 * Usage:
 *   pm2 start ecosystem.config.js
 *   pm2 start ecosystem.config.js --env production
 *   pm2 stop ecosystem.config.js
 *   pm2 restart ecosystem.config.js
 *   pm2 delete ecosystem.config.js
 * 
 * Monitoring:
 *   pm2 monit
 *   pm2 logs
 *   pm2 status
 */

module.exports = {
  apps: [
    {
      name: 'matchtalk-backend',
      script: './dist/index.js',
      instances: 'max', // Cluster mode - use all available CPUs
      exec_mode: 'cluster',
      
      // Environment variables
      env: {
        NODE_ENV: 'development',
        PORT: 4000,
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 4000,
      },
      
      // Auto-restart configuration
      autorestart: true,
      watch: false, // Disable watch in production
      max_memory_restart: '1G', // Restart if memory exceeds 1GB
      
      // Error handling
      error_file: './logs/pm2-error.log',
      out_file: './logs/pm2-out.log',
      log_file: './logs/pm2-combined.log',
      time: true, // Add timestamp to logs
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true, // Merge logs from all instances
      
      // Advanced options
      min_uptime: '10s', // Minimum uptime to consider app stable
      max_restarts: 10, // Maximum number of restarts in 1 minute
      restart_delay: 4000, // Delay between restarts (ms)
      
      // Graceful shutdown
      kill_timeout: 5000, // Time to wait before force kill
      wait_ready: true, // Wait for ready signal
      listen_timeout: 10000, // Time to wait for listen event
      
      // Process management
      instance_var: 'INSTANCE_ID', // Environment variable for instance ID
      
      // Source map support
      source_map_support: true,
      
      // Node args
      node_args: '--max-old-space-size=2048', // Increase memory limit to 2GB
    },
  ],
  
  // Deployment configuration (optional)
  deploy: {
    production: {
      user: 'deploy',
      host: ['your-server.com'],
      ref: 'origin/main',
      repo: 'git@github.com:your-org/matchtalk.git',
      path: '/var/www/matchtalk',
      'post-deploy': 'npm ci --omit=dev && npm run build && npx prisma generate && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
      'pre-deploy-local': '',
      'post-setup': '',
    },
  },
};



