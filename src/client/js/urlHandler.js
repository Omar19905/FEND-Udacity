import {keys} from "./satementHandler";

function urlSubmit(event) {

    event.preventDefault()
    // check what text was put into the form field
    let formText = document.querySelector('#url')

    if (Client.isValidUrl(formText.value)){
        // showing the spinner until data retrieved
        const spinner = document.getElementById("spinner");
        spinner.removeAttribute('hidden');

        fetch("http://localhost:8081/url", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                url: formText.value
            })
        })
            .then(res => {
                return res.json()
            })
            .then(function (data) {
                spinner.setAttribute('hidden', '');
                document.querySelector("#u-classification").textContent = "Classification: " + Client.keys[data.score_tag]
                document.querySelector("#u-subjectivity").textContent = "Subjectivity: " + Client.keys[data.subjectivity]
                document.querySelector("#u-confidence").textContent = "Confidence: " + data.confidence
                document.querySelector("#u-irony").textContent = "Irony: " + Client.keys[data.irony]

            })
    }else{
        alert("enter a valid URL")
    }

}



export {urlSubmit}