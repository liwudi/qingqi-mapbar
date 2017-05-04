//
//  MBRoutePlan.h
//  iNaviCore
//
//  Created by fanwei on 2/22/13.
//  Copyright (c) 2013 Mapbar. All rights reserved.
//

#import "MBObject.h"
#import "MBNaviBaseTypes.h"

@class MBPoiFavorite;

/**
 *   路线的查询方案
 */
@interface MBRoutePlan : MBObject
/**
 *  目的点集合
 */
@property(nonatomic,readonly) NSArray *destinationPoiObjects;
/**
 *  是否使用tmc
 */
@property(nonatomic,assign) BOOL useTmc;
/**
 *  路线拷贝
 *  @param newPlan 新路线
 *  @param oldPlan 老路线
 */
+(void)routePlanCopyTo:(MBRoutePlan*)newPlan from:(MBRoutePlan*)oldPlan;
/**
 *  获取路线方案
 *  @return     plan 路线计划
 */
- (void*) getRoutePlan;
/**
 *  设置路线规划起点方向角
 *  @param      ori 起点方向角
 *  @return     空
 */
- (void)setOrigionOrientation:(short)ori;
/**
 *  返回路线规划起点方向角
 *  @return     当前起点的方向角
 */
- (short)getOrigionOrientation;
/**
 *  设置算路规则，每次设置一个
 *  @param      rule 具体的路线规划规则
 *  @return     空
 */
- (void)setRule:(MBRouteRule)rule;
/**
 *  获取当前路线规划规则
 *  @return     当前的路线规划规则
 */
- (MBRouteRule)getRule;
/**
 *  设置路线规划避让，可以同时多个
 *  @param      avoidRoadType 具体的路线规划避让
 *  @return     空
 */
- (void)setAvoidRoadType:(MBAvoidRoadType)avoidRoadType;
/**
 *  获取路线规划避让
 *  @return     当前的路线规划避让
 */
- (MBAvoidRoadType)getAvoidRoadType;
/**
 *  获取目的点数组中的点个数
 *  @return     当前路线规划方式中目的点个数
 */
- (NSInteger)getDestinationNum;
/**
 *  获取 MBRoutePlan 中的点(起点、途经点或终点)信息.
 *  @param      index	索引值
 *  @return     指定索引值的目POI点信息
 */
-(MBPoiFavorite *)getDestination:(NSInteger)index;
/**
 *  设置 MBRoutePlan 中的点(起点、途经点或终点)信息.
 *  @param      index	索引值
 *  @param      fav	需要指定的POI信息
 *  @return     空
 *         使用此方法将覆盖原本索引值所在的POI点信息
 */
- (void)setDestination:(NSInteger)index favorite:(MBPoiFavorite *)fav;
/**
 *  在指定索引的位置插入POI点，插入之后，此索引位置以后的点都向后移动
 *  @param      index	索引值
 *  @param      fav	需要指定的POI信息
 *  @return     空
 */
- (void)insertDestination:(NSInteger)index favorite:(MBPoiFavorite *)fav;
/**
 *  在指定索引的位置插入POI点，插入之后，此索引位置以后的点都向后移动
 *  @param fav poi点
 */
- (void)addDestination:(MBPoiFavorite *)fav;
/**
 *  删除指定索引值的目标POI点
 *  @param      index	索引值
 *  @return     空
 */
- (void)removeDestination:(NSInteger)index;
/**
 *  清楚所有目标点
 *  @return     空
 *  
 */
- (void)clearDestinations;

/**
 *  交换指定位置的两个点
 *
 *  @param index1 第一个点所对应索引
 *  @param index2 第二个点所对应索引
 *
 *  @since 4.9.x
 */
- (void)swapDestinations:(NSInteger)index1 index2:(NSInteger)index2;
/**	 
 *  RoutePlan 是否已满
 *  @memberof RoutePlan
 *  @details
 *  RoutePlan 中最多只有有5个点: 起点、终点和3个途经点.
 *  @deprecated
 */
- (BOOL)isFull;
/**
 *  验证当前坐标点是否有效
 *  @param      index 点的下标
 *  @return     错误枚举 MBRoutePlanErrorCode
 */
- (MBRoutePlanErrorCode)verify:(NSInteger)index;
/**
 *  将错误枚举转换为字符串
 *  @param      err	枚举代码 ErrorCode
 *  @return     错误字符串
 */
- (NSString *)errCodeToString:(MBRoutePlanErrorCode)err;
/**
 *  通过GPS更新起点坐标
 *  @return     空
 */
- (void)updateStartPointByGps;
/**
 *  保存路线规划文件
 *  @param      fileName	文件路径
 *  @return     保存成功返回YES，否则返回NO
 */
- (BOOL)save:(NSString*)fileName;
/**
 *  载入上次保存的路径
 *  @param      fileName	文件路径
 *  @return     载入成功返回YES，否则返回NO
 */
- (BOOL)load:(NSString*)fileName;
/**
 *  设置起点
 *  @param      fav	起点的Poi对象
 *  @return     空
 */
- (void)setStartPoint:(MBPoiFavorite *)fav;
/**
 *  设置终点
 *  @param      fav	终点Poi对象
 *  @return     是否正确设置终点，YES为正确设置终点，可以导航，NO为设置错误，一般起点未设置的问题
 */
- (BOOL)setEndPoint:(MBPoiFavorite *)fav;
/**
 *  添加途经点，顺序添加，途经点最多只能有三个，失败的原因一般是没有设置起点终点，或者途经点个数超过了3个
 *  @param      fav	途经点Poi对象
 *  @return     如果设置成功返回YES，否则返回NO
 *
 */
- (BOOL)addWayPoint:(MBPoiFavorite *)fav;
/**
 *  设置途经点，使用此方法将替换原本设置过的途经点，途经点最多只能有三个。 一般失败的原因是没有设置终点或起点，或者设置的索引超过了2
 *  @param      index       途经点所在下标，取值范围：[0, 2]
 *  @param      fav    途经点Poi对象
 *  @return     如果设置成功则返回YES，否则返回NO
 *
 */
- (BOOL)setWayPoint:(NSInteger)index favorite:(MBPoiFavorite *)fav;
/**
 *
 *  获取途经点数量
 *  @return     途经点数量
 *         
 */
- (NSInteger)getWayPointNumber;
/**
 *  移除指定索引的途经点对象
 *  @param      index	途经点索引
 *  @return     如果移除成功，返回true，否则返回false
 *         一般来说，移除失败主要是索引值不对
 */
- (BOOL)removeWayPoint:(NSInteger)index;
/**
 *  移除所有途经点
 *  @return     空
 */
- (void) removeAllWayPoint;
@end
