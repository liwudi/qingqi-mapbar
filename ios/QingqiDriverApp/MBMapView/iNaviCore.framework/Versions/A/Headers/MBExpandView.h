//
//  MBExpandView.h
//  Navigation
//
//  Created by admin on 12-8-10.
//  Copyright (c) 2013年 mapbar. All rights reserved.
//

#import <Foundation/Foundation.h>

/** MBExpandView
 *
 *  路口放大图
 *
 *  从 5.0 之后删除了 sharedInstance 和 cleanup 方法，它的初始化由 MBNaviSession 初始化时的
 *  MBNaviSessionParams 来隐藏调用。
 *  使用方法：
 *  MBNaviSession* session = [MBNaviSession sharedInstance];
 *  MBNaviSessionParams* p = [MBNaviSessionParams defaultParams];
 *  session.params = p;
 *  session.delegate = self;
 *  之后在 MBNaviSessionDelegate 的
 *  -(void)naviSessionExpandViewShow;
 *  -(void) naviSessionExpandViewRefresh;
 *  -(void) naviSessionExpandViewHide;
 *  调用相应的 MBExpandView 类方法
 */

//EVColor_*
extern const int MBEVColor_titleBar;/* 标题栏的背景颜色，默认值：0x0 */
extern const int MBEVColor_progressBar;/* 以标题栏为背景的那个表示距离路口进度的颜色条的颜色， 默认值：RGB:b72525 */
extern const int MBEVColor_titleBarText;/* 标题栏中文字的颜色，默认值：0xFFFFFF */
extern const int MBEVColor_expandViewArrowOutline;/* 普通放大图中转向箭头的描边颜色，默认值：RGB:000000 */
extern const int MBEVColor_expandViewArrow;/* 普通放大图中转向箭头的默认填充颜色，默认值：RGB:32fa00 */
#ifdef ENABLE_EXPAND_VIEW_ANIMATION
extern const int MBEVColor_expandViewArrowSecond;   /* 普通放大图中转向箭头的第二填充颜色，默认值：RGB:ffff40 */
extern const int MBEVColor_realViewArrowSecond;   /* 实景图和模式图中指向箭头的第二颜色，默认值：RGB:32fa00 注：第一颜色使用图片中原色(ffff40)，为保证性能暂不允许修改。*/
extern const int MBEVColor_boardViewArrowSecond;   /* 四维看板图中指向箭头的第二颜色，默认值：RGB:ffff40  注：第一颜色使用图片中原色(01fe4e)，为保证性能暂不允许修改。*/
#endif

/**
 *  EVConfig_* 要设置或读取的配置项，其值应是下列值中的一个：
 *
 *  @since 5.0.x
 */
extern const int MBEVConfig_showUnitInHZ;
extern const int MBEVConfig_drawIrrelevantRoads;
extern const int MBEVConfig_hideTitleBar;
extern const int MBEVConfig_hideLaneBoard;
/**
 *  EVSize_* 要设置或读取的配置项，其值应是下列值中的一个：
 *
 *  @since 5.0.x
 */
extern const int MBEVSize_titleBarHeight;
extern const int MBEVSize_dpiFactor;
#ifdef ENABLE_EXPAND_VIEW_ANIMATION
extern const int MBEVSize_arrowAnimFrameDuration;
extern const int MBEVSize_arrowAnimOffsetX;
extern const int MBEVSize_arrowAnimOffsetY;
#endif

typedef enum _MBDataPreference
{
    MBDataPreference_offlineOnly,
    MBDataPreference_onlineOnly,
    MBDataPreference_preferOffline,
    MBDataPreference_preferOnline
} MBDataPreference;

@interface MBExpandView : NSObject

/**
 *  重置路口放大图
 */
+(void) reset;
/**
 *  启用，关闭，路口放大图
 *
 *  @param enable YES 打开
 *
 *  @since 4.9.x
 */
+(void) setEnable:(BOOL)enable;
/**
 *  是否启用路口放大图
 *
 *  @return YES 表示已经启用
 */
+(BOOL) isEnabled;
/**
 *  更改屏幕分辨率。用于横竖屏切换。同时第一次使用放大图要第一个调用。
 *
 *  @param width  宽度
 *  @param height 高度
 *
 *  @since 4.9.x
 */
+ (void)setViewWidth:(NSInteger)width height:(NSInteger)height;
/**
 *
 *  获得路口放大图
 *  @return image 路口放大图
 *  
 */
+ (UIImage *)expandImage;
/**
 为本次转弯禁用放大图。过了本次转弯，会自动恢复显示；若需要手动地恢复显示，应调用open().
 */
+(void) closeOnce;
/** 用于手动地清除closeOnce()的效果，以便在当前转弯通过之前即开始恢复显示放大图。
 @sa ExpandView_closeOnce()
 */
+(void) open;
/** 当前是否要显示“打开放大图”的按钮。“打开放大图”即需要调用open()。
 返回TRUE意味着当前有放大图可供显示、且因为closeOnce()的原因不需要显示。
 closeOnce().
 */
+(BOOL) shouldDisplayOpenButton;
/**
 *  当前有放大图、且需要显示，与最近一次调用update()时的返回值相同（除非中间又经过reset())
 *  @since 5.0.x
 */
+(BOOL) shouldDisplay;
+(void) resizeScreen:(NSInteger)width height:(NSInteger)height;
/**
 *  设置、读取颜色类的配置项目的值。颜色类的配置项在白天模式和夜晚模式下有不同的值。
 *
 *  @param EVColor  要设置或读取的配置项，其值应是 EVColor_* 中的一个。否则，读取结果总是(PixelType)0。
 *  @param day      设置的是白天模式（FALSE）还是晚上模式（TRUE)下的值。
 *  @param newValue 指定的新值。
 *
 *  @since 5.0.x
 */
+(void)setColor:(int)EVColor isNight:(BOOL)night newPixel:(int)newValue;
+(int)getColor:(int)EVColor isNight:(BOOL)night;
/**
 *  设置、读取大小尺寸类的配置项目的值，如标题栏的高度、道路宽度等。此类参数有的需要满足一定的约束条件，故调用本函数后实际采用的值有可能与指定的值不同。
	如：当\a item为\a EVSize_topAreaHeight时，若输入的\a newValue小于标题文字字体的高度，则实际采用的值将会是一个满足恰当显示文字所需的最小的值。
 *
 *  @param EVSize   要设置或读取的配置项，其值应是 EVSize_* 中的一个。否则，总是返回INT_MAX(即0x7FFFFFFF).
 *  @param newValue 指定的新值。实际采用的值。若\a item无效，总是返回INT_MAX(即0x7FFFFFFF)。
 *
 *  @since 5.0.x
 */
+(void)setSize:(int)EVSize newValue:(int)newValue;
+(int)getSize:(int)EVSize;
/**
 *  设置、读取一个配置项目的值。
 *
 *  @param EVConfig 设置、读取一个配置项目的值
 *  @param enable   指定的新值。若\a item无效，总是返回FALSE.
 *
 *  @since 5.0.x
 */
+(void)setBOOLConfig:(int)EVConfig enable:(BOOL)enable;
+(BOOL)getBOOLConfig:(int)EVConfig;
/**
 *  设置放大图的查询模式
 *
 *  @param preference MBDataPreference
 *
 *  @since 5.1.x
 */
+(void)setDataPreference:(MBDataPreference)preference;
+(MBDataPreference)getDataPreference;
/**
 *  获取在线放大图的url
 *
 *  @param url
 *
 *  @since 5.1.x
 */
+(void)setURLBase:(NSString*)url;
+(NSString*)getURLBase;
@end
