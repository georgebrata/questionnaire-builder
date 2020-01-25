<template>
  <aside class="column is-mobile categories-container" style="position: fixed; width: 20vw;">
    <div class="columns">
      <div class="column is-one-third">
        <h1 class="menu-label pt1 pb1">Categories</h1>
      </div>
    </div>
    <ul class="menu-list">
      <li v-for="category in categories" :key="category.categoryName">
        <nuxt-link :to='"/answer/#"+category.categorySlug' exact-active-class="is-active">
            <div class="columns category">
            <div class="column">
                {{ category.categoryName }}
            </div>
            </div>
        </nuxt-link>
      </li>
    </ul>
    <div class="buttons mt4">
      <b-button type="is-success" class="mt2" expanded @click="$emit('done')" v-if="this.answers.length > 0">
        🙌 I'm done
      </b-button>
      <b-button type="is-text" class="load-btn pl4 pr4" @click="openFormImporter">
        Load Questionaire
      </b-button>
    </div>
  </aside>
</template>

<script>

export default {
  name: "DisplayCategoryList",
  data() {
    return {
      isFormImporterOpen: false,
    }
  },
  watch:{
    $route (to, from){
      this.$emit("changeActiveCategory", to.hash.substring(1))
    }
  },
  methods: {
      changeActiveCategory: function(activeCategory) {
          this.$emit('changeActiveCategory', activeCategory);
      },
      openFormImporter: function() {
        this.$buefy.dialog.prompt({
            message: `Import form`,
            inputAttrs: {
                type: 'textarea'
            },
            trapFocus: true,
            onConfirm: (value) => this.$emit('importForm', value)
        })
      }
  },
  props: {
    categories: Array,
    answers: Array
  }
};
</script>

<style>
.load-btn {
  position: fixed;
  bottom: 50px;
  left: 50px;
}
</style>
