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

File created: `Backend/REGISTER.md` — let me know if you want this content moved into `README.md` or expanded with examples for error cases. ✅
