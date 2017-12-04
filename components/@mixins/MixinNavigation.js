import { uniqid } from 'genesis/support/utils'
import { browse } from 'genesis/plugin'

export default {
  props: {
    changer: {
      type: String,
      default: () => '~'
    }
  },
  methods: {
    /**
     * @param {string} route
     * @param {Object} query
     */
    browse (route, query = {}) {
      if (this.$g && this.$g.browse) {
        return this.$g.browse(route, query)
      }
      return browse(route, query)
    }
  }
}
