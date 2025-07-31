import pytest
from unittest.mock import MagicMock
from src.task import Task
from src.task_DAO import TaskDAO
from datetime import date


@pytest.fixture
def mock_dao():
    dao = TaskDAO()
    dao.db = MagicMock()
    dao.db.cursor = MagicMock()
    dao.db.connection = MagicMock()
    return dao


def test_create_task(mock_dao):
    mock_dao.db.cursor.fetchone.return_value = [1]
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
    result = mock_dao.create(task)
    assert result.task_id == 1
    mock_dao.db.cursor.execute.assert_called_once()
    mock_dao.db.connection.commit.assert_called_once()


def test_find_by_id(mock_dao):
    fake_row = (1, "Title", "Desc", date.today(),
                "done", False, "User", "#fff", 1)
    mock_dao.db.cursor.fetchone.return_value = fake_row
    task = mock_dao.find_by_id(1)
    assert task.task_id == 1
    assert task.title == "Title"
