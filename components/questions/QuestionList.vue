<template>
  <div class="container column is-9 is-offset-3 questions-container">
    <div class="columns">
      <div class="column is-two-thirds">
        <h1 class="menu-label pt1 pb1">
          {{questions.length}} Question{{questions.length > 1 || questions.length === 0 ? 's':''}}
          <!--
          <b-tag v-if="questions.filter(q => q.questionType === 'input').length > 0">{{questions.filter(q => q.questionType === 'input').length}} input</b-tag>
          <b-tag v-if="questions.filter(q => q.questionType === 'radio').length > 0">{{questions.filter(q => q.questionType === 'radio').length}} radio</b-tag>
          -->
        </h1>
      </div>
      <div class="column">
        <b-button
          size="is-small"
          type="is-text"
          icon-left="plus"
          class="is-pulled-right add-btn"
          @click="openAddEditQuestionModal()"
        >Add question</b-button>
      </div>
    </div>
    <draggable v-model="questions" v-if="questions.length > 0" @end="onDragEnd">
      <transition-group>
        <question
          v-for="question in questions"
          :key="question.questionId"
          :id="question.questionId"
          :question="question"
          @questionEdit="openAddEditQuestionModal(question)"
          @questionDelete="deleteQuestion"
          class="question-drag"
        ></question>
      </transition-group>
    </draggable>
    <div v-else>
      <div class="container columns">
        <div class="column is-half is-offset-one-quarter has-text-centered mt4">
          <h1 class="is-size-5">No questions in this category 😢</h1>
          <p>Feel free to add as many questions as you wish.</p>
          <b-button
            type="is-primary"
            icon-left="plus"
            class="is-fullwidth mt4"
            @click="openAddEditQuestionModal()"
          >Add question</b-button>
        </div>
      </div>
    </div>
    <b-modal :active.sync="isAddQuestion" trap-focus aria-role="dialog" aria-modal>
      <edit-question
        :question="activeQuestion"
        @addQuestion="addQuestion"
        @updateQuestion="updateQuestion"
      ></edit-question>
    </b-modal>
  </div>
</template>

<script>
import Question from "~/components/questions/Question";
import EditQuestion from "~/components/questions/EditQuestion";
import draggable from "vuedraggable";

export default {
  name: "QuestionList",
  components: {
    Question,
    EditQuestion,
    draggable
  },
  props: {
    questions: Array
  },
  data() {
    return {
      isAddQuestion: false,
      activeQuestion: {},
      ques: this.questions
    };
  },
  methods: {
    onDragEnd: function(e) {
      let questionId = e.item.attributes.id.value;
      let qIndex = this.questions.findIndex(q => q.questionId);

      let newQuestion = Object.assign({}, this.questions[qIndex], {
        questionIndex: e.newIndex
      });

      this.$emit("questionEdit", questionId, newQuestion);
    },
    openAddEditQuestionModal: function(question) {
      if (question) {
        this.activeQuestion = question;
      } else {
        this.activeQuestion = {};
      }
      this.isAddQuestion = true;
    },
    addQuestion: function(newQuestion) {
      //close the modal
      this.isAddQuestion = false;

      newQuestion.questionId = Math.random()
        .toString(36)
        .substr(2, 9);
      newQuestion.questionCategory = window.location.hash.substring(1);
      newQuestion.questionIndex = this.questions.length;
      this.$emit("questionAdd", newQuestion);
    },
    updateQuestion: function(questionId, newQuestion) {
      this.isAddQuestion = false;
      this.$emit("questionEdit", questionId, newQuestion);
    },
    deleteQuestion: function(questionId) {
      //delete question
      this.$emit("questionDelete", questionId);
    }
  }
};
</script>

<style>
</style>
