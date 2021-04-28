<template>
  <div>
    <p>Message from server: "{{}}"</p>
    <button @click="pingServer()">Ping Server</button>
    <input v-model="value">
  </div>
</template>

<script>
import { defineComponent } from "vue";
const Search = defineComponent({
  data() {
    return {
      inputValue: "",
    };
  },
  watch: {
    inputValue(newValue, oldValue) {
      this.$emit("valueChanged", newValue);
    },
  },
});

export default {
  data() {
    return {
      value = ""
    }
  },
  methods: {
    pingServer() {
      // Send the "pingServer" event to the server.
      this.$socket.emit('chat message', 'PING!')
    }
  },
  created() {
    this.sockets.subscribe('chat message', (data) => {
        this.msg = data.message;
    });
  }
}
</script>