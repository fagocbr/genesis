<template>
  <q-layout ref="layout" v-model="sides" v-bind="{view, leftBreakpoint, reveal}" :class="classNames">

    <q-toolbar slot="header" v-bind="toolbar">
      <slot name="header">

        <slot name="header-toggle">
          <q-btn flat @click="toggleLeft">
            <q-icon name="menu"></q-icon>
          </q-btn>
        </slot>

        <slot name="header-title">
          <q-toolbar-title>
            {{ AppName }}
            <div slot="subtitle" class="hidden-medium">
              {{ AppTooltip }} <span v-if="dev">{{ $q.version }}</span>
            </div>
          </q-toolbar-title>
        </slot>

        <slot name="header-content"/>

        <app-layout-menu :options="getDashboardOptions" :handler="handlerMenu"/>

      </slot>
    </q-toolbar>

    <q-scroll-area v-if="left" slot="left" class="q-scroll-area">
      <slot name="drawer-left-top">
        <div class="q-drawer-logo">
          <!--suppress HtmlUnknownTarget -->
          <img src="statics/logo/big.png" alt="logo">
        </div>
      </slot>
      <slot name="drawer-left">
        <app-drawer-menu :menus="menus" :shadow="shadow"/>
      </slot>
    </q-scroll-area>

    <slot name="breadcrumb">
      <div class="breadcrumb-wrapper">
        <app-breadcrumb v-bind="{icon: home, displayIcon: displayIcon}"/>
      </div>
    </slot>

    <slot name="content">
      <div class="transition-wrapper">
        <app-transition-slide v-bind="style"/>
      </div>
    </slot>
  </q-layout>
</template>

<script type="text/javascript">
  import { mapGetters } from 'vuex'
  import { set, get } from 'genesis/infra/storage'
  import AppBreadcrumb from 'genesis/components/breadcrumb/AppBreadcrumb.vue'
  import AppDrawerMenu from 'genesis/components/layout/drawer/DrawerMenu.vue'
  import AppTransitionSlide from 'genesis/components/transition/AppTransitionSlide.vue'
  import AppLayoutMenu from 'genesis/components/layout/AppLayoutMenu.vue'

  export default {
    components: {
      AppBreadcrumb, AppDrawerMenu, AppTransitionSlide, AppLayoutMenu
    },
    name: 'app-layout',
    props: {
      view: {
        type: String,
        default: 'lHh Lpr lFf' // default: 'lHh Lpr fff'
      },
      reveal: {
        type: Boolean,
        default: false
      },
      left: {
        type: Boolean,
        default: true
      },
      leftBreakpoint: {
        type: Number,
        default: 996
      },
      home: {
        type: String,
        default: 'home'
      },
      displayIcon: {
        type: Object,
        default: () => ({
          show: true,
          caracter: ''
        })
      },
      viewport: {
        type: Object,
        default: () => ({
          height: 'calc(100vh - 95px)',
          padding: '10px'
        })
      },
      mobile: {
        type: Object,
        default: () => ({
          height: 'calc(100vh - 95px)',
          padding: '0'
        })
      },
      toolbar: {
        type: Object,
        default: () => ({})
      },
      shadow: {
        type: Boolean,
        default: () => true
      }
    },
    data: () => ({
      sides: {
        left: true,
        right: true
      }
    }),
    computed: {
      environment () {
        return process.env.NODE_ENV
      },
      dev () {
        return process.env.DEV
      },
      classNames () {
        return ['layout-default', this.environment]
      },
      style () {
        return this.$q.platform.is.mobile ? this.mobile : this.viewport
      },
      menus () {
        if (!Array.isArray(this.AppMenu)) {
          return []
        }
        return this.AppMenu
      },
      ...mapGetters(['AppName', 'AppTooltip', 'AppMenu', 'getDashboardOptions'])
    },
    methods: {
      /**
       * @param {Object} menu
       */
      handlerMenu (menu) {
        menu.handler(this)
      },
      /**
       */
      toggleLeft () {
        if (this.left) {
          this.$refs.layout.toggleLeft()
        }
      }
    },
    watch: {
      sides: {
        handler (sides) {
          set('drawer.sides', sides, true)
        },
        deep: true
      }
    },
    created () {
      const sides = get('drawer.sides', true)
      if (sides) {
        this.sides = sides
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scope>
  @import '~app/themes/quasar.variables'

  .layout-default
    .layout-aside
      background-color $app-layout-drawer
    .q-scroll-area
      swidth 100%
      height 100%
    .q-drawer-logo
      background $app-layout-drawer-logo
      text-align center
      padding 20px
      border-bottom $app-layout-drawer-logo-border-bottom
      img
        max-height 100px
    .breadcrumb-wrapper
      position absolute
      padding 0 17px 0 17px
      box-shadow 0 0 4px 2px rgba(0, 0, 0, 0.3)
      background $app-layout-breadcrumb-wrapper
      width 100%
      height 45px
      z-index 2
    .transition-wrapper
      position relative
      margin 45px 0 0 0

  @media screen and (max-width 768px)
    .layout-default
      .breadcrumb-wrapper
        padding 0 7px 0 7px
</style>
