<template>
  <div class="column question pl0 pb-1">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title ml2">
          {{question.questionName}}
        </p>
      </header>

      <div class="card-content" v-if='question.questionType === "input"'>
        <div class="block">
            <b-input v-model="input" @blur="updateInputAnswer"></b-input>
        </div>
      </div>

      <div class="card-content" v-if='question.questionType === "textarea"'>
        <div class="block">
            <b-input maxlength="200" type="textarea" v-model="textarea" @blur="updateTextareaAnswer"></b-input>
        </div>
      </div>

      <div class="card-content" v-if='question.questionType === "radio"'>
        <div class="block">
            <b-radio v-model="radio"
                @input="updateRadioAnswer"
                :name="answer.answerName"
                :key="answer.answerId"
                :native-value="answer.answerValue" v-for="answer in question.answers">
                {{answer.answerValue}}
            </b-radio>
        </div>
      </div>

      <div class="card-content" v-if='question.questionType === "checkbox"'>
        <div class="block">
            <b-checkbox v-model="checkboxGroup"
                @input="updateCheckboxAnswer"
                :name="answer.answerName"
                :key="answer.answerId"
                :native-value="answer.answerValue" v-for="answer in question.answers">
                {{answer.answerValue}}
            </b-checkbox>
        </div>
      </div>

      <div class="card-content" v-if='question.questionType === "dropdown"'>
        <div class="block">
            <b-select v-model="dropdown" @blur="updateDropdownAnswer">
                <option
                    v-for="option in question.answers"
                    :value="option.answerValue"
                    :key="option.answerId">
                    {{ option.answerName }}
                </option>
            </b-select>
        </div>
      </div>

      <div class="card-content" v-if='question.questionType === "date"'>
        <div class="block">
            <b-field>
                <b-datepicker v-model="date"
                    @input="updateDateAnswer"
                    :show-week-number="true"
                    placeholder="Click to select..."
                    icon="calendar-today">
                </b-datepicker>
            </b-field>
        </div>
      </div>

      <div class="card-content" v-if='question.questionType === "upload"'>
        <div class="block">
            <b-field class="file">
                <b-upload v-model="file" @input="updateFileInput">
                    <a class="button is-primary">
                        <b-icon icon="upload"></b-icon>
                        <span>Click to upload</span>
                    </a>
                </b-upload>
                <span class="file-name" v-if="file">
                    {{ file.name }}
                </span>
            </b-field>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    question: Object
  },
  data() {
    return {
      input: '',
      textarea: '',
      radio: '',
      checkbox: '',
      checkboxGroup: [],
      dropdown: '',
      date: [],
      file: [],
    }
  },
  methods: {
    updateInputAnswer: function() {
      this.$emit("updateAnswer", this.question, null, this.input);
    },
    updateTextareaAnswer: function() {
      this.$emit("updateAnswer", this.question, null, this.textarea);
    },
    updateRadioAnswer: function() {
      this.$emit("updateAnswer", this.question, this.question.answers.filter(a => a.answerValue === this.radio)[0].answerId, this.radio);
    },
    updateCheckboxAnswer: function(group) {
      if(group.length > 0) {
        let latestAnswer = this.checkboxGroup[this.checkboxGroup.length-1];
        let latestAnswerId = this.question.answers.filter(a => a.answerValue === latestAnswer)[0].answerId;
        this.$emit("updateAnswer", this.question, latestAnswerId, latestAnswer);
      } else {
        this.$emit("updateAnswer", this.question, null, null);
      }
    },
    updateDropdownAnswer: function() {
      this.$emit("updateAnswer", this.question, 'todo', this.dropdown);
    },
    updateDateAnswer: function(e) {
      this.$emit("updateAnswer", this.question, null, this.date);
    },
    updateFileInput: function() {
      this.$emit('updateAnswer', this.question, null, this.file.name)
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
          returnValue = baseClass + 'black';
          break;
        case "radio":
          returnValue = baseClass + 'primary';
          break;
        case "checkbox":
          returnValue = baseClass + 'link';
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
.column.question:first-child {
  padding-top: 0;
}
</style>
