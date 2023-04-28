const apiKey = "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"
const { Configuration, OpenAIApi } = require("openai");
const express = require('express')
var cors = require('cors')
const app = express()
const configuration = new Configuration({
    apiKey: apiKey,
});
const openai = new OpenAIApi(configuration);

//CORS 문제해결
let corsOptions = {
    origin: 'http://127.0.0.1:5500',
    credentials: true
}

app.use(cors(corsOptions));

//POST 요청 받을수 있게 만듬
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

//post method route
app.post('/counselor', async function (req, res) {
    let { inputMessages, outputMessages} = req.body
    //console.log(inputMessages);
    //console.log(outputMessages);
    let messages = [
        { role: "system", content: "You are a therapist/counselor who specializes in taking care of the mental health of domestic migrant workers in Hong Kong. Keep your answer limited to shorter than 20 words. If the answer exceeds or equals to 20 words, summarize it so that it's shorter than 20 words. Start your answer by empathizing (under 8 words) End your answer with a question and a question mark. The question should ask the user about the user's emotion, opinion, or provide suggestions. Make sure your answer only uses words that middle school students can also understand. Your very first answer should be a single sentence contain nothing else than 'Welcome, how can I assist you today?'. For the first answer, end your answer with the single sentence I just mentioned. You will receive more questions afterwards. Don't add any question or statement in your first answer, and wait for more questions from the user" }
    //    { role: "user", content: "You are a therapist/counselor who specializes in taking care of the mental health of domestic migrant workers in Hong Kong. Keep your answer limited to shorter than 20 words. If the answer exceeds or equals to 20 words, summarize it so that it's shorter than 20 words. Start your answer by empathizing (under 8 words) End your answer with a question and a question mark. The question should ask the user about the user's emotion, opinion, or provide suggestions. Make sure your answer only uses words that middle school students can also understand." },
    //    { role: "assistant", content: "I understand how challenging it can be to work in a foreign country. As a therapist, I'm here to help you manage your emotions and cope with stress. Let's work together to improve your mental health and well-being. What are some of the things that have been causing you stress lately?" }
    ]

    while (inputMessages.length != 0 || outputMessages.length != 0) {
        if (inputMessages.length != 0) {
            messages.push(
                JSON.parse('{"role": "user", "content": "'+String(inputMessages.shift())+'"}')
            )
        }
        if (outputMessages.length != 0) {
            messages.push(
                JSON.parse('{"role": "assistant", "content": "'+String(outputMessages.shift())+'"}')
            )    
        } 
    }

    //console.log(messages);

    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: messages
    });

    //let answer = completion.data.choices[1].message['content']
    let answer = '';
    if (completion.data.choices.length > 0) {
      answer = completion.data.choices[0].message['content'];
    }
    console.log(answer);


    res.json({assistant: answer});
});

app.listen(3000)



