import swaggerJsdoc from 'swagger-jsdoc';
import {config} from './config';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MatchTalk API',
      version: '1.0.0',
      description: 'MatchTalk backend API documentation',
      contact: {
        name: 'MatchTalk Team',
      },
    },
    servers: [
      {
        url: `http://localhost:${config.port}`,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.ts', './src/schemas/*.ts'], // Path to the API files
};

export const swaggerSpec = swaggerJsdoc(options);



