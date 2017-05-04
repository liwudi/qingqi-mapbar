//
//  MBEngine.h
//  iNaviCore
//
//  Created by fanwei on 1/10/13.
//  Copyright (c) 2013 Mapbar. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "MBNaviCoreBase.h"

typedef enum MBAuthError
{
    MBAuthError_none = 0,
    MBAuthError_deviceIdReaderError,
    MBAuthError_licenseIoError,
    MBAuthError_licenseFormatError,
    MBAuthError_licenseMissing,
    MBAuthError_licenseIncompatible,
    MBAuthError_licenseDeviceIdMismatch,
    MBAuthError_expired,
    MBAuthError_noPermission,
    MBAuthError_otherError
} MBAuthError;

/**
 *  SDK授权类型
 */
typedef enum MBSdkAuthType
{
    ///地图包
    MBSdkAuthType_map = 1,
    ///导航包
    MBSdkAuthType_poiquery = 1 << 1,
    ///搜索包
    MBSdkAuthType_navi = 1 << 2,
    ///公交包
    MBSdkAuthType_loc = 1 << 3,
    ///定位包
    MBSdkAuthType_bus = 1 << 4
} MBSdkAuthType;

typedef enum MBAuthUpdateState
{
    MBAuthUpdateState_succ,
    MBAuthUpdateState_failed
} MBAuthUpdateState;


typedef enum MBSdkAuthError
{
    /* 无错误，SDK验证通过 */
    MBSdkAuthError_none = 0,
    /* 没有Key */
    MBSdkAuthError_keyIsMismatch = 201,
    /* 网络不可用，无法请求SDK验证 */
    MBSdkAuthError_netWorkIsUnavailable = 301,
    /* KEY已经过期 */
    MBSdkAuthError_expired = 302,
    /* KEY是无效值，已经被注销 */
    MBSdkAuthError_keyIsInvalid = 303,
    /* 模块没有权限 */
    MBSdkAuthError_noPermission = 304,
    /* SDK授权文件没有准备好 */
    MBSdkAuthError_licenseMissing = 305,
    /* 授权设备ID读取错误，也可能是授权设备的ID没有准备好 */
    MBSdkAuthError_deviceIdReaderError = 306,
    /* SDK授权文件读取错误 */
    MBSdkAuthError_licenseIoError = 307,
    /* SDK授权文件格式错误 */
    MBSdkAuthError_licenseFormatError = 308,
    /* 设备码不匹配 */
    MBSdkAuthError_licenseDeviceIdMismatch = 309,
    /* 其他错误，比如内存分配失败 */
    MBSdkAuthError_otherError = 400,
    /* 网络返回信息格式错误 */
    MBSdkAuthError_networkContentError = 401,
    /* KEY到达激活上线 */
    MBSdkAuthError_keyUpLimit = 402
} MBSdkAuthError;

/**
 *  引擎基础初始化委托。
 */
@protocol MBEngineDelegate <NSObject>
@optional
/**
 *  程序异常回调
 *
 *  @param info 错误信息
 */
-(void)appEventException:(NSString*)info;
/**
 *  程序授权成功回调
 */
-(void)sdkAuthSuccessed;
/**
 *  授权失败
 *
 *  @param errCode 错误码
 *
 *  @since 4.9.x
 */
-(void)sdkAuthFailed:(MBSdkAuthError)errCode;
/**
 *  数据授权状态
 *
 *  @param dataAuthError 数据授权状态对应错误
 */
-(void)dataAuthState:(MBAuthError)dataAuthError;
@end
/**
 *  引挚类基础初始化。_*是一切模块的初始化基础。*_
 */
@interface MBEngine : NSObject
/**
 *  引擎委托
 */
@property(nonatomic,assign)id<MBEngineDelegate>delegate;
/**
 *  sdk授权错误码，默认是MBSdkAuthErrorType_keyIsMismatch。
 */
@property(nonatomic,readonly) MBSdkAuthError errCode;
/**
 *  引擎sdk授权是否激活
 */
@property(nonatomic,readonly) BOOL activate;
/**
 *   引擎sdk授权key
 */
@property(nonatomic,readonly) NSString *key;
/**
 *  初始化C引挚基础类库，必须在APP初始化的时候完成该工作，且应该仅初始化一次。在checkWithKey:方法前调用。
 */
+ (instancetype) sharedEngine;
/**
 *  基础模块销毁
 *
 *  @since 4.9.x
 */
+ (void)cleanup;
/**
 *  授权验证，触发 protocol [MBEngineDelegate](#)。
 *
 *  @param key 激活码
 */
-(void) checkWithKey:(NSString*)key;
/**
 *    引擎版本
 */
- (NSString *)version;
/**
 *    获取引擎支持的最低的数据版本
 */
- (NSString *)dataVersion:(NSString*)filePath;
/**
 *  清除已经初始化的对象
 */
- (void)uninitialize;
/**
 *  Sdk授权模块是否初始化
 *
 *  @return YES表示授权模块已经初始化
 */
-(BOOL)sdkAuthIsInited;
/**
 *  验证某个模块是否授权
 *
 *  @param type 授权模块
 *
 *  @return 授权结果
 */
-(MBSdkAuthError)sdkAuthCheck:(MBSdkAuthType)type;
/**
 *  更新时间
 *
 *  @return 更新时间
 */
-(NSString*)sdkAuthGetUpdateTime;
/**
 *  到期时间
 *
 *  @return 到期时间
 */
-(NSString*)sdkAuthGetExpiredTime;
/**
 *  经过授权的模块
 *
 *  @return 模块按与运算结果
 */
-(int)sdkAuthGetPermissions;
/**
  返回最后一次导航数据格式变化时的引擎版本号。
 
 @remarks
 
 4009000表示4.9.0。
 
 某些导航数据格式变化是不能向前兼容的。也就是说，老版本引擎无法使用新数据。
 此时，本函数的返回值会改变一次。
 
 客户端用本函数的返回值来确定某种数据是否能用于某版引擎。
 如果dataVersion > lastDataChangeVersion，这个数据就不能用。
 */
-(int)getLastDataChangeVersion;
@end
