"""it's just the API. Contain the endpoints."""
# third-party
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

# local imports
from task import Task
from task_dao import TaskDAO

app = FastAPI()
dao = TaskDAO()


origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Puedes poner ["*"] para permitir todos
    allow_credentials=True,
    allow_methods=["*"],    # Permitir todos los métodos: GET, POST, etc.
    allow_headers=["*"],    # Permitir todos los headers
)


@app.get("/getAllTask")
def get_all_task():
    """Obtein all tasks from a user."""
    tasks = dao.read_all()
    return tasks


@app.get('/getTask/{task_id}')
def get_task(task_id: int):
    """Obtein one task from a user."""
    task = dao.find_by_id(task_id)
    if task is None:
        raise HTTPException(status_code=404, detail="Tarea no encontrada")
    return task


@app.post('/createTask')
def create_task(task: Task):
    """Create and insert one task from a user."""
    task = dao.create(task)
    return task


@app.delete('/deleteTask/{task_id}')
def delete_task(task_id: int):
    """Delete one task from a user."""
    dao.delete(task_id)


@app.put('/changePriorityTask/{task_id}')
def change_priority_task(task_id: int):
    """Update the priority applying a 'not' operation."""
    task = dao.find_by_id(task_id)
    task.priority = not task.priority
    dao.update(task)


@app.put('/changeStateTask/{state}/{id_task}')
def state_task(state: str, id_task: int):
    """Update the state of one task from a user."""
    task = dao.find_by_id(id_task)
    task.state = state
    dao.update(task)


@app.get('/getByPriority/{column}')
def get_priority(column: str):
    """Obtein all tasks from a column arranged by priority."""
    tasks = dao.read_all()
    column_task = [ts for ts in tasks if ts.state == column]
    priority_task = []
    no_priority_task = []
    for ts in column_task:
        if ts.priority:
            priority_task.append(ts)
            continue
        no_priority_task.append(ts)
    priority_task.extend(no_priority_task)
    return priority_task


@app.get('/getByDate/{column}')
def get_date(column: str):
    """Obtein all tasks from a column arranged by date."""
    tasks = dao.read_all()
    column_task = [ts for ts in tasks if ts.state == column]
    tasks_arranged = sorted(column_task, key=lambda x: x.date, reverse=True)
    return tasks_arranged
