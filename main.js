const cron = require('node-cron');

const main = async () => {
  // Schedule a cron job to run every 15 seconds
  cron.schedule('*/15 * * * * *', () => {
    console.log('Cron job executed at:', new Date().toLocaleString());
  });
};

main();
