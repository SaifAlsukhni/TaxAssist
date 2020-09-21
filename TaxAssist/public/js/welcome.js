let { DateTime } = require('luxon')

let localTime = DateTime.local().toLocaleString(DateTime.DATETIME_FULL)
let dueDate = DateTime.local(2020, 10, 18, 23, 59).toLocaleString(DateTime.DATETIME_FULL)

exports.welcomeToTax = function () {
    console.log("Welcome to TaxAssist!")
    console.log('It is currently: ' + localTime)
    console.log('Please submit your data before: ' + dueDate)
    console.log("Thank you for using TaxAssist!")

}