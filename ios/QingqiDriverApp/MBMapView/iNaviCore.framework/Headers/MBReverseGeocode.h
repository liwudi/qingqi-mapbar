//
//  MBReverseGeocode.h
//  iNaviCore
//
//  Created by fanyl on 13-9-10.
//  Copyright (c) 2013年 Mapbar. All rights reserved.
//

#import "MBPoiFavorite.h"

/** @interface MBReverseGeocode
 *
 *   逆地理信息类
 *   DEPRECATED since 4.10.x! 但是不能删除，因为客户端本地存储了该类的序列化信息。每次客户端都会反序列化读取。
 */
@interface MBReverseGeocode : MBPoiFavorite
@property (nonatomic,assign) int roadDistance;///道路距离
@property (nonatomic,assign) MBPoint navPos;/// 在线POI 的导航坐标
@property (nonatomic,assign) int naviInfoTypeId;/// 在线POI 的类型编码
@property (nonatomic,retain) NSString* province;///省
@property (nonatomic,retain) NSString* city;///城市
@property (nonatomic,retain) NSString* area;///地区
@property (nonatomic,retain) NSString* poiDirection;///poi方向
@property (nonatomic,retain) NSString* poiArea;///兴趣点行政区
@property (nonatomic,retain) NSString* poiCity;///兴趣点城市
@property (nonatomic,retain) NSString* roadName;///道路名称
@property (nonatomic,retain) NSString* roadDirection;///道路方向
@property (nonatomic,retain) NSString* roadLevel;///道路级别
@end
