<template>
  <section class="wrapper">
    <main class="container">
      <h2 class="title">Todos</h2>
      <p class="para">Create something to do!</p>
      <button class="get-started" @click.prevent="startList">Get Started</button>
    </main>
  </section>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {};
  },
  methods: {
    startList() {
      this.$router.push({ name: "AddTask" });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
.wrapper {
  margin: 2rem auto;
  max-width: 90vw;
  min-height: 90vh;
  font-family: "Raleway";
}
.container {
  width: 100%;
  height: 100%;
  padding: 2% 5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.title {
  font-size: 4rem;
  color: #aaa;
  font-weight: 100;
  text-align: center;
  margin-bottom: 3rem;
}
.para {
  font-size: 1.5rem;
  color: #aaa;
  font-weight: 100;
  text-align: center;
}
router-link {
  width: 20rem;
  text-decoration: none;
}
.get-started {
  display: block;
  margin: 2rem auto;
  width: 20rem;
  height: 3rem;
  padding: 0.5rem 1.2rem;
  background: #8a5cea;
  color: #fff;
  border: none;
  outline: none;
  font-size: 1.2rem;
  text-decoration: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}
.get-started:hover {
  transform: scale(1.06);
}
</style>
