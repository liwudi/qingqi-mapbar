//
//  MBBusRoutePlan.h
//  iNaviCore
//
//  Created by fanyl on 14-5-28.
//  Copyright (c) 2014年 Mapbar. All rights reserved.
//

#import "MBObject.h"
#import "MBBusBaseType.h"

/**
 * 公交路线规划
 */
@interface MBBusRoutePlan : MBObject
/**
 * 起点经纬度坐标
 */
@property(nonatomic,assign) MBPoint startPoint;
/**
 * 终点经纬度坐标
 */
@property(nonatomic,assign) MBPoint endPoint;
/**
 * 公交线路日夜班
 */
@property(nonatomic,assign) MBBusLineShift shift;
/**
 * 算路方式
 */
@property(nonatomic,assign) MBBusRouteOption userOption;
@end
