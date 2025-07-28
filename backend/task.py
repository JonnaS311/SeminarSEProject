from typing import Optional
from pydantic import BaseModel
from datetime import date


class Task(BaseModel):
    task_id: Optional[int] = None
    title: str
    description: Optional[str] = None
    date: date
    state: str
    priority: bool
    assignee: str
    color: str
    manager_id: int
