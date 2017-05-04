/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"

#import "RCTBundleURLProvider.h"
#import "RCTRootView.h"
#import "RCTPushNotificationManager.h"
#import <iNaviCore/MBNaviSession.h>
#import <iNaviCore/MBExpandView.h>
#import <iNaviCore/MBNaviSession.h>
#import <iNaviCore/MBNaviSessionDelegate.h>
#import <iNaviCore/MBNaviSessionParams.h>
//#import "SplashScreen.h"

@interface AppDelegate()<MBNaviSessionDelegate>
@end

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  //测试
  [MBEngine sharedEngine].delegate = self;
  [[MBEngine sharedEngine] checkWithKey:@"qingqi001-20161017-01-Z-F-I10000"];
  NSLog(@"engineVersion:%@",[[MBEngine sharedEngine] version]);
  
  NSURL *jsCodeLocation;
  
  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];
  
  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"QingqiDriverApp"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
  
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  [self getPrivateDocsDir];
  return YES;
}

/**
 *  设置私有路径
 */
- (void)getPrivateDocsDir{
  NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
  NSString *documentsDirectory = [paths objectAtIndex:0];
  documentsDirectory = [documentsDirectory stringByAppendingPathComponent:@"mapbar/cn/userdata"];
  NSError *error;
  NSFileManager *fileManager = [NSFileManager defaultManager];
  if(![fileManager fileExistsAtPath:documentsDirectory]){
    [fileManager createDirectoryAtPath:documentsDirectory withIntermediateDirectories:YES attributes:nil error:&error];
  }
}

-(void)sdkAuthSuccessed
{
  // 设置根控制器
  //  UIStoryboard *story = nil;
  //  story = [UIStoryboard storyboardWithName:@"Main" bundle:[NSBundle mainBundle]];
  //  self.window.rootViewController = [story instantiateInitialViewController];
  //  self.window.rootViewController = nil;
  //  self.window.rootViewController = [[TextViewController alloc]init];
  //
  NSLog(@"授权成功");
  // 防止 poi 参数被意外修改
  MBNaviSession* session = [MBNaviSession sharedInstance];
  MBNaviSessionParams* p = [MBNaviSessionParams defaultParams];
  session.params = p;
  session.delegate = self;
}

-(void)sdkAuthFailed:(MBSdkAuthError)errCode {
  NSLog(@"授权失败,原因:%u", errCode);
}

-(void)naviSessionExpandViewShow{
  // 启用路口放大功能
  [MBExpandView setEnable:YES];
  // 更改屏幕分辨率用于横竖屏切换
  [MBExpandView setViewWidth:320 height:200];
}

- (void)applicationWillResignActive:(UIApplication *)application {
  // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
  // Use this method to pause ongoing tasks, disable timers, and throttle down OpenGL ES frame rates. Games should use this method to pause the game.
  NSLog(@"WillResignActive,程序即将变为不活跃状态");
}

- (void)applicationDidEnterBackground:(UIApplication *)application {
  // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
  // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
  
  NSLog(@"DidEnterBackground,程序已经进入后台了");
}

- (void)applicationWillEnterForeground:(UIApplication *)application {
  // Called as part of the transition from the background to the inactive state; here you can undo many of the changes made on entering the background.
  NSLog(@"WillEnterForeground,程序即将进入前台");
}

- (void)applicationDidBecomeActive:(UIApplication *)application {
  // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
  NSLog(@"DidBecomeActive,程序已经变为活跃状态");
}

- (void)applicationWillTerminate:(UIApplication *)application {
  // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
  NSLog(@"WillTerminate,程序即将被系统杀死");
}

// Required to register for notifications
- (void)application:(UIApplication *)application didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings
{
  [RCTPushNotificationManager didRegisterUserNotificationSettings:notificationSettings];
}
// Required for the register event.
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
  // 方式2
  NSString *deviceTokenString2 = [[[[deviceToken description] stringByReplacingOccurrencesOfString:@"<"withString:@""]
                                   stringByReplacingOccurrencesOfString:@">" withString:@""]
                                  stringByReplacingOccurrencesOfString:@" " withString:@""];
  NSLog(@"token：%@", deviceTokenString2);
  [RCTPushNotificationManager didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
}
// Required for the notification event.
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)notification
{
  [RCTPushNotificationManager didReceiveRemoteNotification:notification];
}
// Required for the localNotification event.
- (void)application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification *)notification
{
  [RCTPushNotificationManager didReceiveLocalNotification:notification];
}



@end
