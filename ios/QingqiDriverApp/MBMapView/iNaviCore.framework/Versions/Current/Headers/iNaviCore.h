//
//  iNaviCore.h
//  iNaviCore
//
//  Created by fanyunlong on 5/6/15.
//  Copyright (c) 2015 Mapbar. All rights reserved.
//

#ifndef INAVICORE_H_
#define INAVICORE_H_

/**
 *  iNaviCore 所有头文件集合
 *  
 *  @note 该静态库包含了 ZipArchive 第三方框架，如果客户端使用以上框架只需要引入相关头文件即可。
 *
 *  @since 5.0.x
 */

/**
 *  包含公交所有相关接口
 *
 *  @since 5.0.x
 */
#import "MBBus.h"
/**
 *  包含搜索和逆地理所有相关接口
 *
 *  @since 5.0.x
 */
#import "MBPoi.h"
/**
 *  包含城市所有相关接口
 *
 *  @since 5.0.x
 */
#import "MBWmr.h"
/**
 *  包含地图所有相关接口
 *
 *  @since 5.0.x
 */
#import "MBMap.h"
/**
 *  包含导航所有相关接口
 *
 *  @since 5.0.x
 */
#import "MBNavi.h"
/**
 *  包含数据商店所有相关接口
 *
 *  @since 5.0.x
 */
#import "MBDataStore.h"
/**
 *  包含授权所有相关接口
 *
 *  @since 5.0.x
 */
#import "MBAuth.h"
/**
 *  SDK 常用方法
 *
 *  @since 5.0.x
 */
#import "MBUtils.h"
/**
 *  SDK 城市管理
 *
 *  @since 5.0.x
 */
#import "MBWorldManager.h"


#endif /* INAVICORE_H_ */
