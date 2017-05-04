//
//  MBNaviBaseTypes.h
//  iNaviCore
//
//  Created by fanyunlong on 5/31/16.
//  Copyright © 2016 Mapbar. All rights reserved.
//

#ifndef MBNaviBaseTypes_h
#define MBNaviBaseTypes_h

////////////////////////////////////////////////
// 提供了 MBNavi 模块的基数数据类型
////////////////////////////////////////////////

/**
 *  TMC当前状态
 */
typedef enum MBTmcState
{
    MBTmcState_unknown = 0, ///< 未知，
    MBTmcState_light   = 1, ///< 通畅,
    MBTmcState_medium  = 2, ///< 缓慢,
    MBTmcState_heavy   = 3, ///< 拥堵,
    MBTmcState_blocked = 4, ///< 不可通行
    MBTmcState_none    = 5, ///< 未采集(默认)
    MBTmcState_max
} MBTmcState;

/**
 *  摄像头类型
 */
typedef enum _MBCameraType
{
    // 请勿更改此顺序
    MBCameraType_none = 0,
    MBCameraType_speed = 1,							/// 限速摄像头
    MBCameraType_light = 2,							/// 红绿灯照相
    MBCameraType_roadCondition = 3,					/// 路况监控摄像头(deprecate)
    MBCameraType_radar = 4,							/// 雷达测速摄像头(deprecate)
    MBCameraType_onewayStreet = 5,					/// 单行线摄像头(deprecate)
    MBCameraType_bicycle = 6,							/// 非机动车道摄像头
    MBCameraType_highSpeed = 7,						/// 高速出入口摄像头(deprecate)
    MBCameraType_bus = 8,								/// 公交车道摄像头
    MBCameraType_turnForbidden = 9,					/// 禁止左右转摄像头(deprecate)
    MBCameraType_mobile = 10,							/// 移动式测速摄像头(deprecate)
    MBCameraType_redLight = 11,						/// 红绿灯照相(deprecate)
    MBCameraType_monitor = 12,						/// 电子监控
    MBCameraType_areaSpeedingBegin = 13,
    MBCameraType_areaSpeedingEnd = 14,
    MBCameraType_cameraMax = 50,						/// 摄像头标识
    MBCameraType_serviceArea = 51,					/// 服务区
    MBCameraType_toll = 52,							/// 收费站
    MBCameraType_tunnel = 53,							/// 隧道
    MBCameraType_trfcSign = 100,						/// 交通信号标识
    MBCameraType_sharpLeftCurve = 101,				/// 向左急弯路
    MBCameraType_sharpRightCurve = 102,				/// 向右急弯路
    MBCameraType_reverseCurve = 103,					/// 反向弯路(左)
    MBCameraType_windingRoad = 104,					/// 连续弯路
    MBCameraType_steepAscent = 105,					/// 上陡坡
    MBCameraType_steepDecent = 106,					/// 下陡坡
    MBCameraType_roadNarrowsFromBothSides = 107,		/// 两侧变窄
    MBCameraType_roadNarrowsFromTheRight = 108,		/// 右侧变窄
    MBCameraType_roadNarrowsFromTheLeft = 109,		/// 左侧变窄
    MBCameraType_narrowBridge = 110,					/// 窄桥
    MBCameraType_twowayTraffic = 111,					/// 双向交通
    MBCameraType_childrenCrossing = 112,				/// 注意儿童
    MBCameraType_cattleCrossing = 113,				/// 注意牲畜
    MBCameraType_fallingRocksOnTheLeft = 114,			/// 注意左落石
    MBCameraType_fallingRocksOnTheRight = 115,		/// 注意右落石
    MBCameraType_crosswinds = 116,					/// 注意横风
    MBCameraType_slipperyRoad = 117,					/// 易滑
    MBCameraType_hillsOnTheLeft = 118,				/// 左侧傍山险路
    MBCameraType_hillsOnTheRight = 119,				/// 右侧傍山险路
    MBCameraType_embankmentOnTheRight = 120,			/// 右侧堤坝路
    MBCameraType_embankmentOnTheLeft = 121,			/// 左侧堤坝路
    MBCameraType_village = 122,						/// 村庄
    MBCameraType_humpbackBridge = 123,				/// 驼峰桥
    MBCameraType_unevenRoadSurface = 124,				/// 路面不平
    MBCameraType_roadFloods = 125,					/// 过水路面
    MBCameraType_guardedRailroadCrossing = 126,		/// 有人看守铁路道口
    MBCameraType_unguardedRailroadCrossing = 127,		/// 无人看守铁路道口
    MBCameraType_highAccidentArea = 128,				/// 事故易发路段
    MBCameraType_passLeftOrRightOfObstacle = 129,		/// 左右绕行
    MBCameraType_passLeftOfObstacle = 130,			/// 左侧绕行
    MBCameraType_passRightOfObstacle = 131,			/// 右侧绕行
    MBCameraType_dangerAhead = 132,					/// 注意危险
    MBCameraType_noOvertaking = 133,					/// 禁止超车
    MBCameraType_overtakingAllowed = 134,				/// 解除禁止超车
    MBCameraType_audibleWarning = 135,				/// 鸣喇叭
    MBCameraType_continuousDecent = 136,				/// 连续下坡
    MBCameraType_textWarning = 137,					/// 文字性警示标牌
    MBCameraType_confluenceFromLeft = 138,			/// 注意左侧合流
    MBCameraType_confluenceFromRight = 139,			/// 注意右侧合流
    ///(以下类型为四维12夏新增)
    MBCameraType_stopToGiveWay = 140,					/// 停车让行
    MBCameraType_joinToGiveWay = 141,					/// 会车让行
    MBCameraType_decelerationToGiveWay = 142,			/// 减速让行
    MBCameraType_tunnelToLight = 143,					/// 隧道开灯
    MBCameraType_tideRoad = 144,						/// 潮汐车道
    MBCameraType_convexRoad = 145,					/// 路面高凸
    MBCameraType_hollowRoad = 146,					/// 路面低洼
    ///(以下类型为四维12冬新增)
    MBCameraType_reverseCurveRight = 147,				/// 反向弯路(右)
    MBCameraType_max = 148
} MBCameraType;

