from datetime import date
from src.task import Task
import pytest


def test_task_model_valid():
    task = Task(
        title="Tarea 1",
        description="Descripción de prueba",
        date=date.today(),
        state="todo",
        priority=True,
        assignee="Usuario",
        color="#ffffff",
        manager_id=1
    )
    assert task.title == "Tarea 1"
    assert isinstance(task.priority, bool)


def test_task_model_invalid_date():
    with pytest.raises(ValueError):
        Task(
            title="Tarea 2",
            description="Texto",
            date="fecha incorrecta",  # error
            state="doing",
            priority=False,
            assignee="Otro",
            color="#000",
            manager_id=1
        )


def test_task_model_long_description():
    long_text = "a" * 10_000  # Descripción extremadamente larga
    task = Task(
        title="Título",
        description=long_text,
        date=date.today(),
        state="todo",
        priority=False,
        assignee="user",
        color="#ffffff",
        manager_id=2
    )
    assert len(task.description) == 10_000


def test_task_model_invalid_color():
    task = Task(
        title="Color raro",
        description="",
        date=date.today(),
        state="todo",
        priority=True,
        assignee="user",
        color="no-es-un-color",  # No es un hex válido
        manager_id=1
    )
    # El modelo lo acepta, pero podrías validarlo manualmente
    assert isinstance(task.color, str)
