let welcome = require('./welcome')

exports.addReceipts = function (emitter) {
    console.log("Receipt amounts are entered here.")
    welcome.welcomeToTax()

    emitter.on('event', function (ev) {
        console.log('Event raised', ev)
    })

}
