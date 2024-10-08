

//ngăn không cho truy cập mã nguồn
document.addEventListener('keydown', function(e) {
    if (e.key === 'F12') {
        e.preventDefault();
        alert("Developer Tools are disabled!");
    }
});

//xử lý hiển thị mật khẩu
$(document).ready(function(){
    // Xử lý hiển thị/ẩn mật khẩu
    $('#eye').click(function(){
        $(this).toggleClass('open');
        if($(this).hasClass('open')){
            $(this).children('i').removeClass('bx-hide').addClass('bx-show');
            $('#password').attr('type', 'text');
        } else {
            $(this).children('i').removeClass('bx-show').addClass('bx-hide');
            $('#password').attr('type', 'password');
        }
    });

    // Xử lý đăng nhập
    $('#loginForm').submit(function(event) {
        event.preventDefault(); // Ngăn không cho form submit tự động
        
        // Lấy giá trị username và password
        const username = $('#username').val();
        const password = $('#password').val();
        
        // Giả sử kiểm tra username và password đúng
        if (username === "admin" && password === "1234") {
            window.location.href = "portal.html"; // Điều hướng đến trang portal
        } else {
            alert("Username hoặc password không đúng!");
        }
    });
});

// <!-- Add footer content here -->
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const todoLane = document.getElementById("todo-lane");

// Tải các task từ localStorage khi trang được tải lại
document.addEventListener("DOMContentLoaded", () => {
  loadTasks();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = input.value;

  if (!value) return;

  addTask(value);
  saveTasks();  // Lưu task vào localStorage sau khi thêm
  input.value = "";
});

const addTask = (taskContent) => {
  const newTask = document.createElement("p");
  newTask.classList.add("task");
  newTask.setAttribute("draggable", "true");
  newTask.innerText = taskContent;

  newTask.addEventListener("dragstart", () => {
    newTask.classList.add("is-dragging");
  });

  newTask.addEventListener("dragend", () => {
    newTask.classList.remove("is-dragging");
  });

  todoLane.appendChild(newTask);
};

// Lưu tất cả các task trong lane "TODO" vào localStorage
const saveTasks = () => {
  const tasks = [];
  document.querySelectorAll("#todo-lane .task").forEach((task) => {
    tasks.push(task.innerText);
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// Tải các task từ localStorage và thêm chúng vào lane "TODO"
const loadTasks = () => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((taskContent) => {
    addTask(taskContent);
  });
};

// Kéo và thả các task giữa các lane
const draggables = document.querySelectorAll(".task");
const droppables = document.querySelectorAll(".swim-lane");

draggables.forEach((task) => {
  task.addEventListener("dragstart", () => {
    task.classList.add("is-dragging");
  });
  task.addEventListener("dragend", () => {
    task.classList.remove("is-dragging");
  });
});

droppables.forEach((zone) => {
  zone.addEventListener("dragover", (e) => {
    e.preventDefault();

    const bottomTask = insertAboveTask(zone, e.clientY);
    const curTask = document.querySelector(".is-dragging");

    if (!bottomTask) {
      zone.appendChild(curTask);
    } else {
      zone.insertBefore(curTask, bottomTask);
    }
  });
});

const insertAboveTask = (zone, mouseY) => {
  const els = zone.querySelectorAll(".task:not(.is-dragging)");

  let closestTask = null;
  let closestOffset = Number.NEGATIVE_INFINITY;

  els.forEach((task) => {
    const { top } = task.getBoundingClientRect();

    const offset = mouseY - top;

    if (offset < 0 && offset > closestOffset) {
      closestOffset = offset;
      closestTask = task;
    }
  });

  return closestTask;
};
