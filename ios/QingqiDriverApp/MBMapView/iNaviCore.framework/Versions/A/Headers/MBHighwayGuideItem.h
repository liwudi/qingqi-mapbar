//
//  MBHighwayGuideItem.h
//  iNaviCore
//
//  Created by fanwei on 4/24/13.
//  Copyright (c) 2013 Mapbar. All rights reserved.
//

#import "MBObject.h"

/**
 *  高速引导类型
 */
typedef enum MBHighwayGuideType
{
    MBHighwayGuideType_invalid, /// 无效类型
    MBHighwayGuideType_IC,      /// 出口
    MBHighwayGuideType_JC,      /// 高速连接线
    MBHighwayGuideType_SA,      /// 服务区
    MBHighwayGuideType_PA,      /// 停车区
    MBHighwayGuideType_TG       /// 收费站
} MBHighwayGuideType;

/**
 *   高速相关基本信息
 */
@interface MBHighwayGuideItem : MBObject

/**
 *  行程信息类型：出口/高速连接线/服务区/收费站
 */
@property (nonatomic, readonly) MBHighwayGuideType type;

/**
 *  从起点到这个信息点的绝对距离
 */
@property (nonatomic, readonly) int absDistance;

/**
 *  相对距离，从当前自车位置到该行程信息所在地的距离，单位：米
 */
@property (nonatomic, readonly) int distance;

/**
 *  行程信息文字。如："天水大街;黄村"、"京开高速;西红门南桥;南五环"、"马驹桥服务区"等
 */
@property (nonatomic, readonly) NSString *name;

/**
 *  是否在路线上，即：该行程信息所指向的方向是否就在路线上
 */
@property (nonatomic, readonly) BOOL onRoute;
/**
 *  真实下标。即该行程信息在从自车位置起沿路线的行程信息序列中的下标。
 */
@property (nonatomic, readonly) NSInteger actualIndex;

@end
