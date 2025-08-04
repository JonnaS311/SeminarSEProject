from datetime import datetime
from fastapi import FastAPI
from task import Task
from task_DAO import TaskDAO
from fastapi.middleware.cors import CORSMiddleware

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
    tasks = dao.read_all()
    return tasks


@app.get('/getTask/{task_id}')
def get_task(task_id: int):
    return dao.find_by_id(task_id)


@app.post('/createTask')
def create_task(task: Task):
    task = dao.create(task)
    return task


@app.delete('/deleteTask/{task_id}')
def delete_task(task_id: int):
    dao.delete(task_id)


@app.put('/changePriorityTask/{task_id}')
def priority_task(task_id: int):
    Task = dao.find_by_id(task_id)
    Task.priority = not Task.priority
    dao.update(Task)


@app.put('/changeStateTask')
def state_task(task: Task):
    dao.update(task)


@app.get('/getByPriority/{column}')
def get_priority(column: str):
    tasks = dao.read_all()
    column_task = [ts for ts in tasks if ts.state == column]
    priority_task = list()
    no_priority_task = list()
    for ts in column_task:
        if ts.priority:
            priority_task.append(ts)
            continue
        no_priority_task.append(ts)
    priority_task.extend(no_priority_task)
    return priority_task


@app.get('/getByDate/{column}')
def get_date(column: str):
    tasks = dao.read_all()
    column_task = [ts for ts in tasks if ts.state == column]
    tasks_arranged = sorted(column_task, key=lambda x: x.date, reverse=True)
    return tasks_arranged
