<template>
  <div>321</div>
</template>

<script>
import { io } from 'socket.io-client';

export default {
  name: 'App',
  mounted () {
    const socket = io('http://localhost:3000');
    console.log(socket);
  },
};
</script>

<style>

</style>
