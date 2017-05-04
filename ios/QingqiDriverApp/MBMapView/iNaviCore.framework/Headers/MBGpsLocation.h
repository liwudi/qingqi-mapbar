//
//  MBGPSManager.h
//  iNaviCore
//
//  Created by fanyl on 13-8-13.
//  Copyright (c) 2013年 Mapbar. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <CoreLocation/CoreLocation.h>

@class MBGpsInfo;

@protocol MBGpsLocationDelegate;

/** @protocol MBGpsManagerDelegate
 *
 *   GPS管理代理,导航回调函数
 *
 */
@protocol MBGpsLocationDelegate <NSObject>
@optional
/**
 *  更新Gps信息
 *
 *  @param info Gps信息
 */
- (void) didGpsInfoUpdated:(MBGpsInfo*)info;
@end

/**
 *  Gps 定位，与 MBGpsTracker 功能相同
 */
@interface MBGpsLocation : NSObject
/**
 *  GPS代理
 *
 *  @since 4.9.x
 */
@property(nonatomic, assign) id<MBGpsLocationDelegate> delegate;
/**
 *  是否允许后台定位， iOS 9 之后使用
 *
 *  @since 5.0.x
 */
@property(nonatomic, assign) BOOL allowsBackgroundLocationUpdates;
/**
 *   打开GPS信息
 */
- (void)startUpdatingLocation;
/**
 *   关闭GPS信息
 */
- (void)stopUpdatingLocation;
@end
