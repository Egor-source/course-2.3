<template>
  <div>
    <input type="text" v-model="messageText">
    <div
        v-for="message in messages"
        :key="message"
    >
      {{ message }}
    </div>
    <button @click="sendMessage">Отправить</button>
  </div>
</template>

<script>
import { io } from 'socket.io-client';

export default {
  name: 'App',
  data () {
    return {
      socket: null,
      messageText: '',
      messages: [],
    };
  },
  mounted () {
    this.socket = io('http://localhost:3000');
    this.socket.on('newMessage', this.onNewMessage);
  },
  methods: {
    onNewMessage (message) {
      this.messages.push(message);
    },
    sendMessage () {
      this.socket.emit('message', this.messageText);
      this.messageText = '';
    },
  },
};
</script>

<style>

</style>
