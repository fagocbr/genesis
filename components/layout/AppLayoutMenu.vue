<template>
  <q-btn flat @click="">
    <q-icon name="more_vert"/>
    <q-popover ref="popover" class="q-popover-menu">
      <q-list item-separator highlight link>
        <!--suppress CommaExpressionJS -->
        <q-item v-for="(menu, index) in options" :key="index" @click="click(menu)" separator>
          <q-item-side :color="menu.color" :icon="menu.icon"></q-item-side>
          <q-item-main>{{ menu.label }}</q-item-main>
        </q-item>
      </q-list>
    </q-popover>
  </q-btn>
</template>

<script type="text/javascript">
  export default {
    name: 'app-layout-menu',
    props: {
      options: {
        type: Array,
        required: true
      },
      handler: {
        type: Function,
        required: true
      }
    },
    methods: {
      /**
       * @param {Object} menu
       */
      click (menu) {
        // noinspection JSUnresolvedVariable
        this.$refs.popover.close()
        this.handler(menu)
      }
    }
  }
</script>
