//
//  MBCommon.h
//  iNaviCore
//
//  Created by fanwei on 2/4/13.
//  Copyright (c) 2013 Mapbar. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <CoreLocation/CoreLocation.h>
#import "MBNaviCoreBase.h"

FOUNDATION_EXPORT NSString * getDocumentDirectory(void);
FOUNDATION_EXPORT NSString * getLibraryDirectory(void);
FOUNDATION_EXPORT NSString * getBundleDirectory(void);

@interface MBCommon : NSObject
/**
 *  CLLocationCoordinate2D 和 MBPoint 的转化
 *
 *  @param point MBPoint 类型
 *
 *  @return CLLocationCoordinate2D
 */
+ (CLLocationCoordinate2D) getCoordinate2D:(MBPoint)point;
/**
 *  CLLocationCoordinate2D 和 MBPoint 的转化
 *
 *  @param coordinate CLLocationCoordinate2D
 *
 *  @return MBPoint 类型
 */
+ (MBPoint) getcqPoint:(CLLocationCoordinate2D)coordinate;
/**
 *
 *
 *  @param coordinate CLLocationCoordinate2D
 *
 *  @return MBPoint 类型数组
 */
/**
 *  CLLocationCoordinate2D 和 MBPoint 的转化
 *
 *  @param coords CLLocationCoordinate2D
 *  @param count  CLLocationCoordinate2D 个数
 *
 *  @return MBPoint 点数组
 *
 *  @since 4.10.x
 */
+ (MBPoint *) getcqPoints:(CLLocationCoordinate2D *)coords count:(NSInteger)count;
@end
