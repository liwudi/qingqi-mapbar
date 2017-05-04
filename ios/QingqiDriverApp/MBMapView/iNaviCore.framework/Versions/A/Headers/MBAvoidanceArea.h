//
//  MBAvoidanceArea.h
//  iNaviCore
//
//  Created by fanyunlong on 12/10/14.
//  Copyright (c) 2014 Mapbar. All rights reserved.
//

#import "MBObject.h"
/**
 *  避让区域
 */
@interface MBAvoidanceArea : MBObject
/**
 *  避让区域的经纬度坐标矩形
 */
@property(nonatomic,assign) MBRect area;
/**
 *  避让区域信息的名称
 */
@property(nonatomic,retain) NSString* name;
/**
 *  避让区域的ID，一般来说不需要手动设置，是个只读成员
 */
@property(nonatomic,assign) NSUInteger areaId;
@end
