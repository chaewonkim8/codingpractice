window.onload = async function() {
    const chatlog = document.querySelector('.chatlog');
    const message = document.getElementById('message');
    const sendBtn = document.getElementById('send-btn');
    let inputMessages = [];
    let outputMessages = [];
  
    async function sendCounselorRequest() {
      try {
        //로컬에서 서버 node app.js 커맨드로 띄웠을때 테스트하는 코드
        const response = await fetch('http://localhost:3000/counselor', {
        
        //http 요청으로 서버와 통신할때 사용하는 코드
        //const response = await fetch('http://16thtryworkersassistant-env.eba-7idwpbmf.us-east-2.elasticbeanstalk.com/counselor', { 

        //https 요청으로 서버와 통신할때 쓰는 코드
        // const response = await fetch('https://www.deployapp.click/counselor', {
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
        console.log("data-received: "+counselor); // log the counselor data received
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
    console.log("output message: "+outputMessages); // log the outputmessage array?
    chatlog.insertAdjacentHTML('beforeend', chatEntry);
  
    const handleUserMessage = async () => {
      const userMessage = message.value.trim();
      if (userMessage === '') return;
  
      inputMessages.push(userMessage);
      console.log("input message: "+inputMessages); // log the inputmessage array
  
      const counselor = await sendCounselorRequest();
      const botMessage = counselor.assistant;
  
      const chatEntry = `
        <div class="message user-message">${userMessage}</div>
        <div class="message bot-message">${botMessage}</div>
      `;
  
      outputMessages.push(botMessage);
      console.log("output message: "+outputMessages); // log the outputmessage array
      chatlog.insertAdjacentHTML('beforeend', chatEntry);
      message.value = '';
    };

    sendBtn.addEventListener('click', handleUserMessage);

    message.addEventListener('keydown', async (event) => {
      if (event.key === 'Enter') {
        event.preventDefault(); // Prevent the default behavior of the Enter key
  
        if (!event.shiftKey) {
          handleUserMessage();
        }
      }
    });
  }
  