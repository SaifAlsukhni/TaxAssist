const { DateTime } = require('luxon')

let countdown = setInterval(function() {
    let localTime = DateTime.local()
    let dueDate = DateTime.local(2020, 12, 20, 23, 59)
    document.getElementById("countdown").innerHTML = dueDate.diff(localTime).toFormat("d 'days, ' hh 'hours, ' mm 'minutes, and' ss 'seconds'")

    if (dueDate < 0) {
        clearInterval(countdown)
        document.getElementById("countdown").innerHTML = "Already Past Due"
    }
}, 1000)