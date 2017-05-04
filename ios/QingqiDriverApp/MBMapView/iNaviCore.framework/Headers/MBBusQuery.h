//
//  MBBusQuery.h
//  iNaviCore
//
//  Created by fanyl on 14-5-27.
//  Copyright (c) 2014年 Mapbar. All rights reserved.
//

#import <Foundation/Foundation.h>

#import "MBWmrBaseTypes.h"// For MBWmrObjId type
#import "MBBusBaseType.h"
#import "MBNaviCoreBase.h"

/**
 * 发起搜索的委托
 */
@protocol MBBusQueryDelegate <NSObject>
/**
 * 发起搜索
 */
-(void)busQueryStart;
/**
 * 网络请求失败，只有在网络失败是才回调该函数
 */
-(void)busQueryFailed;
/**
 * 搜索取消
 */
-(void)busQueryCanceled;
/**
 * 搜索成功但没有结果
 */
-(void)busQueryNoresult;
/**
 * 搜索过程结束
 */
-(void)busQueryCompleted;
/**
 * 获取当前城市失败，wmrId无效
 */
-(void)busQueryGetCurrentCityFailed;

@end

@class MBBusQueryParams;
@class MBBusRoutePlan;
@class MBBusLine;
@class MBSubwayEntrance;
@class MBBusRoute;
@class MBBusStation;
/**
 * 公交搜索接口，分为在线和离线<br>
 *
 *  _注意：所有的API调用应该保证都是在主线程中_
 */
@interface MBBusQuery : NSObject
/**
 * 离线，在线，自动模式，其中自动模式暂不支持
 */
@property(nonatomic,assign) MBBusQueryMode mode;
/**
 *  公交搜索委托
 */
@property(nonatomic,assign)id<MBBusQueryDelegate> delegate;
/**
 * 设置公交搜索参数，在设置后才真正完成公交模块的初始化。
 */
@property(nonatomic,retain)MBBusQueryParams* params;
/**
 * 设置主站host，完整搜索URL中"?"之前的部分，不含搜索参数
 */
@property(nonatomic,retain)NSString* hostURL;
/**
 * 设置城市当前城市ID，必须要设置，否则总是搜索失败。或者在设置后获取设置的搜索城市Id。
 */
@property(nonatomic,assign)MBWmrObjId wmrId;
/**
 * 模块引擎初始化，必须在使用模块的其他功能之前调用此方法，且不能重复调用，需要和[cleanup()](#)成对出现
 *  <font color="red"><i><b> 注意：模块初始化过程必须在主线程中调用。 </b></i></font>
 */
+(instancetype)sharedBusQuery;
/**
 * 模块引擎销毁清理资源
 *  <font color="red"><i><b> 注意：模块销毁过程必须在主线程中调用。 </b></i></font>
 */
-(void)cleanup;
/**
 * 根据关键字查询公交站点，返回多个匹配的公交站点 <b>[在线]
 *
 * @param keyword 查询关键字
 * @param options 设置返回结果中有效字段选项 {@link BusQuery.Option} <b>[未实现]</b>
 * @param suggestOnly 为<code>true</code>时不做实际查询，快速提示用 ，查询结果中只有
 *            {@link BusStation#name}字段有效
 */
-(void)queryBusLinesByKeyword:(NSString*)keyword withOption:(MBBusQueryOption)options suggest:(BOOL)suggestOnly;
/**
 * 根据指定经纬度获取周边的公交线路信息，返回多条匹配的线路信息<b>[在线&离线]</b><br>
 *
 * @param poi 经纬度
 * @param options 设置返回结果中有效字段选项{@link BusQuery.Option} <b>[未实现]</b> 在线查询的base url是 http://mobilebus.mapbar.com/bus/
 */
-(void)queryBusLinesByPosition:(MBPoint)poi withOption:(MBBusQueryOption)options;
/**
 * 根据公交站点名称查询途径的公交线路，返回多条路线 <b>[在线]</b><br>
 *
 * @param stationName 公交站点名称{@link BusStation#name}
 * @param options 设置返回结果中有效字段选项{@link BusQuery.Option} <b>[未实现]</b>
 */
-(void)queryBusLinesByStation:(NSString*)stationName withOption:(MBBusQueryOption)options;
/**
 * 根据公交线路id查询线路详细信息 <b>[在线]</b><br>
 *
 * @param busId 公交线路
 *
 */
-(void)queryBusLineDetail:(NSString*)busId;
/**
 * 根据关键字查询公交站点，返回多个匹配的公交站点 <b>[在线]</b><br>
 *
 * @param keyword 查询关键字
 * @param options 设置返回结果中有效字段选项<b>[未实现]</b>
 * @param suggestOnly 为<code>true</code>时不做实际查询，快速提示用 ，查询结果中只有{@link BusStation#name}字段有效
 */
