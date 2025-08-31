# Project Name

## Database Seeding

To populate the database with initial sample data (users, articles, comments, and tags), run the following command:

```bash
python manage.py seed

```

This command will automatically create:

### Admin User

- **Username:** `admin`
- **Password:** `Admin123!`

### Regular User

- **Username:** `tehila`
- **Password:** `Tehila123!`

### Sample Content

- 4 sample articles with multiple tags:
  - **First Article:** `Python`, `Web Development`
  - **Second Article:** `Django`, `Web Development`
  - **Third Article:** `Python`, `Database`
  - **Fourth Article:** `Django`, `Database`
- At least 2 comments for each article from the regular user

### Usage

After seeding the database, you can log in to the Django admin panel at `/admin` using the admin credentials above to manage users, articles, comments, and tags.

# API Endpoints

All backend endpoints, including request/response examples and permissions.

---

## Authentication

### Register

- **Method:** POST
- **Endpoint:** `/api/register/`
- **Description:** Register a new user
- **Request Body Example:**

```json
{
  "username": "tehila",
  "email": "tehila@test.com",
  "password": "Tehila123!"
}
```

- **Response Example:**

```json
{
  "message": "Registered successfully",
  "user": {
    "id": 2,
    "username": "tehila",
    "email": "tehila@test.com"
  },
  "refresh": "<refresh_token>",
  "access": "<access_token>"
}
```

- **Permissions:** Public

---

### JWT Login

- **Method:** POST
- **Endpoint:** `/api/token/`
- **Description:** Obtain JWT token for authentication
- **Request Body Example:**

```json
{
  "username": "tehila",
  "password": "Tehila123!"
}
```

- **Response Example:**

```json
{
  "refresh": "<refresh_token>",
  "access": "<access_token>"
}
```

- **Permissions:** Public

---

### Refresh Token

- **Method:** POST
- **Endpoint:** `/api/token/refresh/`
- **Description:** Refresh access token
- **Request Body Example:**

```json
{
  "refresh": "<refresh_token>"
}
```

- **Response Example:**

```json
{
  "access": "<new_access_token>"
}
```

- **Permissions:** Authenticated users

---

## Users API

### List Users

- **Method:** GET
- **Endpoint:** `/api/users/`
- **Description:** List all users
- **Permissions:** Admin only

### Retrieve / Update / Delete User

- **Method:** GET / PUT / DELETE
- **Endpoint:** `/api/users/<id>/`
- **Permissions:** Admin only

---

## User Profiles API

### List / Retrieve / Update Profiles

- **Method:** GET / PUT
- **Endpoint:** `/api/userprofiles/` or `/api/userprofiles/<id>/`
- **Permissions:** Profile owner or Admin

---

## Tags API

### List Tags

- **Method:** GET
- **Endpoint:** `/api/tags/`
- **Permissions:** Public

### Create / Update / Delete Tag

- **Method:** POST / PUT / DELETE
- **Endpoint:** `/api/tags/` or `/api/tags/<id>/`
- **Permissions:** Admin only

---

## Articles API

### List Articles

- **Method:** GET
- **Endpoint:** `/api/articles/`
- **Query Parameters (Optional):**
  - `search=<query>` to search by title, content, tags, or author username
- **Permissions:** Public

### Retrieve Article

- **Method:** GET
- **Endpoint:** `/api/articles/<id>/`
- **Permissions:** Public

### Create Article

- **Method:** POST
- **Endpoint:** `/api/articles/`
- **Request Body Example:**

```json
{
  "title": "New Article",
  "text": "Article content",
  "status": "draft",
  "tags": [1, 2]
}
```

- **Permissions:** Admin only

### Update Article

- **Method:** PUT
- **Endpoint:** `/api/articles/<id>/`
- **Permissions:** Admin only

### Delete Article

- **Method:** DELETE
- **Endpoint:** `/api/articles/<id>/`
- **Permissions:** Admin only

---

## Comments API

### Get Comments for an Article

- **Method:** GET
- **Endpoint:** `/api/articles/<id>/comments/`
- **Description:** Get all comments for a specific article
- **Permissions:** Anyone

### Add Comment to an Article

- **Method:** POST
- **Endpoint:** `/api/articles/<id>/comments/`
- **Request Body Example:**

```json
{
  "text": "Comment text"
}
```

- **Permissions:** Authenticated users only

### Retrieve / Update / Delete Comment

- **Method:** GET / PUT / DELETE
- **Endpoint:** `/api/comments/<id>/`
- **Permissions:** Comment owner or Admin

---

## Article Likes API

### List Likes

- **Method:** GET
- **Endpoint:** `/api/likes/`
- **Permissions:** Admin only

### Create / Update / Delete Like

- **Method:** POST / PUT / DELETE
- **Endpoint:** `/api/likes/<id>/`
- **Request Body Example:**

```json
{
  "like_type": "like"
}
```

- **Permissions:** Like owner or Admin

## API Endpoints Summary

| Endpoint                        | Method              | Description                        | Permissions           |
| ------------------------------- | ------------------- | ---------------------------------- | --------------------- |
| `/api/register/`                | POST                | Register a new user                | Public                |
| `/api/token/`                   | POST                | Obtain JWT token                   | Public                |
| `/api/token/refresh/`           | POST                | Refresh access token               | Authenticated         |
| `/api/users/`                   | GET                 | List all users                     | Admin                 |
| `/api/users/<id>/`              | GET / PUT / DELETE  | Retrieve / Update / Delete user    | Admin                 |
| `/api/userprofiles/`            | GET / PUT           | List / Update user profiles        | Profile owner / Admin |
| `/api/userprofiles/<id>/`       | GET / PUT           | Retrieve / Update specific profile | Profile owner / Admin |
| `/api/tags/`                    | GET                 | List all tags                      | Public                |
| `/api/tags/`                    | POST / PUT / DELETE | Create / Update / Delete tag       | Admin                 |
| `/api/tags/<id>/`               | PUT / DELETE        | Update / Delete specific tag       | Admin                 |
| `/api/articles/`                | GET                 | List all articles                  | Public                |
| `/api/articles/?search=<query>` | GET                 | Search articles                    | Public                |
| `/api/articles/<id>/`           | GET                 | Retrieve specific article          | Public                |
| `/api/articles/`                | POST                | Create new article                 | Admin                 |
| `/api/articles/<id>/`           | PUT                 | Update specific article            | Admin                 |
| `/api/articles/<id>/`           | DELETE              | Delete specific article            | Admin                 |
| `/api/articles/<id>/comments/`  | GET                 | Get all comments for article       | Anyone                |
| `/api/articles/<id>/comments/`  | POST                | Add comment to article             | Authenticated         |
| `/api/comments/<id>/`           | GET / PUT / DELETE  | Retrieve / Update / Delete comment | Comment owner / Admin |
| `/api/likes/`                   | GET                 | List all likes                     | Admin                 |
| `/api/likes/<id>/`              | POST / PUT / DELETE | Create / Update / Delete like      | Like owner / Admin    |

> **Note:** The `.env` file is included in this project since it is only a demo application and does not contain any sensitive information.
