//
//  MBBusStation.h
//  iNaviCore
//
//  Created by fanyl on 14-5-28.
//  Copyright (c) 2014年 Mapbar. All rights reserved.
//

#import "MBObject.h"
#import "MBBusBaseType.h"

/**
 * 站点信息(公交/地铁)
 */
@interface MBBusStation : MBObject
/**
 * 站点类型
 */
@property(nonatomic,assign)MBBusStationType type;
/**
 *  站点id
 */
@property(nonatomic,retain)NSString* busStationId;
/**
 * 站点名称
 */
@property(nonatomic,retain)NSString* name;
/**
 * 站点位置
 */
@property(nonatomic,assign)MBPoint pos;
/**
 * 包含该站的公交线路，MBBusLine
 */
@property(nonatomic,retain)NSArray* lines;

@end
