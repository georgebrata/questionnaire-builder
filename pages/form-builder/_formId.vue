<template>
  <div>
    <section class="main-content columns section pt2">
      <categories-list
        :categories="cats"
        @categoryAdd="addCategory"
        @categoryEdit="editCategory"
        @categoryDelete="delCategory"
        @changeActiveCategory="changeActiveCategory"
        @publish="publishForm"
      ></categories-list>
      <question-list v-if="this.cats.length > 0"
        :questions="que.filter(question => question.questionCategory === activeCategory)"
        @questionAdd="addQuestion"
        @questionEdit="editQuestion"
        @questionDelete="delQuestion"
      ></question-list>
    </section>
  </div>
</template>

<script>
import Card from "~/components/Card";
import CategoriesList from "~/components/categories/CategoriesList";
import QuestionList from "~/components/questions/QuestionList";

export default {
  name: "HomePage",
  components: {
    Card,
    CategoriesList,
    QuestionList
  },
  mounted: function() {
    if(window.location.hash) {
      this.activeCategory = window.location.hash.substring(1);
    }
  },
  methods: {
    addCategory: function(newCategory) {
      this.cats.push(newCategory);
      this.activeCategory = newCategory.categorySlug;
      window.location.hash = newCategory.categorySlug;

      this.$buefy.toast.open("Category added succesfully.")
    },
    editCategory: function(categoryId, category) {
      let index = this.cats.findIndex(cat => cat.categoryId === categoryId)
      this.cats[index].categoryName = category.categoryName

      this.$buefy.toast.open("Category updated succesfully.")
    },
    delCategory: function(categoryId) {
      let index = this.cats.findIndex(cat => cat.categoryId === categoryId)

      for(let i=this.que.length - 1; i>=0; i--) {
        if(this.que[i].questionCategory === this.cats[index].categorySlug) {
          this.que.splice(i, 1);
        }
      }

      this.cats.splice(index, 1);

      this.$buefy.toast.open("Category removed succesfully.")
      if(this.cats.length > 0) {
        window.location.hash = this.cats[0].categorySlug;
      }
    },
    changeActiveCategory: function(newActiveCategory) {
      this.activeCategory = newActiveCategory;
    },
    addQuestion: function(newQuestion) {
      this.que.push(newQuestion);
      this.$buefy.toast.open("Question added succesfully.")
    },
    editQuestion: function(questionId, question) {
      let index = this.que.findIndex(q => q.questionId === question.questionId)
      this.que[index] = question

      this.$buefy.toast.open("Question updated succesfully.")
    },
    delQuestion: function(questionId) {
      let index = this.que.findIndex(q => q.questionId === questionId)
      this.que.splice(index, 1);

      this.$buefy.toast.open("Question removed succesfully.")
    },
    publishForm: function() {
      let test = {
        testId: Math.random().toString(36).substr(2, 9),
        categories: this.cats,
        questions: this.que
      }
      //POST Form Data
      console.log(JSON.stringify(test))
    }
  },
  data() {
    return {
      activeCategory: "",
      cats: [],
      que: []
    };
  }
};
</script>
<style>
.category .action-btn {
  opacity: 0;
}
.category:hover .action-btn {
  opacity: 1;
}

.add-btn {
  opacity: 0;
}

.questions-container:hover .add-btn,
.categories-container:hover .add-btn {
  opacity: 1;
}
</style>
