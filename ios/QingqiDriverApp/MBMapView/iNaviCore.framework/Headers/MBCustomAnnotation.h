//
//  MBCustomAnnotation.h
//  iNaviCore
//
//  Created by fanwei on 5/16/13.
//  Copyright (c) 2013 Mapbar. All rights reserved.
//

#import "MBAnnotation.h"
/**
 *  自定义的Annotation
 */
@interface MBCustomAnnotation : MBAnnotation
/**
 * 构造函数，支持自定义图标的
 *
 * @param zLevel Z轴方向的等级，也就所处的压盖关系
 * @param pos 所在位置
 * @param pivot 设置显示时调整的X轴，Y轴的偏移量<br>默认情况下显示时的位置为图标中心点<br>此参数可以设置显示时相对于图标中心点的偏移量
 * @param image UIImage实例
 */
- (id)initWithZLevel:(NSInteger)zLevel pos:(MBPoint)pos pivot:(CGPoint)pivot image:(UIImage*)image;
/**
 * 动态切换CustomAnnotation所显示的图标
 *
 * @param pivot 图标显示的的位置
 * @param image UIImage实例
 */
-(void)setCustomIcon:(CGPoint)pivot image:(UIImage*)image;
@end
