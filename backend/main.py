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


@app.put('/changePriorityTask')
def priority_task(task: Task):
    dao.update(Task)


@app.put('/changeStateTask')
def state_task(task: Task):
    dao.update(task)
