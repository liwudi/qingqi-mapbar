//
//  MBPoiQueryParams.h
//  iNaviCore
//
//  Created by fanwei on 1/28/13.
//  Copyright (c) 2013 Mapbar. All rights reserved.
//

#import "MBObject.h"
#import "MBPoiBaseTypes.h"


/**
 *   初始化POI查询需要的基本初始化项     
 */
@interface MBPoiQueryParams : MBObject
/**
 *  得到默认的参数配置，具体默认值参见个属性说明
 *
 *  @return MBPoiQueryParams 实例
 */
+(instancetype)defaultParams;
/**
 *  关键字搜索用的内存缓冲区的大小，单位: 字节。共有3个这样的缓冲区，默认 65536
 */
@property (nonatomic, assign) NSInteger desiredMemorySize;
/**
 *
 *  搜索结果的个数限制，默认500
 */
@property (nonatomic, assign) NSInteger maxResultNumber;
/**
 *
 *  周边搜索和周边关键字搜索的范围，单位：米，缺省值：20000。
 */
@property (nonatomic, assign) NSUInteger searchRange;
/**
 *  搜索模式(离线/在线)，默认为离线搜索
 */
@property (nonatomic, assign) MBPoiQueryMode mode;
/**
 *  每页返回的POI数量，默认10。在线搜索需要按页返回。关键字搜索每页最大有效值为20，周边查询最大有效值为200
 */
@property (nonatomic, assign) NSUInteger pageSize;
/**
 *  沿路搜索中的最大垂直距离，单位：米，缺省值：300。
 */
@property (nonatomic, assign) NSUInteger maxOrthogonalDistance;
/**
 *  沿路搜索中的最大搜索距离，单位：米，缺省值：50000。
 */
@property (nonatomic, assign) NSUInteger maxQueryDistance;
/**
 *  rules.txt文件的绝对路径，默认 NULL
 *
 *  @since 5.0.x
 */
@property (nonatomic, retain) NSString* rulesFilePath;
@end
