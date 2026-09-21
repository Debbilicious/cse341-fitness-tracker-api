const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Fitness Tracker API',
    description: 'API for tracking workouts and exercises',
  },
  host: 'localhost:8080',
  schemes: ['http'],
  basePath: '/',
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);