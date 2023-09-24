<template>
  <div class="main-wrapper">
    <div class="rooms">
      <div
          v-for="room in rooms"
          :key="room.id"
          class="room"
          @click="selectRoom(room)"
      >
        {{ room.name }}
      </div>
      <button @click="isShowAddModal=true">Создать комнату</button>
    </div>
    <div
        v-if="selectedRoom"
        class="messages"
    >
      <div class="messages-wrapper">
        <div
            v-for="message in messages"
            :key="message.id"
            class="message"
        >
          <div class="message__author">{{ message.author.login }}</div>
          {{ message.text }}
        </div>
      </div>
      <div class="messages__controls">
        <input
            v-model="messageText"
            class="message-input"
            type="text"
            placeholder="Сообщение"
        >
        <button @click="sendMessage">Отправить</button>
      </div>
    </div>
  </div>

  <NewRoomModal
      v-if="isShowAddModal"
      @addRoom="addRoom"
  />

  <div v-if="error" style="color: red">{{ error }}</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { io } from 'socket.io-client';
import NewRoomModal from '@/components/NewRoomModal';

export default {
  name: 'MainPage',
  components: { NewRoomModal },
  data () {
    return {
      socket: null,
      rooms: [],
      error: '',
      isShowAddModal: false,
      selectedRoom: null,
      messages: [],
      messageText: '',
    };
  },
  async mounted () {
    await this.loadUser();
    this.socket = io('http://localhost:3000', {
      auth: {
        token: `Bearer ${this.user.accessToken}`,
      },
    });
    this.socket.on('connect_error', () => {
      this.error = 'Не удалось подулючиться к серверу';
    });
    this.socket.on('userRooms', this.setUserRooms);
    this.socket.on('newRoom', this.newRoom);
    this.socket.on('history', this.onHistory);
    this.socket.on('message', this.onMessage);
    this.socket.emit('getUserRooms');
  },
  computed: {
    ...mapGetters({
      user: 'user/getUser',
    }),
  },
  methods: {
    ...mapActions({
      loadUser: 'user/loadUser',
    }),
    setUserRooms (rooms) {
      this.rooms = rooms;
    },
    newRoom (room) {
      this.rooms.push(room);
    },
    addRoom (roomData) {
      this.isShowAddModal = false;
      this.socket.emit('createRoom', roomData);
    },
    selectRoom (room) {
      this.selectedRoom = room;
      this.socket.emit('loadHistory', room.id);
    },
    onHistory (messages) {
      this.messages = messages;
    },
    sendMessage () {
      this.socket.emit('message', {
        roomId: this.selectedRoom.id,
        text: this.messageText,
      });
      this.messageText = '';
    },
    onMessage (message) {
      this.messages.push(message);
    }
  }
};
</script>

<style>

* {
  box-sizing: border-box;

}

html, body, #app, .main-wrapper, .main-wrapper > div {
  height: 100%;
}

body {
  margin: 0;
  padding: 0;
}

.main-wrapper {
  display: grid;
  grid-template-columns: 4fr 8fr;
}

.rooms {
  border-right: 1px solid #000;
}

.room {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #000;
  cursor: pointer;
  padding: 20px;
}

.room:hover {
  background: gray;
}

.messages {
  padding: 20px;
  display: flex;
  gap: 20px;
  flex-direction: column;
  justify-content: space-between;
  max-height: 100vh;
}

.messages-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-height: 100%;
  overflow: auto;
}

.message {
  width: fit-content;
  border: 1px solid #000;
  border-radius: 10px;
  padding: 10px;
}

.message__author {
  font-weight: bold;
}

.messages__controls {
  display: flex;
  gap: 20px;
}

.message-input {
  width: 100%;
}

</style>