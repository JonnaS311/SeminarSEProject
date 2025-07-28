function moverTarea(id) {
    const tarea = document.getElementById(id);
    const doing = document.getElementById("doing");
    const done = document.getElementById("done");
    fetch(`http://127.0.0.1:8000/getTask/${id}`).then((response) => {
        if (!response.ok) {
            throw new Error('Error en la respuesta: ' + response.status);
        }
        return response.json()

    }).then((task) => {
        if (tarea && doing && done) {
            if (tarea.parentNode.parentNode.id === 'todo') {
                task.state = 'doing'
                fetch('http://127.0.0.1:8000/changeStateTask', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(task)
                }).then((response) => {
                    if (!response.ok) {
                        throw new Error('Error en la respuesta: ' + response.status);
                    }
                    doing.appendChild(tarea);
                })

            } else {
                task.state = 'done'
                fetch('http://127.0.0.1:8000/changeStateTask', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(task)
                }).then((response) => {
                    if (!response.ok) {
                        throw new Error('Error en la respuesta: ' + response.status);
                    }
                    done.appendChild(tarea); // Mueve el div
                })

            }
        }

    })
}

function eliminarTarea(id) {
    const tarea = document.getElementById(id);
    tarea.parentNode.removeChild(tarea)
    fetch(`http://127.0.0.1:8000/deleteTask/${id}`, {
        method: 'DELETE'
    })
}

function activarForm() {
    const tarea = document.getElementById('form');
    tarea.style.display = 'block'
}

function crearTareaNodo(id, title, date, description, assignee) {
    const div = document.createElement("div");
    div.className = "task-card";
    div.id = id

    div.innerHTML = `
    <div class="task-header">${title}</div>
    <div class="task-body">
      <div class="task-info">
        <input type="text" value="${date}" readonly>
        <input type="text" value="${assignee}" readonly>
      </div>
      <div class="task-desc">${description}</div>
    </div>
    <div class="task-footer">
      <div class="task-actions">
        <button class="star"><img src="./static/del.svg" alt="Descripción de la imagen SVG" width="16" height="16"></button>
        <button class="delete" onclick="eliminarTarea('${div.id}')"><img src="./static/star.svg" alt="Descripción de la imagen SVG" width="16" height="16"></button>
      </div>
      <button class="task-send" onclick="moverTarea('${div.id}')">➔</button>
    </div>
  `;

    return div;
}

document.getElementById("form").addEventListener("submit", function(event) {
    event.preventDefault() // Evita que recargue la página

    const form = event.target
    const datos = new FormData(form)

    const task = {
        task_id: null,
        title: datos.get("title"),
        date: new Date(datos.get("date")),
        description: datos.get("description"),
        assignee: datos.get("assignee"),
        color: datos.get("color"),
        priority: false,
        state: 'todo',
        manager_id: 1
    }

    fetch('http://127.0.0.1:8000/createTask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    }).then((response) => {
        if (!response.ok) {
            throw new Error('Error en la respuesta: ' + response.status);
        }
        response.json().then((data) => {
            const todo = document.getElementById("todo");
            todo.childNodes[3].appendChild(crearTareaNodo(data.task_id, data.title, data.date, data.description, data.assignee))
            document.getElementById("formu").close()
        })
    })


});

fetch('http://127.0.0.1:8000/getAllTask').then((data) => {
    data.json().then((result) => {
        const todo = document.getElementById("todo");
        const doing = document.getElementById("doing");
        const done = document.getElementById("done");
        for (task of result) {
            if (task.state === 'todo') {
                todo.childNodes[3].appendChild(crearTareaNodo(task.task_id, task.title, task.date, task.description, task.assignee))
            } else if (task.state === 'doing') {
                doing.childNodes[3].appendChild(crearTareaNodo(task.task_id, task.title, task.date, task.description, task.assignee))
            } else {
                done.childNodes[3].appendChild(crearTareaNodo(task.task_id, task.title, task.date, task.description, task.assignee))
            }
        }

    })
})