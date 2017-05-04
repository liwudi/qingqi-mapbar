//
//  MBGpsTracker.h
//  iNaviCore
//
//  Created by fanwei on 4/1/13.
//  Copyright (c) 2013 Mapbar. All rights reserved.
//

#import <Foundation/Foundation.h>

@class MBGpsInfo;

typedef enum MBGpsDeviceState
{
    MBGpsDeviceState_off,
    MBGpsDeviceState_connecting,
    MBGpsDeviceState_ok
} MBGpsDeviceState;

/**
 *   GPS管理代理
 */
@protocol MBGpsManagerDelegate;

/**
 *   GPS管理类
 */
@interface MBGpsTracker : NSObject
/**
 *  Gps代理
 */
@property(nonatomic, assign) id<MBGpsManagerDelegate> delegate;
/**
 *  得到单例
 *
 *  @return 单例
 */
+(instancetype)sharedGpsTracker;
/**
 *  单例销毁
 */
+ (void)cleanup;
/**
 *  是否播报连接
 */
@property(nonatomic,assign)BOOL hasReportConnected;
/**
 *  是否允许后台定位， iOS 9 之后使用
 *
 *  @since 5.0.x
 */
@property(nonatomic, assign) BOOL allowsBackgroundLocationUpdates;
/**
 *  是否第一次播报定位
 */
@property(nonatomic,assign)BOOL isFirestReport;
/**
 *  当前位置
 */
@property(nonatomic,readonly)MBGpsInfo* currentGPSInfo;
/**
 *  得到GPS状态
 *
 *  @return YES 表示定位中
 */
+(BOOL) getMBGPS_STATE;
/**
 *  设置GPS状态
 *
 *  @param state YES 表示定位
 */
+(void) setMBGPS_STATE:(BOOL)state;

/**
 *  监听注销
 */
- (void)unregister;
/**
 *  是否监听
 *
 *  @return YES 表示舰艇中
 */
- (BOOL)isRegistered;
/**
 *  获取gps链接状态，断开，链接中，已连接
 *
 *  @return 链接状态
 */
+ (MBGpsDeviceState) getDeviceState;
/**
 *  主动更新
 *
 *  @param enable YES表示请求更新
 */
- (void)enableUpdateGps:(BOOL)enable;
@end

/** @protocol MBGpsManagerDelegate
 *
 *   导航回调函数
 *
 */
@protocol MBGpsManagerDelegate <NSObject>

@optional
/**
 *  更新GPS信息
 *
 *  @param info Gps信息数据对象
 *
 *  @since 4.9.x
 */
- (void) didGpsInfoUpdated:(MBGpsInfo*)info;

/**
 *
 *   GPS连接成功
 *  
 */
- (void) didGpsConnected;

/**
 *
 *   GPS连接失败
 *  
 */
- (void) didGpsDisconnected;

@end