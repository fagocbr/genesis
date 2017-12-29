export const validators = {
  $validate (rule, value = true) {
    if (!this.form.validate) {
      this.form.validate = {}
    }
    this.form.validate[rule] = value
    return this
  },
  /**
   * Define field as a required field
   * @deprecated
   * @returns {validators}
   * @param require
   */
  $required (require = true) {
    if (require) {
      this.$validate('required')
    }
    return this
  },
  /**
   * Define field as a required field
   * @returns {validators}
   */
  $vRequired () {
    this.$validate('required')
    return this
  },
  /**
   * Define field as a required field if this function param return boolean true or equivalent
   * @param {function(record, schemas, component)} locator
   * @returns {validators}
   */
  $vRequiredIf (locator) {
    this.$validate('requiredIf', locator)
    return this
  },
  /**
   * Define field as a required field if this function param return boolean false or equivalent (oposite of requiredIf rule)
   * @param {function(record, schemas, component)} locator
   * @returns {validators}
   */
  $vRequiredUnless (locator) {
    this.$validate('requiredUnless', locator)
    return this
  },
  /**
   * Define interval of valid numbers where a valid number is grater than or equal to {min} and less than or equal to {max}
   * @param {Number} min
   * @param {Number} max
   * @returns {validators}
   */
  $vBetween (min, max) {
    this.$validate('between', [min, max])
    return this
  },
  /**
   * Define a min lenght of a string
   * @param {Number} minLength
   * @returns {validators}
   */
  $vMinLength (minLength) {
    this.$validate('minLength', minLength)
    return this
  },
  /**
   * Define a max length of a string
   * @param {Number} maxLength
   * @returns {validators}
   */
  $vMaxLength (maxLength) {
    this.$validate('maxLength', maxLength)
    return this
  },
  /**
   * Define a minimun supported value
   * @param {Number} minValue
   * @returns {validators}
   */
  $vMinValue (minValue) {
    this.$validate('minValue', minValue)
    return this
  },
  /**
   * Define a maximum supported value
   * @param {Number} maxValue
   * @returns {validators}
   */
  $vMaxValue (maxValue) {
    this.$validate('maxValue', maxValue)
    return this
  },
  /**
   * Define aplhanumeric caracters only
   * @returns {validators}
   */
  $vAlpha () {
    this.$validate('alpha')
    return this
  },
  /**
   * Define alphanumeric caracteres and numbers only
   * @returns {validators}
   */
  $vAlphaNum () {
    this.$validate('alphaNum')
    return this
  },
  /**
   * Define if a email markup is valid
   * @returns {validators}
   */
  $vEmail () {
    this.$validate('email')
    return this
  },
  /**
   * Define if a ipAdress markup is valid
   * @returns {validators}
   */
  $vIpAddress () {
    this.$validate('ipAddress')
    return this
  },
  /**
   * Define if a url markup is valid
   * @returns {validators}
   */
  $vUrl () {
    this.$validate('url')
    return this
  }
}
