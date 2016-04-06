App.info({
  name: 'Playbud',
  description: 'An app to track your child\'s development using toy-based play',
  version: '0.0.1'
});

App.icons({
  'iphone_2x': 'assets/ios/icons/Icon-60@2x.png',
  'iphone_3x': 'assets/ios/icons/Icon-60@3x.png',
  'android_mdpi': 'assets/android/icons/icon-mdpi.png',
  'android_hdpi': 'assets/android/icons/icon-hdpi.png',
  'android_xhdpi': 'assets/android/icons/icon-xhdpi.png'
});

App.launchScreens({
  'iphone_2x': 'assets/ios/splash/Default@2x.png',
  'iphone5': 'assets/ios/splash/Default-568h@2x.png',
  'iphone6': 'assets/ios/splash/Default-667h@2x.png',
  'iphone6p_portrait': 'assets/ios/splash/Default-Portrait-736h@3x.png',
  'iphone6p_landscape': 'assets/ios/splash/Default-Landscape-736h@3x.png'
});

App.accessRule('http://*');
App.accessRule('https://*');
