const { Checkbox } = require("element-ui");

module.exports = {
    theme: {
      backgroundColor: theme => ({
       ...theme('colors'),
       'primary': ' #E60028',
       'secondary': '#303333',
       'danger': '#1e1e21',
      })
    }
  }