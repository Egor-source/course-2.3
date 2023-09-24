<template>
  <Teleport to="body">
    <div class="modal">
      <div class="modal__content">
        <input
            v-model="roomName"
            type="text"
            placeholder="Название комнаты"
        >
        <div
            v-for="user in users"
            :key="user.id"
            class="user"
        >
          <input
              v-model="user.selected"
              type="checkbox"
          />
          {{ user.login }}
        </div>
        <button @click="addRoom">Создать</button>
      </div>
    </div>
  </Teleport>
</template>

<script>
export default {
  name: 'NewRoomModal',
  data () {
    return {
      roomName: '',
      users: [],
    };
  },
  async mounted () {
    const { data } = await this.$axios('users');
    this.users = data.map((user) => ({
      ...user,
      selected: false,
    }));
  },
  methods: {
    addRoom () {
      this.$emit('addRoom', {
        name: this.roomName,
        users: this.users.reduce((acc, user) => {
          if (user.selected) {
            acc.push(user.id);
          }
          return acc;
        }, [])
      });
    },
  }
};
</script>

<style scoped>
.modal {
  position: absolute;
  padding: 50px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
}

.modal__content {
  padding: 20px;
  background: #fff;
}

</style>