//
//  MBReverseGeocodeManager.h
//  iNaviCore
//
//  Created by fanyl on 14-2-28.
//  Copyright (c) 2014年 Mapbar. All rights reserved.
//

#import <Foundation/Foundation.h>

#import "MBNaviCoreBase.h"

@class MBReverseGeocodeObject;

/**
 *  逆地理模式
 */
typedef enum MBReverseGeocodeMode {
	MBReverseGeocodeMode_online = 0,
	MBReverseGeocodeMode_offline = 1
} MBReverseGeocodeMode;

/**
 *  逆地理错误对应码
 */
typedef enum MBReverseGeocodeError
{
	MBReverseGeocodeError_none = 0,
	MBReverseGeocodeError_canceled = 1,					/// 取消导致失败
	MBReverseGeocodeError_noResult = 2,					/// 有数据但是没有搜索到结果
	MBReverseGeocodeError_noData = 3,					/// 没有数据导致的错误
	MBReverseGeocodeError_netError = 4,					/// 网络错误
	MBReverseGeocodeError_noPermission = 5				/// 没有授权
}MBReverseGeocodeError;

@protocol MBReverseGeocodeDelegate;
/**
 *  逆地理类。可以有多个实例。在多个界面中同时逆地理。默认在线你地理。该功能需要先初始化 [MBPoiQuery](#)，并且设置了 [MBPoiQueryParams](#)
 _注意：这里代替了 4.10.x 的 MBReverseGeocodeManager 类，MBReverseGeocoder 支持多实例_
 *
 *  @since 5.0.x
 */
@interface MBReverseGeocoder : NSObject
/**
 *  逆地理的模式
 */
@property (nonatomic,assign) MBReverseGeocodeMode mode;
/**
 *  逆地理委托
 */
@property (nonatomic,assign) id<MBReverseGeocodeDelegate>delegate;

-(id)init;
/**
 *  根据点得到相应的逆地理信息，通过委托得到相应的结果
 *
 *  @param pos 具体的点
 */
-(void)reverseByPoint:(MBPoint*)pos;
/**
 *  取消逆地理查询
 */
-(void)cancel;
/**
 *  重置逆地理出来的对象
 *
 *  @param rgObject 逆地理对象
 */
-(void)reset:(MBReverseGeocodeObject *)rgObject;
/**
 *  设置数据源URL
 */
@property(nonatomic,retain)NSString* hostUrl;
/**
 *  获取在线逆地理编码全局默认的Host
 *
 *  @return 全局默认的Host
 */
-(NSString*)defaultHostUrl;

@end

/**
 *  逆地理委托
 */
@protocol MBReverseGeocodeDelegate <NSObject>

@optional
/**
 *  用于扩展，暂时没用
 */
-(void)reverseGeocodeEventNone;
/**
 *  逆地理开始
 *
 *  @param reverseGeocodeManager 逆地理类
 */
-(void)reverseGeocodeEventStart:(MBReverseGeocoder*) reverseGeocodeManager;
/**
 *  逆地理成功
 *
 *  @param rgObject 返回逆地理对象MBReverseGeocodeObject。
 */
-(void)reverseGeocodeEventSucc:(MBReverseGeocodeObject*)rgObject;
/**
 *  逆地理失败
 *
 *  @param err MBReverseGeocodeError类型错误信息
 */
-(void)reverseGeocodeEventFailed:(MBReverseGeocodeError)err;
/**
 *  逆地理取消
 */
-(void)reverseGeocodeEventCanceled;
@end

