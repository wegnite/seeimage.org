'use client';

import { websiteConfig } from '@/config/website';
import { useEffect } from 'react';

/**
 * Crisp chat component
 * https://crisp.chat/en/
 * https://help.crisp.chat/en/article/how-do-i-install-crisp-live-chat-on-nextjs-xh9yse/
 */
const CrispChat = () => {
  useEffect(() => {
    // Only load if enabled and properly configured
    if (!websiteConfig.features.enableCrispChat) return;

    const websiteId = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID;
    if (!websiteId) return;

    // Dynamically import to keep initial bundle small
    import('crisp-sdk-web')
      .then(({ Crisp }) => {
        try {
          Crisp.configure(websiteId);
        } catch (err) {
          console.error('Failed to initialize Crisp chat:', err);
        }
      })
      .catch((err) => {
        console.error('Failed to load Crisp SDK:', err);
      });
  }, []);

  return null;
};

export default CrispChat;
