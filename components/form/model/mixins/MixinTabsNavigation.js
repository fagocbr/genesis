export default {
  methods: {
    /** search in this.tabs array a index of named tab 'search' */
    getIndexTab (search) {
      const selected = search
      let index = undefined
      this.tabs.forEach((tab, _index) => {
        if (tab.name === search) {
          index = _index
        }
      })
      return index
    },
    /** test if a index are found in this.tabs array */
    haveIndexTab (search) {
      return typeof this.getindexTab(search) !== 'undefined'
    },
    /**
     * Move to the next tab avaiable
     * */
    nextTab () {
      const current = this.getIndexTab(this.tabSelected)
      if (typeof current !== 'undefined') {
        const next = current + 1
        this.setTab(next)
      }
    },
    /**
     * Move to the previous tab avaiable
     * */
    previousTab () {
      const current = this.getIndexTab(this.tabSelected)
      if (typeof current !== 'undefined') {
        const previous = current - 1
        this.setTab(previous)
      }
    },
    /**
     * Move to the first tab
     * */
    firstTab () {
      this.setTab(0)
    },
    /**
     * Move to the last tab
     */
    lastTab () {
      const last = this.tabs.length - 1
      this.setTab(last)
    },
    /** Set a tab by index or by name */
    setTab (index) {
      /** if the index is a index of tab */
      if (typeof index === 'number' && Number.isInteger(index)) {
        if (this.tabs[index] !== undefined) {
          this.tabSelected = this.tabs[index].name
          return true
        }
      }

      /** if the index is a name of tab */
      if (typeof index === 'string' && this.haveIndexTab(index)) {
        this.tabSelected = index
        return true
      }

      // throw some error if access a undefined index or tab name
      return false
    }
  }
}
