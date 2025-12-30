'use client';

import * as amplitude from '@amplitude/analytics-browser';
import { sessionReplayPlugin } from '@amplitude/plugin-session-replay-browser';

let isInitialized = false;

export function initAmplitude(): void {
  if (typeof window === 'undefined') return;
  if (isInitialized) return;

  isInitialized = true;

  amplitude.add(sessionReplayPlugin({ sampleRate: 1 }));

  amplitude.init('d9c1473c2a31d10a8fd3828b673cf6c1', undefined, {
    autocapture: true,
  });
}

// This component is only used to trigger initialization
export function Amplitude(): null {
  initAmplitude();
  return null;
}

export default amplitude;
