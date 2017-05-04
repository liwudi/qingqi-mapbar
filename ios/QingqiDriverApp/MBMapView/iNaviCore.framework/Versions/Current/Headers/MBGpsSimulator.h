//
//  MBGpsSimulator.h
//  iNaviCore
//
//  Created by delon on 13-7-2.
//  Copyright (c) 2013年 Mapbar. All rights reserved.
//

#ifndef DISTRIBUTION

#import <Foundation/Foundation.h>

/**
 *  Gps模拟
 */
@interface MBGpsSimulator : NSObject
/**
 *  得到单例
 *
 */
+ (MBGpsSimulator *)defaultGpsSimulator;
/**
 *  记录GPS
 *
 *  @param recordGPS YES 表示记录
 */
-(void)setRecordGPS:(BOOL)recordGPS;
/**
 *  使用模拟
 *
 *  @param useSimGPS YES 表示使用
 */
-(void)setUseSimGPS:(BOOL)useSimGPS;
/**
 *  得到当前Gps最大点索引
 *
 *  @return Gps最大点的索引
 */
-(NSInteger)getCurMaxSimGPSIndex;
/**
 *  得到当前Gps索引
 *
 *  @return 当前Gps索引
 */
-(NSInteger)getCurSimGPSIndex;
/**
 *  设置当前Gps模拟索引
 *
 *  @param index 索引
 */
-(void)setCurSimGPSIndex:(NSInteger)index;
/**
 *  得到Gps模拟速度
 *
 *  @return 速度
 */
-(float)getCurSimGPSSpeed;
/**
 *  设置Gps模拟速度
 *
 *  @param speed 速度
 */
-(void)setCurSimGPSSpeed:(float)speed;

@end

#endif
