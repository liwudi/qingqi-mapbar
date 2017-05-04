//
//  MBOverlay.h
//  Navigation
//
//  Created by delon on 12-12-26.
//
//

#import <UIKit/UIKit.h>
#import "MBNaviCoreBase.h"

/**
 *  图层覆盖关系，值越大覆盖越高
 */
typedef enum MBOverlayLayer
{
    MBOverlayLayer_aboveBase = 0,
    // 1 引擎预留
    MBOverlayLayer_abovePoi = 2,
    MBOverlayLayer_aboveBuilding = 3,
    MBOverlayLayer_aboveAnnotation = 4
}MBOverlayLayer;

/**
 *  图层
 */
@interface MBOverlay : NSObject
{
@package
    id _native;
@package
    BOOL _attatched;
}

/**
 *  图层覆盖关系，值越大覆盖越高
 */
@property(nonatomic,assign) MBOverlayLayer overlayerLayer;
/**
 *  应用的样式表名称. Default: "DEFAULT".
 */
@property (nonatomic,retain) NSString* styleClass;
/** Set z-level which affects the drawing order among Overlays.
 Unlike Annotations, Overlays are sorted according to OverlayLayer first and z-level second.
 Note Overlays and Annotations are sorted independently and won't interlace.
 Z-level of a Overlay object might be modified implicitly by MapRender's bringOverlayToTop(), sendOverlayToBack(), exchangeOverylayIndices() and insertOverlayAtIndex().
 Default: 0.
 */
@property(nonatomic,assign) int zLevel;
/**
 *  隐藏
 */
@property(nonatomic,assign) BOOL hidden;
/**
 *   该 MBOverlay 是否可以点击，默认 NO. 设置为 YES 之后可以接收
 *   [MBMapViewDelegate mbMapView:onOverlayClicked:area:](#);
 *   [MBMapViewDelegate mbMapView:onOverlaySelected:grabbedPoint:](#);
 *   [MBMapViewDelegate mbMapView:onOverlaySelectedNds:grabbedPoint:](#);
 *   [MBMapViewDelegate mbMapView:onOverlayDeselected:](#);
 */
@property(nonatomic,assign) BOOL clickEnable;
/**
 *  图层标签
 */
@property(nonatomic,assign) int tag;
/**
 *  图层位置
 */
@property(nonatomic,assign) MBPoint postion;

/**
 *  设置需要刷新 [MBOverlay](#)
 *  @return 空
 */
- (void)setNeedsDisplay;

/**
 *  设置绘制时使用的画刷颜色
 *  @param  color 颜色值(ARGB)，一般为0xff0f0c0d的形式
 *  @return 空
 */
- (void)setColor:(uint)color;
/**
 *  得到 ARGB 形式的颜色表示
 */
- (uint)getColor;

/**
 *
 *  设置绘制时使用的画刷颜色，推荐使用
 *  @param  color 颜色值(ARGB)，一般为0xff0f0c0d的形式
 *  @return 空
 */
- (void)setUIColor:(UIColor *)color;
- (UIColor*)getUIColor;
/**
 *  抽象方法
 *  @return 获取包络盒
 */
- (const MBRect)boundingBox;
/**
 *  通知 MBMapView 选择或者反选的 MBOverlay。当选择时候会有一个气泡在该 MBOverlay 弹出
 *
 *  @param enable 是否选择
 *  @param pos    位置
 */
-(void)setSelected:(BOOL)enable pos:(MBPoint)pos;
@end
