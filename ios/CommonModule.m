//
//  CommonModule.m
//  QingqiDriverApp
//
//  Created by admin on 2017/3/3.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "CommonModule.h"
#import "RCTBridge.h"
#import "RCTEventDispatcher.h"

@implementation CommonModule

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE(CommonModule)





- (NSDictionary *)constantsToExport
{
  
  BOOL a;
#ifdef DEBUG
  a= YES;
#else
  a = NO;
#endif
  
  NSDictionary *infoDictionary = [[NSBundle mainBundle] infoDictionary];
  NSString *app_Version = [infoDictionary objectForKey:@"CFBundleShortVersionString"];
  NSString *app_build = [infoDictionary objectForKey:@"CFBundleVersion"];
  NSString *app_CurName = [infoDictionary objectForKey:@"CFBundleDisplayName"];
  NSString *app_CurBundleId = [infoDictionary objectForKey:@"CFBundleIdentifier"];
  
  NSString *deviceName = [[UIDevice currentDevice] name];
  
  NSDictionary *dict = @{
                         @"VERSION_NAME":app_Version,
                         @"VERSION_CODE":app_build,
                         @"APPLICATION_ID":app_CurBundleId,
                         @"APPLICATION_NAME":app_CurName,
                         @"DEBUG":@"true",
                         @"server_type":@"release",
                         @"deviceName":deviceName
                         };
  
  return dict;
}

@end
