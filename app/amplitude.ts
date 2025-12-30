'use client';

import * as amplitude from '@amplitude/analytics-browser';
import { sessionReplayPlugin } from '@amplitude/plugin-session-replay-browser';

export function initAmplitude() {
  if (typeof window === 'undefined') return;

  // Avoid initializing twice during dev hot reload
  if ((window as any).__amplitude_inited) return;
  (window as any).__amplitude_inited = true;

  amplitude.add(sessionReplayPlugin({ sampleRate: 1 }));

  amplitude.init('d9c1473c2a31d10a8fd3828b673cf6c1', undefined, {
    autocapture: true,
  });
}

export const Amplitude = () => {
  initAmplitude();
  return null;
};

export default amplitude;
