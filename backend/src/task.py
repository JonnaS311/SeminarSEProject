"""Model for Tasks, important to validate the format."""
from typing import Optional
from datetime import date
from pydantic import BaseModel, Field


class Task(BaseModel):
    """Class for Tasks representation."""
    task_id: Optional[int] = None
    title: str
    description: Optional[str] = None
    date: date
    state: str = Field(..., pattern="^(todo|doing|done)$")
    priority: bool
    assignee: str
    color: str = Field(..., pattern=r"^#(?:[0-9a-fA-F]{3}){1,2}$")
    manager_id: int = Field(..., gt=0)
