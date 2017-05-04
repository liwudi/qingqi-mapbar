//
//  MBSpeedingReporter.h
//  iNaviCore
//
//  Created by fanyl on 14-6-10.
//  Copyright (c) 2014年 Mapbar. All rights reserved.
//

#import <Foundation/Foundation.h>

/**
 * 播报策略
 */
typedef enum MBSpeedingReporterStrategy{
	MBSpeedingReporterStrategy_voice = 1, /// 仅播报限速语音
	MBSpeedingReporterStrategy_beep = 2, /// 仅蜂鸣声
	MBSpeedingReporterStrategy_all = 1 + 2   /// 播报限速同时蜂鸣
} MBSpeedingReporterStrategy;

/**
 * 客户端在此回调中做相应的处理
 *
 * @param speedingPercentage
 *            车速与当前道路限速的百分比
 */
@protocol MBSpeeddingReporterDelegate <NSObject>
/**
 *  正常到超速
 *
 *  @param speedingPercentage 速度比例
 */
-(void)startSpeeding:(NSInteger)speedingPercentage;
/**
 *  超速到正常
 *
 *  @param speedingPercentage 速度比例
 */
-(void)endSpeeding:(NSInteger)speedingPercentage;
/**
 *  超速语音提示
 *
 *  @param speedingPercentage 速度比例
 */
-(void)beep:(NSInteger)speedingPercentage;
/**
 *  道路限速发生改变
 *
 *  @param speedingPercentage 速度比例
 */
-(void)newLimitSpeed:(NSInteger)speedingPercentage;
@end

/**
 * 提供道路限速播报和超速提醒模块<br>
 * 客户端在使用时，参考下面的方法：<br>
 * 调用[sharedSpeedingReporter](#)初始化和[cleanup](#)清除模块<br>
 * 调用[enable](#)开启/关闭模块；<br>
 * 调用[MBSpeeddingReporterDelegate](#)设置回调<br>
 * 调用[beepThreshold](#)设置和获取超速提醒门限；<br>
 * 调用[MBSpeedingReporterStrategy]设置和获取播报策略；<br>
 * 开始超速时，触发事件 [MBSpeeddingReporterDelegate startSpeeding:](#)，从超速变成正常时，触发事件 [MBSpeeddingReporterDelegate endSpeeding:](#)
 * ， 播报超速蜂鸣声时，触发事件 [MBSpeeddingReporterDelegate beep:](#)，客户端可根据需要做相应的显示
 *
 *  本模块中所有方法为静态方法，且应该在 [MBNaviSession](#) 初始化完后调用
 */
@interface MBSpeedingReporter : NSObject
/**
 * 回调函数，客户端在此回调中做相应的处理
 *
 * @param event
 *            超速事件[MBSpeeddingReporterDelegate](#)
 */
@property(nonatomic,assign) id<MBSpeeddingReporterDelegate> delegate;
/**
 * 设置超速提醒门限
 *
 * @param percentage
 *            单位:1%. 达到限速的percentage%时, 开始提醒. 默认值为100,表示达到限速时提醒
 */
@property(nonatomic,assign) NSInteger beepThreshold;
/**
 * 播报策略
 *
 * @return 播报策略[MBStrategy](#)，未初始化时返回默认策略
 */
@property(nonatomic,assign) MBSpeedingReporterStrategy strategy;
/**
 * 开启模块，默认模块开启
 *
 * @param enable
 *            为true时开启模块，false时关闭
 *  _注意：必须在主线程中调用。_
 */
@property(nonatomic,assign) BOOL enable;
/**
 * 获取超速统计次数
 *
 * @return 超速次数
 */
@property(nonatomic,readonly) NSInteger speedCounter;
/**
 *  初始化
 *  在 MBNaviSession 初始化后调用
 *  _注意：模块初始化过程必须在主线程中调用。_
 */
+(instancetype)sharedSpeedingReporter;
/**
 * 清除
 *
 *  _注意：必须在主线程中调用。_
 */
+(void)cleanup;
/**
 * 超速次数重置为0
 */
-(void)resetCounter;

@end
