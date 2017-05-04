//
//  MBNaviSessionDelegate.h
//  iNaviCore
//
//  Created by fanyunlong on 5/31/16.
//  Copyright © 2016 Mapbar. All rights reserved.
//

#ifndef MBNaviSessionDelegate_h
#define MBNaviSessionDelegate_h

@class MBNaviSession;
@class MBTmcReportItem;

/** @protocol MBNaviSessionDelegate
 *
 *   导航回调函数
 *
 */
@protocol MBNaviSessionDelegate <NSObject>

@optional
/**
 *
 *   开始算路
 *
 */
- (void) naviSessionRouteStarted;

/**
 *
 *   开始偏航重计算
 *
 */
- (void) naviSessionRerouteStarted;
/**
 *  路线计算，完成
 *
 *  @param routes 算路结果集合
 *
 *  @since 4.9.x
 */
- (void) naviSessionResult:(MBRouteCollection*)routes;

/**
 *  偏航重计算完成
 *
 *  @param base 偏航后重新计算得到的路线
 *
 *  @since 4.9.x
 */
- (void) naviSessionRerouteComplete:(MBRouteBase *)base;

/**
 *  算路失败返回
 *
 *  @param errCode 失败错误码
 *  @param details 失败详情
 *
 *  @since 4.9.x
 */
- (void) naviSessionRouteFailed:(MBTRouterError)errCode moreDetails:(NSString*)details;
/**
 *  重算路失败
 *
 *  @param errCode 失败错误码
 *  @param details 失败详情
 *
 *  @since 4.9.x
 */
- (void) naviSessionRerouteFailed:(MBTRouterError)errCode moreDetails:(NSString*)details;
/**
 *
 *   到达终点
 *
 */
- (void) naviSessionDestArrived;

/**
 *
 *   导航初始化后数据包回调，一旦初始化成功并且GPS打开，就会触发该回调
 *
 */
- (void) naviSessionTracking:(MBNaviSessionData*)sData;

/**
 *
 *   路线计算中
 *
 */
- (void) naviSessionRouting;

/**
 *
 *   路线计算被取消
 *
 */
- (void) naviSessionRouteCancelled;

/**
 *
 *   偏航重计算被取消
 *
 */
- (void) naviSessionRerouteCancelled;

/**
 *
 *   进入手动起点状态
 *
 */
- (void) naviSessionManualStartStateBegin;

/**
 *
 *   离开手动起点状态
 *
 */
- (void) naviSessionManualStartStateEnd;

/**
 *
 *   新路线已被采纳为当前路线
 *
 */
- (void) naviSessionNewRouteTaken;

/**
 *
 *   需要进行偏航重计算。在真实导航中，如果在偏航状态保持2秒，则会收到此事件
 *
 */
- (void) naviSessionNeedsReroute;

/**
 *
 *   模拟导航开始
 *
 */
- (void) naviSessionSimNaviBegin;
/**
 *
 *   模拟导航结束
 *
 */
- (void) naviSessionSimNaviEnd;
/**
 *  根据TMC发现一条比当前路线更优的路线。客户端应该在回调内决定是否take这个RouteBase对象,回调结束后这个指针会被回收。
 *
 *  @param base 一条路线。
 */
- (void) naviSessionNewTmcRoute:(MBRouteBase*)base;
/**
 *  当前有新的转弯箭头需要显示。
 *
 *  @param arrowShapes 表示箭头的点数组
 */
- (void) naviSessionNewArrow:(NSArray*)arrowShapes;
/**
 *  当有转弯箭头需要删除时出发回调
 */
- (void) naviSessionDeleteArrow;
/**
 *  路线上的TMC信息更新，获取该回调需要设置 MBTmcOptions 属性
 *
 *  @param base 一条路线
 */
- (void) naviSessionRouteTmcUpdated:(MBRouteBase*)base;
/**
 *  进行了一次tmc的播报。
 *
 *  @param tmcItem MBTmcReportItem
 */
- (void) naviSessionTmcReportItemReported:(MBTmcReportItem*) tmcItem;
/**
 *  有新的车道信息可以显示。仅限离线算路。
 *
 *  @param collection 参数是一个 MBNaviLaneCollection
 */
- (void) naviSessionNewNaviLaneCollection:(MBNaviLaneCollection*)collection;
/**
 *  当前车道信息不再应该显示。
 */
- (void) naviSessionDeleteNaviLaneCollection;
/**
 *  电子眼数据授权验证失败。
 *
 *  @param err MBAuthError 错误码
 */
- (void) naviSessionCameraAuthFailed:(MBAuthError)err;
/**
 *  已到达途经点(附近)。
 *
 *  @param index 保存着已到达的途经点的下标：第一个途经点下标为0，以此类推。
 */
-(void)naviSessionWayPointArrived:(NSUInteger)index;
/**
 *  声音播放开始。
 */
-(void)naviSessionNaviBegin;
/**
 *  声音播放结束
 */
-(void)naviSessionSoundEnd;
/**
 *  当前路线被删除
 */
-(void)naviSessionRouteRemoved;
/**
 *  tmc播报出错。
 *
 *  @param err 参见 [MBTmcReportError](#)
 */
-(void)naviSessionTmcReportError:(MBTmcReportError)err;
/**
 *  检测到TMC播报事件
 *
 *  @param tmcItems 返回MBTmcReportItem数组
 */
- (void) naviSessionTmcReportItemsDetected:(NSArray*)tmcItems;
/**
 * 自动模式(NaviSession_getNaviMode == NaviMode_auto)下，离线算路失败。
 *  自动模式下的离线算路失败并不是错误，不需要提示用户，NaviSession 会再尝试在线算路。如果在线算路也失败了，才会有 NaviSessionEvent_routeFailed 事件。
 *
 *  @param err     MBTRouterError
 *  @param details 详细信息
 */
-(void) naviSessionOfflineRouteFaildInAutoMode:(MBTRouterError)err moreDetails:(NSString*)details;
/**
 *  放大图内容从无到有。建议调用者在收到show和refresh事件后显示或重绘放大图、收到hide事件后隐藏放大图窗口。
 *  @since 5.0.0
 */
-(void)naviSessionExpandViewShow;
/**
 *  从上一次发出show事件或refresh事件后，放大图内容有了更新。此更新可能是由调用ExpandView_update()触发，也可能是由放大图模块内的定时器等触发。
 *  @since 5.0.0
 */
-(void) naviSessionExpandViewRefresh;
/**
 *  放大图内容从有到无
 *  @since 5.0.0
 */
-(void) naviSessionExpandViewHide;

@end

#endif /* MBNaviSessionDelegate_h */
