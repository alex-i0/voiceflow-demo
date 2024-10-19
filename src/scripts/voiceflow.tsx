'use client'

import { useEffect } from 'react';

const VoiceflowChat = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.voiceflow.com/widget/bundle.mjs';
    script.type = 'text/javascript';

    script.onload = function () {
      window.voiceflow.chat.load({
        verify: { projectID: '670ea2e00799867cf9b28fef' },
        url: 'https://general-runtime.voiceflow.com',
        versionID: 'production',
      });
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
};

export default VoiceflowChat;