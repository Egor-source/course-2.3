<template>
  <div>
    <div>
      <input type="text" placeholder="Комната" v-model="roomId">
      <button @click="connectToRoom">Подключиться к комнате</button>
    </div>
    <input style="display: block" type="text" v-model="messageText">
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
      roomId: null,
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
    connectToRoom () {
      this.socket.emit('connectToRoom', this.roomId);
    },
  },
};
</script>

<style>

</style>
