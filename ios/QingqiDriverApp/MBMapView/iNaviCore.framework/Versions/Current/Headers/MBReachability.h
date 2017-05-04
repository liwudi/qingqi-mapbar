//
//  MBReachability.h
//  iNaviCore
//
//  Created by fanyl on 14-6-19.
//  Copyright (c) 2014年 Mapbar. All rights reserved.
//

#import <Foundation/Foundation.h>

/**
 *  网络类型
 */
typedef enum : NSInteger {
	MBNotReachable = 0,
	MBReachableViaWiFi,
	MBReachableViaWWAN
} MBNetworkStatus;

extern NSString *kMBReachabilityChangedNotification;
/**
 *  监听网络
 */
@interface MBReachability : NSObject
/**
 *  得到实例
 *
 *  @return 监听网络实例
 */
+(MBReachability *)reachabilityForInternetConnection;
/**
 *  是否联网
 *
 *  @return YES 有网络
 */
-(BOOL)isReachable;
/**
 *  发送通知
 *
 *  @return 是否监听成功
 */
- (BOOL)startNotifier;
/**
 *  停止发送网络
 */
- (void)stopNotifier;
/**
 *  当前网络状态
 *
 *  @return 参见 NetworkStatus
 */
- (MBNetworkStatus)currentReachabilityStatus;
@end
