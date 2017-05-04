//
//  MBRouteBase.h
//  iNaviCore
//
//  Created by fanwei on 2/26/13.
//  Copyright (c) 2013 Mapbar. All rights reserved.
//

#import <Foundation/Foundation.h>

#import "MBNaviCoreBase.h"
#import "MBNaviBaseTypes.h"


@class MBRoutePlan;
@class MBRouteDescriptionItem;

/**
 *  TMC路线样式
 */
typedef enum MBRouteTmcStyle{
    MBTmcRouteDrawStyle_normal = 1,
    MBTmcRouteDrawStyle_weaker = 2
}MBRouteTmcStyle;
/**
 *  路线类型
 */
typedef enum MBRouteType
{
    MBRouteType_none = 0,
    MBRouteType_offline = 1, // 离线数据计算的路线
    MBRouteType_online = 2   // 在线数据计算的路线
} MBRouteType;

struct RouteArrowData ;
typedef struct RouteArrowData  RouteArrowData;

struct RouteArrowData
{
    MBPoint *pts;
    NSInteger lenght;
};

/**
 *  重算路原因
 */
typedef enum MBRerouteReaseon
{
	MBRerouteReaseon_unknown = 0,
	MBRerouteReaseon_tmcHeavy = 1,
	MBRerouteReaseon_tmcBlock = 2
}MBRerouteReaseon;

// 路线详情类型，注意不要修改其含义与次序
typedef enum MBDirectionsFlag
{
    MBDirectionsFlag_origin = 0,	/// 返回没有合并的路线详情
    MBDirectionsFlag_merged = 1,	/// 返回合并后的路线详情
    MBDirectionsFlag_expand = 2,	/// 返回合并后并且含有下一级结果的路线详情
} MBDirectionsFlag;

/**
 *   路线的基本信息
 */
@interface MBRouteBase : NSObject

/**
 *  初始化
 *  @return self
 */
- (id) init;

/**
 *  初始化路线查询方案
 *  @param      base 路线
 *  @return     self
 *  
 */
- (id) initWithRouteBase:(void*)base;

/**
 *
 *  获取路线
 *  @return     base 路线
 *  
 */
- (void*)getRouteBase;

/** 
 *
 *  获取当前路线类型为在线还是离线
 *  @return     返回MBRouteType类型的结果
 *  
 */
- (MBRouteType)getType;

/**
 *  获取当前路线长度，单位：米
 *  @return     返回路线长度
 */
- (NSInteger)getLength;

/**
 *
 *  获取当前路线的描述信息
 *  @return     返回路线的描述信息
 * 
 */
- (NSString *)getDescription;

/**
 *
 *  获取当前路线是否有收费
 *  @return     返回判断值YES表示有
 *  
 */
- (BOOL)hasToll;
/**
 *
 *  获取当前路线是否有轮渡
 *  @return     返回判断值YES表示有
 *  
 */
- (BOOL)hasSailing;
/**
 *
 *  路线全程所需时间，单位：秒
 *  @return     全程所需时间
 *  
 */
- (NSInteger)getEstimatedTime;
/**
 *
 *  获取路线规划对象
 *  @return     MBRoutePlan 当前道路的路线规划对象
 *  
 */
- (MBRoutePlan *)getPlan;
/**
 *
 *  路线的开始方向，单位：度
 *  @return     起始路线方向
 *  
 */
- (int)getStartDirection;
/**
 *
 *  获取当前路线的包络盒
 *  @return     当前路线包络盒
 *  
 */
- (MBRect)getBoundingBox;
/**
 *
 *  获取路线上的第一个形状点
 *  @return     路线上的第一个形状点
 *  
 */
- (MBPoint)getFirstShapePoint;
/**
 *
 *  获取路线上最后一个形状点
 *  @return     路线上最后一个形状点
 *  
 */
- (MBPoint)getLastShapePoint;
/**
 *  设置路线详情的显示方式
 *
 *  @param flag 参见 [MBDirectionsFlag](#)
 *
 *  @since 4.9.x
 */
- (void)setDirectionsFlag:(MBDirectionsFlag)flag;
/**
 *
 *  返回当前车所在路线上的位置所对应的路线详情下标，只有 GPS 定位有效
 *  @param      curDistance	当前路线起点距离车的距离
 *  @return     当前所在位置位于路线详情中的下标
 *  
 */
- (NSInteger)getCurrentIndexInDescriptions:(int)curDistance;
/**
 *
 *  返回路线详情中路线说明的个数,区别于Segment（路段）个数。
 *  @return     路线说明的个数
 *  
 */
- (NSInteger)getDescriptionNumber;
/**
 *
 *  获取路线说明实例
 *  @param      index	指定要获取的第index个路线说明，包含途经点，[MBRouteBase getDescriptionNumber](#)
 *  @param      curDistance	但前车所在路线上的位置，若不用此参数，则设置为2147483647,即 int 最大值
 *  @return     路线说明实例，如果存在则返回 MBRouteDescriptionItem类型实例，如果不存在，返回nil
 *  
 */
