module.exports = {
  apps: [
    {
      name: 'ota',
      script: 'npm',
      args: 'run start:schedule',
      max_restarts: 2,
      min_uptime: '1h', // Set a relatively high duration (more than the longest run) so that restarts that occur before this duration has elapsed are considered unstable.
      restart_delay: 3 * 60 * 60 * 1000,  // likely related to a connectivity problem that will take some time to be fixed
      env: {
        "NODE_OPTIONS": "--max-old-space-size=4096", // Avoid `FATAL ERROR: Reached heap limit Allocation failed`
      }
    },
    {
      name: 'ota-api',
      script: 'npm',
      args: 'run start:api',
      min_uptime: '10s',
      max_restarts: 10,
      restart_delay: 1000,
      exponential_backoff_restart_delay: true
    },
    {
      name: 'ota-release',
      script: 'npm',
      args: 'run dataset:schedule',
      min_uptime: '10s',
      max_restarts: 10,
      restart_delay: 60 * 60 * 1000,  // likely related to a GitHub availability problem that will take some time to be fixed
      exponential_backoff_restart_delay: true
    },
    {
      name: 'ota-federation-api',
      script: 'npm',
      args: 'run start:federation-api',
      min_uptime: '10s',
      max_restarts: 10,
      restart_delay: 1000,
      exponential_backoff_restart_delay: true
    }
  ],
};
