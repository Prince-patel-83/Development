
const keyboard = document.querySelector("#keyboard");
const history = document.querySelector("#history");

const keyCount = document.querySelector("#keyCount");
const historyCount = document.querySelector("#historyCount");
const lastKey = document.querySelector("#lastKey");
const status = document.querySelector("#status");


const pressedKeys = new Set();


function findKey(code) {
    return keyboard.querySelector(
        `[data-code="${code}"]`
    );
}


function getKeyName(event) {

    if (event.code === "Space") return "Space";

    if (event.code.startsWith("Key")) {
        return event.code.replace("Key", "");
    }

    if (event.code.startsWith("Digit")) {
        return event.code.replace("Digit", "");
    }

    if (event.code.startsWith("Numpad")) {
        return "Num " + event.code.replace("Numpad", "");
    }

    const key = findKey(event.code);

    return key ? key.textContent.trim() : event.key;
}


window.addEventListener("keydown", function(event) {

    // Prevent browser default shortcuts
    if (
        event.code.startsWith("F") ||
        event.code === "Space" ||
        event.code.startsWith("Arrow") ||
        event.code === "Tab" ||
        event.code === "Backspace"
    ) {
        event.preventDefault();
    }

    if (pressedKeys.has(event.code)) {
        return;
    }

    pressedKeys.add(event.code);

    const selectedKey = findKey(event.code);

    if (selectedKey) {
        selectedKey.classList.add("pressed");
    }

    const keyName = getKeyName(event);

    const emptyMessage = history.querySelector(".empty-message");

    if (emptyMessage) {
        emptyMessage.remove();
    }

    const historyKey = document.createElement("div");

    historyKey.classList.add("history-key");
    historyKey.textContent = keyName;

    history.appendChild(historyKey);

    history.scrollLeft = history.scrollWidth;

    updateDashboard(keyName);

});


function updateDashboard(keyName) {

    const total = pressedKeys.size;

    keyCount.textContent = total;
    historyCount.textContent = total + " keys";
    lastKey.textContent = keyName;

    status.textContent = "Testing";
}



window.addEventListener("keyup", function(event) {

    console.log("Key released:", event.code);

});

