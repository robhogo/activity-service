import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import io from 'socket.io-client';
import VueSocketIO from 'vue-socket.io'

Vue.use(new VueSocketIO({
  debug: true,
  connection: io("http://localhost:3000"),
  vuex: {
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  },
}))

new Vue({
  sockets: {
    connect: function () {
      console.log('socket connected')
    },
    customEmit: function (data) {
      console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
    }
  },
  methods: {
    clickButton: function (data: any) {
      // $socket is socket.io-client instance
      this.$socket.emit('emit_method', data)
    }
  },
  render: h => h(App)
}).$mount('#app')