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
              <use xlink:href="/src/sprite.svg#icon-github-with-circle"></use>
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
  width: 2.5rem;
  height: 2.5rem;
  position: absolute;
  top: 3px;
  right: 3px;
  fill: #222;
  stroke: #222;
  color: #222;
  z-index: 20;
}

.icon use {
  width: 2.5rem;
  height: 2.5rem;
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

