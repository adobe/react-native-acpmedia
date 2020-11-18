require "json"
package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "RCTACPMedia"
  s.version      = package["version"]
  s.summary      = "Media library for Adobe Experience Cloud SDK. Written and Supported by Adobe."
  s.author       = "Adobe Mobile SDK Team"

  s.homepage     = "https://github.com/adobe/react-native-acpmedia"

  s.license      = "Apache 2.0 License"
  s.platforms    = { :ios => "10.0", :tvos => "10.0" }

  s.source       = { :git => "https://github.com/adobe/react-native-acpmedia.git", :tag => "#{s.version}" }

  s.source_files  = "ios/**/*.{h,m}"
  s.requires_arc = true

  s.dependency "React"
  
  s.ios.vendored_libraries = 'ios/libs/libACPMedia_iOS.a'
  s.ios.frameworks = 'UIKit', 'SystemConfiguration', 'WebKit', 'UserNotifications'
  s.ios.library = 'sqlite3.0', 'c++', 'z'
  
  s.tvos.vendored_libraries = 'ios/libs/tvos/libACPMedia_tvOS.a'
  s.tvos.frameworks = 'SystemConfiguration'
  s.tvos.library = 'sqlite3.0', 'c++', 'z'  

end
