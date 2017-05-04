//
//  MBNaviLaneCollection.h
//  iNaviCore
//
//  Created by fanyl on 14-5-22.
//  Copyright (c) 2014年 Mapbar. All rights reserved.
//

#import "MBObject.h"

/**
 *  单条车道的类型
 */
typedef enum MBNaviLaneType
{
	MBNaviLaneType_normal = 0,
	MBNaviLaneType_leftAdditional = 1,
	MBNaviLaneType_rightAdditional = 2,
}MBNaviLaneType;

/**
 *  车道牌子中的转弯方向，若干该类型数值进行按位或的结果用来标示车道箭头图标
 */
typedef enum MBNaviLaneDirection
{
	MBNaviLaneDirection_none = 0,
	MBNaviLaneDirection_straight = 1,
	MBNaviLaneDirection_right = 2,
	MBNaviLaneDirection_uTurn = 4,
	MBNaviLaneDirection_left = 8
} MBNaviLaneDirection;

/**
 *  车道牌子中的转弯方向，若干该类型数值进行按位或的结果用来标示车道箭头图标
 */
typedef enum MBTrafficDirection
{
	MBTrafficDirection_rightHand = 0, /// 靠右行驶
	MBTrafficDirection_leftHand = 1   /// 靠左行驶
} MBTrafficDirection;

/**
 *  道路采集
 */
@interface MBNaviLaneCollection : MBObject
/**
 *  从左到右排列的各条车道的信息，存放 [MBNaviLane](#)
 */
@property(nonatomic,retain) NSArray* lanes;
/**
 *  lanes中左侧附加车道的数量，可能为0
 */
@property(nonatomic,assign) NSInteger leftAdditionalLaneNum;
/**
 *  lanes中右侧附加车道的数量，可能为0
 */
@property(nonatomic,assign) NSInteger rightAdditionalLaneNum;
/**
 *  该处是否是靠右行驶的。靠左和靠右两种情况下，由于掉头箭头的形状不同，所以客户端在绘制时应使用两套不同的图标资源。
 */
@property(nonatomic,assign) MBTrafficDirection trafficDirection;
/**
 *  从检测出该车道信息时的自车位置（即发出当前LaneDetectorEvent_show消息时的位置）到该车道信息所描述的地点之间的距离.
 */
@property(nonatomic,assign) NSInteger distanceToJunction;

@end

/**
 *  车道信息
 */
@interface MBNaviLane : MBObject

/**
 *  车道方向类型 MBNaviLaneDirection，其值为 MBNaviLaneDirection 中类型的按位或的结果
 */
@property(nonatomic,assign) MBNaviLaneType type;
/**
 *  车道信息背板类型 MBNaviLaneType
 */
@property(nonatomic,assign) MBNaviLaneDirection iconId;
/**
 *  是否在航线上
 */
@property(nonatomic,assign) BOOL enroute;

@end