-(void)queryStationsByKeyword:(NSString*)keyword withOption:(MBBusQueryOption)options suggest:(BOOL)suggestOnly;
/**
 * 根据输入的经纬度取周边的站点信息，返回多条站点信息 <b>[在线]</b><br>
 * @param pos 经纬度
 * @param options 设置返回结果中有效字段选项 [MBBusQuery option](#) <b>[未实现]</b>
 */
-(void)queryStationsByPosition:(MBPoint)pos withOption:(MBBusQueryOption)options;
/**
 * 根据地铁站点名称查询入口信息，返回多条信息 <b>[在线]</b><br>
 * 通过[MBBusQuery getResultAsBusRoute:](#) 获取
 * @param stationName 地铁站
 */
-(void)querySubwayEntrances:(NSString*)stationName;
/**
 * 给定起点和终点，查询换乘信息 <b>[在线&离线]</b><br>
 *
 * @param routePlan 查询路线规划
 *
 */
-(void)queryBusRoutes:(MBBusRoutePlan*)routePlan;
/**
 * 给定起点和终点，查询步行换乘信息[在线]
 * 通过[MBBusQuery getResultAsBusRoute:](#) 获取
 * @param routePlan 查询路线规划
 */
-(void)queryBusRoutesWalkOnly:(MBBusRoutePlan*)routePlan;
/**
 * 取消当前查询
 *  在线查询模式有效；如果查询已经结束，则取消操作不起作用
 */
-(void)cancel;
/**
 * 获取本次查询的结果个数
 * @return 查询结果个数
 *  <font color="red"><i><b> 注意：此方法只能在回调中调用，在调用 getResultAsxxx 前调用
 *       </b></i></font>
 */
-(NSInteger)getResultNumber;
/**
 * 根据索引获取查询结果集中的公交线路信息
 *
 * @param index 线路索引
 * @return 该公交线路的详细信息{@link BusLine},如果指定索引不存在，则返回null
 *  <font color="red"><i><b> _注意：此方法只能在回调中调用，调用前应先调用
 *       [MBBusQuery getResultNumber](#)_ </b></i></font>
 * @see #getResultAsBusLines(int, int)
 */
-(MBBusLine*)getResultAsBusLine:(NSInteger)index;
/**
 * 根据索引获取查询结果集中的站点(公交/地铁)信息<br>
 *
 * @param index 结果集中的索引值
 * @return 该站点的详细信息{@link BusStation}，如果指定索引不存在，返回<code>null</code>
 *  <font color="red"><i><b> _注意：此方法只能在回调中调用，调用前应先调用
 *       [MBBusQuery getResultNumber](#)_  </b></i></font>
 */
-(MBBusStation*)getResultAsBusStation:(NSInteger)index;
/**
 * 根据索引获取查询结果集中的换乘路段信息(包括公交线路，步行路和地铁线路)<br>
 *
 * @param index 换乘路段的索引
 * @return 换乘路段详细信息 [MBBusRoute](#)，如果指定索引不存在，返回<code>null</code>
 *  <font color="red"><i><b> _注意：此方法只能在回调中调用，调用前应先调用
 *       [MBBusQuery getResultNumber](#)_ </b></i></font>
 */
-(MBBusRoute*)getResultAsBusRoute:(NSInteger)index;
/**
 * 根据索引获取查询结果集中的地铁入口信息<br>
 *
 * @param index 地铁入口索引
 * @return 地铁入口详细信息 [MBSubwayEntrance](#)，如果指定索引不存在，返回<code>null</code> <font color="red"><i><b> _注意：此方法只能在回调中调用，调用前应先调用 [MBBusQuery getResultNumber](#)_ </b></i></font>
 */
-(MBSubwayEntrance*)getResultAsSubwayEntrance:(NSInteger)index;
@end

#import "MBObject.h"
/**
 *  公交模块参数初始化
 */
@interface MBBusQueryParams : MBObject
/**
 * 离线搜索时使用的内存缓冲区大小，单位：字节。<b>[离线]</b><br>
 * 一共有3个这样的缓冲区，仅对离线有效，默认值： 0x10000
 */
@property(nonatomic,assign)NSInteger desiredMemorySize;
/**
 * 搜索结果的个数限制。<b>[离线]</b>
 */
@property(nonatomic,assign)NSInteger maxResultNumber;
/**
 * 周边搜索距离限制，单位：米。<b>[离线]</b>
 */
@property(nonatomic,assign)NSInteger searchRange;

@end