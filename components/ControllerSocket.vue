<template>
  <div></div>
</template>

<script>
export default {
  name: 'ControllerSocket',
  mounted() {
    this.socket = this.$nuxtSocket({
      channel: '/',
    })
    /* Listen for events: */
    this.socket.on('method1', (msg, cb) => {
      console.log(msg.hello)
    })
    this.method1()
  },
  methods: {
    method1() {
      /* Emit events */
      this.socket.emit(
        'method1',
        {
          hello: 'world',
        },
        (resp) => {
          /* Handle response, if any */
        }
      )
    },
  },
}
</script>

<style scoped></style>
