// taskuni-prototype/js/app.js
document.addEventListener('DOMContentLoaded', function() {
    // Datos de ejemplo
    // const sampleSubjects = [
    //     // Array vacío - sin materias de ejemplo
    // ];

    const sampleCategories = [
        {
            id: 'school',
            name: 'Escolar',
            color: '#3a86ff'
        },
        {
            id: 'work',
            name: 'Trabajo',
            color: '#ef476f'
        },
        {
            id: 'personal',
            name: 'Personal',
            color: '#06d6a0'
        },
        {
            id: 'payments',
            name: 'Pagos',
            color: '#ffbe0b'
        }
    ];

    const sampleTasks = [
        {
            id: "1",
            title: "Preparar presentación final",
            description: "Crear slides para la presentación del proyecto final de programación",
            category: "school",
            dueDate: "2024-03-20",
            priority: "high",
            recurring: null,
            completed: false,
            createdAt: "2024-03-15"
        },
        {
            id: "2",
            title: "Pagar renta",
            description: "Realizar el pago mensual de la renta",
            category: "payments",
            dueDate: "2024-03-25",
            priority: "high",
            recurring: "monthly",
            completed: false,
            createdAt: "2024-03-01"
        },
        {
            id: "3",
            title: "Reunión de equipo",
            description: "Preparar agenda y materiales para la reunión semanal",
            category: "work",
            dueDate: "2024-03-18",
            priority: "medium",
            recurring: "weekly",
            completed: false,
            createdAt: "2024-03-15"
        },
        {
            id: "4",
            title: "Ir al gimnasio",
            description: "Sesión de entrenamiento de 1 hora",
            category: "personal",
            dueDate: "2024-03-16",
            priority: "low",
            recurring: "daily",
            completed: false,
            createdAt: "2024-03-15"
        },
        {
            id: "5",
            title: "Completar informe mensual",
            description: "Finalizar y enviar el informe de ventas del mes",
            category: "work",
            dueDate: "2024-03-31",
            priority: "medium",
            recurring: "monthly",
            completed: false,
            createdAt: "2024-03-01"
        }
        // Array vacío - sin tareas de ejemplo
    ];

    // Estado de la aplicación
    let state = {
        tasks: sampleTasks, // Inicializar con las tareas de ejemplo
        // subjects: [], // Inicializar con array vacío
        categories: sampleCategories, // Inicializar con las categorías por defecto
        // selectedSubject: 'all',
        selectedCategory: 'all',
        selectedPriority: 'all',
        searchQuery: '',
        currentView: 'day',
        selectedTask: null,
        theme: 'light'
    };

    // Elementos del DOM
    const elements = {
        taskList: document.getElementById('task-list'),
        taskDetail: document.getElementById('task-detail'),
        // subjectList: document.getElementById('subject-list'),
        categoryList: document.getElementById('category-list'),
        prioritySelect: document.getElementById('priority-select'),
        viewSelect: document.getElementById('view-select'),
        currentViewTitle: document.getElementById('current-view-title'),
        progressChart: document.getElementById('progress-chart'),
        completedCount: document.getElementById('completed-count'),
        pendingCount: document.getElementById('pending-count'),
        overdueCount: document.getElementById('overdue-count'),
        dayViewBtn: document.getElementById('day-view'),
        weekViewBtn: document.getElementById('week-view'),
        monthViewBtn: document.getElementById('month-view'),
        addTaskBtn: document.getElementById('add-task'),
        // addSubjectBtn: document.getElementById('add-subject'),
        addCategoryBtn: document.getElementById('add-category'),
        taskSearch: document.getElementById('task-search'),
        themeToggle: document.getElementById('theme-toggle'),
        taskModal: document.getElementById('task-modal'),
        // subjectModal: document.getElementById('subject-modal'),
        categoryModal: document.getElementById('category-modal'),
        closeModalBtn: document.getElementById('close-modal'),
        // closeSubjectModalBtn: document.getElementById('close-subject-modal'),
        closeCategoryModalBtn: document.getElementById('close-category-modal'),
        cancelTaskBtn: document.getElementById('cancel-task'),
        // cancelSubjectBtn: document.getElementById('cancel-subject'),
        cancelCategoryBtn: document.getElementById('cancel-category'),
        saveTaskBtn: document.getElementById('save-task'),
        // saveSubjectBtn: document.getElementById('save-subject'),
        saveCategoryBtn: document.getElementById('save-category'),
        taskForm: document.getElementById('task-form'),
        // subjectForm: document.getElementById('subject-form'),
        categoryForm: document.getElementById('category-form'),
        taskTitle: document.getElementById('task-title'),
        taskDescription: document.getElementById('task-description'),
        taskSubject: document.getElementById('task-subject'),
        taskCategory: document.getElementById('task-category'),
        taskDueDate: document.getElementById('task-due-date'),
        // taskEstimatedTime: document.getElementById('task-estimated-time'),
        taskPriority: document.getElementById('task-priority'),
        taskRecurring: document.getElementById('task-recurring'),
        taskAttachments: document.getElementById('task-attachments'),
        attachmentsPreview: document.getElementById('attachments-preview'),
        // subjectName: document.getElementById('subject-name'),
        // subjectColor: document.getElementById('subject-color'),
        categoryName: document.getElementById('category-name'),
        categoryColor: document.getElementById('category-color'),
        modalTitle: document.getElementById('modal-title'),
        bottomNavButtons: document.querySelectorAll('.nav-button')
    };

    // Inicialización
    function init() {
        // renderSubjects();
        renderCategories();
        renderTasks();
        updateStats();
        setupEventListeners();
        
        // Establecer fecha mínima para el input de fecha
        const today = new Date().toISOString().split('T')[0];
        elements.taskDueDate.min = today;
    }

    // Configurar event listeners
    function setupEventListeners() {
        // Cambiar vista
        elements.viewSelect.addEventListener('change', () => changeView(elements.viewSelect.value));

        // Filtrar tareas
        // elements.subjectList.addEventListener('click', handleSubjectFilter);
        elements.categoryList.addEventListener('click', handleCategoryFilter);
        elements.prioritySelect.addEventListener('change', handlePriorityFilter);
        elements.taskSearch.addEventListener('input', handleSearch);

        // Modal de tarea
        elements.addTaskBtn.addEventListener('click', openTaskModal);
        elements.closeModalBtn.addEventListener('click', closeTaskModal);
        elements.cancelTaskBtn.addEventListener('click', closeTaskModal);
        elements.taskForm.addEventListener('submit', handleTaskSubmit);

        // Modal de materia
        // elements.addSubjectBtn.addEventListener('click', openSubjectModal);
        // elements.closeSubjectModalBtn.addEventListener('click', closeSubjectModal);
        // elements.cancelSubjectBtn.addEventListener('click', closeSubjectModal);
        // elements.subjectForm.addEventListener('submit', handleSubjectSubmit);

        // Modal de categoría
        elements.addCategoryBtn.addEventListener('click', openCategoryModal);
        elements.closeCategoryModalBtn.addEventListener('click', closeCategoryModal);
        elements.cancelCategoryBtn.addEventListener('click', closeCategoryModal);
        elements.categoryForm.addEventListener('submit', handleCategorySubmit);

        // Adjuntos
        elements.taskAttachments.addEventListener('change', handleFileUpload);

        // Tema
        elements.themeToggle.addEventListener('click', toggleTheme);

        // Navegación inferior
        elements.bottomNavButtons.forEach(button => {
            button.addEventListener('click', () => {
                const view = button.getAttribute('data-view');
                // Aquí podrías implementar la lógica para cambiar vistas
                console.log(`Cambiar a vista: ${view}`);
                
                // Actualizar estado activo
                elements.bottomNavButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
        });
    }

    // Renderizar categorías
    function renderCategories() {
        elements.categoryList.innerHTML = '<li class="active" data-category="all">Todas</li>';
        
        state.categories.forEach(category => {
            const li = document.createElement('li');
            li.textContent = category.name;
            li.setAttribute('data-category', category.id);
            if (state.selectedCategory === category.id) {
                li.classList.add('active');
            }
            
            const colorIndicator = document.createElement('span');
            colorIndicator.style.display = 'inline-block';
            colorIndicator.style.width = '12px';
            colorIndicator.style.height = '12px';
            colorIndicator.style.borderRadius = '50%';
            colorIndicator.style.backgroundColor = category.color;
            colorIndicator.style.marginRight = '8px';
            
            li.prepend(colorIndicator);
            elements.categoryList.appendChild(li);
        });

        // Actualizar opciones en el formulario de tarea
        elements.taskCategory.innerHTML = '<option value="">Selecciona una categoría</option>';
        state.categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.name;
            elements.taskCategory.appendChild(option);
        });
    }

    // Renderizar tareas
    function renderTasks() {
        elements.taskList.innerHTML = '';
        
        let filteredTasks = [...state.tasks];
        
        // Filtrar por categoría
        if (state.selectedCategory !== 'all') {
            filteredTasks = filteredTasks.filter(task => task.category === state.selectedCategory);
        }
        
        // Filtrar por prioridad
        if (state.selectedPriority !== 'all') {
            filteredTasks = filteredTasks.filter(task => task.priority === state.selectedPriority);
        }
        
        // Filtrar por búsqueda
        if (state.searchQuery) {
            const query = state.searchQuery.toLowerCase();
            filteredTasks = filteredTasks.filter(task => 
                task.title.toLowerCase().includes(query) || 
                (task.description && task.description.toLowerCase().includes(query))
            );
        }
        
        // Ordenar por fecha límite (las más cercanas primero)
        filteredTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        
        // Mostrar mensaje si no hay tareas
        if (filteredTasks.length === 0) {
            const emptyMessage = document.createElement('p');
            emptyMessage.className = 'empty-message';
            
            // Verificar si hay filtros activos
            const hasActiveFilters = 
                // state.selectedSubject !== 'all' || 
                state.selectedCategory !== 'all' || 
                state.selectedPriority !== 'all' || 
                state.searchQuery !== '';
            
            if (hasActiveFilters) {
                emptyMessage.textContent = 'No se encontraron tareas con los filtros seleccionados';
            } else {
                emptyMessage.textContent = 'Actualmente no tienes ninguna tarea pendiente';
            }
            
            elements.taskList.appendChild(emptyMessage);
            return;
        }
        
        // Renderizar cada tarea
        filteredTasks.forEach(task => {
            const taskElement = createTaskElement(task);
            elements.taskList.appendChild(taskElement);
        });
    }

    // Crear elemento de tarea
    function createTaskElement(task) {
        const taskElement = document.createElement('div');
        taskElement.className = `task-card ${task.priority}-priority`;
        if (task.completed) {
            taskElement.classList.add('completed');
        }
        
        // Formatear fecha
        const dueDate = new Date(task.dueDate);
        const formattedDate = dueDate.toLocaleDateString('es-ES', {
            weekday: 'short',
            day: 'numeric',
            month: 'short'
        });
        
        // Calcular días restantes
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const timeDiff = dueDate - today;
        const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        
        let dateInfo = formattedDate;
        if (daysDiff === 0) {
            dateInfo = 'Hoy';
        } else if (daysDiff === 1) {
            dateInfo = 'Mañana';
        } else if (daysDiff < 0) {
            dateInfo = `Vencido ${Math.abs(daysDiff)} días`;
        }
        
        taskElement.innerHTML = `
            <div class="task-card-header">
                <div>
                    <h3 class="task-title">${task.title}</h3>
                </div>
                <div class="task-due-date">
                    <i class="far fa-calendar-alt"></i>
                    <span>${dateInfo}</span>
                </div>
            </div>
            <div class="task-card-body">
                ${task.description || ''}
            </div>
            <div class="task-card-footer">
                <span class="task-category">${getCategoryName(task.category)}</span>
                <div class="task-actions">
                    <button class="complete-btn" data-id="${task.id}">
                        <i class="far ${task.completed ? 'fa-check-square' : 'fa-square'}"></i>
                    </button>
                    <button class="edit-btn" data-id="${task.id}">
                        <i class="far fa-edit"></i>
                    </button>
                    <button class="delete-btn" data-id="${task.id}">
                        <i class="far fa-trash-alt"></i>
                    </button>
                </div>
            </div>
        `;
        
        // Agregar event listeners a los botones
        taskElement.querySelector('.complete-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            toggleTaskCompletion(task.id);
        });
        
        taskElement.querySelector('.edit-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            editTask(task.id);
        });
        
        taskElement.querySelector('.delete-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            deleteTask(task.id);
        });
        
        // Mostrar detalles al hacer clic en la tarjeta
        taskElement.addEventListener('click', () => showTaskDetails(task.id));
        
        return taskElement;
    }

    // Mostrar detalles de la tarea
    function showTaskDetails(taskId) {
        const task = state.tasks.find(t => t.id === taskId);
        if (!task) return;
        
        state.selectedTask = taskId;
        
        const dueDate = new Date(task.dueDate);
        const formattedDate = dueDate.toLocaleDateString('es-ES', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
        
        elements.taskDetail.innerHTML = `
            <div class="detail-header">
                <button class="close-details-btn">
                    <i class="fas fa-times"></i>
                </button>
                <h3 class="task-detail-title">${task.title}</h3>
            </div>
            <div class="task-detail-meta">
                <div class="meta-item">
                    <span class="meta-label">Categoría</span>
                    <span class="meta-value">${getCategoryName(task.category)}</span>
                </div>
                <div class="meta-item">
                    <span class="meta-label">Prioridad</span>
                    <span class="meta-value">${getPriorityName(task.priority)}</span>
                </div>
                <div class="meta-item">
                    <span class="meta-label">Fecha límite</span>
                    <span class="meta-value">${formattedDate}</span>
                </div>
                <div class="meta-item">
                    <span class="meta-label">Recurrente</span>
                    <span class="meta-value">${getRecurringName(task.recurring)}</span>
                </div>
                <div class="meta-item">
                    <span class="meta-label">Estado</span>
                    <span class="meta-value">${task.completed ? 'Completada' : 'Pendiente'}</span>
                </div>
            </div>
            
            <div class="task-detail-description">
                <h4>Descripción</h4>
                <p>${task.description || 'No hay descripción disponible'}</p>
            </div>
            
            ${task.attachments && task.attachments.length > 0 ? `
            <div class="task-detail-attachments">
                <h4 class="attachments-title">Archivos adjuntos</h4>
                ${task.attachments.map(file => `
                    <div class="attachment-item">
                        <i class="fas fa-file-alt attachment-icon"></i>
                        <span class="attachment-name">${file.name}</span>
                        <button class="download-btn" data-file="${file.name}">
                            <i class="fas fa-download"></i>
                        </button>
                    </div>
                `).join('')}
            </div>
            ` : ''}
            
            <div class="task-detail-actions">
                <button class="primary-button complete-detail-btn" data-id="${task.id}">
                    ${task.completed ? 'Marcar como pendiente' : 'Marcar como completada'}
                </button>
                <button class="secondary-button edit-detail-btn" data-id="${task.id}">
                    Editar tarea
                </button>
            </div>
        `;
        
        // Agregar event listeners a los botones
        elements.taskDetail.querySelector('.complete-detail-btn').addEventListener('click', () => {
            toggleTaskCompletion(task.id);
        });
        
        elements.taskDetail.querySelector('.edit-detail-btn').addEventListener('click', () => {
            editTask(task.id);
        });

        // Agregar event listener al botón de cerrar
        elements.taskDetail.querySelector('.close-details-btn').addEventListener('click', () => {
            closeTaskDetails();
        });
        
        // Mostrar panel de detalles en móvil
        document.querySelector('.detail-panel').classList.add('active');
    }

    // Cerrar detalles de la tarea
    function closeTaskDetails() {
        elements.taskDetail.innerHTML = '<p class="empty-message">Selecciona una tarea para ver los detalles</p>';
        state.selectedTask = null;
        document.querySelector('.detail-panel').classList.remove('active');
    }

    // Actualizar estadísticas
    function updateStats() {
        const completed = state.tasks.filter(task => task.completed).length;
        const pending = state.tasks.filter(task => !task.completed).length;
        const overdue = state.tasks.filter(task => {
            if (task.completed) return false;
            const dueDate = new Date(task.dueDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return dueDate < today;
        }).length;
        
        elements.completedCount.textContent = completed;
        elements.pendingCount.textContent = pending;
        elements.overdueCount.textContent = overdue;
        
        // Actualizar gráfico de progreso
        renderProgressChart();
    }

    // Renderizar gráfico de progreso
    function renderProgressChart() {
        const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
        const today = new Date();
        const currentDay = today.getDay(); // 0 (Domingo) a 6 (Sábado)
        
        // Obtener el lunes de la semana actual
        const monday = new Date(today);
        monday.setDate(today.getDate() - (today.getDay() + 6) % 7);
        monday.setHours(0, 0, 0, 0);
        
        // Calcular tareas completadas por día
        const dailyCompleted = Array(7).fill(0);
        const dailyTotal = Array(7).fill(0);
        
        state.tasks.forEach(task => {
            if (!task.completed) return;
            
            const completedDate = new Date(task.completedAt || task.dueDate);
            completedDate.setHours(0, 0, 0, 0);
            
            const diffDays = Math.floor((completedDate - monday) / (1000 * 60 * 60 * 24));
            
            if (diffDays >= 0 && diffDays < 7) {
                dailyCompleted[diffDays]++;
            }
        });
        
        // Calcular altura máxima para el gráfico
        const maxCompleted = Math.max(...dailyCompleted, 1);
        
        // Renderizar barras
        elements.progressChart.innerHTML = '';
        
        days.forEach((day, index) => {
            const barContainer = document.createElement('div');
            barContainer.className = 'progress-bar-container';
            
            const bar = document.createElement('div');
            bar.className = 'progress-bar';
            
            const height = (dailyCompleted[index] / maxCompleted) * 100;
            bar.style.height = `${height}%`;
            
            const label = document.createElement('div');
            label.className = 'progress-bar-label';
            label.textContent = day;
            
            barContainer.appendChild(bar);
            barContainer.appendChild(label);
            elements.progressChart.appendChild(barContainer);
        });
    }

    // Cambiar vista (día, semana, mes)
    function changeView(view) {
        state.currentView = view;
        
        switch (view) {
            case 'day':
                elements.currentViewTitle.textContent = 'Tareas del Día';
                break;
            case 'week':
                elements.currentViewTitle.textContent = 'Tareas de la Semana';
                break;
            case 'month':
                elements.currentViewTitle.textContent = 'Tareas del Mes';
                break;
        }
        
        renderTasks();
    }

    // Manejar filtros
    function handleSubjectFilter(e) {
        if (e.target.tagName === 'LI') {
            const subjectId = e.target.getAttribute('data-subject');
            state.selectedSubject = subjectId;
            
            // Actualizar clase activa
            document.querySelectorAll('#subject-list li').forEach(li => {
                li.classList.remove('active');
            });
            e.target.classList.add('active');
            
            renderTasks();
        }
    }

    function handleCategoryFilter(e) {
        if (e.target.tagName === 'LI') {
            const category = e.target.getAttribute('data-category');
            state.selectedCategory = category;
            
            // Actualizar clase activa
            document.querySelectorAll('#category-list li').forEach(li => {
                li.classList.remove('active');
            });
            e.target.classList.add('active');
            
            renderTasks();
        }
    }

    function handlePriorityFilter(e) {
        const priority = e.target.value;
        state.selectedPriority = priority;
        renderTasks();
    }

    function handleSearch(e) {
        state.searchQuery = e.target.value.trim();
        renderTasks();
    }

    // Manejar tareas
    function toggleTaskCompletion(taskId) {
        const taskIndex = state.tasks.findIndex(t => t.id === taskId);
        if (taskIndex === -1) return;
        
        state.tasks[taskIndex].completed = !state.tasks[taskIndex].completed;
        if (state.tasks[taskIndex].completed) {
            state.tasks[taskIndex].completedAt = new Date().toISOString().split('T')[0];
        } else {
            delete state.tasks[taskIndex].completedAt;
        }
        
        renderTasks();
        updateStats();
        
        // Si estamos viendo los detalles de esta tarea, actualizarlos
        if (state.selectedTask === taskId) {
            showTaskDetails(taskId);
        }
    }

    function editTask(taskId) {
        const task = state.tasks.find(t => t.id === taskId);
        if (!task) return;
        
        openTaskModal();
        elements.modalTitle.textContent = 'Editar Tarea';
        
        // Llenar formulario con datos de la tarea
        elements.taskTitle.value = task.title;
        elements.taskDescription.value = task.description || '';
        elements.taskCategory.value = task.category;
        elements.taskDueDate.value = task.dueDate;
        elements.taskPriority.value = task.priority;
        elements.taskRecurring.value = task.recurring || 'none';
        
        // Guardar el ID de la tarea que estamos editando
        elements.taskForm.dataset.editingTaskId = taskId;
    }

    function deleteTask(taskId) {
        if (confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
            state.tasks = state.tasks.filter(t => t.id !== taskId);
            renderTasks();
            updateStats();
            
            // Si estamos viendo los detalles de esta tarea, limpiar el panel
            if (state.selectedTask === taskId) {
                elements.taskDetail.innerHTML = '<p class="empty-message">Selecciona una tarea para ver los detalles</p>';
                state.selectedTask = null;
            }
        }
    }

    // Manejar modales
    function openTaskModal() {
        elements.taskModal.classList.add('active');
    }

    function closeTaskModal() {
        elements.taskModal.classList.remove('active');
        elements.taskForm.reset();
        delete elements.taskForm.dataset.editingTaskId;
        elements.attachmentsPreview.innerHTML = '';
        elements.modalTitle.textContent = 'Nueva Tarea';
    }

    function openSubjectModal() {
        elements.subjectModal.classList.add('active');
    }

    function closeSubjectModal() {
        elements.subjectModal.classList.remove('active');
        elements.subjectForm.reset();
    }

    // Manejar envío de formularios
    function handleTaskSubmit(e) {
        e.preventDefault();
        
        const taskData = {
            title: elements.taskTitle.value.trim(),
            description: elements.taskDescription.value.trim(),
            category: elements.taskCategory.value,
            dueDate: elements.taskDueDate.value,
            priority: elements.taskPriority.value,
            recurring: elements.taskRecurring.value === 'none' ? null : elements.taskRecurring.value,
            completed: false,
            createdAt: new Date().toISOString().split('T')[0]
        };
        
        // Validación básica
        if (!taskData.title || !taskData.subject || !taskData.category || !taskData.dueDate) {
            alert('Por favor completa los campos obligatorios (marcados con *)');
            return;
        }
        
        // Si estamos editando una tarea existente
        if (elements.taskForm.dataset.editingTaskId) {
            const taskId = elements.taskForm.dataset.editingTaskId;
            const taskIndex = state.tasks.findIndex(t => t.id === taskId);
            
            if (taskIndex !== -1) {
                // Mantener algunos datos originales
                taskData.completed = state.tasks[taskIndex].completed;
                taskData.createdAt = state.tasks[taskIndex].createdAt;
                
                // Actualizar la tarea
                state.tasks[taskIndex] = { ...state.tasks[taskIndex], ...taskData };
            }
        } else {
            // Crear nueva tarea
            const newTask = {
                id: Date.now().toString(),
                ...taskData
            };
            
            state.tasks.push(newTask);
        }
        
        closeTaskModal();
        renderTasks();
        updateStats();
    }

    function handleSubjectSubmit(e) {
        e.preventDefault();
        
        const subjectName = elements.subjectName.value.trim();
        const subjectColor = elements.subjectColor.value;
        
        if (!subjectName) {
            alert('Por favor ingresa un nombre para la materia');
            return;
        }
        
        const newSubject = {
            id: Date.now().toString(),
            name: subjectName,
            color: subjectColor
        };
        
        state.subjects.push(newSubject);
        closeSubjectModal();
        renderSubjects();
    }

    // Manejar carga de archivos
    function handleFileUpload(e) {
        elements.attachmentsPreview.innerHTML = '';
        
        Array.from(e.target.files).forEach(file => {
            const preview = document.createElement('div');
            preview.className = 'attachment-preview';
            preview.innerHTML = `
                <i class="fas fa-file-alt"></i>
                <span>${file.name}</span>
            `;
            elements.attachmentsPreview.appendChild(preview);
        });
    }

    // Cambiar tema
    function toggleTheme() {
        state.theme = state.theme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', state.theme);
        
        // Cambiar icono
        const icon = elements.themeToggle.querySelector('i');
        icon.classList.toggle('fa-moon');
        icon.classList.toggle('fa-sun');
    }

    // Funciones auxiliares
    function getCategoryName(category) {
        switch (category) {
            case 'school': return 'Escolar';
            case 'work': return 'Trabajo';
            case 'personal': return 'Personal';
            case 'payments': return 'Pagos';
            default: return 'Otro';
        }
    }

    function getPriorityName(priority) {
        switch (priority) {
            case 'high': return 'Alta';
            case 'medium': return 'Media';
            case 'low': return 'Baja';
            default: return 'No especificada';
        }
    }

    function getRecurringName(recurring) {
        switch (recurring) {
            case 'daily': return 'Diaria';
            case 'weekly': return 'Semanal';
            case 'monthly': return 'Mensual';
            default: return 'No recurrente';
        }
    }

    // Manejar modales de categoría
    function openCategoryModal() {
        elements.categoryModal.classList.add('active');
    }

    function closeCategoryModal() {
        elements.categoryModal.classList.remove('active');
        elements.categoryForm.reset();
    }

    // Manejar envío de formulario de categoría
    function handleCategorySubmit(e) {
        e.preventDefault();
        
        const categoryName = elements.categoryName.value.trim();
        const categoryColor = elements.categoryColor.value;
        
        if (!categoryName) {
            alert('Por favor ingresa un nombre para la categoría');
            return;
        }
        
        const newCategory = {
            id: Date.now().toString(),
            name: categoryName,
            color: categoryColor
        };
        
        state.categories.push(newCategory);
        closeCategoryModal();
        renderCategories();
    }

    // Inicializar la aplicación
    init();
});