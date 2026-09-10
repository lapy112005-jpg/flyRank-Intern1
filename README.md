# Tasks Management CRUD API (Node.js / Express)

A light and fully functional RESTful Task Management API built using Node.js and Express. Developed as part of the Backend Assignment (BE-01).

---

## 🚀 Features & REST API Standards
* Full CRUD operation support (`GET`, `POST`, `PUT`, `DELETE`).
* Strict payload validations and explicit error handling.
* Appropriate HTTP Status Codes (`200 OK`, `201 Created`, `204 No Content`, `400 Bad Request`, `404 Not Found`).
* Interactive documentation served using **Swagger UI**.

---

## 🛠️ Installation & Getting Started

1. **Clone the repository:**
   ```bash
   git clone <YOUR_GITHUB_REPO_URL>
   cd <YOUR_REPO_FOLDER>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the server:**
   ```bash
   node main.js
   ```
   *The server will start at:* `http://localhost:3000`

---

## 📖 Interactive Documentation
Explore and test the endpoints directly from your browser using Swagger UI:
👉 **URL:** `http://localhost:3000/docs`

---

## 📑 API Endpoints Summary

| Method | Endpoint     | Description | Success Status | Error Status |
| :---   | :---         | :---        | :---           | :---         |
| `GET`  | `/tasks`     | Fetch all tasks | `200 OK` | - |
| `POST` | `/tasks`     | Create a new task | `201 Created` | `400 Bad Request` |
| `GET`  | `/tasks/:id` | Fetch task by ID | `200 OK` | `404 Not Found` |
| `PUT`  | `/tasks/:id` | Update task by ID | `200 OK` | `400 Bad Request`, `404 Not Found` |
| `DELETE`| `/tasks/:id`| Remove task by ID | `204 No Content` | `404 Not Found` |

---

## 🧪 Sample cURL Response

Example output when listing all tasks (`GET /tasks`):

```bash
curl -i http://localhost:3000/tasks
```

```http
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 153
Date: Thu, 10 Sep 2026 01:28:00 GMT
Connection: keep-alive

{
  "tasks": [
    { "id": 1, "title": "wake up early", "done": true },
    { "id": 2, "title": "go to school", "done": true },
    { "id": 3, "title": "pray", "done": false }
  ]
}
```