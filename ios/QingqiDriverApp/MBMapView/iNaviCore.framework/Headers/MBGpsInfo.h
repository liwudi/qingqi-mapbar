//
//  MBGpsInfo.h
//  iNaviCore
//
//  Created by fanwei on 4/1/13.
//  Copyright (c) 2013 Mapbar. All rights reserved.
//

#import "MBObject.h"

/**
 *   GPS基本信息
 */
@interface MBGpsInfo : MBObject
/**
 *  是否有效
 */
@property (nonatomic, assign) BOOL valid;
/**
 *  时间
 */
@property (nonatomic, assign) MBDateTime dateTime;
/**
 *  坐标
 */
@property (nonatomic, assign) MBPoint pos;
/**
 *  海拔
 */
@property (nonatomic, assign) NSInteger	altitude;
/**
 *  方向
 */
@property (nonatomic, assign) NSInteger	ori;
/**
 *  速度
 */
@property (nonatomic, assign) NSInteger	speed;
/**
 *  速度 float型
 */
@property (nonatomic, assign) float	fSpeed;
/**
 *  纬度
 */
@property (nonatomic, retain) NSString*	latString;
/**
 *   经度
 */
@property (nonatomic, retain) NSString*	lonString;
/**
 *  POI名称
 */
@property (nonatomic, assign) BOOL quality3D;
/**
 *  hdop
 */
@property (nonatomic, assign) NSInteger	hdop;
/**
 *  pdop
 */
@property (nonatomic, assign) NSInteger	pdop;
/**
 *  vdop
 */
@property (nonatomic, assign) NSInteger vdop;
/**
 *  当前视图下卫星数量
 */
@property (nonatomic, assign) NSInteger satInViewNum;
/**
 *  卫星数量
 */
@property (nonatomic, assign) NSInteger	satNum;
/**
 *  卫星信息，存放 [MBSatellite](#)
 */
@property (nonatomic, retain) NSMutableArray*  satellites;
/**
 *  邮编
 */
@property (nonatomic, assign) NSInteger stamp;
/**
 *  角度
 */
@property (nonatomic, assign) NSInteger	angle;

@end
