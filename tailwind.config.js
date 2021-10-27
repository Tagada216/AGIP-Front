const { Checkbox } = require("element-ui");

module.exports = {
  theme: {
    backgroundColor: theme => ({
     ...theme('colors'),
     'primaryRed': '#DC4941',
     'primaryBlack': '#231F20',
     'secondaryBlack': '#303333',
     'saveButton': '#00B4BB'
    })
  }
}