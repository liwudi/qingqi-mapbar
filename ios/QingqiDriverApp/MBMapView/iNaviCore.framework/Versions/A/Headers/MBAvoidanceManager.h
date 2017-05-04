//
//  MBAvoidanceManager.h
//  iNaviCore
//
//  Created by fanyl on 14-5-22.
//  Copyright (c) 2014年 Mapbar. All rights reserved.
//

#import <Foundation/Foundation.h>

#import "MBNaviCoreBase.h"

@class MBAvoidanceArea;

/**
 *  管理避让区域和避让路段，所有方法为类方法，且在 [NaviSession](#) 初始化之后调用
 */
@interface MBAvoidanceManager : NSObject
/**
 *  将避让信息保存到文件
 *
 *  @return YES 保存成功
 */
+(BOOL)saveAvoidanceInfo2File;
/**
 *  判断避让区域是否合法
 *
 *  @param area 判断区域
 *
 *  @return YES 表示合法，NO 表示非法
 */
+(BOOL)isAreaValid:(MBRect)area;
/**
 *  添加避让区域
 *
 *  @param avoidanceArea 调用者需填写MBAvoidanceArea.area和 MBAvoidanceArea.name字段
 *
 *  @return 是否成功，YES 表示成功，NO 表示失败
 */
+(MBAvoidanceArea*)addArea:(MBRect)rect name:(NSString*)name;
/**
 *  根据id删除避让区域
 *
 *  @param areaId 区域Id
 */
+(void)removeAreaById:(NSUInteger)areaId;
/**
 *   删除所有避让区域
 */
+(void)removeAllAreas;
/**
 *  设置避让区域是否生效
 *
 *  @param enable YES 使添加区域生效，NO 使无效
 */
+(void)enableAllAreas:(BOOL)enable;
/**
 *  获取避让区域的数量
 *
 *  @return 获取避让区域的数量
 */
+(NSInteger)getAreaNumber;
/**
 *  根据索引获取避让区域
 *
 *  @param areaId 避让区域Id
 *
 *  @return 避让区域类
 */
+(MBAvoidanceArea*)getAreaByIndex:(NSUInteger)index;
/**
 *  根据id替换已存在的避让区域
 */
+(MBAvoidanceArea*)getAreaById:(NSUInteger)areaId;
+(void)replaceAreaById:(NSUInteger)areaId rect:(MBRect)rect name:(NSString*)name;
@end

