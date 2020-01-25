<template>
  <div class="column question pl0 pb-1">
    <b-collapse class="card">
      <div
        slot="trigger"
        slot-scope="props"
        class="card-header"
        role="button"
      >
        <p class="card-header-title">{{question.questionName}}
          <span :class="tagClass">{{question.questionType}}</span>
        </p>
        <a class="card-header-icon">
          <b-button
            type="is-light is-small mr1"
            icon-right="pencil"
            class="action-btn"
            title="Edit question"
            @click="editQuestion"
          />
          <b-button
            type="is-danger is-small mr4"
            icon-right="delete"
            class="action-btn"
            title="Delete question"
            @click="deleteQuestion"
          />
          <b-icon v-if='question.questionType === "radio" || question.questionType === "checkbox" || question.questionType === "dropdown"' :icon="props.open ? 'menu-down' : 'menu-up'"></b-icon>
        </a>
      </div>

      <div class="card-content" v-if='question.questionType === "radio"'>
        <div class="block">
            <b-radio v-model="radio"
                disabled
                :key="answer.answerId"
                :name="answer.answerName"
                :native-value="answer.answerValue" v-for="answer in question.answers">
                {{answer.answerValue}}
            </b-radio>
        </div>
      </div>

      <div class="card-content" v-if='question.questionType === "checkbox"'>
        <div class="block">
            <b-checkbox v-model="checkbox"
                disabled
                :key="answer.answerId"
                :name="answer.answerName"
                :native-value="answer.answerValue" v-for="answer in question.answers">
                {{answer.answerValue}}
            </b-checkbox>
        </div>
      </div>

      <div class="card-content" v-if='question.questionType === "dropdown"'>
        <div class="block">
            <b-tag rounded class="mr2" v-for="answer in question.answers" :key="answer.answerId">
                {{answer.answerValue}}
            </b-tag>
        </div>
      </div>

    </b-collapse>
  </div>
</template>

<script>
export default {
  props: {
    question: Object
  },
  data() {
    return {
      radio: '',
      checkbox: '',
    }
  },
  methods: {
    editQuestion: function(e) {
      e.stopPropagation();
      //edit question
      
      this.$emit("questionEdit", this.question);
    },
    deleteQuestion: function(e) {
      e.stopPropagation();
      //delete question

      this.$buefy.dialog.confirm({
          message: 'Remove this question?',
          onConfirm: () => this.$emit("questionDelete", this.question.questionId)
      })
    }
  },
  computed: {
    tagClass: function() {
      let returnValue, baseClass = "ml2 tag is-rounded is-";
      
      switch (this.question.questionType) {
        case "input":
          returnValue = baseClass + 'dark';
          break;
        case "textarea":
          returnValue = baseClass + 'info';
          break;
        case "radio":
          returnValue = baseClass + 'primary';
          break;
        case "checkbox":
          returnValue = baseClass + 'danger';
          break;
        case "dropdown":
          returnValue = baseClass + 'warning';
          break;
        case "date":
          returnValue = baseClass + 'success';
          break;
        case "upload":
          returnValue = baseClass + 'light';
          break;

        default:
          break;
      }
      return returnValue;
    }
  }
};
</script>

<style>
.question .action-btn {
  opacity: 0;
}
.question:hover .action-btn {
  opacity: 1;
}
.column.question:first-child {
  padding-top: 0;
}
</style>
