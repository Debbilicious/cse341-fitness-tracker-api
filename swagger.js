const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Fitness Tracker API',
    description: 'API for tracking workouts and exercises',
  },
  host: 'cse341-fitness-tracker-api.onrender.com',
  schemes: ['https'],
  basePath: '/',
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);