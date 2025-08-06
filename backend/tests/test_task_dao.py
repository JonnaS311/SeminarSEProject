"""Unit Testing for backend functions using a Mock DAO."""
# third-party
from unittest.mock import MagicMock
from datetime import date
import pytest

# local imports
from src.task import Task
from src.task_dao import TaskDAO


@pytest.fixture
def mock_task_dao():
    """Mock the DAO."""
    dao = TaskDAO()
    dao.db = MagicMock()
    dao.db.cursor = MagicMock()
    dao.db.connection = MagicMock()
    return dao


def test_create_task(mock_task_dao):  # pylint: disable=redefined-outer-name
    """Test creating a task successfully."""
    mock_task_dao.db.cursor.fetchone.return_value = [1]
    task = Task(
        title="Nueva",
        description="Test",
        date=date.today(),
        state="todo",
        priority=False,
        assignee="MockUser",
        color="#123456",
        manager_id=2
    )
    result = mock_task_dao.create(task)
    assert result.task_id == 1
    mock_task_dao.db.cursor.execute.assert_called_once()
    mock_task_dao.db.connection.commit.assert_called_once()


def test_find_by_id(mock_task_dao):  # pylint: disable=redefined-outer-name
    """Test finding a task successfully."""
    fake_row = (1, "Title", "Desc", date.today(),
                "done", False, "User", "#fff", 1)
    mock_task_dao.db.cursor.fetchone.return_value = fake_row
    task = mock_task_dao.find_by_id(1)
    assert task.task_id == 1
    assert task.title == "Title"
