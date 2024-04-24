import chalk from "chalk";
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
        url: "http://localhost:3000/api/v1",
        description: "Development server",
      },
      {
        url: "",
        description: "Production server",
      },
    ],
  },
  apis: [`./src/api/v1/docs/*.js`],
};

const swaggerDoc = swaggerJSDoc(options);

function swaggerDocs(app, port) {
  //Swagger page
  app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

  //Docs in JSON format
  app.get("/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerDoc);
  });

  console.log(
    chalk.magentaBright(
      `Docs available on http://localhost:${port}/api/v1/docs \n`
    )
  );
}

export default swaggerDocs;
