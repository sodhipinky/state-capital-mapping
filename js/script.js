let capitals = ['Chandigarh', 'Dehradun', 'Jaipur', 'Lucknow', 'Shimla'];
let states = ['Haryana', 'Uttar Pradesh', 'Himachal', 'Uttarakhand', 'Rajasthan'];
let capitalRow = document.getElementById("capital-row");
let stateRow = document.getElementById("state-row");

function load() {
    for(let index = 0; index < capitals.length; index++) {
        let div = document.createElement("div");
        div.setAttribute("class", "col-md-2 h2");
        div.setAttribute("id", "cap-" + index);
        div.setAttribute("ondrop", "drop(event)");
        div.setAttribute("ondragover", "allowDrop(event)");

        let button = document.createElement("button");
        button.setAttribute("class", "btn-secondary bg-white p-3 rounded-5 text-secondary");
        button.setAttribute("draggable", "true");
        button.setAttribute("ondragstart", "drag(event)");
        button.setAttribute("id", "btn-cap-" + index);
        button.innerText = capitals[index];

        div.appendChild(button);
        capitalRow.appendChild(div);
    }
}

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

function reset() {
    capitalRow.innerHTML = "";
    let states = document.getElementsByClassName("card-body");
    for (let index = 0; index < states.length; index++) {
        states[index].innerHTML = "";
    }
    load();
    document.getElementById("btn-submit").disabled = true;
}