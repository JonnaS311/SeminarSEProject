"""Unit Testing for backend functions."""
# third-party
from datetime import date
import pytest

# local imports
from src.task import Task


def test_task_model_valid():
    """Test to validate correct format model."""
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
    """Test to validate a invalid date."""
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
    """Test to valide a long description."""
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
    """Test to validate a invalid color."""
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
    # El modelo lo acepta
    assert isinstance(task.color, str)
