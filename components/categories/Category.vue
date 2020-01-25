<template>
    <nuxt-link :to='"/form-builder/#"+category.categorySlug' exact-active-class="is-active">
        <div class="columns category">
        <div class="column">
            {{ category.categoryName }}
        </div>
        <div class="column">
          <b-button
            type="is-danger is-small"
            icon-right="delete"
            class="action-btn is-pulled-right"
            title="Delete category"
            @click="deleteCategory"
          />
          <b-button
            type="is-light is-small"
            icon-right="pencil"
            class="action-btn is-pulled-right mr1"
            title="Edit category"
            @click="editCategory"
          />
        </div>
        </div>
    </nuxt-link>
</template>

<script>
export default {
  props: {
    category: Object,
  },
  watch:{
    $route (to, from){
      this.$emit("changeActiveCategory", to.hash.substring(1))
    }
  },
  methods: {
    editCategory: function(e) {
      e.preventDefault();
      //edit question
      this.$buefy.dialog.prompt({
        message: `Rename category`,
        inputAttrs: {
            placeholder: this.category.categoryName,
            maxlength: 10
        },
        trapFocus: true,
        onConfirm: (value) => {
          let newCategory = Object.assign({}, this.category, {categoryName: value})
          this.$emit("categoryEdit", this.category.categoryId, newCategory)
        }
      })
    },
    deleteCategory: function(e) {
      e.preventDefault();
      //delete category
      this.$buefy.dialog.confirm({
          message: 'Remove this category and all the questions inside?',
          onConfirm: () => this.$emit("categoryDelete", this.category.categoryId)
      })
    }
  }
};
</script>


