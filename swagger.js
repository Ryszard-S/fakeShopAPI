const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Fake Store CRUD REST API',
      version: '1.0.0',
      description:
        'This is a simple CRUD API application made with Express and documented with Swagger'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      },
      {
        url: 'https://fakeshopapi.onrender.com',
        description: 'Production server'
      }
    ],
    components: {
      schemas: {
        Card: {
          type: 'object',
          properties: {
            cardList: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  productId: {
                    type: 'string',
                    description: 'id of product',
                    example: '63dfd39b1879a5066cbef5e8'
                  },
                  qty: {
                    type: 'integer',
                    description: 'Quanty of product',
                    example: 13
                  }
                }
              }
            }
          }
        },
        CardToDelete: {
          type: 'object',
          properties: {
            productIds: {
              type: 'array',
              items: {
                type: 'string',
                example: '63dfd39b1879a5066cbef5e8'
              }
            }
          }
        },
        CardAll: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'Card cleard'
            }
          }
        },
        UserRegister: {
          type: 'object',
          properties: {
            username: {
              type: 'string',
              example: 'John23'
            },
            name: {
              type: 'string',
              example: 'John'
            },
            lastName: {
              type: 'string',
              example: 'JDoe'
            },
            password: {
              type: 'string',
              example: 'JohnDJoesecurepassword'
            },
            email: {
              type: 'string',
              example: 'John@JDoe.com'
            }
          }
        },
        UserRegisterResponse: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'User created'
            },
            username: {
              type: 'string',
              example: 'John23'
            }
          }
        },
        UserLogin: {
          type: 'object',
          properties: {
            username: {
              type: 'string',
              example: 'John23'
            },
            password: {
              type: 'string',
              example: 'JohnDJoesecurepassword'
            }
          }
        },
        UserLoginResponse: {
          type: 'object',
          properties: {
            accessToken: {
              type: 'string',
              example:
                'eyzhbGciOiJIUsI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySW5mbyI6eyJpZCI6IjYzZGZjZGPiNzQyOTIxNWMzNDI0NmQ3NSIsInVzZXJuYW1lIjoiamFubm4iLCJleHBpcmVzQXQiOiIyMDIzLTAyLTA1VDE2OjQwOjQzLjk5MloifSwiaWF0IjoxNjc1NjExNjQ3LCJleHAiOjE2NzU2MTUyNDd9.DQKfiODYWJNU4tlZoRhR09Zc9X-Nw4vwG4IRhexCX1U'
            },
            refreshToken: {
              type: 'string',
              example:
                'eyzhbGciOiJIUsI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZGZjZGZiNzQyOTIxNWMzNDD0NmQ3NSIsInVzZXJuYW1lIjoiamFubm4iLCJleHBpcmVzQXQiOiIyMDIzLTAyLTA1VDE2OjQwOjQzLjk5MloiLCJpYXQiOjE2NzU2MTE2NDcsImV4cCI6MTY3NTYxNTI0N30.pscCaCKvWQGJFs787rOSEgN_gIqfVs0wSUpEKABwWwY'
            }
          }
        },
        UserRefresh: {
          type: 'object',
          properties: {
            refreshToken: {
              type: 'string',
              example:
                'eyzhbGciOiJIUsI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZGZjZGZiNzQyOTIxNWMzNDD0NmQ3NSIsInVzZXJuYW1lIjoiamFubm4iLCJleHBpcmVzQXQiOiIyMDIzLTAyLTA1VDE2OjQwOjQzLjk5MloiLCJpYXQiOjE2NzU2MTE2NDcsImV4cCI6MTY3NTYxNTI0N30.pscCaCKvWQGJFs787rOSEgN_gIqfVs0wSUpEKABwWwY'
            }
          }
        },
        UserRefreshResponse: {
          type: 'object',
          properties: {
            accessToken: {
              type: 'string',
              example:
                'eyzhbGciOiJIUsI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySW5mbyI6eyJpZCI6IjYzZGZjZGPiNzQyOTIxNWMzNDI0NmQ3NSIsInVzZXJuYW1lIjoiamFubm4iLCJleHBpcmVzQXQiOiIyMDIzLTAyLTA1VDE2OjQwOjQzLjk5MloifSwiaWF0IjoxNjc1NjExNjQ3LCJleHAiOjE2NzU2MTUyNDd9.DQKfiODYWJNU4tlZoRhR09Zc9X-Nw4vwG4IRhexCX1U'
            }
          }
        },
        Product: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              example: '63e030231d1b457177a23da4'
            },
            name: {
              type: 'string',
              example: 'Trainers'
            },
            description: {
              type: 'string',
              example: 'for fast running'
            },
            category: {
              type: 'string',
              example: 'shoes'
            },
            photos: {
              type: 'array',
              items: {
                type: 'string',
                example: 'https://picsum.photos/200'
              }
            },
            price: {
              type: 'number',
              format: 'float',
              example: '32'
            },
            brand: {
              type: 'string',
              example: 'Klowe'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              example: '2023-02-06T23:39:29.952Z'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              example: '2023-02-05T22:39:31.952Z'
            },
            rating: {
              type: 'int',
              example: 4
            }
          }
        },

        ProductList: {
          type: 'array',
          items: {
            $ref: '#/components/schemas/Product'
          }
        },
        ReviewResponse: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: '63e030231d1b457177a23da4'
            },
            user: {
              type: 'object',
              $ref: '#/components/schemas/UserPropagate'
            },
            review: {
              type: 'string',
              example: 'This is a great product'
            },
            rating: {
              type: 'int',
              example: 4
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              example: '2023-02-06T23:39:29.952Z'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              example: '2023-02-05T22:39:31.952Z'
            },
            expireAt: {
              type: 'string',
              format: 'date-time',
              example: '2023-02-05T22:39:31.952Z'
            }
          }
        },
        ReviewList: {
          type: 'array',
          items: {
            $ref: '#/components/schemas/ReviewResponse'
          }
        },
        AddReviewBody: {
          type: 'object',
          properties: {
            review: {
              type: 'string',
              example: 'This is a great product'
            },
            rating: {
              type: 'int',
              example: 4
            }
          }
        },
        UserPropagate: {
          type: 'object',
          properties: {
            username: {
              type: 'string',
              example: 'Augusta188'
            },
            avatarURL: {
              type: 'string',
              example: 'https://api.dicebear.com/5.x/adventurer/svg?&eyebrow=variant06'
            },
            id: {
              type: 'string',
              example: '63eba8d6a09121a4c4ef5597'
            }
          }
        }
      },
      responses: {
        400: {
          description: 'Missing API key - include it in the Authorization header',
          contents: 'application/json'
        },
        401: {
          description: 'Unauthorized - JWT key is absent',
          contents: 'application/json'
        },
        403: {
          description: 'Forbidden - the API key is not valid for this route or expired',
          contents: 'application/json'
        },
        404: {
          description: 'Not found - the book was not found',
          contents: 'application/json'
        }
      },
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          in: 'header',
          name: 'Authorization',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    // security: [
    //   {
    //     bearerAuth: []
    //   }
    // ]
  },
  apis: ['./routes/*Routes.js']
}

module.exports = options
