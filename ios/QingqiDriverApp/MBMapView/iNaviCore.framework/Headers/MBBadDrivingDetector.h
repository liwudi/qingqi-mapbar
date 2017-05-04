//
//  MBBadDrivingDetector.h
//  iNaviCore
//
//  Created by fanyl on 14-6-10.
//  Copyright (c) 2014年 Mapbar. All rights reserved.
//

#import <Foundation/Foundation.h>

#import "MBObject.h"

@class MBBadDrivingDetectorResult;
@class MBBadDrivingDetector;

/**
 *  接收不良驾驶的消息通知
 */
@protocol MBBadDrivingDetectorDelegate <NSObject>

@optional
/**
 *  急加速开始
 *
 *  @param detector 不良驾驶检测实例
 *
 *  @since 4.9.x
 */
-(void)quickAccerlationBegin:(MBBadDrivingDetector*)detector;
/**
 *  急加速完成
 *  @param detector 不良驾驶检测实例
 *
 *  @since 4.9.x
 */
-(void)quickAccerlationEnd:(MBBadDrivingDetector*)detector;
/**
 *  急刹车开始
 *  @param detector 不良驾驶检测实例
 *
 *  @since 4.9.x
 */
-(void)hardBrakingBegin:(MBBadDrivingDetector*)detector;
/**
 *  急刹车结束
 *  @param detector 不良驾驶检测实例
 *
 *  @since 4.9.x
 */
-(void)hardBrakingEnd:(MBBadDrivingDetector*)detector;
/**
 *  闲置开始
 *  @param detector 不良驾驶检测实例
 *
 *  @since 4.9.x
 */
-(void)idleBegin:(MBBadDrivingDetector*)detector;
/**
 *  闲置结束
 *  @param detector 不良驾驶检测实例
 *
 *  @since 4.9.x
 */
-(void)idleEnd:(MBBadDrivingDetector*)detector;
@end


/**
 *  违规驾驶监控
 */
@interface MBBadDrivingDetector : NSObject
/**
 *  接收违规驾驶通知
 */
@property(nonatomic,assign) id<MBBadDrivingDetectorDelegate> delegate;
/**
 *  违规驾驶结果查询，再接收到 MBBadDrivingDetectorDelegate 通知时调用
 *  @return MBBadDrivingDetectorResult 对象
 */
-(MBBadDrivingDetectorResult*)getResult;
/**
 *  计数重置，应该在每次开始新的路线前调用
 */
-(void)reset;
@end

/**
 *  违规驾驶结果
 */
@interface MBBadDrivingDetectorResult : MBObject
/**
 *  急加速次数
 */
@property(nonatomic,assign) NSInteger countOfQuickAcceleration;
/**
 *  急减次数
 */
@property(nonatomic,assign) NSInteger countOfHardBraking;
/**
 *  怠速次数
 */
@property(nonatomic,assign) NSInteger countOfIdleSpeed;
@end