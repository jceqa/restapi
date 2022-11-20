export default {
  openapi: "3.0.3",
  info: {
    title: "API de Ejemplo",
    description: "API de Ejemplo sobre Manejo de Usuarios con Autenticación",
    version: "1.0.0",
    contact: {
      name: "Julio Quintana",
      email: "jcesarqalonso@gmail.com",
      url: "https://github.com/jceqa/restapi",
    },
  },
  host: "localhost:3600",
  basePath: "/",
  paths : {
    "/auth":{
      post: {
        tags: ["Autenticación"],
        description: "Autentica un Usuario",
        operationId: "authUser",
        parameters: [],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/definitions/UserAuth",
              },
            },
          },
        },
        responses: {
          201: {
            description: "User created successfully",
          },
          400: {
            description: "Invalid user data",
          },
          500: {
            description: "Server error",
          },
        },
      },
    },
    "/users": {
      post: {
        tags: ["Operaciones de ABM sobre un Usuario"],
        description: "Crea un Usuario",
        operationId: "createUser",
        parameters: [],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/definitions/User",
              },
            },
          },
        },
        responses: {
          201: {
            description: "User created successfully",
          },
          400: {
            description: "Invalid user data",
          },
          500: {
            description: "Server error",
          },
        },
      },
      get: {
        tags: ["Operaciones de ABM sobre un Usuario"],
        description: "Lista todos los usuarios",
        operationId: "listUsers",
        parameters: [],
        security: [
          {
            BearerAuth: []
          }
        ],
        responses: {
          200: {
            description: "Users",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/definitions/User",
                },
              },
            },
          },
        },
      },
    },
    "/users/{id}": {
      get: {
        tags: ["Operaciones de ABM sobre un Usuario"],
        description: "Obtiene un usuario",
        operationId: "getUser",
        parameters: [
          {
            name: "id",
            in: "path",
            schema: {
              $ref: "#/definitions/id",
            },
            required: true,
            description: "Identificador de un usuario",
          },
        ],
        security: [
          {
            BearerAuth: []
          }
        ],
        responses: {
          200: {
            description: "User found",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/definitions/User",
                },
              },
            },
          },
          404: {
            description: "User not found",
          },
        },
      },
      put: {
        tags: ["Operaciones de ABM sobre un Usuario"],
        description: "Actualiza un Usuario",
        operationId: "updateUser",
        security: [
          {
            BearerAuth: []
          }
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            schema: {
              $ref: "#/definitions/id",
            },
            required: true,
            description: "Identificador del usuario a actualizar",
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/definitions/User",
              },
            },
          },
        },
        responses: {
          200: {
            description: "User updated successfully",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Server error",
          },
        },
      },
      delete: {
        tags: ["Operaciones de ABM sobre un Usuario"],
        description: "Elimina un usuario",
        operationId: "deleteUser",
        parameters: [
          {
            name: "id",
            in: "path",
            schema: {
              $ref: "#/definitions/id",
            },
            required: true,
            description: "Identificador del usuario a eliminar",
          },
        ],
        security: [
          {
            BearerAuth: []
          }
        ],
        responses: {
          200: {
            description: "User removed",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Server error",
          },
        },
      },
    },
  },
  definitions: {
    id: {
      type: "string",
      description: "Identificador de un usuario",
      example: "63796f220a6097240459d322",
    },
    UserAuth: {
      type: "object",
      properties: {
        email: {
          type: "string",
          description: "Correo del Usuario",
          example: "jcesarqalonso@gmail.com",
        },
        password: {
          type: "string",
          description: "Contraseña del Usuario",
          example: "12345",
        },
      },
    },
    User: {
      type: "object",
      properties: {
        _id: {
          type: "string",
          description: "Identificador autogenerado por MongoDB",
          example: "63790a63c9ec82048c6f7851",
        },
        firstName: {
          type: "string",
          description: "Nombre del Usuario",
          example: "Juan",
        },
        lastName: {
          type: "string",
          description: "Apellido del Usuario",
          example: "Perez",
        },
        email: {
          type: "string",
          description: "Correo del Usuario",
          example: "jperez@gmail.com",
        },
        password: {
          type: "string",
          description: "Contraseña del Usuario",
          example: "12345",
        },
        permissionLevel: {
          type: "number",
          description: "Nivel de permisos del Usuario",
          example: "1",
        },
      },
    },
  },
  components: {
    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
      }
    }
  }
}
