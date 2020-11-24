let { DateTime } = require('luxon')

let localTime = DateTime.local().toLocaleString(DateTime.DATETIME_HUGE)
let dueDate = DateTime.local(2020, 12, 18, 23, 59).toLocaleString(DateTime.DATETIME_HUGE)

let localTime1 = DateTime.local()
let dueDate1 = DateTime.local(2020, 10, 18, 23, 59)

let timeLeft = dueDate1.diff(localTime1, ['days', 'hours', 'minutes', 'seconds']).toObject()
JSON.stringify(timeLeft)