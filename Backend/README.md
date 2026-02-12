# POST /users/register ✅

**Description**
Register a new user. The endpoint validates input, hashes the password, stores the user in MongoDB, and returns a JWT token.

---

## Endpoint
- Method: POST
- URL: /users/register
- Headers:
- Content-Type: application/json

## Request body
JSON payload (application/json):

```json
{
  "fullName": { "firstName": "John", "lastName": "Doe" },
  "email": "john.doe@example.com",
  "password": "secret123"
}
```

Field rules:
- `fullName.firstName` (string) — required
- `fullName.lastName` (string) — optional
- `email` (string) — required, must be a valid email
- `password` (string) — required, minimum 6 characters

---

## Success response
- **201 Created**

Example HTTP response:

```http
HTTP/1.1 201 Created
Content-Type: application/json; charset=utf-8

{
  "user": {
    "_id": "64f0b5f0a1d2c1a1b2c3d4e5",
    "fullName": { "firstName": "John", "lastName": "Doe" },
    "email": "john.doe@example.com",
    "socketId": null
  },
  "token": "<jwt-token-string>"
}
```

> Note: The response **does not** include the hashed password.

---

## Error responses
- **400 Bad Request** — validation error
```json
{ "errors": [ { "msg": "Invalid email address", "param": "email", ... } ] }
```

- **409 Conflict** — duplicate email (if Mongo unique index triggers E11000)
```json
{ "error": "Email already in use" }
```

- **500 Internal Server Error** — MongoDB connection issues or unexpected errors
```json
{ "error": "Internal Server Error" }
```

If you see Mongoose timeout errors (e.g. `Operation users.insertOne() buffering timed out`), verify `MONGO_URI` and that MongoDB is reachable.

---

## Environment
Required environment variables (Backend `.env`):
- `PORT` (e.g., `3000`)
- `MONGO_URI` (MongoDB connection string)
- `JWT_SECRET` (secret used to sign tokens)

---

## Example curl

```bash
curl -X POST http://localhost:3000/users/register \
  -H "Content-Type: application/json" \
  -d '{ "fullName": { "firstName": "John", "lastName": "Doe" }, "email": "john.doe@example.com", "password": "secret123" }'
```

---

## Tips
- Start your server: `node server.js` or `npx nodemon server.js` (or `npm run dev` if you add a `dev` script)
- Test requests with Postman or curl.

---

# POST /users/login ✅

**Description**
Authenticate a user. The endpoint validates credentials and, on success, returns a JWT token and the authenticated user's public profile (the response should not include the hashed password).

---

## Endpoint
- Method: POST
- URL: /users/login
- Headers:
  - Content-Type: application/json

## Request body
JSON payload (application/json):

```json
{
  "email": "john.doe@example.com",
  "password": "secret123"
}
```

Field rules:
- `email` (string) — required, must be a valid email
- `password` (string) — required

---

## Success response
- **200 OK**

Example HTTP response:

```http
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "token": "<jwt-token-string>",
  "user": {
    "_id": "64f0b5f0a1d2c1a1b2c3d4e5",
    "fullName": { "firstName": "John", "lastName": "Doe" },
    "email": "john.doe@example.com",
    "socketId": null
  }
}
```

> Note: The response should not include the `password` field. If your implementation currently includes it, remove it before sending the response (see `controller/user.controller.js`).

---

## Error responses
- **400 Bad Request** — validation error
```json
{ "errors": [ { "msg": "Invalid email address", "param": "email", ... } ] }
```

- **401 Unauthorized** — invalid credentials
```json
{ "error": "Invalid email or password" }
```

- **500 Internal Server Error** — unexpected errors
```json
{ "error": "Internal Server Error" }
```

---

## Example curl

```bash
curl -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d '{ "email": "john.doe@example.com", "password": "secret123" }'
```

---

## Tips & notes
- Ensure `JWT_SECRET` is set so tokens can be created and verified.
- For security, consider rate-limiting this endpoint and returning generic error messages for failed logins.
- There's a bug in `routes/user.routes.js` using `router.post('./login', ...)` — it should be `'/login'`. Also ensure `user.controller.js` doesn't return the hashed password in responses.

---

# GET /users/profile ✅

**Description**
Fetch the authenticated user's profile. Requires a valid JWT token sent either as an httpOnly cookie (`token`) or an `Authorization: Bearer <token>` header.

---

## Endpoint
- Method: GET
- URL: /users/profile
- Headers:
  - Optional: `Cookie: token=<jwt>` or `Authorization: Bearer <jwt>`

## Success response
- **200 OK**

Example HTTP response:

```http
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "_id": "64f0b5f0a1d2c1a1b2c3d4e5",
  "fullName": { "firstName": "John", "lastName": "Doe" },
  "email": "john.doe@example.com",
  "socketId": null
}
```

---

## Error responses
- **401 Unauthorized** — missing or invalid token
```json
{ "error": "Access denied. No token provided." }
```

```json
{ "message": "Invalid token." }
```


---

# GET /users/logout ✅

**Description**
Log the user out by clearing the `token` cookie (if present) and blacklisting the token on the server for 24 hours. Requires authentication.

---

## Endpoint
- Method: GET
- URL: /users/logout
- Headers:
  - Optional: `Cookie: token=<jwt>` or `Authorization: Bearer <jwt>`

## Success response
- **200 OK**

Example HTTP response:

```http
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{ "message": "Logged out successfully" }
```

> Notes: The server stores blacklisted tokens in a TTL collection for 24 hours, preventing reuse until they expire.

---

