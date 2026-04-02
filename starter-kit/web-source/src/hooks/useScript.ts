import { useState, useEffect } from 'react';

type ScriptStatus = 'idle' | 'loading' | 'ready' | 'error';

interface UseScriptOptions {
  src: string;
  async?: boolean;
  defer?: boolean;
}

export function useScript({ src, async = true, defer = false }: UseScriptOptions): ScriptStatus {
  const [status, setStatus] = useState<ScriptStatus>(src ? 'loading' : 'idle');

  useEffect(() => {
    if (!src) {
      setStatus('idle');
      return;
    }

    // Check if script already exists
    let script = document.querySelector(`script[src="${src}"]`) as HTMLScriptElement;

    if (script) {
      setStatus(script.getAttribute('data-status') as ScriptStatus || 'ready');
      return;
    }

    script = document.createElement('script');
    script.src = src;
    script.async = async;
    script.defer = defer;
    script.setAttribute('data-status', 'loading');
    document.body.appendChild(script);

    const handleLoad = () => {
      script.setAttribute('data-status', 'ready');
      setStatus('ready');
    };

    const handleError = () => {
      script.setAttribute('data-status', 'error');
      setStatus('error');
    };

    script.addEventListener('load', handleLoad);
    script.addEventListener('error', handleError);

    return () => {
      script.removeEventListener('load', handleLoad);
      script.removeEventListener('error', handleError);
    };
  }, [src, async, defer]);

  return status;
}
