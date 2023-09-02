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