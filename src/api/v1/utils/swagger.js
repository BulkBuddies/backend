import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Bulkbuddies Api",
      description: "Api description",
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "jwt",
        },
      },
      security: {
        BearerAuth: [],
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
  },
  apis: [`./src/api/v1/docs/*.js`],
};

const swaggerDoc = swaggerJSDoc(options);

function swaggerDocs(app, port) {
  //Swagger page
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

  //Docs in JSON format
  app.get("/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerDoc);
  });

  console.log(`Docs available on http://localhost:${port}/docs`);
}

export default swaggerDocs;
