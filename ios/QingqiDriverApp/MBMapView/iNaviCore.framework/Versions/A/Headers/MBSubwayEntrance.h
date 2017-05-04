//
//  MBSubwayEntrance.h
//  iNaviCore
//
//  Created by fanyl on 14-5-28.
//  Copyright (c) 2014年 Mapbar. All rights reserved.
//

#import "MBObject.h"

/**
 * 地铁入口信息
 */
@interface MBSubwayEntrance : MBObject
/**
 * 地铁口名称</br> 例如：A出口（西北口）
 */
@property(nonatomic,retain)NSString* name;
/**
 * 附近的POI
 */
@property(nonatomic,retain)NSString* nearbyPois;
/**
 * 地铁线名称</br> 例如：2号线
 */
@property(nonatomic,retain)NSString* lineName;

@end
