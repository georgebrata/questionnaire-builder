<template>
  <div class="container column is-9 is-offset-3 questions-container">
    <div class="columns">
      <div class="column is-two-thirds">
        <h1 class="menu-label pt1 pb1">{{questions.length}} Question{{questions.length > 1 || questions.length === 0 ? 's':''}}</h1>
      </div>
    </div>
    <div class="rows is-mobile" v-if="questions.length > 0">
      <display-question v-for="(question, index) in questions" :key="question.title" :question="question" @updateAnswer="updateAnswer"></display-question>
    </div>
  </div>
</template>

<script>
import DisplayQuestion from "~/components/display/DisplayQuestion";

export default {
  name: "DisplayQuestionList",
  components: {
    DisplayQuestion
  },
  props: {
    questions: Array
  },
  data() {
    return {}
  },
  methods: {
    updateAnswer: function(question, answerId, answerValue) {
        this.$emit('updateAnswer', question, answerId, answerValue)
    }
  }
};
</script>

<style>
</style>
