<template>
  <field :class="classNames" v-bind="{id, inline, problems, label, validate, title, tooltip, editable, visible}">
    <div slot="component" :class="{'row': image}">
      <template v-if="file">
        <div v-if="image" class="col-2">
          <img :src="src" class="image"/>
        </div>
        <div v-else :class="'file-link'">
          <a :href="href">{{ file }}</a>
        </div>
      </template>
      <div v-if="!disabled" :class="{'col': image}">
        <q-uploader ref="input" v-bind="bind" @add="add" @uploaded="uploaded"></q-uploader>
      </div>
    </div>
  </field>
</template>

<script type="text/javascript">
  import Field from 'genesis/components/fields/components/base.vue'
  import FieldAbstract from 'genesis/components/fields/abstract'
  import { URL_FILE_UPLOAD } from 'genesis/support/index'
  import { uid } from 'quasar-framework'

  export default {
    extends: FieldAbstract,
    components: {
      Field
    },
    name: 'field-file',
    props: {
      download: {
        default: ''
      },
      file: {
        default: 'file'
      },
      url: {
        default: URL_FILE_UPLOAD
      },
      extensions: {
        default: ''
      },
      image: {
        type: Boolean,
        default: () => false
      }
    },
    data: () => ({
      file: undefined,
      uid: ''
    }),
    computed: {
      /**
       * @return {Object}
       */
      bind () {
        return {
          name: this.file,
          url: this.url,
          extensions: this.extensions,
          additionalFields: [
            {
              name: 'name',
              value: this.file
            },
            {
              name: 'uid',
              value: this.uid
            }
          ]
        }
      },
      src () {
        return this.parseURI()
      },
      href () {
        let uri
        if (uri = this.parseURI()) {
          return uri
        }
        return '#'
      }
    },
    methods: {
      /**
       */
      add () {
        // noinspection JSUnresolvedVariable
        window.setTimeout(this.$refs.input.upload, 500)
      },
      uploaded (file, xhr) {
        let path = ''
        try {
          const response = JSON.parse(xhr.response)
          path = response.path
        }
        catch (e) {
          return
        }
        this.file = ''
        this.$emit('input', path)
      },
      parseURI () {
        if (typeof this.download === 'string') {
          return this.download.replace('{file}', this.file)
        }
        if (typeof this.download === 'function') {
          return this.download(this.file)
        }
      }
    },
    watch: {
      value (value) {
        if (this.file === undefined) {
          this.uid = String(value).split('/').pop().split('.').shift()
          this.file = value
        }
      }
    },
    mounted () {
      this.uid = uid()
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .field-file
    .file-link
      padding 10px 0
    .image
      max-height 100%
      max-width 50%
</style>
