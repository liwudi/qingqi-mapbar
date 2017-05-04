//
//  MBBusRoute.h
//  iNaviCore
//
//  Created by fanyl on 14-5-28.
//  Copyright (c) 2014年 Mapbar. All rights reserved.
//

#import "MBObject.h"
#import "MBBusBaseType.h"
/**
	 换乘路线
 */
@interface MBBusRoute : MBObject
/**
 *  换乘简述（不包括步行）
 */
@property(nonatomic,retain)NSString* desc;
/**
 *  换乘详述（不包括步行）
 */
@property(nonatomic,retain)NSString* detail;
/**
 *  换乘花费（单位：元）
 */
@property(nonatomic,assign)float transferCost;
/**
 *  打的费用
 */
@property(nonatomic,assign)float taxiCost;
/**
 *  是不是夜班数据
 */
@property(nonatomic,assign)BOOL isNightShift;
/**
 *  公交换乘线路行驶时间(单位：分钟）
 */
@property(nonatomic,assign)NSInteger travelTime;
/**
 *  全长（单位：米）
 */
@property(nonatomic,assign)int distance;
/**
 *  换乘路段数量
 */
@property(nonatomic,assign)NSInteger segmentNum;
/**
 *  换乘路段， 存储 MBBusSegment 或者 MBBusWalkSegment 对象
 */
@property(nonatomic,retain)NSArray* segments;
@end
