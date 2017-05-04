//
//  MBAuth.h
//  iNaviCore
//
//  Created by delon on 13-7-11.
//  Copyright (c) 2013年 Mapbar. All rights reserved.
//

#import <Foundation/Foundation.h>

#import "MBNaviCoreBase.h"
#import "MBEngine.h"

@class MBDataPackageDesc;
@protocol MBAuthDelegate;

/**
 *  授权类
 */
@interface MBAuth : NSObject
/**
 *  token
 */
@property(nonatomic,copy) NSString *token;
/**
 *  授权委托
 */
@property(nonatomic,assign) id<MBAuthDelegate> delegate;
/**
 *  授权单例
 *
 *  @return 授权单例
 */
+ (instancetype)sharedAuth;
/**
 *  设置验证数据的URL
 *  @param baseUrl 获取验证数据的URL，如果为空，则使用默认
 */
- (void)setLicenseBaseUrl:(NSString *)baseUrl;
/**
 *  根据用户名，imei/mac设备号来更新权限列表文件
 */
- (void)updateLicense;
/**
 *  根据用户输入的参数来请求授权文件
 *
 *  @param param 需要拼接的字符串参数，格式为param1=1&param2=2，此参数应该是请求URL的"?"后面的参数部分，如：https://auth?param1=1&param2=2, 那么/p params应该为"param1=1&param2=2"
 *
 *  @since 4.10.x
 */
- (void)updateLicenseWithParamString:(NSString *)param;
/**
 *  获取指定数据包是否有使用权限，以及相关的数据信息获取，参见 [MBDataPackageDesc](#) 和 [MBAuthError](#)
 *
 *  @param dataId 数据的GUID唯一标识
 *  @param error  错误码
 *
 *  @return 数据错误信息
 *
 *  @since 4.10.x
 */
- (MBDataPackageDesc *)dataInfoWith:(NSString *)dataId error:(MBAuthError *)error;
/**
 *  指定的数据是否可用，属于一个简化的API
 *  @param dataId 数据的唯一标识ID
 *  @return 数据可用返回TRUE，否则返回FALSE，如果想要过去更多的信息，可以调用Auth_getDataInfo
 */
- (BOOL)dataIsAvailable:(NSString *)dataId;
/**
 *  获取当前已经存在的授权ID
 */
- (NSArray *)dataIds;
- (NSArray *)dataPackageDescs;
/**
 *  检查授权文件状态
 *
 *  @return [MBAuthError](#)
 */
- (MBAuthError)checkLicense;
/**
 *  关闭授权验证，仅限测试版本
 *
 *  @since 5.0.x
 */
- (void)closeAuth;
/**
 *  授权单例销毁
 */
+ (void)cleanup;

@end
/**
 *  数据报描述
 */
@interface MBDataPackageDesc : NSObject
/**
 *  数据 Id
 */
@property(nonatomic,readonly) NSString *dataId;
/**
 *  数据过期时间
 */
@property(nonatomic,readonly) NSDate *expiredTime;
@end

/**
 *  数据授权代理
 */
@protocol MBAuthDelegate
@optional
/**
 *  监听数据授权回调
 *  @param auth  [MBAuth](#)单例
 *  @param state 更新状态
 *  @param code  错误码
 */
- (void)mbAuth:(MBAuth *)auth udpateState:(MBAuthUpdateState)state code:(NSInteger)code;
@end
