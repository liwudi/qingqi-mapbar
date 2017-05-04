//
//  MBBusBaseType.h
//  iNaviCore
//
//  Created by fanyunlong on 5/31/16.
//  Copyright © 2016 Mapbar. All rights reserved.
//

#ifndef MBBusBaseType_h
#define MBBusBaseType_h

/**
 * 公交查询接口模式，分为在线和离线
 */
typedef enum MBBusQueryMode
{
    MBBusQueryMode_online = 0,
    MBBusQueryMode_offline = 1,
    MBBusQueryMode_auto = 2		/// 暂未实现
} MBBusQueryMode;
/**
 * 查询结果有效字段选项 <b>[在线]</b>
 */
typedef enum MBBusQueryOption {
    /**
     * id和名称有效
     */
    MBBusQueryOption_idAndName = 1,
    /**
     * 基本信息有效
     */
    MBBusQueryOption_basic = 2,
    /**
     * 所有字段有效
     */
    MBBusQueryOption_allFields = 0xffffffff
} MBBusQueryOption;
/**
 *  路线日夜班
 */
typedef enum MBBusLineShift
{
    MBBusLineShift_day = 0,
    MBBusLineShift_night = 1,
    MBBusLineShift_dayAndNight = 2
} MBBusLineShift;
/**
 *  算路方式
 */
typedef enum MBBusRouteOption
{
    MBBusRouteRule_lessWalking = 0,				/// 最少步行
    MBBusRouteRule_lessTransfer = 1,				/// 最少换乘
    MBBusRouteRule_fastest = 2,					/// 最快到达
    MBBusRouteRule_avoidSubway = 3				/// 不坐地铁
} MBBusRouteOption;
/**
 *  换乘路线类型
 */
typedef enum MBBusLineType
{
    MBBusLineType_unknown = 0,					/// 无类型（默认值）
    MBBusLineType_subway = 1,						/// 地铁
    MBBusLineType_bus = 2,						/// 公交
    MBBusLineType_walk = 3						/// 步行
} MBBusLineType;
/**
 * 站点类型
 */
typedef enum MBBusStationType
{
    MBBusStationType_unknown = 0,
    MBBusStationType_subway,
    MBBusStationType_bus,
}MBBusStationType;

#endif /* MBBusBaseType_h */
