//
//  MBMapUtils.h
//  iNaviCore
//
//  Created by delon on 13-4-28.
//  Copyright (c) 2013年 Mapbar. All rights reserved.
//

/**
 *  地图工具类
 */
@interface MBMapUtils : NSObject
/**
 *  实现UIColor到RGBA得转化
 *
 *  @param color UIColor实例
 *
 *  @return RGBA的32位表示
 */
+ (uint)ucolor2ncolor:(UIColor *)color;
/**
 *  实现RGBA到UIColor得转化
 *
 *  @param color RGBA
 *
 *  @return UIColor
 */
+ (UIColor *)ncolor2ucolor:(NSUInteger)color;
@end
