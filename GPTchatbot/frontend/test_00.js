const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

let isUserTyping = false;

messageForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const message = messageInput.value;
  appendMessage(`You: ${message}`);
  messageInput.value = '';
  isUserTyping = false;
  const counselorResponse = await sendCounselorRequest(message);
  appendMessage(`Counselor: ${counselorResponse}`);
});

messageInput.addEventListener('input', () => {
  isUserTyping = true;
});

setInterval(async () => {
  if (isUserTyping) {
    return;
  }
  const counselorResponse = await sendCounselorRequest();
  appendMessage(`Counselor: ${counselorResponse}`);
}, 1000);

async function sendCounselorRequest(message) {
  const response = await fetch('http://localhost:3000/counselor', {
    method: 'POST',
    body: JSON.stringify({ message }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const counselor = await response.json();
  return counselor.response;
}

function appendMessage(message) {
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageContainer.append(messageElement);
}
