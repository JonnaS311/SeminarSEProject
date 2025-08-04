function moverTarea(id) {
    const tarea = document.getElementById(id);
    const doing = document.getElementById("doing");
    const done = document.getElementById("done");
    if (tarea && doing && done) {
            if (tarea.parentNode.parentNode.id === 'todo') {
                fetch(`http://127.0.0.1:8000/changeStateTask/doing/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(task)
                }).then((response) => {
                    if (!response.ok) {
                        throw new Error('Error en la respuesta: ' + response.status);
                    }
                    doing.childNodes[3].appendChild(tarea);
                })

            } else {
                fetch(`http://127.0.0.1:8000/changeStateTask/done/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(task)
                }).then((response) => {
                    if (!response.ok) {
                        throw new Error('Error en la respuesta: ' + response.status);
                    }
                    done.childNodes[3].appendChild(tarea); // Mueve el div
                })

            }
        }
}

function eliminarTarea(id) {
    Notiflix.Confirm.show('Delete task',
        'Do you want delete this task?',
        'Yes',
        'No',
        () => {
            const tarea = document.getElementById(id);
            fetch(`http://127.0.0.1:8000/deleteTask/${id}`, {
                method: 'DELETE'
            }).then((data)=>{
                if (!data.ok) {
                    throw new Error('Error en la respuesta: ' + response.status);
                }
                tarea.parentNode.removeChild(tarea)
                Toastify({
                    text: "Task deleted successfully",
                    className: "info",
                    gravity: "top",
                    close: true,
                    style: {
                        background: "linear-gradient(135deg, var(--verde-hover), var(--verde-principal))",
                        'border-radius': "2rem"
                    }
                    }).showToast();
            })
        },
        () => {
            
        },
    );
}

function updateTask(id) {
    fetch(`http://127.0.0.1:8000/changePriorityTask/${id}`, {
        method: 'PUT',
    }).then((response)=>{
        if (!response.ok) {
            throw new Error('Error en la respuesta: ' + response.status);
        }
        const todo = document.getElementById("todo").childNodes[3];
        const doing = document.getElementById("doing").childNodes[3];
        const done = document.getElementById("done").childNodes[3];
        
        for(task of todo.childNodes){ 
            if(parseInt(task.id) === parseInt(id)){   
                if(task.childNodes[5].childNodes[1].childNodes[1].className === 'priority'){
                    task.childNodes[5].childNodes[1].childNodes[1].className = 'star'
                }else{
                    task.childNodes[5].childNodes[1].childNodes[1].className = 'priority'
                }
                break
            }
        }
        for(task of doing.childNodes){ 
            if(parseInt(task.id) === parseInt(id)){
                
                if(task.childNodes[5].childNodes[1].childNodes[1].className === 'priority'){
                    task.childNodes[5].childNodes[1].childNodes[1].className = 'star'
                }else{
                    task.childNodes[5].childNodes[1].childNodes[1].className = 'priority'
                }
                break
            }
        }
        for(task of done.childNodes){ 
            if(parseInt(task.id) === parseInt(id)){
                
                if(task.childNodes[5].childNodes[1].childNodes[1].className === 'priority'){
                    task.childNodes[5].childNodes[1].childNodes[1].className = 'star'
                }else{
                    task.childNodes[5].childNodes[1].childNodes[1].className = 'priority'
                }
                break
            }
        }
    })
    
}

function activarForm() {
    const tarea = document.getElementById('form');
    tarea.style.display = 'block'
}

function crearTareaNodo(task) { //id, title, date, description, assignee, priority
    const div = document.createElement("div");
    div.className = "task-card";
    div.id = task.task_id
    if(task.priority){
        div.innerHTML = `
            <div class="task-header">${task.title}</div>
            <div class="task-body">
            <div class="task-info">
                <input type="text" value="${task.date}" readonly>
                <input type="text" value="${task.assignee}" readonly>
            </div>
            <div class="task-desc">${task.description}</div>
            </div>
            <div class="task-footer">
            <div class="task-actions">
                <button class="star" onclick="updateTask(${div.id})"><img src="./static/star.svg" alt="Descripción de la imagen SVG" width="16" height="16"></button>
                <button class="delete" onclick="eliminarTarea('${div.id}')"><img src="./static/del.svg" alt="Descripción de la imagen SVG" width="16" height="16"></button>
            </div>
            <button class="task-send" onclick="moverTarea('${div.id}')">➔</button>
            </div>`
    }
    else{
        div.innerHTML = `
            <div class="task-header">${task.title}</div>
            <div class="task-body">
            <div class="task-info">
                <input type="text" value="${task.date}" readonly>
                <input type="text" value="${task.assignee}" readonly>
            </div>
            <div class="task-desc">${task.description}</div>
            </div>
            <div class="task-footer">
            <div class="task-actions">
                <button class="priority" onclick="updateTask(${div.id})"><img src="./static/star.svg" alt="Descripción de la imagen SVG" width="16" height="16"></button>
                <button class="delete" onclick="eliminarTarea('${div.id}')"><img src="./static/del.svg" alt="Descripción de la imagen SVG" width="16" height="16"></button>
            </div>
            <button class="task-send" onclick="moverTarea('${div.id}')">➔</button>
            </div>`
    }
    

    return div;
}

