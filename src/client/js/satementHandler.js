function statementSubmit(event) {
    event.preventDefault()
    // check what text was put into the form field
    let formText = document.querySelector('#statement').value
    const spinner = document.getElementById("spinner");
    spinner.removeAttribute('hidden');

    console.log("::: Form Submitted :::")
    console.log("**" + process.env.API_KEY)

    fetch("http://localhost:8081/statement", {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            text: formText
        })
    })
        .then(res => {
            return res.json()
        })
        .then(function (data) {
            spinner.setAttribute('hidden', '');
            document.querySelector("#s-classification").textContent = "Classification: " + keys[data.score_tag]
            document.querySelector("#s-subjectivity").textContent = "Subjectivity: " + keys[data.subjectivity]
            document.querySelector("#s-Confidence").textContent = "Confidence: " + data.confidence
            document.querySelector("#s-Irony").textContent = "Irony: " + keys[data.irony]

        })
}

let keys = {
    // polarity
    "P+": "strong positive",
    "P": "positive",
    "NEU": "neutral",
    "N": "negative",
    "N+": "strong negative",
    "NONE": "without sentiment",
    // subjectivity
    "OBJECTIVE": "the text does not have any subjectivity marks",
    "SUBJECTIVE": "the text has subjective marks",
    //ironic
    "NONIRONIC": "the text does not have ironic marks",
    "IRONIC": "the text has ironic marks"
}

export {statementSubmit, keys}
