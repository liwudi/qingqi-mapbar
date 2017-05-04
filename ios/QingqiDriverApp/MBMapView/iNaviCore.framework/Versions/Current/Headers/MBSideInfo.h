//
//  MBSideInfo.h
//  iNaviCore
//
//  Created by fanyunlong on 12/10/14.
//  Copyright (c) 2014 Mapbar. All rights reserved.
//

#import "MBObject.h"
/**
 *  用于表示路段单侧方向信息
 */
typedef enum MBSideness
{
    MBSideness_unknown,
    MBSideness_left,
    MBSideness_right
}MBSideness;
/**
 *  用于表示指定对象所在的位置信息，一般用于表示其余相关路段的位置关系，如POI搜索结果在路段的左侧还是右侧、到达路段的正交距离等信息
 */
@interface MBSideInfo : MBObject
/**
 *  路段单侧方向SideInfo.Sideness，表示当前信息位置在路段的哪侧
 */
@property(nonatomic,assign) MBSideness sideness;
/**
 *  此信息到达路段的正交距离，单位：米
 */
@property(nonatomic,assign) int distance;
@end
