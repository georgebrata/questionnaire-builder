<template>
  <section class="hero is-link is-fullheight-with-navbar">
    <div class="hero-body">
      <div class="container">
        <p class="title">Questionaire Builder</p>
        <p class="subtitle">Build your own questionaire in minutes 📄</p>
        <div class="buttons">
          <n-link class="button is-light is-large pl4 pr4" to="/form-builder/" prefetch><strong>👉 Start creating questions now</strong></n-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Card from "~/components/Card";

export default {
  layout: "homepage",
  name: "HomePage",

  components: {
    Card
  }
};
</script>
