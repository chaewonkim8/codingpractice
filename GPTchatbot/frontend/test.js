window.onload = async function() {
    const chatlog = document.querySelector('.chatlog');
    const message = document.getElementById('message');
    const sendBtn = document.getElementById('send-btn');
    let inputMessages = [];
    let outputMessages = [];
  
    async function sendCounselorRequest() {
      try {
        const response = await fetch('http://localhost:3000/counselor', {
          method: 'POST',
          body: JSON.stringify({
            inputMessages: inputMessages,
            outputMessages: outputMessages
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const counselor = await response.json();
        //console.log(counselor); // log the counselor data received
        return counselor; // return the counselor data received
      } catch (error) {
        //console.error(error);
      }
    }
  
    // Send request when page loads and display bot's first response
    const counselor = await sendCounselorRequest();
    const botMessage = counselor.assistant;
    const chatEntry = `
      <div class="message bot-message">${botMessage}</div>
    `;
    outputMessages.push(botMessage);
    chatlog.insertAdjacentHTML('beforeend', chatEntry);
  
    sendBtn.addEventListener('click', async () => {
      const userMessage = message.value.trim();
      if (userMessage === '') return;
      
      inputMessages.push(userMessage);

      const counselor = await sendCounselorRequest();
      const botMessage = counselor.assistant;
  
      const chatEntry = `
        <div class="message user-message">${userMessage}</div>
        <div class="message bot-message">${botMessage}</div>
      `;
      
      outputMessages.push(botMessage);
      //console.log(inputMessages);
      //console.log(outputMessages);
      chatlog.insertAdjacentHTML('beforeend', chatEntry);
      message.value = '';
    });
  }
  