# UrlShortener

UrlShortener is a simple web application designed for shortening URLs. The project is built with a clean architecture and follows a client-server structure. It includes secure user authentication using JSON Web Tokens (JWT).

---

## Overview

This application allows users to shorten long URLs into compact, shareable links. Users can register, login, and manage their short URLs securely. The backend is implemented with ASP.NET Core, and the frontend is developed using React and TypeScript.

The system architecture is divided into clear layers following clean architecture principles: Domain, Application, Infrastructure, and Web API.

---

## Key Features

- URL shortening and redirection.
- User registration and JWT-based authentication.
- Secure management of user URLs.
- RESTful API with clear separation of concerns.
- Swagger UI for API documentation and testing.
- Cross-Origin Resource Sharing (CORS) setup for frontend integration.

---

## Technologies

- Backend: C# (.NET 8) with ASP.NET Core Web API
- Frontend: TypeScript and React
- Authentication: JWT with Microsoft Identity libraries
- API Documentation: Swagger/OpenAPI
- Middleware: Custom URL redirection logic

---

## API Endpoints

### Authentication

| Method | URL                | Description                       |
|--------|--------------------|---------------------------------|
| POST   | /auth/register     | Register a new user              |
| POST   | /auth/login        | User login and token generation |

### Short URLs

| Method | URL                   | Description                                                |
|--------|-----------------------|------------------------------------------------------------|
| POST   | /ShortUrls/Create     | Create a new shortened URL (authenticated users only)      |
| GET    | /ShortUrls/GetById    | Get details of a shortened URL by ID (authenticated users) |
| GET    | /ShortUrls/GetAll     | Retrieve all shortened URLs                                 |
| DELETE | /ShortUrls/Delete     | Delete a shortened URL by ID (authenticated users only)    |

---

## Installation and Running

1. Clone the repository:
   
  ` git clone https://github.com/Witchdoctor90/UrlShortener.git `  
  
  ` cd UrlShortener `  
  
3. Configure the backend connection string and JWT settings in `appsettings.json`.  
4. Launch the backend API:
   
  `dotnet run --project UrlShortener.WebApi`  
  
6. From the frontend directory (`UrlShortenerClient`), install dependencies and start:
   
  ` npm install `

  ` npm start `


---

## Architecture Overview

- **Domain Layer:** Contains core business entities such as URL and user models.
- **Application Layer:** Implements business logic, commands, queries, and interfaces.
- **Infrastructure Layer:** Handles database interactions, identity management, and external dependencies.
- **Web API Layer:** Exposes REST endpoints, manages security, middleware, and routing.

---

## Security

- JWT authentication is implemented with token validation including issuer, audience, and lifetime.
- API endpoints for URL creation, retrieval by ID, and deletion require authenticated users.
- Permission checks ensure users can only manage their own URLs.

---

## Contribution

Contributions, bug reports, and feature requests are welcome! Please open an issue or submit a pull request.

---

## License

Licensed under the MIT License. See the LICENSE file for details.

---
