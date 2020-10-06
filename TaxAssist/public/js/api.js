const axios = require("axios");

exports.getActivity = function () {
    axios.get('http://www.boredapi.com/api/activity/')
        .then(function (response) {
            console.log(response.data.activity)

            let activitySpan = document.createElement("span")
            activitySpan.innerText = response.data.activity

            document.getElementById("activityDiv").appendChild(activitySpan)
        })
        .catch(function (error) {
            console.log(JSON.stringify(error.message))
        })



}