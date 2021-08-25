export function isBrowserSupportDrm() {
  const testKeySystems = [
    'com.widevine.alpha',
    'com.apple.fps.3_0',
    'com.apple.fps.2_0',
    'com.apple.fps.1_0',
    'com.apple.fps'
  ]

  const basicVideoCapabilities = [
    { contentType: 'video/mp4; codecs="avc1.42E01E"' },
    { contentType: 'video/webm; codecs="vp8"' }
  ]

  const basicConfig = {
    initDataTypes: ['cenc'],
    videoCapabilities: basicVideoCapabilities
  }

  const offlineConfig = {
    videoCapabilities: basicVideoCapabilities,
    persistentState: 'required',
    sessionTypes: ['persistent-license']
  }

  const configs = [offlineConfig, basicConfig]

  const support = {}

  const testSystem = (keySystem) =>
    navigator
      .requestMediaKeySystemAccess(keySystem, configs)
      .then(() => {
        support[keySystem] = true
      })
      .catch((e) => {
        support[keySystem] = false
      })

  // Test each key system.
  const tests = testKeySystems.map((keySystem) => testSystem(keySystem))

  return Promise.all(tests).then(() => {
    const isSupportWidevine = support['com.widevine.alpha'] === true
    const isSupportFairPlay =
      support['com.apple.fps.3_0'] === true ||
      support['com.apple.fps.2_0'] === true ||
      support['com.apple.fps.1_0'] === true ||
      support['com.apple.fps'] === true

    if (!isSupportWidevine && !isSupportFairPlay) {
      return Promise.reject(new Error('Browser does not support DRM'))
    }

    return {
      widevine: isSupportWidevine,
      fairplay: isSupportFairPlay
    }
  })
}
