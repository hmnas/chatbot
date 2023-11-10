let sendBtn = document.querySelector('.input span')
let messageToSend = document.querySelector('.input textarea')
let chatbox = document.querySelector('.chatbox')
let toggleBtn = document.querySelector('.toggle')
let closeBtn = document.querySelector('.close')


sendBtn.addEventListener('click', chat)
let userMsg;
let inputHeight = messageToSend.scrollHeight

function chat() {
    userMsg = messageToSend.value.trim()
    console.log(userMsg)
    if (!userMsg) return
    messageToSend.style.height = `${inputHeight}px`
    chatbox.appendChild(divForChat(userMsg, 'chat-out'))
    messageToSend.value = ''
    chatbox.scrollTo(0, chatbox.scrollHeight)

    setTimeout(() => {
        chatbox.appendChild(divForChat('Thinking...', 'chat-in'))
        getChat()
        chatbox.scrollTo(0, chatbox.scrollHeight)
        // console.log(chatbox.scrollHeight)
    }, 500);

}

function divForChat(message, className) {
    let div = document.createElement('div')
    div.classList.add('chat', className)
    let chatContent = className === 'chat-out' ? `<p></p>` : `  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-robot"
    viewBox="0 0 16 16">
    <path
        d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5ZM3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.58 26.58 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.933.933 0 0 1-.765.935c-.845.147-2.34.346-4.235.346-1.895 0-3.39-.2-4.235-.346A.933.933 0 0 1 3 9.219V8.062Zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a24.767 24.767 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25.286 25.286 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135Z" />
    <path
        d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2V1.866ZM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5Z" />
</svg>
<p></p>`

    div.innerHTML = chatContent
    div.querySelector('p').textContent = message
    return div
}

function getChat() {
    const url = 'https://asos2.p.rapidapi.com/v2/auto-complete?q=bikini%20top&store=US&country=US&currency=USD&sizeSchema=US&lang=en-US';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '86628e2a66msh177d55edb02030dp1cb0ddjsn7cf025af0206',
            'X-RapidAPI-Host': 'asos2.p.rapidapi.com'
        }
    };

    fetch(url, options).then(res => res.json()).then((data) => {
        console.log(data)
    }).catch((err) => {
        console.log(err)
    }).finally(() => { chatbox.scrollTo(0, chatbox.scrollHeight) })
    // let api = `https://api.openai.com/v1/chat/completions`
    // let api_key = `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`

    // let request = {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${api_key}`
    //     },
    //     body: JSON.stringify({
    //         model: "gpt-3.5-turbo",
    //         messages: [{ role: 'user', content: userMsg }]

    //     })
    // }

    // fetch(api, request).then(res => res.json()).then((data) => {
    //     console.log(data)
    // }).catch((err) => {
    //     console.log(err)
    // }).finally(() => { chatbox.scrollTo(0, chatbox.scrollHeight) })
}

toggleBtn.addEventListener('click', function () {
    document.body.classList.toggle('show-container')
})

closeBtn.addEventListener('click', function () {
    document.body.classList.remove('show-container')
})

messageToSend.addEventListener('input', function () {
    messageToSend.style.height = `${inputHeight}px`
    messageToSend.style.height = `${messageToSend.scrollHeight}px`

})

messageToSend.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {

        e.preventDefault()
        chat()
    }
})