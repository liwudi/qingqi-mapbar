//
//  MBMapState.h
//  iNaviCore
//
//  Created by fanyl on 14-3-4.
//  Copyright (c) 2014年 Mapbar. All rights reserved.
//

#import <Foundation/Foundation.h>

#import "MBObject.h"

/**
 *  地图状态数据类，存储了地图基本信息
 *
 *  @since 4.9.x
 */
@interface MBMapState : MBObject
/**
 *  地图中心点
 */
@property (nonatomic,assign) MBPoint worldCenter;
/**
 *  方向
 */
@property (nonatomic,assign) CGFloat heading;
/**
 *  缩放
 */
@property (nonatomic,assign) CGFloat zoomLevel;
/**
 *  广角
 *
 *  @since 5.2.x
 */
@property (nonatomic,assign) CGFloat fovy;
/**
 *  仰角
 */
@property (nonatomic,assign) CGFloat elevation;
/**
 *  可视大小
 */
@property (nonatomic,assign) MBRect viewport;
/**
 *  X 偏移，默认 0
 */
@property (nonatomic,assign) CGFloat viewShiftX;
/**
 *  Y 便宜，默认0
 */
@property (nonatomic,assign) CGFloat viewShiftY;
/**
 *  DPI因数
 */
@property (nonatomic,assign) CGFloat dpiFactor;
/**
 *  是否是NDS下的世界中心点，如果是，是NDS类型的坐标
 *
 *  @since 5.0.x
 */
@property (nonatomic,assign) BOOL isWorldCenterNds;
@end
