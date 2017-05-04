//
//  MBSatellite.h
//  iNaviCore
//
//  Created by fanwei on 4/1/13.
//  Copyright (c) 2013 Mapbar. All rights reserved.
//

#import "MBObject.h"
/**
 *  卫星数据类
 */
@interface MBSatellite : MBObject
/**
 *  卫星唯一标示 Id
 */
@property (nonatomic, assign) NSInteger	satId;
/**
 *  高度
 */
@property (nonatomic, assign) NSInteger	elevation;
/**
 *  方位
 */
@property (nonatomic, assign) NSInteger	azimuth;
/**
 *  比率
 */
@property (nonatomic, assign) NSInteger	SNRatio;
@end
