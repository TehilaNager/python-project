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
