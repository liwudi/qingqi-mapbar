//
//  MBRouteOverlay.h
//  Navigation
//
//  Created by delon on 12-12-26.
//
//

#import "MBOverlay.h"

typedef enum MBDrawStyle
{
    MBDrawStyle_normal = 0,
    MBDrawStyle_dimPassedRoute = 1,		// draw passed route segments with dim color, both for normal mode and TMC mode
    MBDrawStyle_max = 2
}MBDrawStyle;

/**
 *  绘制路线所使用的绘制图层
 */
@interface MBRouteOverlay : MBOverlay
/**
 *  线宽值
 */
@property(nonatomic,assign) CGFloat width;
/**
 *  路线边框颜色值
 */
@property(nonatomic,assign) NSUInteger outlineColor;
/**
 *  路线边框颜色值
 */
@property(nonatomic,assign) UIColor * outlineUIColor;
/**
 *  开启箭头绘制功能，默认开启
 */
@property(nonatomic,assign) BOOL enableArrow;
/**
 *  箭头颜色
 */
@property(nonatomic,assign) uint arrowColor;
/**
 *  箭头颜色
 */
@property(nonatomic,assign) UIColor * arrowUIColor;
@property(nonatomic,assign) MBDrawStyle style;
@property(nonatomic,assign) uint passedColor;

/**
 *  箭头的间隔因子
 */
@property(nonatomic,assign) CGFloat arrowIntervalFactor;
/**
 *  路线实例
 */
@property(nonatomic,readonly) void *route;
/**
 *  初始化路线
 *  @param  route  路线实例
 *  @return 类对象
 */
- (id)initWithRoute:(void *)route;
/**  
 *  是否打开蚯蚓路，默认False。打开之后， outlineUIColor 属性变为无效
 *  @param enable True表示打开，False表示关闭。
 */
-(void)enableTmcColors:(BOOL)enable;
@end
