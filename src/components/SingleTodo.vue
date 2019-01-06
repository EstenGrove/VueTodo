<template>
  <section class="main-wrapper">
    <main class="main-container">
      <div class="todo-display">
        <input type="text" name="task" id="task">
      </div>
    </main>
  </section>
</template>
<script>
import db from "@/firebase/init";
export default {
  name: "SingleTodo",
  data() {
    return {};
  }
};
</script>
<style scoped>
</style>
