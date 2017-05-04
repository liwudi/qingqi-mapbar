//
//  MBBusSegment.h
//  iNaviCore
//
//  Created by fanyl on 14-6-4.
//  Copyright (c) 2014年 Mapbar. All rights reserved.
//

#import "MBBusSegmentBase.h"

/**
 * 公交换乘路段信息
 */
@interface MBBusSegment : MBBusSegmentBase
/**
 * 对应乘车线路名称
 */
@property(nonatomic,retain)NSString* lineName;
/**
 * 坐车时间，单位：分钟
 */
@property(nonatomic,assign)NSInteger duration;
/**
 * 公交站Id集合
 */
@property(nonatomic,retain)NSArray* stationIds;
/**
 * 公交站名称集合，与id集合对应
 */
@property(nonatomic,retain)NSArray* stationNames;
/**
 * 换乘路段形状点数目
 */
@property(nonatomic,assign)NSInteger pointNum;
/**
 * 换乘路段形状点集合首地址
 */
@property(nonatomic,assign)MBPoint* points;

@end