/**
 *  Guidance的播报模式
 */
typedef enum _MBGuidanceMode
{
    MBGuidanceMode_concise = 0,
    MBGuidanceMode_standard,
    MBGuidanceMode_safe
}MBGuidanceMode;

/**
 *  需要避让的道路类型
 */
typedef enum _MBAvoidRoadType
{
    /**
     *  空
     */
    MBAvoidRoadType_none = 0x00,
    /**
     *  避让高速和快速路
     */
    MBAvoidRoadType_highway = 0x01,
    /**
     *  避让收费路段
     */
    MBAvoidRoadType_toll = 0x02,
    /**
     *   避让轮渡
     */
    MBAvoidRoadType_sailingRoute = 0x04,
    /**
     *  最大值标识，仅作限制使用，实际不应调用
     */
    MBAvoidRoadType_max = 0xffffffff
}MBAvoidRoadType;

/**
 *  路线错误
 */
typedef enum _MBRoutePlanErrorCode {
    MBRoutePlanErr_none = 0,                   /// 无错误
    MBRoutePlanErr_incomplete = 1,             /// 路线计划不完整: 缺少终点.
    MBRoutePlanErr_noRoadAroundStartPoint = 2, /// 起点附近没有道路
    MBRoutePlanErr_noRoadAroundEndPoint = 3,   /// 终点附近没有道路
    MBRoutePlanErr_noRoadAroundViaPoint = 4,   /// 途经点附近没有道路
    MBRoutePlanErr_startEndTooNear = 5,        /// 起点与终点距离太近
    MBRoutePlanErr_startViaTooNear = 6,        /// 起点与途经点距离太近
    MBRoutePlanErr_endStartTooNear = 7,        /// 终点与起点距离太近
    MBRoutePlanErr_endViaTooNear = 8,          /// 终点与途经点距离太近
    MBRoutePlanErr_viaStartTooNear = 9,        /// 途经点与起点距离太近
    MBRoutePlanErr_viaEndTooNear = 10,         /// 途经点与终点距离太近
    MBRoutePlanErr_viaViaTooNear = 11          /// 途经点与途经点距离太近
} MBRoutePlanErrorCode;

/**
 *  算路方式中的对规则
 */
typedef enum _MBRouteRule
{
    MBRouteRule_recommended,
    MBRouteRule_shortest,
    MBRouteRule_fastest,
    MBRouteRule_economic,
    MBRouteRule_walk,
    MBRouteRule_placeHolder = 0xffffffff
} MBRouteRule;

/**
 *  引擎提供的模块支持，用以控制模块的开关
 */
typedef enum _MBNaviSessionModule
{
    MBNaviSessionModule_cameraWarning = 1,      /// 电子眼播报
    MBNaviSessionModule_expandView = 2,         /// 路口放大图
    MBNaviSessionModule_arrowRenderer = 4,      /// 转弯提示箭头
    MBNaviSessionModule_highwayGuide = 8,       /// 高速行程
    MBNaviSessionModule_speedLimitWarning = 16, /// 超速提醒
    MBNaviSessionModule_adminSpeaker = 32,      /// 行政区划播报
    MBNaviSessionModule_tmcReport = 64,         /// tmc播报
    MBNaviSessionModule_tmcCollector = 128,
    MBNaviSessionModule_unused = 256,
    MBNaviSessionModule_laneDetector = 512,     /// 车道信息
    MBNaviSessionModule_all = 1 + 2 + 4 + 8 + 16 + 32 + 64 + 128 + 256 + 512 /// 全部子模块
} MBNaviSessionModule;

/**	高速行程模块工作模式 */
typedef enum _MBHighwayGuideMode
{
    /**	缺省模式
     @details
     此模式下，用 HighwayGuide_getItem() 获取当前的高速行程信息，包括服务区和停车区，
     也可以用 HighwayGuide_getNextServiceArea() 来单独获取下一个服务区或停车区的信息。
     */
    MBHighwayGuideMode_default = 0,
    
    /** 排除服务区模式
     @details
     在此模式下，HighwayGuide_getItem() 返回的结果中不会包含任何服务区和停车区，
     但可以用 HighwayGuide_getNextServiceArea() 来获取下一个服务区或停车区的信息。
     */
    MBHighwayGuideMode_excludeServiceArea = 1,
    
    /**	服务区优先模式
     @details
     在此模式下，HighwayGuide_getItem() 返回的结果中尽可能包含至少一个服务区或停车区，即：
     如果 HighwayGuide_getNextServiceArea() 不为空，则这个服务区/停车区一定会出现在 HighwayGuide_getItem() 返回的结果中。
     */
    MBHighwayGuideMode_preferServiceArea = 2,
    
    /**	完整模式
     @details
     在此模式下，HighwayGuide_getItem() 可以返回当前车辆位置向前100公里内的所有高速行程信息，包括服务区和停车区。
     */
    MBHighwayGuideMode_complete = 3
} MBHighwayGuideMode;

#endif /* MBNaviBaseTypes_h */
