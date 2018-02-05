<template>
  <div class="app-form">

    <div
      v-if="tabs.length"
      class="tabs"
    >
      <q-tabs
        v-model="tabSelected"
        inverted
      >
        <q-tab
          v-for="tab in tabs"
          :key="tab.name"
          slot="title"
          v-bind="tab"
        />
      </q-tabs>
      <div
        class="tab-content form"
        v-for="tab in tabs"
        v-show="tab.name === tabSelected"
      >
        <template v-for="schema in components[tab.name]">
          <component
            :is="schema.component"
            :key="schema.field"
            v-bind="schema"
            v-model="record[schema.field]"
            @input="formInput(schema.field, arguments)"
            @event="formEvent"
          />
        </template>
      </div>
    </div>
    <div
      v-else
      class="form"
    >
      <template v-for="schema in schemas">
        <component
          :is="schema.component"
          :key="schema.field"
          v-bind="schema"
          v-model="record[schema.field]"
          @input="formInput(schema.field, arguments)"
          @event="formEvent"
        />
      </template>
    </div>
  </div>
</template>

<script type="text/javascript">
  import { validationMixin as validation } from 'vuelidate'
  import { data, methods, props, watch, tabsNavigation } from './model'

  export default {
    mixins: [validation, data, methods, props, watch, tabsNavigation],
    name: 'app-form',
    validations () {
      const validations = this.generateValidations(this.fields)
      return {
        record: validations
      }
    },
    created () {
      this.updateSchemas()
      this.updateComponents()
      this.updateRecord()

      this.tabSelected = this.tab
      if (!this.tabSelected) {
        this.tabSelected = (Array.isArray(this.tabs) && this.tabs[0]) ? this.tabs[0].name : ''
      }
      if (this.$route.query.tab) {
        this.tabSelected = this.$route.query.tab
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .app-form
    font-family Roboto
    .tab-content
      padding 20px 0
      border-top 1px solid #ddd
</style>