- (MBRouteDescriptionItem*)getDescriptionItem:(NSInteger)index curDistance:(NSInteger)curDistance;
/**
 *  获取当前路线共有多少个路段
 *
 *  @return 路线个数
 *
 *  @since 4.9.x
 */
- (NSInteger) getSegmentNumber;
/**
 *  比较是否同一条路径
 *
 *  @param route 待验证路径
 *
 *  @return 是否相同，True 表示同一条路径
 *
 *  @since 4.9.x
 */
- (BOOL)isEqualRouteBase:(MBRouteBase *)route;

/**
 *  获取路段的形状点
 *
 *  @param index 路段索引
 *  @param num   NSInteger 指针，用于得到返回的 MBPoint 数组的个数
 *
 *  @return MBPoint 数组，即该路段的点的集合，同时用参数指针得到个数
 *
 *  @since 4.9.x
 */
-(MBPoint*)getSegmentFinePoints:(NSInteger)index withPointNum:(NSInteger*)num;

/**
 *  获取 TMC 柱状图，需联网
 *
 *  @param maxSection 柱状图的长度(以像素为单位)，这个值也是pixels和states这两个数组的最大长度
 *  @param pixels     每个值表示一个区间，每个区间的起点是上一个区间的终点或0，比如：pixels[1] = 10，pixels[2] = 30，则柱状图中第10个像素到第29个像素用state[2]的状态填充
 *  @param tmcStates  每个区间对应的tmc状态
 *
 *  @return 实际返回的区间个数
 *
 *  @since 4.10.x
 */
- (NSInteger) getTmcSections:(NSInteger)maxSection pixels:(NSMutableArray *)pixels tmcStates:(NSMutableArray *)tmcStates;
- (NSInteger) getTmcSections:(NSInteger)maxSection outPixels:(NSInteger*)pixels outTmcStates:(Byte*)tmcStates;
/**
 *  获取指定索引路段的描述信息
 *
 *  @param index     路段所以
 *  @param rates     路况比例
 *  @param tmcStates TMC路段描述
 *
 *  @return rates 的个数
 *
 *  @since 4.10.x
 */
- (NSInteger)getDescriptionItemTmcSection:(NSInteger)index rates:(NSMutableArray*)rates tmcStates:(NSMutableArray*)tmcStates;
/**
 *  是否打开Tmc蚯蚓路,默认：false，不显示TMC信息。
 *
 *  @param enable YES打开，NO关闭。
 */
-(void) enableTmcColors:(BOOL)enable;
/**
 *  Tmc蚯蚓路状态
 *
 *  @return YES打开，NO关闭。
 */
-(BOOL) isTmcColorsEnabled;
/**
 *  判断当前路线是否支持TMC绘制,针对在线算路来说永远返回true，而针对离线情况，老数据会返回false，新数据会返回true
 *
 *  @return YES表示支持。
 */
-(BOOL) isTmcSupported;
/**
 *  更新Tmc。
 */
-(void)updateTmc;
/**
 *  获取TMC信息更新时间字符串
 *  @return 时间字符串
 */
-(NSString*)getTmcTime;
/**
 *  获取路线上指定路段的路况信息
 *
 *  @param index 路段索引
 *
 *  @return Tmc状态
 *
 *  @since 4.9.x
 */
-(MBTmcState)getSegmentTmc:(int)index;
/**
 *  返回路线上的红绿灯数量
 *
 *  @return 红绿灯数量
 *
 *  @since 5.1.x
 */
-(NSInteger)getTrafficLightNumber;
/**
 *  获取实时路况(TMC)模式样式,默认：MBTmcRouteDrawStyle_normal
 */
@property(nonatomic,assign) MBRouteTmcStyle style;
/**
 *   导出handle
 */
-(void *) handle;
/**
 *  获取转向箭头数据
 *
 *  @param index 箭头索引
 *
 *  @return 箭头数据
 *
 *  @since 4.9.x
 */
-(RouteArrowData*) getArrowPointsByIndex:(NSInteger)index;
/**
 *  返回TMC重算路的原因
 *  @return 指定的路线。
 */
-(MBRerouteReaseon)getRerouteReason;
/**
 *  指定路段是否存在红绿灯
 *
 *  @param index 路段索引
 *
 *  @return YES 表示有
 *
 *  @since 5.0.x
 */
-(BOOL)hasSegmentTrafficLight:(NSInteger)index;
@end
/**
 *  路段
 */
@interface MBDSegment : NSObject
/**
 *  路段名称
 */
@property (readonly) NSString* name;
/**
 *  路段点的个数
 */
@property (readonly) int pointNumber;
/**
 *  路段点集合
 *
 *  @return 路段点集合指针
 */
-(const MBPoint*) getShapePoints;
@end
/**
 *  路段抓取
 */
@interface MBRouteEngine : NSObject
/**
 *  根据当前位置抓取路段
 *
 *  @param pos 当前位置
 *
 *  @return 路段
 */
-(MBDSegment*) grabSegmentsByPoint:(MBPoint*)pos;
@end
