//
//  ErrorMsg.m
//  iosSdkDemo
//
//  Created by mapbar on 13-4-12.
//  Copyright (c) 2013年 witchnana. All rights reserved.
//

#import "ErrorMsg.h"

@implementation ErrorMsg

-(id)initWithErrorId:(NSInteger)errorId
{
    self = [super init];
    if (self) {
        NSDictionary* _errorDictionary = @{
                                           @"201":@"没有Key",
                                           @"301":@"网络不可用，无法请求SDK验证",
                                           @"302":@"KEY已经过期",
                                           @"303":@"KEY是无效值，已经被注销",
                                           @"304":@"模块没有权限",
                                           @"305":@"SDK授权文件没有准备好",
                                           @"306":@"授权设备ID读取错误，也可能是授权设备的ID没有准备好",
                                           @"307":@"SDK授权文件读取错误",
                                           @"308":@"SDK授权文件格式错误",
                                           @"309":@"设备码不匹配",
                                           @"400":@"其他错误，比如内存分配失败",
                                           @"401":@"网络返回信息格式错误",
                                           @"402":@"KEY到达激活上线"
                                           };
        NSString* strErrorCode = [NSString stringWithFormat:@"%ld",(long)errorId];
        self.errorMsg = [_errorDictionary objectForKey:strErrorCode];
    }
    return self;
}

@end
