# Marvel

一个在F8基础上照猫画虎的漫威React Native App. 支持Android和IOS。采用redux来解耦View(React.Component)和业务逻辑(Marvel API, Store)

代码目录:
  - js/actions 所有的action
  - js/common  通用的一些控件，或者常量
  - js/marvelapi marvel api接口，以及暴露的数据结构，realm用于缓存popular角色的数据
  - js/reducers 处理action，返回结果
  - js/splash splash页面
  - js/store  redux的store
  - js/tabs 主页面


# Screenshot
![alt tag](./screenshot/1.png)
![alt tag](./screenshot/2.png)
![alt tag](./screenshot/5.png)
![alt tag](./screenshot/6.png)
![alt tag](./screenshot/7.png)

# Download
[APK](./apk/app-release.apk)

# Run
  npm install; rnpm link realm; rnpm link react-native-share;
  - android
  react-native run-android
  - ios
  react-native run-ios

# Features
  - 显示流行的漫威角色
  - 搜索漫威character, event, story, series

# IDE
  - Nuclide & Visual studio code

# Dev/Libs
  - F8 app
  - Realm
  - react-redux
  - react-native-action-button
  - react-native-hyperlink
  - crypto-js 
  - redux-logger
  - react-native-share
  - flow
  
# Feedback 
- feedback or any suggestion is welcome.
