<template>
  <div>Main</div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'MainPage',
  mounted () {
    this.loadUser();
  },
  methods: {
    ...mapActions({
      loadUser: 'user/loadUser',
    }),
  }
};
</script>

<style scoped>

</style>