Vue.component(
    'button-counter',
    {
        template:'#counter-template',
        data() {
            return {
                count: 0
            }
        },
        methods: {
            increment(){
                this.count++;
            }
        }
    }
)

var app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue!',
      title: 'SE Projects',
      projects: [
         'PSU Quiz',
         'Mooi',
         'MineWork'
      ],
      show: false,
      url: 'http://www.google.com',
      todos: [],
      newtask: '',
      
    },
    methods: {
        toggleTitle() {
            this.show = !this.show
        },
        addTask() {
            this.todos.push(this.newtask)
            this.newtask = ''
        },
        clearTask() {
            this.todos = []
        },
        
    }
})