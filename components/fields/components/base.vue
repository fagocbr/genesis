<template>
  <div class="field-base" v-show="visible">
    <slot name="label">
      <div v-if="!inline" class="field-base-label">
        <label :for="id" v-if="label" class="field-label" :class="{'label-with-error': problems.length || error}">
          {{ label }} <span v-if="!!validate" :title="title">*</span>
          <app-tooltip v-if="tooltip">
            <span v-html="tooltip"></span>
          </app-tooltip>
        </label>
      </div>
    </slot>
    <slot name="component"/>
    <slot name="error">
      <div v-if="!inline" class="field-base-error">
        <div v-if="showError" class="text-right error-message">
          <span v-for="problem in problems">{{ $t(problem.path, problem.parameters) }}</span>
          <i class="material-icons" @click="showErrors">help_outline</i>
        </div>
      </div>
    </slot>
  </div>
</template>

<script type="text/javascript">
  import { alert } from 'genesis/support/message'

  export default {
    name: 'field-base',
    props: {
      classNames: String,
      editable: Boolean,
      inline: Boolean,
      visible: Boolean,
      id: String,
      problems: Array,
      label: String,
      validate: Object,
      title: String,
      tooltip: String,
      error: Boolean
    },
    computed: {
      /**
       * @returns {boolean}
       */
      showError () {
        if (this.editable) {
          return !!this.problems.length
        }
        return false
      }
    },
    methods: {
      /**
       */
      showErrors () {
        const errors = []
        this.problems.forEach(error => {
          errors.push(' - ' + this.$t(error.path, error.parameters))
        })
        alert('Validação', errors.join('<br>'))
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .field-base
    .input
      font-size 13px
      font-family Roboto
    .has-error input
      background rgba(249, 125, 125, 0.2)
    input:-webkit-autofill
      -webkit-box-shadow 0 0 0 1000px #ffffff inset, 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24) !important
    .field-base-label
      padding 0 0 3px 0
    .field-base-error
      padding 3px 0 0 0
      min-height 18px
      .error-message, .label-with-error
        color darkred
        font-size 10px
        i
          font-size 14px
          cursor pointer
</style>