## Error responses
- **400 Bad Request** — no token provided
```json
{ "error": "No token provided" }
```

- **401 Unauthorized** — token already invalid or blacklisted
```json
{ "message": "Unauthorized" }
```

- **500 Internal Server Error** — server/database error
```json
{ "error": "Server error" }
```

---

## Example curl (using header)

```bash
# Fetch profile
curl -X GET http://localhost:3000/users/profile -H "Authorization: Bearer <jwt>"

# Logout
curl -X GET http://localhost:3000/users/logout -H "Authorization: Bearer <jwt>"
```

## Example curl (using cookie)

```bash
# Set cookie in the request
curl -b "token=<jwt>" http://localhost:3000/users/profile
curl -b "token=<jwt>" http://localhost:3000/users/logout
```

---

# Captain routes ✅

All `/captains` endpoints use `Content-Type: application/json` and require/return JSON. Authentication accepts either an httpOnly cookie `token` or `Authorization: Bearer <token>` header.

---

## POST /captains/register 🔧

Description: register a new captain (driver). Validates input, hashes password, saves to MongoDB and returns a JWT.

- Method: POST
- URL: `/captains/register`
- Headers: `Content-Type: application/json`

Request body (JSON with inline comments showing requirements):

```jsonc
{
  "fullName": {
    "firstName": "John",      // required, min length: 3
    "lastName": "Doe"         // required, min length: 3
  },
  "email": "john@example.com", // required, must be a valid email
  "password": "secret123",     // required, min length: 6
  "vehicle": {
    "color": "red",            // required, min length: 3
    "plateNumber": "ABC123",   // required, min length: 3
    "capacity": 4,               // required, integer >= 1
    "vehicleType": "car"       // required, one of: "bike", "car", "auto"
  }
}
```

Success response (201 Created):

```jsonc
{
  "captain": {
    "_id": "<captain-id>",
    "fullName": { "firstName": "John", "lastName": "Doe" },
    "email": "john@example.com",
    "vehicle": { "color": "red", "plateNumber": "ABC123", "capacity": 4, "vehicleType": "car" },
    "socketId": null               // public profile field; password is NOT returned
  },
  "token": "<jwt-token-string>"  // store in cookie or use in Authorization header
}
```

Errors:
- 400 — validation errors (see `errors` array from `express-validator`).
- 400 — duplicate email: `{ "error": "Captain with this email already exists" }`.
- 500 — server / DB errors.

Example curl:

```bash
curl -X POST http://localhost:3000/captains/register \
  -H "Content-Type: application/json" \
  -d '{ "fullName": { "firstName": "John", "lastName": "Doe" }, "email": "john@example.com", "password": "secret123", "vehicle": { "color": "red", "plateNumber": "ABC123", "capacity": 4, "vehicleType": "car" } }'
```

---

## POST /captains/login 🔐

Description: authenticate a captain and return a JWT. Server also sets an httpOnly cookie named `token`.

- Method: POST
- URL: `/captains/login`
- Headers: `Content-Type: application/json`

Request body (JSON with requirements):

```jsonc
{
  "email": "john@example.com",   // required, valid email
  "password": "secret123"        // required
}
```

Success response (200 OK):

```jsonc
{
  "token": "<jwt-token-string>",  // also set as httpOnly cookie `token`
  "captain": {
    "_id": "<captain-id>",
    "fullName": { "firstName": "John", "lastName": "Doe" },
    "email": "john@example.com",
    "vehicle": { "color": "red", "plateNumber": "ABC123", "capacity": 4, "vehicleType": "car" }
    // password is NEVER returned
  }
}
```

Errors:
- 400 — validation errors or invalid credentials (`{ "error": "Invalid email or password" }`).
- 500 — server errors.

Example curl:

```bash
curl -X POST http://localhost:3000/captains/login \
  -H "Content-Type: application/json" \
  -d '{ "email": "john@example.com", "password": "secret123" }'
```

---

## GET /captains/profile 👤

Description: return the authenticated captain's public profile. Requires authentication (cookie `token` or `Authorization: Bearer <token>`).

- Method: GET
- URL: `/captains/profile`
- Headers: `Cookie: token=<jwt>` OR `Authorization: Bearer <jwt>`

Success response (200 OK):

```json
{
  "_id": "<captain-id>",
  "fullName": { "firstName": "John", "lastName": "Doe" },
  "email": "john@example.com",
  "vehicle": { "color": "red", "plateNumber": "ABC123", "capacity": 4, "vehicleType": "car" },
  "socketId": null
}
```

Errors:
- 401 — missing or blacklisted/invalid token.
- 404 — captain not found.
- 500 — server error.

Example curl:

```bash
curl -X GET http://localhost:3000/captains/profile -H "Authorization: Bearer <jwt>"
```

---

## GET /captains/logout 🚪

Description: logs out the captain by blacklisting the token (TTL) and clearing the `token` cookie.

- Method: GET
- URL: `/captains/logout`
- Headers: `Cookie: token=<jwt>` OR `Authorization: Bearer <jwt>`

Success response (200 OK):

```json
{ "message": "Logged out successfully" }
```

Notes:
- The server stores blacklisted tokens in a TTL collection (prevents reuse until expiry).
- After logout the `token` cookie is cleared.

Example curl:

```bash
curl -X GET http://localhost:3000/captains/logout -H "Authorization: Bearer <jwt>"
```

---

## Implementation references
- Validation rules are defined in `routes/captain.routes.js`.
- Hashing & token generation live in `models/captain.model.js` and `services/captain.services.js`.

---


---


