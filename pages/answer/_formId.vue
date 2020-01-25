<template>
  <div>
    <section class="main-content columns section pt2">
      <display-categories-list
        :categories="categories"
        :answers="answers"
        @changeActiveCategory="changeActiveCategory"
        @importForm="importForm"
        @done="done"
      ></display-categories-list>
      <display-question-list
        :questions="questions.filter(question => question.questionCategory === activeCategory)"
        @updateAnswer="updateAnswer"
      ></display-question-list>
    </section>
  </div>
</template>

<script>
import DisplayCategoriesList from "~/components/display/DisplayCategoriesList";
import DisplayQuestionList from "~/components/display/DisplayQuestionList";

export default {
  name: "HomePage",
  components: {
    DisplayCategoriesList,
    DisplayQuestionList
  },
  mounted: function() {
    if(window.location.hash) {
      this.activeCategory = window.location.hash.substring(1);
    }
  },
  methods: {
    changeActiveCategory: function(newActiveCategory) {
      this.activeCategory = newActiveCategory;
    },
    updateAnswer: function(question, answerId, answerValue) {
      //check if the user already answered this question 
      let sameQuestionIndex = this.answers.findIndex(a => a.questionId === question.questionId)

      //edge-case for checboxes, data has different structure
      if(question.questionType === 'checkbox') {
        let checkboxAnswer = {
          answerId: answerId,
          answerValue: answerValue
        }
        if(sameQuestionIndex > -1) {
          let sameAnswerCheckbox = this.answers[sameQuestionIndex].answers.findIndex(a => a.answerId === answerId);
          if(sameAnswerCheckbox > -1) {
            this.answers[sameQuestionIndex].answers[sameAnswerCheckbox] = checkboxAnswer;
          } else { 
            this.answers[sameQuestionIndex].answers.push(checkboxAnswer)
          }
        } else {
          this.answers.push({
            questionId: question.questionId,
            questionType: question.questionType,
            answers: [checkboxAnswer]
          })
        }
      } else {

        //the rest of the answers have uniform structure
        let newAnswer = {
          questionId: question.questionId,
          questionType: question.questionType,
          answerId: answerId,
          answerValue: answerValue
        }

        if(sameQuestionIndex > -1) {
          this.answers[sameQuestionIndex] = newAnswer;
        } else {
          this.answers.push(newAnswer)
        }
      }
    }, 
    importForm: function(form) {
      let parsable = JSON.parse(form)

      let sortedQuestions = parsable.questions.sort((a, b) => (a.questionIndex > b.questionIndex) ? 1 : -1);

      this.testId = parsable.testId;
      this.categories = parsable.categories;
      this.questions = sortedQuestions;
    },
    done: function() {
      //POST Request
      console.log(JSON.stringify(this.answers))
    }
  },
  data() {
    return {
      activeCategory: "",
      categories: [],
      questions: [],
      answers: []
    }
  },
  created() {
    //mocked data
    //this.importForm('{"testId":"swjbgkgv6","categories":[{"categoryId":"xwa9ephqh","categoryName":"Personal","categorySlug":"personal","categoryIndex":0,"categoryDescription":""},{"categoryId":"w2ftjdg2n","categoryName":"Programare","categorySlug":"programare","categoryIndex":1,"categoryDescription":""},{"categoryId":"yzgzc773v","categoryName":"Test","categorySlug":"test","categoryIndex":2,"categoryDescription":""}],"questions":[{"questionName":"Cum te cheama?","questionType":"input","questionId":"2xgg4y5i2","questionCategory":"personal","questionIndex":0},{"questionName":"Data nasterii?","questionType":"date","questionId":"ttgb4vw2t","questionCategory":"personal","questionIndex":1},{"questionName":"Localitatea de resedinta","questionType":"input","questionId":"cb44140uf","questionCategory":"personal","questionIndex":2},{"questionName":"Ultima scoala absolvita","questionType":"textarea","questionId":"2ecaisshr","questionCategory":"personal","questionIndex":3},{"questionName":"Stare civila?","questionType":"radio","answers":[{"answerId":"mej0w8whr","answerIndex":0,"answerName":"casatorit(a)","answerValue":"casatorit(a)","isCorrect":true},{"answerId":"309s6nz8g","answerIndex":1,"answerName":"necasatorit(a)","answerValue":"necasatorit(a)","isCorrect":true}],"questionId":"hpb8yyvcn","questionCategory":"personal","questionIndex":4},{"questionName":"Fotografie profil","questionType":"upload","questionId":"9mxrrhp0q","questionCategory":"personal","questionIndex":5},{"questionName":"Tara de resedinta","questionType":"dropdown","answers":[{"answerId":"kwiepb0kk","answerIndex":0,"answerName":"andorra","answerValue":"Andorra","isCorrect":true},{"answerId":"by4yujx1b","answerIndex":1,"answerName":"angolia","answerValue":"Angolia","isCorrect":true},{"answerId":"s21r815li","answerIndex":2,"answerName":"romania","answerValue":"Romania","isCorrect":true},{"answerId":"xwl7g2sm9","answerIndex":3,"answerName":"usa","answerValue":"USA","isCorrect":true},{"answerId":"zvlwql6vc","answerIndex":4,"answerName":"india","answerValue":"India","isCorrect":true},{"answerId":"9pm33jyog","answerIndex":5,"answerName":"china","answerValue":"China","isCorrect":true},{"answerId":"7dyd9jdlz","answerIndex":6,"answerName":"italia","answerValue":"Italia","isCorrect":true}],"questionId":"r3x3o1d8u","questionCategory":"personal","questionIndex":6},{"questionName":"De unde ai auzit de noi?","questionType":"checkbox","answers":[{"answerId":"hokmlrjtf","answerIndex":0,"answerName":"facebook","answerValue":"Facebook","isCorrect":true},{"answerId":"ok5s7uvis","answerIndex":1,"answerName":"instagram","answerValue":"Instagram","isCorrect":true},{"answerId":"9zotvu5bm","answerIndex":2,"answerName":"google","answerValue":"Google","isCorrect":true},{"answerId":"upw6k1zkv","answerIndex":3,"answerName":"presa","answerValue":"Presa","isCorrect":true}],"questionId":"frmv43i4y","questionCategory":"personal","questionIndex":7},{"questionName":"Cati ani de experienta ai?","questionType":"input","questionId":"2eapuisvs","questionCategory":"programare","questionIndex":0},{"questionName":"Care sunt tehnologiile cu care ai lucrat in ultimul an?","questionType":"textarea","questionId":"dk94lznsq","questionCategory":"programare","questionIndex":1},{"questionName":"Bifeaza conceptele familiare","questionType":"checkbox","answers":[{"answerId":"yvtcd8wg7","answerIndex":0,"answerName":"api","answerValue":"API","isCorrect":true},{"answerId":"iw4xss0w6","answerIndex":1,"answerName":"ssr","answerValue":"SSR","isCorrect":true},{"answerId":"x6u58poik","answerIndex":2,"answerName":"pwa","answerValue":"PWA","isCorrect":true},{"answerId":"yggbqauic","answerIndex":3,"answerName":"cpa","answerValue":"CPA","isCorrect":true}],"questionId":"ma6av8rzo","questionCategory":"programare","questionIndex":2},{"questionName":"Alta intrebare","questionType":"date","questionId":"spamq7cgm","questionCategory":"programare","questionIndex":3},{"questionName":"Input ","questionType":"input","questionId":"meb1ja0ri","questionCategory":"test","questionIndex":0},{"questionType":"textarea","questionName":"Textarea","questionId":"ogdjmnbvn","questionCategory":"test","questionIndex":1},{"questionName":"Radio","questionType":"radio","answers":[{"answerId":"25nfybk9z","answerIndex":0,"answerName":"radio1","answerValue":"radio1","isCorrect":true},{"answerId":"8brfag6zx","answerIndex":1,"answerName":"radio2","answerValue":"radio2","isCorrect":true},{"answerId":"c1hk48k38","answerIndex":2,"answerName":"radio3","answerValue":"radio3","isCorrect":true},{"answerId":"zw1nxn41e","answerIndex":3,"answerName":"radio4","answerValue":"radio4","isCorrect":true}],"questionId":"ib3hnhn40","questionCategory":"test","questionIndex":2},{"questionType":"checkbox","questionName":"Checkbox","answers":[{"answerId":"kueigu7yq","answerIndex":0,"answerName":"cb1","answerValue":"cb1","isCorrect":true},{"answerId":"npijk0qq9","answerIndex":1,"answerName":"cb2","answerValue":"cb2","isCorrect":true},{"answerId":"9d3v231ro","answerIndex":2,"answerName":"cb3","answerValue":"cb3","isCorrect":true},{"answerId":"e3yft0du9","answerIndex":3,"answerName":"cb4","answerValue":"cb4","isCorrect":true}],"questionId":"cpzzrocb0","questionCategory":"test","questionIndex":3},{"questionName":"Dropdown","questionType":"dropdown","answers":[{"answerId":"ckpttwiem","answerIndex":0,"answerName":"dd1","answerValue":"dd1","isCorrect":true},{"answerId":"0kd061w28","answerIndex":1,"answerName":"dd2","answerValue":"dd2","isCorrect":true},{"answerId":"0g6tql533","answerIndex":2,"answerName":"dd3","answerValue":"dd3","isCorrect":true},{"answerId":"u392duj12","answerIndex":3,"answerName":"dd4","answerValue":"dd4","isCorrect":true}],"questionId":"orod2i8gk","questionCategory":"test","questionIndex":4},{"questionType":"date","questionName":"Date","questionId":"1yb9gjsm7","questionCategory":"test","questionIndex":5},{"questionName":"Upload","questionType":"upload","questionId":"tzf0waing","questionCategory":"test","questionIndex":6},{"questionName":"Input2","questionType":"input","questionId":"eu5bimp9b","questionCategory":"test","questionIndex":7},{"questionName":"Input3","questionId":"1u9w7q565","questionCategory":"test","questionIndex":8,"questionType":"input"},{"questionName":"Input4","questionType":"input","questionId":"jnn765jvv","questionCategory":"test","questionIndex":9},{"questionName":"Input5","questionId":"klqlmx7qu","questionCategory":"test","questionIndex":10,"questionType":"input"},{"questionName":"Input6","questionId":"xrzsu3jh6","questionCategory":"test","questionIndex":11,"questionType":"input"},{"questionName":"Input7","questionType":"input","questionId":"n0ud3evli","questionCategory":"test","questionIndex":12},{"questionName":"Input8","questionType":"input","questionId":"0ibl1l351","questionCategory":"test","questionIndex":13},{"questionName":"Input9","questionType":"input","questionId":"wf24ktuln","questionCategory":"test","questionIndex":14},{"questionName":"Input10","questionType":"input","questionId":"bpdevhfxa","questionCategory":"test","questionIndex":15}]}')
  }
};
</script>

