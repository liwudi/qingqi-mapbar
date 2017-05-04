//
//  MBAnnotation.h
//  Navigation
//
//  Created by delon on 12-12-26.
//
//

#import <UIKit/UIKit.h>

#import "MBNaviCoreBase.h"

/**
 *  MBAnnotation弹出样式
 */
typedef struct MBCalloutStyle
{
    /// 标题字体
    int titleSize;
    /// 副标题字体
    int subtitleSize;
    /// 标题颜色
    unsigned int titleColor;
    /// 副标题颜色
    unsigned int subtitleColor;
    /// 标题高亮
    unsigned int titleColorHighlighted;
    /// 副标题高亮
    unsigned int subtitleColorHighlighted;
    /// 左图标ID
    int leftIcon;
    /// 右图标ID
    int rightIcon;
    /// 锚点
    CGPoint anchor;
} MBCalloutStyle;

/**
 *  点击 MBAnnotationArea 的区域
 */
typedef enum MBAnnotationArea
{
    MBAnnotationArea_none,
    MBAnnotationArea_icon,
    MBAnnotationArea_leftButton,
    MBAnnotationArea_middleButton,
    MBAnnotationArea_rightButton
} MBAnnotationArea;

/**
 *   标注，一个 MBMapView 上可以有多个 MBAnnotation。
 */
@interface MBAnnotation : NSObject
{
@package
    id _native;
    BOOL _attatched;
}

/**
 *  是否可以点击，YES为可以点击，NO不可以点击，默认可以YES。
 */
@property(nonatomic,assign) BOOL clickable;
/**
 *  位置坐标
 */
@property(nonatomic,assign) MBPoint position;
/**
 *  高精度坐标
 */
@property(nonatomic,assign) MBNdsPoint ndsPosition;
/**
 *  标题
 */
@property(nonatomic,retain) NSString *title;
/**
 *  副标题
 */
@property(nonatomic,retain) NSString *subTitle;
/**
 *  落雨效果开关
 *
 *  @since 5.0.x
 */
@property(nonatomic,assign) BOOL dropEnable;
/**
 *  It determines the drawing sequence of the Annotations. Annotations with greater z level will be drawn later and
 may cover on those with less levels.
 *
 *  @since 5.0.x
 */
@property(nonatomic,assign) int zLevel;
/**
 *  tag标识
 */
@property(nonatomic,assign) int tag;
/**
 *  选中状态，默认 NO
 */
@property(nonatomic,assign) BOOL selected;
/**
 *  是否隐藏，默认 NO，同时会触发 MBMapViewDelegate 中的回调
 */
@property(nonatomic,assign) BOOL hidden;
/**
 *  显示的样式
 */
@property(nonatomic,assign) MBCalloutStyle calloutStyle;

/**
 *  初始化 MBAnnotation 实例
 *  @param  zLevel  Z轴方向的等级，也就所处的压盖关系
 *  @param  pos     所在位置
 *  @param  iconId  所使用的图标ID，用户自定义的图片，如:文件名1004.png，放在res目录的icons文件夹下。
 *  @param  pivot  设置显示时调整的X轴，Y轴的偏移量<br>默认情况下显示时的位置为图标左上角点<br>此参数可以设置显示时相对于图标左上角点的偏移量
 *  @return 空
 */
- (id)initWithZLevel:(int)zLevel pos:(MBPoint)pos iconId:(int)iconId pivot:(CGPoint)pivot;
/**
 *  初始化 MBAnnotation 实例，用于高精度的室内图显示
 *  @param  zLevel  Z轴方向的等级，也就所处的压盖关系
 *  @param  pos     所在位置
 *  @param  iconId  所使用的图标ID，用户自定义的图片，如:文件名1004.png，放在res目录的icons文件夹下。
 *  @param  pivot  设置显示时调整的X轴，Y轴的偏移量<br>默认情况下显示时的位置为图标左上角点<br>此参数可以设置显示时相对于图标左上角点的偏移量
 *  @return 空
 */
- (id)initWithZLevel:(int)zLevel posNds:(MBNdsPoint)pos iconId:(int)iconId pivot:(CGPoint)pivot;

/**
 *  设置显示图标
 *  @param  iconId  所使用的图标ID
 *  @param  pivot  设置显示时调整的X轴，Y轴的偏移量，默认情况下显示时的位置为图标左上角点，此参数可以设置显示时相对于图标图标左上角点的偏移量
 *  @return 空
 */
- (void)setIcon:(int)iconId pivot:(CGPoint)pivot;

/**
 *  设置图标上的文字，推荐。
 *  @param  text    文字内容
 *  @param  color   文字颜色
 *  @param  anchor  文字锚点位置
 *  @return 空
 */
- (void)setIconText:(NSString *)text color:(uint)color anchor:(CGPoint)anchor;

/**
 *  设置图标上的文字。
 *  @param  text    文字内容
 *  @param  color   文字颜色
 *  @param  anchor  文字锚点位置
 *  @return 空
 */
- (void)setIconText:(NSString *)text UIColor:(UIColor *)color anchor:(CGPoint)anchor;
/**
 *  设置图标文字大小
 *  @param  size  文字大小
 *  @return 空
 */
- (void)setIconTextSize:(int)size;

/**
 *  需要刷新
 *  @return 空
 */
- (void)setNeedsDisplay;

/**
 *  是否显示 MBAnnotation 样式
 *  @param  show  YES显示，NO不显示，默认值 NO
 *  @return 空
 *  @note 该方法在是用 [[MBMapView addAnnotation:]](#) 之后调用有效
 */
- (void)showCallout:(BOOL)show;

/**
 *  点击位置
 *  @param  clickArea 点击区域
 *  @return 空
 */
- (MBAnnotationArea)hitTest:(MBRect)clickArea;

@end
