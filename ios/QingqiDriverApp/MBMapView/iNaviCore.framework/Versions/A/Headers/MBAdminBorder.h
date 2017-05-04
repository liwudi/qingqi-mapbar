//
//  MBAdminBorder.h
//  iNaviCore
//
//  Created by fanyl on 14-6-10.
//  Copyright (c) 2014年 Mapbar. All rights reserved.
//

#import <Foundation/Foundation.h>

#import "MBNaviCoreBase.h"
#import "MBWmrBaseTypes.h"// For MBWmrObjId type

@class MBWmrNode;

/**
 * 行政区划边界
 */
@interface MBAdminBorder : NSObject
{
@public
    MBPoint** _p;
}
/**
 * 行政区划ID
 */
@property(nonatomic,assign) MBWmrObjId nodeId;
/**
 *  每个多边形的点个数
 */
@property(nonatomic,assign) NSArray* polygonNum;
/**
 *  根据城市节点得到行政区划边界，该接口需要完整版 base.dat 支持，DEPRECATED  since 5.0!
 *
 *  @param node 城市节点
 *
 *  @return 城市边界
 */
-(id) initWithNode:(MBWmrNode*) node;
/**
 *  根据城市节点 Id 得到行政区划边界，该接口需要完整版 base.dat 支持，推荐 [MBWorldManager getBorderById:]
 *
 *  @param wmrObjId 城市节点 Id
 *
 *  @return 行政区划边界
 *
 *  @since 5.0.x
 */
-(id) initWithWmrObjId:(MBWmrObjId) wmrObjId;
/**
 *  行政区划 MBPolylineOverlays
 *
 *  @since 5.0.x
 */
@property(nonatomic,readonly) NSMutableArray* polylineOverlays;

@end