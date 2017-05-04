//
//  RNBridgeModule.m
//  hunheDemo
//
//  Created by caoshilong on 16/6/5.
//  Copyright © 2016年 Facebook. All rights reserved.
//
#import "RNBridgeModule.h"
#import "RCTBridge.h"
#import "RCTEventDispatcher.h"

@implementation RNBridgeModule

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE(RNBridgeModule)


//版本信息获取
RCT_EXPORT_METHOD(getVersionInfo:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject){
  
    NSDictionary *infoDictionary = [[NSBundle mainBundle] infoDictionary];
    NSString *app_Version = [infoDictionary objectForKey:@"CFBundleShortVersionString"];
    NSString *app_build = [infoDictionary objectForKey:@"CFBundleVersion"];
    NSString *app_CurName = [infoDictionary objectForKey:@"CFBundleDisplayName"];
    NSDictionary *dict = @{@"versionName":app_Version,
                           @"versionCode":app_build,
                           @"packageName":app_CurName};
  
    if(app_Version && app_build){
      resolve([NSDictionary dictionaryWithDictionary:dict]);
    }else{
      NSError *error=[NSError errorWithDomain:@"versionName、versionCode、cpackageName获取失败" code:100 userInfo:nil];
      reject(@"100",@"versionName、versionCode、cpackageName获取失败",error);
    }
}



RCT_EXPORT_METHOD(RNInvokeOCCallPhone:(NSDictionary *)dictionary){
  
  NSString *value=[dictionary objectForKey:@"name"];
  NSMutableString * str=[[NSMutableString alloc] initWithFormat:@"telprompt://%@",value];

  [[UIApplication sharedApplication] openURL:[NSURL URLWithString:str]];
}

@end
