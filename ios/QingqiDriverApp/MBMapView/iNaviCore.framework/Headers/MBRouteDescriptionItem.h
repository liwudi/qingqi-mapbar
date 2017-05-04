//
//  MBRouteDescriptionItem.h
//  iNaviCore
//
//  Created by fanwei on 2/26/13.
//  Copyright (c) 2013 Mapbar. All rights reserved.
//

#import "MBObject.h"

/**
 An description item consists of an icon, a title and a subtitle. It's commonly illustrated as below.
 /-----------------------------------------\
 |                                         |
 | <--\   TURN LEFT. ENTER 1st AVE.        |
 |    |                                    |
 |    |       continue for 100 meters.     |
 |    |                                    |
 |                                         |
 \-----------------------------------------/
 */
/// 转向标的图标 ID
typedef enum MBTNaviTurnIconID {
    MBENTI_None = 0,
    MBENTI_Arrival = 1,
    MBENTI_TurnAround = 2,
    MBENTI_EnterMainRoute = 3,
    MBENTI_EnterRotary = 4,
    MBENTI_GoStraight = 5,
    MBENTI_LeaveMainRoute = 6,
    MBENTI_LeaveRotary = 7,
    MBENTI_TurnLeft = 8,
    MBENTI_TurnRight = 9,
    MBENTI_TurnSlightlyLeft = 10,	// 10
    MBENTI_TurnSlightlyRight = 11,
    MBENTI_Rotary1 = 12,
    MBENTI_Rotary2 = 13,
    MBENTI_Rotary3 = 14,
    MBENTI_Rotary4 = 15,
    MBENTI_Rotary5 = 16,
    MBENTI_Rotary6 = 17,
    MBENTI_Rotary7 = 18,
    MBENTI_Rotary8 = 19,
    MBENTI_Rotary9 = 20,	// 20
    MBENTI_KeepLeft = 21,
    MBENTI_KeepRight = 22,
    MBENTI_TurnHardLeft = 23,
    MBENTI_TurnHardRight = 24,
    MBENTI_TurnLeftKeepLeft = 25,
    MBENTI_TurnLeftKeepRight = 26,
    MBENTI_TurnRightKeepLeft = 27,
    MBENTI_TurnRightKeepRight = 28,
    MBENTI_EnterTunnel = 29,
    MBENTI_TakeFerry = 30,
    MBENTI_Start = 31,
    MBENTI_WayPoints1 = 32,
    MBENTI_WayPoints2 = 33,
    MBENTI_WayPoints3 = 34,
    MBENTI_IC = 35,
    MBENTI_DR = 36,
    MBENTI_Overpass = 37,
    MBENTI_WindOverpass = 38,
    MBENTI_StraightKeepLeft = 39,
    MBENTI_StraightKeepRight = 40,
    
    MBENTI_Stair = 43,
    MBENTI_Underpass = 44,
    MBENTI_Footbridge = 45,
    MBENTI_Square = 46,
    MBENTI_Bridge = 47,
    MBENTI_Park = 48,
    
    MBENTI_Max
} MBTNaviTurnIconID;

/**
 *   路线详情类
 */
@interface MBRouteDescriptionItem : MBObject
/**
 *    路线详情主体描述，例如，“请左转，然后进入 XX 路”
 */
@property (nonatomic,retain) NSString *title;
/**
 *    路线详情辅助描述，例如，“继续前行 XX 米”
 */
@property (nonatomic,retain) NSString *subtitle;
/**
 *    到下一个路线描述条目的距离，单位：米。
 */
@property (nonatomic,assign) NSInteger length;
/**
 *    当前路线详情提示所使用的图标 MBTNaviTurnIconID
 */
@property (nonatomic,assign) MBTNaviTurnIconID iconId;
/**
 *    当前路线详情提示所发生的位置的经纬度坐标
 */
@property (nonatomic,assign) MBPoint position;
/**
 *    判断当前路线详情是否为子详情
 */
@property (nonatomic,assign) BOOL isChild;
/**	
 *  路线描述对应路段子集中的第一条路段在路线上的下标。
 *  @details
 *  对于第一条路线描述条目，startSegIdx = 0。
 *	对于到达终点的路线描述条目，startSegIdx 是一个无效的下标，等于路线上的路段数目。
 *	对于途经点条目，startSegIdx 是该途经点所在的路段的下标。
 *	对于转弯或路名变化等普通路线描述条目，startSegIdx 是转过弯后或路名变化后的第一条路段的下标。
 */
@property (nonatomic,assign) NSInteger startSegIdx;
@property (nonatomic,assign) NSInteger endSegIdx;
@end
