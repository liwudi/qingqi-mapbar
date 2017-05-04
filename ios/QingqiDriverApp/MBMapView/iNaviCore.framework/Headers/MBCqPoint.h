//
//  MBCqPoint.h
//  iNaviCore
//
//  Created by fanwei on 4/24/13.
//  Copyright (c) 2013 Mapbar. All rights reserved.
//

#import <Foundation/Foundation.h>

/**
 *   point点对象，常用于与 MBPoint 结构体的转换
 */
@interface MBCqPoint : NSObject
/**
 *  构造方法
 *
 *  @param x 经度
 *  @param y 纬度
 *
 *  @return MBCqPoint实例
 *
 *  @since 4.9.x
 */
-(instancetype)initWithX:(int)x andY:(int)y;
/**
 *    经度
 */
@property (nonatomic, assign) int x;

/**
 *    纬度
 */
@property (nonatomic, assign) int y;
@end
