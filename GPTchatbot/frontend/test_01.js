const chat = document.querySelector('.chat');
const chatForm = document.querySelector('.chat-form');
const chatInput = document.querySelector('.chat-input');

// create a new chat bubble with the given message and class name
function createChatBubble(message, className) {
  const chatBubble = document.createElement('div');
  chatBubble.classList.add('chat-bubble');
  chatBubble.classList.add(className);
  chatBubble.textContent = message;
  chat.appendChild(chatBubble);
}

// send a message to the assistant
async function sendMessage(message) {
  try {
    const response = await fetch('http://localhost:3000/counselor', {
      method: 'POST',
      body: JSON.stringify({ message }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const counselor = await response.json();
    createChatBubble(counselor.assistant, 'assistant');
  } catch (error) {
    console.error(error);
  }
}

// add a message to the chat when the form is submitted
chatForm.addEventListener('submit', event => {
  event.preventDefault();
  const message = chatInput.value;
  createChatBubble(message, 'user');
  sendMessage(message);
  chatInput.value = '';
});
