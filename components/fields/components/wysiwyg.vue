<template>
  <field :class="classNames" contenteditable="false"
         v-bind="{id, inline, problems, label, validate, title, tooltip, editable, visible, error}">
    <div slot="component">
      <div
        v-if="disabled"
        v-html="value"
        :class="['disabled', 'field', border ? 'input' : '', 'html']">
      </div>
      <div v-else>
        <tiny-mce
          v-if="active"
          v-model="model"
          :api-key="apiKey"
          :cloud-channel="'dev'"
          :init="init"
          @onInit="onInit"
        />
      </div>
    </div>
  </field>
</template>

<script type="text/javascript">
import TinyMCE from '@tinymce/tinymce-vue'
import Field from 'genesis/components/fields/components/base.vue'
import FieldAbstract from 'genesis/components/fields/abstract'

export default {
  extends: FieldAbstract,
  name: 'field-wysiwyg',
  components: {
    Field,
    'tiny-mce': TinyMCE
  },
  props: {
    border: {
      type: Boolean,
      default: () => true
    },
    apiKey: {
      type: String,
      default: 'vho5426hnv6nehaqnf0hv97vb1yygzuntvnaw4mzxaa10cwt'
    },
    url: {
      type: String,
      default: ''
    },
    timeout: {
      type: Number,
      default: 1000
    },
    height: {
      type: Number,
      default: 300
    },
    theme: {
      type: String,
      default: 'modern'
    },
    language: {
      type: String,
      default: 'statics/languages/pt_BR.js'
    },
    selector: {
      type: String,
      default: 'textarea'
    },
    plugins: {
      type: String,
      default: 'print code preview fullpage searchreplace autolink directionality visualblocks visualchars ' +
        'fullscreen image link media table charmap hr pagebreak nonbreaking toc ' +
        'insertdatetime advlist lists textcolor wordcount contextmenu colorpicker textpattern help'
    },
    toolbar: {
      type: String,
      default: 'formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter ' +
        'alignright alignjustify | numlist bullist outdent indent | removeformat'
    },
    templates: {
      type: Array,
      default: () => ([])
    },
    css: {
      type: Array,
      default: () => ([])
    },
    imageAdvancedTab: {
      type: Boolean,
      default: true
    },
    init: {
      type: Object,
      default () {
        return {
          height: this.height,
          theme: this.theme,
          language_url: this.language,
          selector: this.selector,
          plugins: this.plugins,
          toolbar1: this.toolbar,
          templates: this.templates,
          images_upload_url: this.url,
          content_css: this.css,
          image_advtab: this.imageAdvancedTab
          /* init_instance_callback: editor => { editor.execCommand('mceImage') }, */
        }
      }
    }
  },
  data: () => ({
    active: true,
    ready: false,
    model: ''
  }),
  methods: {
    /**
     */
    onInit () {
      this.ready = true
      if (this.model !== this.value) {
        this.active = false
        this.model = this.value
        window.setTimeout(e => this.active = true, 500)
      }
    },
    /**
     * @param value
     * @return {number}
     */
    updateModel (value) {
      if (!this.ready) {
        return
      }
      this.model = value
    }
  },
  watch: {
    value (value) {
      this.updateModel(value)
    },
    model (model) {
      if (this.value !== model) {
        this.$emit('input', model)
      }
    }
  },
  mounted () {
    if (this.value) {
      this.model = this.value
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .field-wysiwyg
    small
      color #bdbdbd
    textarea
      display none
    .mce-container .mce-txt
      font-size 12px !important
      font-family Roboto !important
    .html
      height auto
      overflow hidden
      color #515151
      padding 9px 8px
      font-size 14.4px
</style>
