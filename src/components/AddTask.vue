<template>
  <section class="wrapper">
    <main class="container">
      <h4 class="title">Add a Task for the Day!</h4>
      <div class="add-container">
        <input type="text" id="addTask" placeholder="Create a task..." v-model="newTask">
        <button class="addTask" @click.prevent="addTask">Add+</button>
        <label for="taskType" class="taskType-label">Task Category</label>
        <select
          name="taskType"
          id="taskType"
          class="taskType"
          v-model="taskType"
          placeholder="Personal"
        >
          <option value="Personal">Personal</option>
          <option value="Work">Work</option>
        </select>
        <p class="err-message" v-if="this.feedBack">{{feedBack}}</p>
      </div>
      <section class="todoList-wrapper">
        <main class="todo-container">
          <div
            class="todo"
            v-for="(todo, index) in todos"
            @click="markAsDone(todo, id)"
            :key="todo.id"
            :index="index"
            :class="{isDone: isDone}"
          >
            <h6 class="todo-text" :class="{isDone: todo[isDone]}">{{todo.task}}</h6>
            <div class="displayType isPersonal" v-if="todo.type == 'Personal'">{{todo.type}}</div>
            <div class="displayType isWork" v-else>{{todo.type}}</div>
            <svg class="icon" @click.prevent="deleteTask(todo, index)">
              <path
                d="M3.389 7.113l1.101 10.908c0.061 0.461 2.287 1.977 5.51 1.979 3.225-0.002 5.451-1.518 5.511-1.979l1.102-10.908c-1.684 0.942-4.201 1.387-6.613 1.387-2.41 0-4.928-0.445-6.611-1.387zM13.168 1.51l-0.859-0.951c-0.332-0.473-0.692-0.559-1.393-0.559h-1.831c-0.7 0-1.061 0.086-1.392 0.559l-0.859 0.951c-2.57 0.449-4.434 1.64-4.434 2.519v0.17c0 1.547 3.403 2.801 7.6 2.801 4.198 0 7.601-1.254 7.601-2.801v-0.17c0-0.879-1.863-2.070-4.433-2.519zM12.070 4.34l-1.070-1.34h-2l-1.068 1.34h-1.7c0 0 1.862-2.221 2.111-2.522 0.19-0.23 0.384-0.318 0.636-0.318h2.043c0.253 0 0.447 0.088 0.637 0.318 0.248 0.301 2.111 2.522 2.111 2.522h-1.7z"
              ></path>
            </svg>
          </div>
        </main>
      </section>
    </main>
  </section>
</template>

<script>
import db from "@/firebase/init";

export default {
  name: "AddTask",
  data() {
    return {
      todos: [
        {
          task: "Check the oil",
          type: "Personal",
          id: 1,
          isDone: false,
          isSelected: false
        },
        {
          task: "Run unit tests",
          type: "Work",
          id: 2,
          isDone: false,
          isSelected: false
        }
      ],
      newTask: "",
      taskType: null,
      isDone: false,
      doneTodos: [],
      id: 3,
      feedBack: null,
      class: {
        isPersonal: false,
        isWork: false
      }
    };
  },
  methods: {
    changeClass() {
      // :style="[todo.isDone === true && todo.isSelected === true ? {'opacity': '.3'} : '']"
    },
    addTask(todo) {
      if (this.taskType) {
        this.feedBack = null;
        todo = {
          task: this.newTask,
          type: this.taskType,
          isDone: false,
          isSelected: false,
          id: this.id++
        };
        this.class = todo.type;
        this.todos.push(todo);
        this.newTask = "";
      } else {
        this.feedBack = "Please select a category type";
      }
    },
    markAsDone(todo, id) {
      todo = {
        task: todo.task,
        type: todo.type,
        isDone: true,
        isSelected: true,
        id: todo.id
      };
      console.log(todo);
      let selected = todo;
      this.doneTodos.push(selected);
      this.feedBack = `Task was marked as completed`;
      let Notice = setTimeout(() => {
        clearTimeout(Notice);
        this.feedBack = null;
      }, 3000);
    },
    deleteTask(todo, index) {
      this.todos.splice(index, 1);
      this.feedBack = `Task was marked as completed & removed`;
      let Notice = setTimeout(() => {
        clearTimeout(Notice);
        this.feedBack = null;
      }, 3000);
    }
  },
  created() {},
  computed: {
    notDoneTodos() {
      return this.todos.filter(todo => {
        return todo.isDone === false;
      });
    }
  },
  mounted() {
    if (localStorage.getItem("todos"))
      this.todos = JSON.parse(localStorage.getItem("todos"));
  },
  watch: {
    todos: {
      handler() {
        console.log("Todos have changed");
        window.localStorage.setItem("todos", JSON.stringify(this.todos));
      }
    }
  }
};
</script>

