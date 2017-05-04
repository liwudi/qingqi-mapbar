//
//  MBRoutePointCollector.h
//  iNaviCore
//
//  Created by fanyl on 14-7-8.
//  Copyright (c) 2014年 Mapbar. All rights reserved.
//

#import "MBObject.h"

/**
 *  路线点集合
 */
@interface MBRoutePointCollectorData : MBObject
/**
 *  是否有效
 */
@property(nonatomic,assign)BOOL isValid;
/**
 *  汽车方位
 */
@property(nonatomic,assign)NSInteger carOri;
/**
 *  路线点集合的指针
 */
@property(nonatomic,assign)MBPoint* points;
/**
 *  路线点集合中点的个数
 */
@property(nonatomic,assign)NSInteger pointsNum;
@end

@class MBRoutePointCollector;
/**
 *  路线点集合委托
 */
@protocol MBRoutePointCollectorDelegate <NSObject>
/**
 *  当路线集合发生变化的时候出发
 *
 *  @param data 路线点集合
 */
-(void)RoutePointCollectorDataChanged:(MBRoutePointCollectorData*)data;

@end
/**
 *  路线收集类参数
 */
@interface MBRoutePointCollectorParams : MBObject
/**
 *  收集距离，即距离当前点多少范围内的点要收集
 */
@property(nonatomic,assign)uint forwardDistance;
/**
 *  收集代理
 */
@property(nonatomic,assign)id<MBRoutePointCollectorDelegate> delegate;
@end


/**
 *  路线收集类
 */
@interface MBRoutePointCollector : NSObject
/**
 *  初始化方法
 *
 *  @param params 路线收集参数
 *
 *  @return 实例指针
 */
-(id)initWithParams:(MBRoutePointCollectorParams*)params;
@end
