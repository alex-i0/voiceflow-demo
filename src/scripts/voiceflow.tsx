'use client'

import { useEffect } from 'react';

export const VoiceflowChat = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.voiceflow.com/widget/bundle.mjs';
    script.type = 'text/javascript';

    script.onload = function () {
      // @ts-expect-error VoiceflowChat is defined
      window.voiceflow.chat.load({
        verify: { projectID: '671337603b38507f51635fa9' },
        url: 'https://general-runtime.voiceflow.com',
        versionID: 'production',
      }).then(() => {
        // @ts-expect-error VoiceflowChat is defined 
        window.voiceflow.chat.proactive.clear(); // clear all previous messages
                // @ts-expect-error VoiceflowChat is defined 
        window.voiceflow.chat.proactive.push({ 
          type: 'text', 
          payload: { message: 'Poszukujesz biura na wynajem? 🏢' }
        }, { 
          type: 'text', 
          payload: { message: 'Kliknij w chat a my Ci pomożemy!' }
        })
      });



    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
};