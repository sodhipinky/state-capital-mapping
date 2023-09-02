function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    if (event.srcElement.children.length === 0) {
        event.preventDefault();
        let data = event.dataTransfer.getData("text");
        event.target.appendChild(document.getElementById(data));
    }
    let states = document.getElementById("state-row").getElementsByClassName("card");
    let flag = 0;
    for (let index = 0; index < states.length; index++) {
        if (states[index].getElementsByClassName("card-body")[0].children.length > 0) {
            flag++;
        }
    }
    if (flag === states.length) {
        document.getElementById("btn-submit").disabled = false;
    }
    else {
        document.getElementById("btn-submit").disabled = true;
    }
}

function submit() {
    let states = document.getElementsByClassName("card");
    let result = false;
    for (let index = 0; index < states.length; index++) {
        switch (states[index].children[0].innerText) {
            case "Haryana":
                states[index].children[1].innerText === "Chandigarh" ? result = true : result = false;
                break;
            case "Uttar Pradesh":
                states[index].children[1].innerText === "Lucknow" ? result = true : result = false;
                break;
            case "Himachal":
                states[index].children[1].innerText === "Shimla" ? result = true : result = false;
                break;
            case "Uttarakhand":
                states[index].children[1].innerText === "Dehradun" ? result = true : result = false;
                break;
            case "Rajasthan":
                states[index].children[1].innerText === "Jaipur" ? result = true : result = false;
                break;
        }
    }
    let message = "That's Incorrect.";
    if (result) {
        message = "That's Correct."
    }
    document.getElementById("feedback").innerHTML = message;
}