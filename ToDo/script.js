//Поиск и объявление элементов
const form = document.querySelector('#forma')
const taskInput = document.querySelector('#taskInput')
const tasksList = document.querySelector('#spisok')
const emptyList = document.querySelector('.work-start__wrap')
let color = ''

//Вызов функций
form.addEventListener('submit', addTask)
tasksList.addEventListener('click', deleteTask)
tasksList.addEventListener('click', doneTask)
form.addEventListener('click', getColor)

//Создаем массив для данных
let tasks = []


//Достаем данные из localStorage
if(localStorage.getItem('tasks')){
    tasks = JSON.parse(localStorage.getItem('tasks'))

    //Рендерим задачи
    tasks.forEach(task => renderTask(task))
}


checkList()

//Добавление дела
function addTask(event) {
    //Отменяем перезагрузку при отправке формы
    event.preventDefault()

    //Текст задачи из инпута
    let taskText = taskInput.value

    //Описываем задачу в виде объекта
    const newTask = {
        id: Date.now(),
        text: taskText,
        status: false,
        color: color
    }

    //Добавляем задачу в массив с задачами tasks
    tasks.push(newTask)

    //Формируем cssClass
    const cssClass = newTask.done ? "task-title--done" : "false";

    let taskHTML = `
        <li id = '${newTask.id}' class="work__wrap">
            <div class="name-work__wrap" id='${newTask.id}'>
                <input type="checkbox" id="checkWork" data-action="checked">
                <div class="importance-work ${newTask.color}"></div>
                <h2 class="${cssClass}">${newTask.text}</h2>
            </div>
            <div class="delete-work__wrap">
                <button id="deleteWork" data-action="delete">
                    <span data-action="delete">Удалить</span>
                </button>
            </div>
        </li>
    `
    //Добавляем разметку в HTML
    tasksList.insertAdjacentHTML('beforeend', taskHTML)

    //Очищаем инпут и задаем фокус
    taskInput.value = ''
    taskInput.focus()

    //Очищаем значение color
    color = ''

    checkList()
    saveLocal()
}
//Удаление дела
function deleteTask(event) {
    if (event.target.dataset.action === 'delete') {
        //Ищем родителя
        const parenNode = event.target.closest('.work__wrap')

        //Определяем ID задачи
        const id = parenNode.id

        //Находим индекс методом findIndex и удаляем его
        const index = tasks.findIndex(task => tasks.id == id)

        //Удаляем задачу из массива методом splice
        tasks.splice(index, 1)

        //Удаляем задачу из разметки
        parenNode.remove()
    }

    checkList()
    saveLocal()
}
//Выполнение дела
function doneTask(event) {
    if (event.target.dataset.action !== 'checked') return;
    const parenNode = event.target.closest('.name-work__wrap')
    parenNode.classList.toggle('done')
    

    //Определяем ID дела
    const id = parenNode.id

    //
    const task = tasks.find((task) => task.id == id)

    //Меняем статус выполненного дела на true
    task.status = !task.status
    saveLocal()
}
//Проверка и получение цвета
function getColor(event) {
    if (event.target.className === 'importance') {
        color = event.target.dataset.color
        return color
    }
}
//Проверка на пустой список
function checkList(){
    if(tasks.length == 0){
        const workStartHTML = `
        <li class="work-start__wrap">
            <div class="title-work__wrap">
                <h1>Список дел пуст :(</h1>
                <p>Добавьте новые</p>
            </div>
            <img src="./image/clear_work.svg" alt="img">
        </li>
        `
        tasksList.insertAdjacentHTML('afterbegin', workStartHTML)
    }

    if(tasks.length > 0){
        const workStartElement = document.querySelector('.work-start__wrap')
        workStartElement ? workStartElement.remove() : null
    }
}
//Сохранение в localStorage разметки
function saveLocal(){
    localStorage.setItem('tasks', JSON.stringify(tasks))
}
//Рендеринг разметки из хранилища
function renderTask(task){
    const cssClass = task.done ? "task-title--done" : "false";
    let taskHTML = `
        <li id = '${task.id}' class="work__wrap">
            <div class="name-work__wrap" id='${task.id}'>
                <input type="checkbox" id="checkWork" data-action="checked">
                <div class="importance-work ${task.color}"></div>
                <h2 class="${cssClass}">${task.text}</h2>
            </div>
            <div class="delete-work__wrap">
                <button id="deleteWork" data-action="delete">
                    <span data-action="delete">Удалить</span>
                </button>
            </div>
        </li>
    `
    tasksList.insertAdjacentHTML('beforeend', taskHTML)
}