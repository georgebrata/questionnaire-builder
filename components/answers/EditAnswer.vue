<template>
<form action="javascript:void(0);">
    <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
            <p class="modal-card-title">{{question.questionId ? 'Edit answers' : 'Add new answers'}}</p>
        </header>
        <section class="modal-card-body">
            <div class="block">         
                <b-input
                    class="mt1"
                    :value="answer.answerName"
                    :key="answer.answerId"
                    v-for="answer in question.answers">
                    {{answer.answerValue}}
                </b-input>
            </div>
                
        </section>

        <footer class="modal-card-foot is-pulled-right">
            <button class="button" type="button" @click="$parent.close()">Close</button>
            <button class="button is-primary" @click="update()">{{question.questionId ? 'Save' : 'Add'}} Answers</button>
        </footer>
    </div>

    </form>
</template>

<script>

export default {
  name: "EditAnswer",
  props: {
    question: Object
  },
  data() {
    return {}
  },
  methods: {

  }
};
</script>

<style>
</style>
