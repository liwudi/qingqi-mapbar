//
//  MBNaviSessionParams.h
//  iNaviCore
//
//  Created by fanwei on 3/6/13.
//  Copyright (c) 2013 Mapbar. All rights reserved.
//

#import "MBObject.h"
#import "MBNaviBaseTypes.h"

@class MBPoiQueryParams;

/**
 *   始始化导航的基本参数信息
 */
@interface MBNaviSessionParams : MBObject
/**
 *  使用默认的导航参数
 *  autoTakeRoute = YES
 *  autoReroute = YES
 *  autoRemoveRoute = YES
 *  allowManualStartMode = YES
 *  allowTunnelGpsPredicting = NO
 *  allowTmcReroute = NO
 *  voiceFeedback = YES
 *  needGpsVoiceFeedback = YES
 *  allowOBDGpsPredicting = NO
 *  desireMemorySize = 65535 (64KB)
 *  maxResultNumber = 600
 *  searchRange = 20000
 *  pageSize = 10
 *  maxOrthogonalDistance = 300
 *  maxQueryDistance = 50000
 *  modules = ALL
 *  expandViewWidth = 0
 *  expandViewHeight = 0
 *  expandViewSmallFont = 366551040
 *  expandViewBigFont = 366551040
 *  expandViewSupperFont = 366551040
 *  highwayGuideMode = MBHighwayGuideMode_default
 *  @return MBNaviSessionParams 实例
 */
+(instancetype)defaultParams;
/**
 *  POI 搜索中间件的初始化参数，如果之前已经初始化 MBPoiQuery 并设置了参数，这次调用会覆盖之前设置。
 */
@property (nonatomic,retain) MBPoiQueryParams* poiParams;
/**
 *  需要使用的子模块，默认模块全部开启
 */
@property (nonatomic,assign) MBNaviSessionModule modules;
/**
 *  算路完成后是否自动采纳路线结果用于导航.<br>只涉及于单条路段结果的算路和偏航重计算。
 *  对于多条路线结果，必须手动调用 [MBNaviSession takeRoute:](#) 来采纳路线
 *  默认开启
 */
@property (nonatomic,assign) BOOL autoTakeRoute;
/**
 *  偏航后是否自动重计算，默认开启
 */
@property (nonatomic,assign) BOOL autoReroute;
/**
 *    到达目的地后是否自动删除路线，默认开启
 */
@property (nonatomic,assign) BOOL autoRemoveRoute;
/**
 *  是否允许出现手动起点状态，默认开启
 */
@property (nonatomic,assign) BOOL allowManualStartMode;
/**	
 *  是否允许在隧道中丢星后对 GPS 信号进行推演。
 *  @details 缺省值为 FALSE。
 *  如果允许在隧道中丢星后对 GPS 信号进行推演，则客户端需要注意将 GPS 推演状态也作为 GPS 定位状态处理，尽管此时
 *  [MBGpsTracker getDeviceState](#) 不是 MBGpsDeviceState_ok 或者 [MBGpsInfo valid](#) 为 FALSE。
 *  例如，可以用 [MBNaviSession isPositionFixed](#) 判断当前是否是定位状态。
 */
@property (nonatomic,assign) BOOL allowTunnelGpsPredicting;
/**
 *  是否启用TMC重算路的特性，默认关闭
 */
@property (nonatomic,assign) BOOL allowTmcReroute;
/**
 *  路口放大图显示区的宽度
 */
@property (nonatomic,assign) uint expandViewWidth;

/**
 *  路口放大图显示区的高度
 */
@property (nonatomic,assign) uint expandViewHeight;

/**
 *  路口放大图使用的小号字体
 */
@property (nonatomic,assign) int expandViewSmallFont;

/**
 *  路口放大图使用的大号字体
 */
@property (nonatomic,assign) int expandViewBigFont;

/**
 *  路口放大图使用的显示数字的超大字体 需要使用Clearview字体
 *     http://en.wikipedia.org/wiki/Clearview_(typeface)
 */
@property (nonatomic,assign) int expandViewSuperDigitFont;

/**
 *  是否自动播报某些语音。默认开启。<br>包括：
 *  <br>1. 到达目的地后：“到达目的地”<br>
 *      2. 偏航重计算的路线被采纳后：“航线更正完毕”<br>
 *      3. GPS第一次定位后：“卫星已连接”，“您当前在某某市某某区某某路”<br>
 *      4. GPS信号丢失后：“卫星信号丢失”<br>
 *      5. 模拟导航开始时：“模拟导航开始”<br>
 *      6. 模拟导航结束时：“模拟导航结束”
 *  
 */
@property (nonatomic,assign) BOOL voiceFeedback;
/**
 *  是否播报GPS相关语音，默认开启。一下为GPS相关语音播报：
 *   1. GPS第一次定位后：“卫星已连接”，“您当前在某某市某某区某某路”。
 *   2. GPS信号丢失后：“卫星信号丢失”。
 *  如果设置为TRUE且voiceFeedback也为TRUE表示使用此语音，如果设置为FALSE或者voiceFeedback为FALSE，表示不需要引擎播报此语音。
 *  默认值：TRUE
 */
@property (nonatomic,assign) BOOL needGpsVoiceFeedback;

/**
 *  高速行程的显示模式，MBHighwayGuideMode_default，该属性和 MBHighwayGuide 中的方法一样，但是后者用于再过程中修改。
 */
@property (nonatomic,assign) MBHighwayGuideMode highwayGuideMode;

/**	
 *  是否允许使用 OBD 信息在丢星时对 GPS 信号进行推演
 *  @details 缺省值为 FALSE。
 *  如果允许使用 OBD 信息在丢星时对 GPS 信号进行推演，则客户端需要注意：
 *  GPS 信号推演状态下 [MBNaviSessionData gpsPredicting](#) 为 TRUE 时，自车不一定在隧道中。
 *  [MBNaviSessionData allowObdGpsPredicting](#) 为 TRUE 时，将忽略 [MBNaviSessionData allowTunnelGpsPredicting](#) 字段。
 */
@property (nonatomic,assign) BOOL allowObdGpsPredicting;
@end
