
(function() {
    let conversationHistory = [
      { role: 'assistant', content: 'Hej, jak mogę Ci dzisiaj pomóc?' }
    ];

    // Add Tailwind CSS for styling
    document.head.insertAdjacentHTML(
      'beforeend',
      '<link href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.16/tailwind.min.css" rel="stylesheet">'
    );
  
    // Inject custom CSS
    const style = document.createElement('style');
    style.innerHTML = `
    .hidden {
      display: none;
    }
    #chat-widget-container {
      position: fixed;
      bottom: 20px;
      right: 20px;
      flex-direction: column;
    }
    #chat-popup {
      height: 70vh;
      max-height: 70vh;
      transition: all 0.3s;
      overflow: hidden;
    }
    @media (max-width: 768px) {
      #chat-popup {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        max-height: 100%;
        border-radius: 0;
      }
    }
    `;
    document.head.appendChild(style);
  
    // Create the chat widget container
    const chatWidgetContainer = document.createElement('div');
    chatWidgetContainer.id = 'chat-widget-container';
    document.body.appendChild(chatWidgetContainer);
  
    // Inject the HTML for the widget
    chatWidgetContainer.innerHTML = `
      <div style="background-color: #100F2D;" id="chat-bubble" class="w-16 h-16 rounded-full flex items-center justify-center cursor-pointer text-3xl">
        <img class="h-12 w-12" src="data:image/svg+xml,%3csvg%20viewBox='0%200%2036%2036'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3e%3cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%3e%3cpath%20d='M18.0000533,7%20C24.6266329,7%2030,11.4789312%2030,16.9976931%20C30,22.5163617%2024.6266329,26.9953062%2018.0000533,26.9953062%20C17.123351,26.9971724%2016.2483812,26.9169271%2015.386606,26.7553699%20C14.0404188,27.7431078%2012.5315125,28.4873102%2010.9284053,28.9541197%20C10.4583473,29.0903502%209.95341047,28.916663%209.66660965,28.5199682%20C9.37982216,28.1234068%209.37297168,27.5894152%209.64952342,27.1855224%20C10.1505552,26.5172998%2010.5515886,25.7796289%2010.840002,24.9957036%20C7.9365286,23.3624038%206.10015838,20.3278759%206,16.9976931%20C6,11.4789179%2011.3733271,7%2018.0000533,7%20Z%20M18.0000533,18.0020932%20L14.0000889,18.0020932%20L13.8644511,18.0112196%20C13.3765531,18.0774186%2013.0005042,18.4957012%2013.0005042,19.0018279%20C13.0005042,19.5539661%2013.4480335,20.0015625%2014.0000889,20.0015625%20L18.0000533,20.0015625%20L18.135691,19.9924361%20C18.623589,19.9262371%2018.9996379,19.5079545%2018.9996379,19.0018279%20C18.9996379,18.4496896%2018.5521087,18.0020932%2018.0000533,18.0020932%20Z%20M22.0001244,14.001515%20L14.0000889,14.001515%20L13.8644511,14.0106414%20C13.3765531,14.0768404%2013.0005042,14.495123%2013.0005042,15.0012497%20C13.0005042,15.5533879%2013.4480335,16.0009843%2014.0000889,16.0009843%20L22.0001244,16.0009843%20L22.1357621,15.9918579%20C22.6236601,15.9256589%2022.999709,15.5073764%2022.999709,15.0012497%20C22.999709,14.4491115%2022.5521797,14.001515%2022.0001244,14.001515%20Z'%20fill='%23ffffff'%3e%3c/path%3e%3c/g%3e%3c/svg%3e" />
      </div>
      <div id="chat-popup" class="hidden absolute bottom-20 right-0 w-96 bg-white rounded-md shadow-md flex flex-col transition-all text-sm">
        <div  style="background-color: #100F2D;" id="chat-header" class="flex justify-between items-center p-4 text-white rounded-t-lg">
        <div class="flex gap-x-2">
         <img class="w-6 h-6" src="https://cm4-production-assets.s3.amazonaws.com/1729313423218-apple-touch-icon.png" />  
        <h3 class="m-0 text-lg">AI Agent</h3>
        </div>
          <button id="close-popup" class="bg-transparent border-none text-white cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div id="chat-messages" class="flex-1 p-4 overflow-y-auto">
        <div class="flex flex-col justify-center items-center mb-6 p-8">
            <img class="w-16 h-16" src="https://cm4-production-assets.s3.amazonaws.com/1731862489163-unnamed-1.png" />
            <h1 class="m-2 text-lg font-semibold">AI Agent</h1>
            <p class="text-gray-600">Jestem wirtualnym asystentem, ale posiadam dużą wiedzę i ludzkie cechy.</p>
        </div>
        </div>
        <div id="chat-input-container" class="p-4">
          <div class="flex space-x-4 items-center">
            <input type="text" id="chat-input" class="flex-1 border border-gray-300 rounded-md px-4 py-2 outline-none w-3/4" placeholder="Message...">
            <button id="chat-submit" class="bg-gray-800 text-white rounded-md px-4 py-2 cursor-pointer">Send</button>
          </div>
        </div>
      </div>
    `;
  
    // Add event listeners
    const chatInput = document.getElementById('chat-input');
    const chatSubmit = document.getElementById('chat-submit');
    const chatMessages = document.getElementById('chat-messages');
    const chatBubble = document.getElementById('chat-bubble');
    const chatPopup = document.getElementById('chat-popup');
    const closePopup = document.getElementById('close-popup');
  
    // Display initial assistant message
    displayReplyMessage(conversationHistory[0].content);
  
    chatSubmit.addEventListener('click', function() {
      const message = chatInput.value.trim();
      if (!message) return;
  
      chatInput.value = '';
      displayUserMessage(message);
      getChatGPTReply(message);
    });
  
    chatInput.addEventListener('keyup', function(event) {
      if (event.key === 'Enter') {
        chatSubmit.click();
      }
    });
  
    chatBubble.addEventListener('click', function() {
      togglePopup();
      initializeChatWidget();
    });
  
    closePopup.addEventListener('click', function() {
      togglePopup();
    });
  
    function togglePopup() {
      chatPopup.classList.toggle('hidden');
      
      if (!chatPopup.classList.contains('hidden')) {
        chatInput.focus();
      }
    }
  
    let threadId = null;
  
    function displayUserMessage(message) {
      const messageElement = document.createElement('div');
      messageElement.className = 'flex justify-end mb-3';
      messageElement.innerHTML = `
        <div class="bg-gray-800 text-white rounded-lg py-2 px-4 max-w-[70%]">
          ${message}
        </div>
      `;
      chatMessages.appendChild(messageElement);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  
    function displayReplyMessage(message) {
      const replyElement = document.createElement('div');
      replyElement.className = 'flex mb-3';
      replyElement.innerHTML = `
        <div class="bg-gray-200 text-black rounded-lg py-2 px-4 max-w-[70%]">
          ${message}
        </div>
      `;
      chatMessages.appendChild(replyElement);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  
    async function getChatGPTReply(userMessage) {
      // Add user message to conversation history

      const response = await sendMessage(userMessage, threadId);
      conversationHistory.push({ role: 'user', content: userMessage });
      conversationHistory.push({ role: 'assistant', content: response });
  
      // Display the assistant's response
      displayReplyMessage(response);
    }
  
    const initializeChatWidget = async () => {
      if(!!threadId) return;
    
    //   assistant = await getAssistant('asst_bQIay4lQB3U9l265MevyHJCT');
      const response = await requestInitialization();
      console.log(response)
      threadId = await response;
    }
  })();


  const requestInitialization = async () => {
    const response = await fetch('https://reframe-ai.uc.r.appspot.com/api/initialize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data.threadId;
  }

  const sendMessage = async (userMessage, threadId) => {
    const response = await fetch('https://reframe-ai.uc.r.appspot.com/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userMessage,
        threadId,
        assistantId: 'asst_bQIay4lQB3U9l265MevyHJCT',
      }),
    });
    const data = await response.json();
    return data;
  }