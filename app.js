const johnSelectorBtn = document.querySelector("#john-selector");
const janeSelectorBtn = document.querySelector("#jane-selector");
const chatHeader = document.querySelector(".chat-header");
const chatMessages = document.querySelector(".chat-messages");
const chatInput = document.querySelector(".chat-input");
const chatInputForm = document.querySelector(".chat-input-form");
const clearChatButton = document.querySelector(".clear-chat-button");




let messages = JSON.parse(localStorage.getItem("messages")) || [];


// who send

let messageSender = 'John';

const updateMessageSender = (name) => {
    messageSender = name;
    chatHeader.innerHTML = `${messageSender} Chatting...`;
    chatInput.placeholder = `Type Here, ${messageSender}...`;
    if (messageSender === 'John') {
        johnSelectorBtn.classList.add("active-person");
        janeSelectorBtn.classList.remove("active-person");
    }

    if (messageSender === 'Jane') {
        janeSelectorBtn.classList.add("active-person");
        johnSelectorBtn.classList.remove("active-person");
    }

    chatInput.focus();
}

johnSelectorBtn.onclick = () => updateMessageSender('John');
janeSelectorBtn.onclick = () => updateMessageSender('Jane');
// who send





const sendMessage = (e) => {
    e.preventDefault()

    const timestamp = new Date().toLocaleString('en-us', { hour: "numeric", minute: "numeric", hour12: true });
    const message = {
        sender: messageSender,
        text: chatInput.value,
        timestamp
    }

    messages.push(message);
    localStorage.setItem('messages', JSON.stringify(messages));

    chatMessages.innerHTML += createchatMessageElement(message);
    chatInputForm.reset()
    chatInput.focus();

    chatMessages.scrollTop = chatMessages.scrollHeight;

}

const createchatMessageElement = (message) => `
          <div class="message  ${message.sender === 'John' ? 'blue-bg' : 'gray-bg'}">
                <div class="message-sender">${message.sender}</div>
                <div class="message-text">${message.text}</div>
                <div class="message-timestamp">${message.timestamp}</div>
            </div>
`;


chatInputForm.addEventListener("submit", sendMessage);






window.onload = () => {
    messages.forEach(message => {
        chatMessages.innerHTML += createchatMessageElement(message)
    });
}





clearChatButton.addEventListener("click", () => {
    localStorage.clear();
    chatMessages.innerHTML = '';
})