//Поиск и объявление элементов
const form = document.querySelector('#forma')
const taskInput = document.querySelector('#taskInput')
const tasksList = document.querySelector('#spisok')
const emptyList = document.querySelector('.work-start__wrap')


form.addEventListener('submit', addTask)
tasksList.addEventListener('click', deleteTask)
tasksList.addEventListener('click', doneTask)
let color = ''
form.addEventListener('click', getColor)


//Добавление дела
function addTask(event) {
    //Отменяем перезагрузку при отправке формы
    event.preventDefault()

    let taskText = `
        <li class="work__wrap">
            <div class="name-work__wrap">
                <input type="checkbox" id="checkWork" data-action="checked">
                <div class="importance-work ${color}"></div>
                <h2>${taskInput.value}</h2>
            </div>
            <div class="delete-work__wrap">
                <button id="deleteWork" data-action="delete">
                    <span data-action="delete">Удалить</span>
                </button>
            </div>
        </li>
    `
    //Добавляем разметку в HTML
    tasksList.insertAdjacentHTML('beforeend', taskText)

    //Очищаем инпут и задаем фокус
    taskInput.value = ''
    taskInput.focus()

    //Очищаем значение color
    color = ''

    //Убираем первый элемент в списке
    if (tasksList.children.length > 1) {
        emptyList.classList.add('none')
    }
}
//Удаление дела
function deleteTask(event) {
    if (event.target.dataset.action === 'delete') {
        //Ищем родителя
        const parenNode = event.target.closest('.work__wrap')
        parenNode.remove()
    }

    if (tasksList.children.length == 1) {
        emptyList.classList.remove('none')
    }
}
//Выполнение дела
function doneTask(event) {
    if (event.target.dataset.action === 'checked') {
        const parenNode = event.target.closest('.name-work__wrap')
        parenNode.classList.toggle('done')
    }
}
//Проверка и получение цвета
function getColor(event) {
    if (event.target.className === 'importance') {
        color = event.target.dataset.color
        return color
    }
}







// function sposobTwo(){

//     //Добавление задач в список дел
// const form = document.querySelector('#form')
// const taskInput = document.querySelector('#taskInput')
// const tasksList = document.querySelector('#spisok')
// const emptyList = document.querySelector('#emptyList')

// //Добавление задачи
// form.addEventListener('submit', addTask)

// //Удаление задачи
// tasksList.addEventListener('click' , deleteTask)

// //Выполненные задачи
// tasksList.addEventListener('click', doneTask)

// function addTask(event){ 
//     //Отменяем отправку формы 
//     event.preventDefault()

//     //Достаем текст задачи из поля ввода
//     const taskText = taskInput.value

//     //Формируем разметку для новой задачи
//     const taskHTML = `
//         <li class='list-group-item'>
//             <h3 id="todo">${taskText}</h3>
//             <div class="buttons_setting">
//                 <div data-action='done' id="trueButton">+</div>
//                 <div data-action='delete' id="falseButton">-</div>
//             </div>
//         </li>
//     `

//     //Добавление задачи на страницу
//     tasksList.insertAdjacentHTML('beforeend', taskHTML)

//     //Очищаем инпут и задаем фокус
//     taskInput.value = ''
//     taskInput.focus()

//     //Удаляем первый элемент
//     if(tasksList.children.length > 1){
//         emptyList.classList.add('none')
//     }
// }

// function deleteTask(event){
//     //Делаем проверку на поиск кнопки
//     if(event.target.dataset.action === 'delete'){
//         const parenNode = event.target.closest('.list-group-item') // Ищет среди родителей(снаружи, в который вложен элемент)
//         parenNode.remove()
//     }

//     //Показываем первый элемент
//     if(tasksList.children.length == 1){
//         emptyList.classList.remove('none')
//     }
// }

// function doneTask(event){
//     if(event.target.dataset.action === 'done'){
//         const parenNode = event.target.closest('li')
//         //Выполняем поиск по родителям
//         const taskTitle = parenNode.querySelector('#todo')
//         taskTitle.classList.toggle('doneTask')
//     }
// }
// }


// //Добавление задач в список дел
