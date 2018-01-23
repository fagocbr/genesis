import { isEqual } from 'lodash'

export default {
  watch: {
    /**
     * @param {Object} record
     * @param {Object} previous
     */
    data (record, previous) {
      if (!isEqual(record, previous)) {
        this.setRecord(record)
        this.fireWatch('set/record')
      }
    },
    /**
     * @type {Observer}
     */
    schemas: {
      handler () {
        this.updateComponents()
      },
      deep: true
    }
  }
}