<style scoped>
*,
*::after,
*::before {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
html {
  font-size: 62.5%;
}
body {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.wrapper {
  max-width: 100vw;
  height: 100vh;
  font-family: "Raleway";
}
.container {
  width: 100%;
  height: 100%;
}
.title {
  text-align: center;
  font-size: 2rem;
  font-weight: 100;
  color: #aaa;
}
.add-container {
  margin-top: 3rem;
  padding: 0 15%;
  width: 100%;
  min-height: 10rem;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
#addTask,
.addTask,
#taskType {
  align-self: center;
  width: 20rem;
  height: 2rem;
  margin-bottom: 1rem;
}
#addTask {
  font-size: 1.7rem;
  color: #aaa;
  font-weight: 200;
  border-radius: 0.3rem;
  border: 1px solid #eaecef;
}
#addTask::placeholder {
  color: rgba(170, 170, 170, 0.4);
  font-weight: 200;
  padding-left: 0.3rem;
}
.addTask {
  height: 2.5rem;
  background: #8a5cea;
  border: none;
  outline: none;
  border-radius: 0.5rem;
  font-size: 1.3rem;
  color: #fff;
}
.addTask:hover {
  border: 1px solid #000;
  cursor: pointer;
}
.todoList-wrapper {
  width: 100%;
}
.taskType-label {
  text-align: center;
  margin-bottom: 0.2rem;
  color: #aaa;
}
.todo-container {
  margin: 0 auto;
  width: 80%;
  height: 20rem;
  padding: 2rem 3rem;
  border-radius: 0.3rem;
  border: 1px solid #eaecef;
}
.todo {
  margin-bottom: 0.3rem;
  position: relative;
  width: 100%;
  min-height: 3rem;
  padding: 0.3rem;
  border-radius: 0.3rem;
  border: 1px solid #222;
  display: flex;
  align-items: center;
  z-index: 2;
}
.todo::after {
  position: absolute;
  display: none;
  content: "Mark as Done";
  top: 3px;
  left: 5px;
  font-size: 0.7rem;
  word-wrap: wrap;
  color: #e84855;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}
.todo:hover::after {
  display: block;
}
.icon {
  display: block;
  width: 1.5rem;
  height: 1.5rem;
  position: absolute;
  top: 12px;
  right: 3px;
  fill: #e84855;
  stroke: #e84855;
  color: #222;
  z-index: 20;
}
.icon:hover {
  cursor: pointer;
}

.displayType {
  position: absolute;
  font-size: 0.6rem;
  color: #fff;
  top: 12px;
  right: 60px;
  padding: 5px 8px;
  border-radius: 0.3rem;
}
.isPersonal {
  background-color: #8a5cea;
}
.isWork {
  background-color: #00ff74;
}
.isDone {
  text-decoration: line-through;
  opacity: 0.4;
}
.err-message {
  margin-top: 1rem;
  margin-bottom: 1rem;
  color: #e84855;
  text-align: center;
}
@media screen and (max-width: 650px) {
  .todo-container {
    max-width: 100%;
    padding: 2rem 0.2rem;
  }
}
</style>

