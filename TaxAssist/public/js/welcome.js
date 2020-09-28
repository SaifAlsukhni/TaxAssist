let { DateTime } = require('luxon')

let localTime = DateTime.local().toLocaleString(DateTime.DATETIME_HUGE)
let dueDate = DateTime.local(2020, 10, 18, 23, 59).toLocaleString(DateTime.DATETIME_HUGE)

let localTime1 = DateTime.local()
let dueDate1 = DateTime.local(2020, 10, 18, 23, 59)

let timeLeft = dueDate1.diff(localTime1, ['days', 'hours', 'minutes', 'seconds']).toObject()
JSON.stringify(timeLeft)

exports.welcomeToTax = function () {
    console.log("Welcome to TaxAssist!")
    console.log('It is currently: ' + localTime)
    console.log('Please submit your data before: ' + dueDate)
    console.log('You have: ' + timeLeft.days + ' days, ' + timeLeft.hours + ' hours, ' +  timeLeft.minutes + ' minutes, and ' + timeLeft.seconds + ' seconds' + ' to submit your data.')
    console.log("Thank you for using TaxAssist!")

}