//
//  MBReverseGeocodeObject.h
//  iNaviCore
//
//  Created by fanyl on 14-2-28.
//  Copyright (c) 2014年 Mapbar. All rights reserved.
//

#import "MBObject.h"
/**
 *  逆地理对应类，推荐使用
 */
@interface MBReverseGeocodeObject : MBObject < NSCoding >
/**
 *  在线POI 的显示坐标
 */
@property (nonatomic,assign) MBPoint pos;
/**
 *  距离
 */
@property (nonatomic,assign) int distance;
/**
 *  道路距离
 */
@property (nonatomic,assign) int roadDistance;
/**
 *  在线POI 的导航坐标，可能与 pos 不同，navPos 一般是在道路上的点，而 pos 不一定在道路上
 */
@property (nonatomic,assign) MBPoint navPos;
/**
 *  POI 的类型编码
 */
@property (nonatomic,assign) int naviInfoTypeId;
/**
 *  省
 */
@property (nonatomic,retain) NSString* province;
/**
 *  城市
 */
@property (nonatomic,retain) NSString* city;
/**
 *  地区
 */
@property (nonatomic,retain) NSString* area;
/**
 *  类型
 */
@property (nonatomic,retain) NSString* typeName;
/**
 *  兴趣点方向
 */
@property (nonatomic,retain) NSString* poiDirection;
/**
 *  兴趣点行政区
 */
@property (nonatomic,retain) NSString* poiArea;
/**
 *  兴趣点城市
 */
@property (nonatomic,retain) NSString* poiCity;
/**
 *  兴趣点名称
 */
@property (nonatomic,retain) NSString* poiName;
/**
 *  兴趣点地址
 */
@property (nonatomic,retain) NSString* poiAddress;
/**
 *  道路名称
 */
@property (nonatomic,retain) NSString* roadName;
/**
 *  道路方向
 */
@property (nonatomic,retain) NSString* roadDirection;
/**
 *  道路级别
 */
@property (nonatomic,retain) NSString* roadLevel;
@end
