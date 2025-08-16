module.exports = {
  apps: [
    {
      name: 'nestjs-load-testing',
      script: 'dist/main.js',
      instances: 2,
      exec_mode: 'cluster',

      // Basic reliability
      min_uptime: '10s',
      max_restarts: 10,

      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },

      error_file: './logs/err.log',
      out_file: './logs/out.log'
    },
  ],
};
