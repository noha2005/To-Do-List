const input = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// تحميل المهام من localStorage عند بداية الصفحة
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
tasks.forEach(taskText => addTaskToDOM(taskText));

// تمكين/تعطيل الزر حسب وجود نص
input.addEventListener('input', () => {
  addBtn.disabled = input.value.trim() === '';
});

// إضافة مهمة
addBtn.addEventListener('click', () => {
  const taskText = input.value.trim();
  if(taskText !== ''){
    addTaskToDOM(taskText);
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    input.value = '';
    addBtn.disabled = true;
  }
});

// دالة لإضافة المهمة للـDOM مع زر الحذف
function addTaskToDOM(taskText){
  const li = document.createElement('li');
  li.textContent = taskText;

  const delBtn = document.createElement('button');
  delBtn.textContent = '❌';
  delBtn.addEventListener('click', () => {
    li.remove();
    tasks = tasks.filter(t => t !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  });

  li.appendChild(delBtn);
  taskList.appendChild(li);
}
