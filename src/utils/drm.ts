interface Config {
  distinctiveIdentifier?: 'not-allowed' | 'optional' | 'required';
  initDataTypes?: string[];
  videoCapabilities?: { contentType: string }[];
  persistentState?: 'not-allowed' | 'optional' | 'required';
  sessionTypes?: string[];
}

export function isBrowserSupportDrm(): Promise<{
  widevine: boolean;
  fairplay: boolean;
}> {
  const testKeySystems: string[] = [
    'com.widevine.alpha',
    'com.apple.fps.3_0',
    'com.apple.fps.2_0',
    'com.apple.fps.1_0',
    'com.apple.fps',
  ];

  const basicVideoCapabilities = [
    { contentType: 'video/mp4; codecs="avc1.42E01E"' },
    { contentType: 'video/webm; codecs="vp8"' },
  ];

  const basicConfig: Config = {
    initDataTypes: ['cenc'],
    videoCapabilities: basicVideoCapabilities,
  };

  const offlineConfig: Config = {
    videoCapabilities: basicVideoCapabilities,
    persistentState: 'required',
    sessionTypes: ['persistent-license'],
  };

  const configs: Config[] = [offlineConfig, basicConfig];

  const support: Record<string, boolean> = {};

  const testSystem = (keySystem: string) =>
    navigator
      .requestMediaKeySystemAccess(keySystem, configs)
      .then(() => {
        support[keySystem] = true;
      })
      .catch(() => {
        support[keySystem] = false;
      });

  // Test each key system.
  const tests = testKeySystems.map((keySystem) => testSystem(keySystem));

  return Promise.all(tests).then(() => {
    const isSupportWidevine = support['com.widevine.alpha'] === true;
    const isSupportFairPlay =
      support['com.apple.fps.3_0'] === true ||
      support['com.apple.fps.2_0'] === true ||
      support['com.apple.fps.1_0'] === true ||
      support['com.apple.fps'] === true;

    if (!isSupportWidevine && !isSupportFairPlay) {
      return Promise.reject(new Error('Browser does not support DRM'));
    }

    return {
      widevine: isSupportWidevine,
      fairplay: isSupportFairPlay,
    };
  });
}
