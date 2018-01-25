export default {
  methods: {
    next () {
      // this method able to set step too in the future
      this.$refs.form.nextTab()
    },
    previous () {
      // this method able to set step too in the future
      this.$refs.form.previousTab()
    },
    first () {
      // this method able to set step too in the future
      this.$refs.form.firstTab()
    },
    last () {
      // this method able to set step too in the future
      this.$refs.form.lastTab()
    }
  }
}
