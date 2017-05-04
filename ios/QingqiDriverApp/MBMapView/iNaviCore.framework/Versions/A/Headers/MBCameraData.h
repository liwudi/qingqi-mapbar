//
//  MBCameraData.h
//  iNaviCore
//
//  Created by fanwei on 4/12/13.
//  Copyright (c) 2013 Mapbar. All rights reserved.
//

#import "MBObject.h"
#import "MBNaviBaseTypes.h"

/**
 *  摄像头数据
 */
@interface MBCameraData : MBObject
/**
 *  电子眼所在位置的经纬度坐标
 */
@property (assign,nonatomic) MBPoint position;
/**
 *  电子眼类型
 */
@property (assign,nonatomic) MBCameraType type;
/**
 *  从路线起点到该电子眼的距离，单位：米
 */
@property (assign,nonatomic) int absDistance;
/**
 *  电子眼角度
 */
@property (assign,nonatomic) short angle;
/**
 *  电子眼的限速值，单位：公里/小时。如果没有限速值，则为 0
 */
@property (assign,nonatomic) unsigned short	speedLimit;
/**
 *  是否为违章高发电子眼
 */
@property (assign,nonatomic) BOOL isDanger;
/**
 *  当前电子眼到车的距离
 */
@property (assign,nonatomic) int distance;
/**
 *  是否用户电子眼
 */
@property (assign,nonatomic) BOOL isUserCamera;
/**
 *  当前电子眼播报过的次数
 */
@property (assign,nonatomic) unsigned int broadcastedTimes;
/**
 *  在前方区域内, 未检测到此摄像头的次数
 */
@property (assign,nonatomic) int unChecked;
/**
 *  播报时的距离,主要用来计算进度条
 */
@property (assign,nonatomic) int reportDistance;
/**
 *  数据的优先级, 数据排序时使用
 */
@property (assign,nonatomic) int priority;

@end
