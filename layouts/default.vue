<template>
  <div>
    <nav
      class="navbar header has-shadow is-primary"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <a
          class="navbar-item"
          href="/"
        >
          <img
            src="~assets/buefy.png"
            alt="Buefy"
            height="28"
          >
        </a>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a style="margin-top: 0;">
              <n-link class="button is-primary" to="/answer/" prefetch>Load Questionaire</n-link>
            </a>
            <a class="button is-primary" style="margin-bottom: 0;">
              <n-link class="button" to="/form-builder/" prefetch>Create new Questionaire</n-link>
            </a>
          </div>
        </div>
      </div>
    </nav>

    <section class="main-content">

      <div class="container is-fluid">
        <nuxt />
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [
        {
          title: 'Home',
          icon: 'home',
          to: { name: 'index' }
        },
        {
          title: 'Inspire',
          icon: 'lightbulb',
          to: { name: 'inspire' }
        }
      ]
    }
  }
}
</script>
