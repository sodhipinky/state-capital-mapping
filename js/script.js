let capitals = ['Chandigarh', 'Dehradun', 'Jaipur', 'Lucknow', 'Shimla'];
let states = ['Haryana', 'Uttar Pradesh', 'Himachal', 'Uttarakhand', 'Rajasthan'];
let capitalRow = document.getElementById("capital-row");
let stateRow = document.getElementById("state-row");

function load() {
    for (let index = 0; index < capitals.length; index++) {
        let capitalDiv = document.createElement("div");
        capitalDiv.setAttribute("class", "col-md-2 p-2");
        capitalDiv.setAttribute("id", "cap-" + index);
        capitalDiv.setAttribute("ondrop", "drop(event)");
        capitalDiv.setAttribute("ondragover", "allowDrop(event)");

        let button = document.createElement("button");
        button.setAttribute("class", "btn-capital btn-secondary bg-white rounded-5 text-secondary");
        button.setAttribute("draggable", "true");
        button.setAttribute("ondragstart", "drag(event)");
        button.setAttribute("id", "btn-cap-" + index);
        button.innerText = capitals[index];

        capitalDiv.appendChild(button);
        capitalRow.appendChild(capitalDiv);

        let stateDiv = document.createElement("div");
        stateDiv.setAttribute("class", "col-md-2");

        let stateCard = document.createElement("div");
        stateCard.setAttribute("class", "card");

        let stateCardHeader = document.createElement("div");
        stateCardHeader.setAttribute("class", "card-header text-center bg-info text-white");
        stateCardHeader.innerText = states[index];

        let stateCardBody = document.createElement("div");
        stateCardBody.setAttribute("class", "card-body bg-info-subtle");
        stateCardBody.setAttribute("id", "state-" + index);
        stateCardBody.setAttribute("ondrop", "drop(event)");
        stateCardBody.setAttribute("ondragover", "allowDrop(event)");

        stateCard.appendChild(stateCardHeader);
        stateCard.appendChild(stateCardBody);
        stateDiv.appendChild(stateCard);
        stateRow.appendChild(stateDiv);
    }
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    if (event.srcElement.id.indexOf("btn-cap-") === -1) {
        if (event.srcElement.children.length === 0) {
            event.preventDefault();
            let data = event.dataTransfer.getData("text");
            event.target.appendChild(document.getElementById(data));
            document.getElementById((event.target.id)).minWidth = document.getElementById((event.target.id)).maxContent;
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
}

function submit() {
    let states = document.getElementsByClassName("card");
    let result = false;
    let index = 0;
    do {
        switch (states[index].children[0].innerText) {
            case "Haryana":
                result = states[index].children[1].innerText === "Chandigarh" ? true : false;
                break;
            case "Uttar Pradesh":
                result = states[index].children[1].innerText === "Lucknow" ? true : false;
                break;
            case "Himachal":
                result = states[index].children[1].innerText === "Shimla" ? true : false;
                break;
            case "Uttarakhand":
                result = states[index].children[1].innerText === "Dehradun" ? true : false;
                break;
            case "Rajasthan":
                result = states[index].children[1].innerText === "Jaipur" ? true : false;
                break;
        }
        index++;
    }
    while (result && index < states.length);
    let message = "That's Incorrect.";
    if (result) {
        message = "That's Correct."
    }
    document.getElementById("feedback").innerHTML = message;
    document.getElementById("btn-reset").disabled = false;
}

function reset() {
    capitalRow.innerHTML = "";
    stateRow.innerHTML = "";
    let states = document.getElementsByClassName("card-body");
    for (let index = 0; index < states.length; index++) {
        states[index].innerHTML = "";
    }
    load();
    document.getElementById("btn-submit").disabled = true;
    document.getElementById("btn-reset").disabled = true;
}