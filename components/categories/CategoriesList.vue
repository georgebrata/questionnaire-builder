
<template>
  <aside class="column is-mobile categories-container" style="position: fixed;">
    <div class="columns">
      <div class="column is-one-third">
        <h1 class="menu-label pt1 pb1">Categories</h1>
      </div>
      <div class="column">
        <b-button
          size="is-small"
          type="is-text"
          icon-left="plus"
          class="is-pulled-right add-btn"
          @click="addCategory()"
        >Add category</b-button>
      </div>
    </div>
    <ul class="menu-list" v-if="categories.length > 0">
      <li v-for="category in categories" :key="category.categoryName">
        <category :category="category" @categoryEdit="editCategory" @categoryDelete="deleteCategory" @changeActiveCategory="changeActiveCategory"></category>
      </li>
    </ul>
    <div v-else>
      <div class="container columns">
        <div class="column is-half is-offset-one-quarter has-text-centered mt4">
          <h1 class="is-size-4">No categories 😱</h1>
          <p class="is-size-6">You must add a category before adding questions.</p>
          <b-button type="is-primary" icon-left="plus" class="is-fullwidth mt4" @click="addCategory()">Add category</b-button>
        </div>
      </div>
    </div>
    <div class="buttons mt4" v-if="categories.length > 0">
      <b-button type="is-success" class="mt4 publish-btn pl2 pr2" @click="publish()">
        👍 Publish Questionaire</b-button>
    </div>
  </aside>
</template>

<script>
import Category from "~/components/categories/Category";

export default {
  name: "CategoryList",
  components: {
    Category
  },
  methods: {
      addCategory: function() {
            this.$buefy.dialog.prompt({
                message: `Add new category`,
                inputAttrs: {
                    placeholder: "category name",
                    maxlength: 10
                },
                trapFocus: true,
                onConfirm: (value) => {
                    let newCategory = {
                        categoryId: Math.random().toString(36).substr(2, 9),
                        categoryName: value,
                        categorySlug: value.toLowerCase(),
                        categoryIndex: this.categories.length,
                        categoryDescription: ""
                    }
                    this.$emit("categoryAdd", newCategory)
                }
            })
      },
      editCategory: function(categoryId, newCategory) {
          this.$emit('categoryEdit', categoryId, newCategory);
      },
      deleteCategory: function(categoryId) {
          this.$emit('categoryDelete', categoryId);
      },
      changeActiveCategory: function(activeCategory) {
          this.$emit('changeActiveCategory', activeCategory);
      },
      publish:function() {
          this.$emit('publish')
      }
  },
  props: {
    categories: Array
  }
};
</script>

<style>
.publish-btn {
  position: fixed;
  bottom: 50px;
  left: 50px;
}
</style>
