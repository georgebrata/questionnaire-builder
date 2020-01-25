<template>
  <form action="javascript:void(0);" submit="javascript:void(0);">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">{{question.questionId ? 'Edit question' : 'Add new question'}}</p>
      </header>
      <section class="modal-card-body">
        <b-field label="What's the question?">
          <b-input required v-model="question.questionName"></b-input>
        </b-field>
        <b-field label="What's the question type?">
          <b-radio-button
            v-model="question.questionType"
            class="ml4"
            native-value="input"
            type="is-dark"
          >
            <span>input</span>
          </b-radio-button>

          <b-radio-button v-model="question.questionType" native-value="textarea" type="is-black">
            <span>textarea</span>
          </b-radio-button>

          <b-radio-button v-model="question.questionType" native-value="radio" type="is-primary">
            <span>radio</span>
          </b-radio-button>

          <b-radio-button v-model="question.questionType" native-value="checkbox" type="is-link">
            <span>checkbox</span>
          </b-radio-button>

          <b-radio-button v-model="question.questionType" native-value="dropdown" type="is-warning">
            <span>dropdown</span>
          </b-radio-button>

          <b-radio-button v-model="question.questionType" native-value="date" type="is-success">
            <span>date</span>
          </b-radio-button>

          <b-radio-button v-model="question.questionType" native-value="upload" type="is-light">
            <span>upload</span>
          </b-radio-button>
        </b-field>

        <div class="columns" v-if="isMultipleAnswersQuestion">
          <div class="column is-12">
            <strong>
              What are the answers?
              <b-button
                type="is-primary"
                icon-left="plus"
                class="button is-outlined is-small ml4"
                @click="showNewAnswerToAdd()"
              >Add {{this.answers.length > 0 ? 'another answer' : 'an answer'}}</b-button>
            </strong>
          </div>
        </div>

        <div class="answers is-block radio-btns" v-if="question.questionType === 'radio'">
          <b-radio
            v-model="radio"
            disabled
            :name="answer.answerName"
            :key="answer.answerId"
            :native-value="answer.answerValue"
            v-for="answer in answers"
          >
            {{answer.answerValue}}
            <b-button
              type="is-danger is-small mr1 is-pulled-right"
              icon-right="delete"
              class="action-btn"
              title="Delete answer"
              @click="deleteAnswer(answer)"
            />
          </b-radio>
        </div>
        <div class="answers is-block radio-btns" v-if="question.questionType === 'checkbox'">
          <b-checkbox
            v-model="checkbox"
            disabled
            :name="answer.answerName"
            :key="answer.answerId"
            :native-value="answer.answerValue"
            v-for="answer in answers"
          >
            {{answer.answerValue}}
            <b-button
              type="is-danger is-small mr1 is-pulled-right"
              icon-right="delete"
              class="action-btn"
              title="Delete answer"
              @click="deleteAnswer(answer)"
            />
          </b-checkbox>
        </div>
        <div class="answers is-block radio-btns" v-if="question.questionType === 'dropdown'">
          <div
            class="is-block mt1"
            v-for="answer in answers"
            :key="answer.answerId"
            style="width: 50%;"
          >
            <b-tag>{{answer.answerValue}}</b-tag>
            <b-button
              type="is-danger is-small is-pulled-right"
              icon-right="delete"
              class="action-btn"
              title="Delete answer"
              @click="deleteAnswer(answer)"
            />
          </div>
        </div>

        <b-field v-if="isAddNewAnswerEnabled">
          <b-input v-model="newAnswer.value" @keydown.enter.prevent="appendNewAnswer()"></b-input>
          <b-button type="is-primary" icon-right="plus" @click="appendNewAnswer()" />
        </b-field>
        <span v-for="err in errors" :key="err" class="is-danger">{{err}}</span>
      </section>

      <footer class="modal-card-foot is-pulled-right">
        <button class="button" type="button" @click="$parent.close()">Close</button>
        <button
          :disabled="!isValidQuestion()"
          class="button is-primary"
          @click="update()"
        >{{question.questionId ? 'Save' : 'Add'}} Question</button>
      </footer>
    </div>
  </form>
</template>

<script>
import EditAnswer from "~/components/answers/EditAnswer";

export default {
  name: "EditQuestion",
  components: {
    EditAnswer
  },
  props: {
    question: Object
  },
  data() {
    return {
      radio: "",
      checkbox: [],
      isAddNewAnswerEnabled: false,
      newAnswer: {},
      errors: [],
      answers: []
    };
  },
  computed: {
    isMultipleAnswersQuestion: function() {
      return (
        this.question.questionType === "radio" ||
        this.question.questionType === "checkbox" ||
        this.question.questionType === "dropdown"
      );
    }
  },
  mounted: function() {
      this.answers = this.question.answers || [];
  },
  methods: {
    showNewAnswerToAdd: function() {
      this.isAddNewAnswerEnabled = true;
    },
    update: function() {
      this.question.answers = this.answers;
      console.log("Q:", this.question)
      if (this.isValidQuestion) {
        if (this.question.questionId) {
          this.$emit("updateQuestion", this.question.questionId, this.question);
        } else {
          this.$emit("addQuestion", this.question);
        }
      }
    },
    appendNewAnswer: function() {
      this.answers.push({
        answerId: Math.random()
          .toString(36)
          .substr(2, 9),
        answerIndex: this.answers.length,
        answerName: this.newAnswer.value.toLowerCase(),
        answerValue: this.newAnswer.value
      })
      this.newAnswer = {};
      this.isAddNewAnswerEnabled = false;
    },
    deleteAnswer: function(answer) {
      let index = this.answers.findIndex(
        a => a.answerId === answer.answerId
      );
      console.log("DELETE ANSWER at index:", index);
      this.answers.splice(index, 1);
      console.log(this.answers)
    },
    isValidQuestion: function() {
      return true;
      /*
            console.log(this.question)
            if(this.question && this.question.questionName && this.question.questionName.length > 0 && this.question.questionType) {
                if(!this.isMultipleAnswersQuestion) {
                    return true;
                } else {
                    if(this.question.answers && this.question.answers.length >= 2) {
                        return true;
                    } else {
                        this.errors = ['You need at least 2 answers for this type of question']
                        return false;
                    }
                }
            } else {
                this.errors = ['You need to write down the question and select a type.']
                return false;
            }
            */
    }
  }
};
</script>

<style>
.answers label {
  width: 100%;
  margin-left: 0 !important;
  margin-bottom: 10px;
}
.radio-btns .b-radio .control-label,
.radio-btns .b-checkbox .control-label {
  width: 50%;
}
.radio-btns .b-radio .control-label .is-danger {
  opacity: 0;
}
.b-radio:hover .control-label .is-danger {
  opacity: 1;
}
</style>