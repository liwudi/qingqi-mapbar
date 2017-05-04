//
//  MBCircleOverlay.h
//  Navigation
//
//  Created by delon on 12-12-26.
//
//

#import "MBOverlay.h"

typedef enum MBCircleStyle{
    MBCircleStyle_areaOnly = 1,
    MBCircleStyle_borderOnly = 2,
    MBCircleStyle_both = 3
}MBCircleStyle;

/**
 *  圆形图层
 */
@interface MBCircleOverlay : MBOverlay

/**
 *  半径
 */
@property(nonatomic,assign) CGFloat radius;
@property(nonatomic,assign) CGFloat radiusNds;
/**
 *  圆中心点坐标
 */
@property(nonatomic,assign) MBPoint center;
@property(nonatomic,assign) MBNdsPoint centerNds;
/**
 *  设置圆图层样式
 *
 *  @since 5.0.x
 */
@property(nonatomic,assign) MBCircleStyle style;
/**
 *  border color
 *
 *  @since 5.0.x
 */
@property(nonatomic,assign) u_int32_t borderColor;
/**
 *  border width, default value: 2
 *
 *  @since 5.0.x
 */
@property(nonatomic,assign) CGFloat borderWidth;
/**
 *  初始化圆形图层
 *  @param  radius  半径
 *  @param  center  中心点坐标
 */
- (id)initWithCenter:(const MBPoint)center radius:(CGFloat)radius;
- (id)initWithCenterNds:(const MBNdsPoint)center radius:(CGFloat)radius;
@end
