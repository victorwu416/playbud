App.info({
  id: 'me.playbud.playbudapp',
  version: '0.0.4',
  name: 'Playbud',
  description: 'An app to track your child\'s development using toy-based play',
  author: 'Victor Wu'
});

App.icons({
  'iphone_2x':        'assets/ios/icons/icon-120x120.png',
  'iphone_3x':        'assets/ios/icons/icon-180x180.png',
  'ios_settings':     'assets/ios/icons/icon-29x29.png',
  'ios_settings_2x':  'assets/ios/icons/icon-58x58.png',
  'ios_settings_3x':  'assets/ios/icons/icon-87x87.png',
  'ios_spotlight':    'assets/ios/icons/icon-40x40.png',
  'ios_spotlight_2x': 'assets/ios/icons/icon-80x80.png',
  'android_mdpi':     'assets/android/icons/icon-48x48.png',
  'android_hdpi':     'assets/android/icons/icon-72x72.png',
  'android_xhdpi':    'assets/android/icons/icon-96x96.png',
  'android_xxhdpi':   'assets/android/icons/icon-144x144.png',
  'android_xxxhdpi':  'assets/android/icons/icon-192x192.png'
});

App.launchScreens({
  'iphone_2x':                'assets/ios/launch/launch-640x960.png',
  'iphone5':                  'assets/ios/launch/launch-640x1136.png',
  'iphone6':                  'assets/ios/launch/launch-750x1334.png',
  'iphone6p_portrait':        'assets/ios/launch/launch-1242x2208.png',
  'iphone6p_landscape':       'assets/ios/launch/launch-2208x1242.png',
  'android_mdpi_portrait':    'assets/android/launch/launch-320x470.png',
  'android_mdpi_landscape':   'assets/android/launch/launch-470x320.png',
  'android_hdpi_portrait':    'assets/android/launch/launch-480x640.png',
  'android_hdpi_landscape':   'assets/android/launch/launch-640x480.png',
  'android_xhdpi_portrait':   'assets/android/launch/launch-720x960.png',
  'android_xhdpi_landscape':  'assets/android/launch/launch-960x720.png',
  'android_xxhdpi_portrait':  'assets/android/launch/launch-1080x1440.png',
  'android_xxhdpi_landscape': 'assets/android/launch/launch-1440x1080.png'
});

App.setPreference('BackupWebStorage', 'local');

App.accessRule('http://*');
App.accessRule('https://*');
