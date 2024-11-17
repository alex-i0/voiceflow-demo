'use client'

import { usePathname } from 'next/navigation';

export const VoiceflowChat = () => {
  const pathname = usePathname();
  const scriptId = 'voiceflow-widget-script';

  // Check if the path contains '/en'
  const isEnglishPath = pathname.includes('/en');
  const { body } = document;
  const script = document.createElement('script');
  script.src = 'https://cdn.voiceflow.com/widget/bundle.mjs';
  script.type = 'text/javascript';
  script.id = scriptId;

  script.onload = () => initializeVoiceflow(isEnglishPath, pathname);

  if(!document.getElementById(scriptId)) body.appendChild(script);

  return null;
};

const proactiveMessages = (isEnglishPath: boolean, pathname: string) => {
  console.log(pathname);
const firstMessage = proactiveMessagesList[pathname]?.firstMessage;
const secondMessage = proactiveMessagesList[pathname]?.secondMessage;
const timeout = proactiveMessagesList[pathname]?.timeout;
// @ts-expect-error VoiceflowChat is defined 
  window.voiceflow.chat.proactive.push({
    type: 'text',
    payload: { message: firstMessage }
  });

  if(!!secondMessage) {
    setTimeout(() => {
      // @ts-expect-error VoiceflowChat is defined 
      window.voiceflow.chat.proactive.push({
        type: 'text',
        payload: { message: secondMessage }
      });
    }, timeout); // 5000 milliseconds = 5 seconds
  };
  }
 

const initializeVoiceflow = (isEnglishPath: boolean, pathname: string) => {
  const projectId = isEnglishPath ? '6719d7b09a9c71c7c3fcf8d9' : '671337603b38507f51635fa9';

  // @ts-expect-error VoiceflowChat is defined
  window.voiceflow.chat.load({
    verify: { projectID: projectId },
    url: 'https://general-runtime.voiceflow.com',
    versionID: 'production',
  }).then(() => {
    // @ts-expect-error VoiceflowChat is defined 
    window.voiceflow.chat.proactive.clear(); // clear all previous messages
    proactiveMessages(isEnglishPath, pathname);
  });
};

const proactiveMessagesList: any =  {
  '/': {
    firstMessage: 'W czy mogę Ci pomóc?',
    secondMessage: null,
    timeout: 0,
  },
  '/nieruchomosci': {
    firstMessage: 'Potrzebujesz wsparcia w poszukiwaniach? 🏢',
    secondMessage: 'Porozmawiaj z agentem AI',
    timeout: 5000,
  },
  '/uslugi': {
    firstMessage: 'Potrzebujesz wsparcia?',
    secondMessage: 'Porozmawiajmy!',
    timeout: 5000,
  },
  '/o-nas': {
    firstMessage: 'Czy potrzebujesz dodatkowych informacji?',
    secondMessage: 'Porozmawiajmy 👀',
    timeout: 5000,
  },
  '/kalkulator-m2': {
    firstMessage: 'Potrzebujesz optymalizacji powierzchni? 📐',
    secondMessage: 'Albo szukasz biura na wynajem?',
    timeout: 5000,
  },
  '/blog': {
    firstMessage: 'Czy możemy Ci jakoś pomóc?',
    secondMessage: 'Porozmawiaj z naszym doradcą AI 💬',
    timeout: 5000,
  },
  '/kontakt': {
    firstMessage: 'Potrzebujesz pomocy?',
    secondMessage: 'Zostaw swoje namiary, oddzwonimy! ☎️',
    timeout: 8000,
  },
}