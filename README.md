#SeminarSIProject

Task management system developed as part of a seminar project, including a Python backend and a web frontend.

## 🚀 Technologies Used

- **Backend**: Python 3.12, FastAPI, Pydantic, SQLAlchemy
- **Frontend**: HTML, CSS, JavaScript
- **Database**: PostgreSQL
- **Environment**: Poetry for dependency management, Node.js for frontend tools

## ⚙️ Installation

### Prerequisites

- Python 3.12
- Node.js and npm
- PostgreSQL
- [Poetry](https://python-poetry.org/docs/#installation) installed globally

### Steps

1. Clone the repository:

```bash
git clone https://github.com/JonnaS311/SeminarSIProject.git
cd SeminarSIProject
```

2. Configure the PostgreSQL database:

- Create a database and run the DB_DDL.sql and Inserts.sql files to create the initial tables and data.

3. Install backend dependencies:

```bash
cd backend
poetry install
```
4. Run the backend:

```bash
poetry run python src/main.py
```

6. Open the frontend:
```bash
cd ../frontend
```

8. Run the frontend server:
```bash
node ./server.js
```
## Usage
The system allows you to:
- Create, update, and delete tasks
- Assign assignees and statuses to each task
- View tasks by priority, date, status, etc.

## Endpoint example (FastAPI):
GET /getAllTasks – Get all tasks

POST /createTask – Create a new task

PUT /changeStateTask/{state}/{id_task} – Change the state of a task

## 📁 Project structure

```nginx
Seminar project
├─ backend
│  ├─ .pylintrc
│  ├─ locust
│  │  ├─ locustfile.py
│  │  └─ __init__.py
│  ├─ poetry.lock
│  ├─ pyproject.toml
│  ├─ pytest.ini
│  ├─ README.md
│  ├─ src
│  │  ├─ db_connection.py
│  │  ├─ main.py
│  │  ├─ task.py
│  │  ├─ task_dao.py
│  │  └─ __init__.py
│  └─ tests
│     ├─ test_endpoints.py
│     ├─ test_task_dao.py
│     ├─ test_task_model.py
│     └─ __init__.py
├─ DB_DDL.sql
├─ frontend
│  ├─ eslint.config.mjs
│  ├─ Index.html
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ server.js
│  └─ static
│     ├─ images
│     │  ├─ del.svg
│     │  └─ star.svg
│     ├─ scripts
│     │  ├─ api.js
│     │  ├─ dom.js
│     │  ├─ dragdrop.js
│     │  ├─ events.js
│     │  └─ main.js
│     └─ styles
│        └─ styles.css
├─ Inserts.sql
└─ README.md

```

## 🧪 Tests

```nginx
cd ../backend
poetry run pytest
```

## 👨 Author
- [JonnaS311](https://github.com/JonnaS311) (Jonnathan Sotelo Rodríguez)