document.getElementById("form").addEventListener("submit", function(event) {
    event.preventDefault() // Evita que recargue la página

    const form = event.target
    const datos = new FormData(form)

     // Verificar campos vacíos
    const requiredFields = ["title", "date", "assignee", "description", "color"];
    for (let field of requiredFields) {
        const value = datos.get(field)?.trim();
        if (!value) {
            alert(`El campo "${field}" es obligatorio.`);
            return; // Detiene el envío si hay un campo vacío
        }
    }

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
            todo.childNodes[3].appendChild(crearTareaNodo(data))
            document.getElementById("formu").close()
            Toastify({
                text: "Task created successfully",
                className: "info",
                gravity: "top",
                close: true,
                style: {
                    background: "linear-gradient(135deg, var(--verde-hover), var(--verde-principal))",
                    'border-radius': "2rem"
                }
                }).showToast();
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
                todo.childNodes[3].appendChild(crearTareaNodo(task))
            } else if (task.state === 'doing') {
                doing.childNodes[3].appendChild(crearTareaNodo(task))
            } else {
                done.childNodes[3].appendChild(crearTareaNodo(task))
            }
        }

    })
})

function byPriority(name) {
    let tasks = document.getElementById(name).childNodes[3]
    fetch(`http://127.0.0.1:8000/getByPriority/${name}`).then((response)=>{
        return response.json()
    }).then((data)=>{
        console.log(data)
        tasks.textContent = ""
        for(task of data){
            tasks.appendChild(crearTareaNodo(task))
        }
        
    })
}

function byDate(name) {
    let tasks = document.getElementById(name).childNodes[3]
    fetch(`http://127.0.0.1:8000/getByDate/${name}`).then((response)=>{
        return response.json()
    }).then((data)=>{
        console.log(data)
        tasks.textContent = ""
        for(task of data){
            tasks.appendChild(crearTareaNodo(task))
        }
        
    })
}

interact('.task-card').draggable({
  listeners: {
    start (event) {
      const task = event.target;
      task.classList.add('dragging');

      // Guardar posición inicial
      const rect = task.getBoundingClientRect();
      task.dataset.startLeft = rect.left;
      task.dataset.startTop = rect.top;
      task.dataset.originalParent = event.target.parentNode.parentNode.id

      // Mover al body
      document.body.appendChild(task);

      // Posicionarlo absolutamente donde estaba
      Object.assign(task.style, {
        left: `${rect.left}px`,
        top: `${rect.top}px`,
        width: `${rect.width}px`,
        height: `${rect.height}px`
      });
    },

    move (event) {
      const task = event.target;
      const x = (parseFloat(task.getAttribute('data-x')) || 0) + event.dx;
      const y = (parseFloat(task.getAttribute('data-y')) || 0) + event.dy;

      task.style.transform = `translate(${x}px, ${y}px)`;
      task.setAttribute('data-x', x);
      task.setAttribute('data-y', y);
    },

    end (event) {
      const task = event.target;

      // Si no fue aceptada en dropzone, devolver al original
      const droppedInTasks = task.parentElement.classList.contains('tasks');

      if (!droppedInTasks) {
        const originalParent = document.getElementById(task.dataset.originalParent);
        if (originalParent) {
            originalParent.appendChild(task);
        } else {
            console.warn('No se encontró el contenedor original para la tarea:', task);
        }
      }

      // Reset transform y z-index
      task.style.transform = '';
      task.removeAttribute('data-x');
      task.removeAttribute('data-y');
      task.classList.remove('dragging');

      // Aquí se reposiciona automáticamente en la dropzone por interact
    }
  }
});

interact('.tasks').dropzone({
  accept: '.task-card',
  overlap: 0.5,
  async ondrop(event) {
    const task = event.relatedTarget;
    const targetColumn = event.target;

    // Eliminar estilos de posición y tamaño
    task.style.position = '';
    task.style.left = '';
    task.style.top = '';
    task.style.width = '';
    task.style.height = '';
    task.style.zIndex = '';
    task.style.transform = '';
    task.removeAttribute('data-x');
    task.removeAttribute('data-y');

    task.classList.remove('dragging');

    const newState = targetColumn.closest('.column').id;
    const response = await fetch(`http://127.0.0.1:8000/changeStateTask/${newState}/${task.id}`,{
                method: 'PUT'})

    if (response.ok) {
        targetColumn.appendChild(task)
    }
  }
});
