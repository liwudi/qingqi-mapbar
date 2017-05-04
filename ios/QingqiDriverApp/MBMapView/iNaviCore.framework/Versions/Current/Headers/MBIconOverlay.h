//
//  MBIconOverlay.h
//  Navigation
//
//  Created by delon on 12-12-26.
//
//

#import "MBOverlay.h"

/**
 *  绘制图标的Overlay
 */
@interface MBIconOverlay : MBOverlay

/**
 *  缩放比例因子
 */
@property(nonatomic,assign) CGFloat scaleFactor;

/**
 *  图标在地图上的位置经纬度坐标
 */
@property(nonatomic,assign) MBPoint position;
/**
 *  高精度坐标
 *
 *  @since 5.0.x
 */
@property(nonatomic,assign) MBNdsPoint ndsPosition;

/**
 *  图标角度
 *  此角度为地图中的角度，即，正北为0度，逆时针为正<br>也就是正东是270度，正南为180度，正西为90度，单位：度
 */
@property(nonatomic,assign) CGFloat orientAngle;
/**
 *  Set whether to keep same size at different positions in a map, even if the map is a 3D one with a low elevation.
 Default: false.
 *
 *  @since 5.0.x
 */
@property(nonatomic,assign) BOOL keepSizeDespiteDistance;
/**
 *
 *  根据指定图片创建图标Overlay
 *  @param  filePath    所使用的图片路径
 *  @param  maintainPixelSize    是否保持像素级大小文件路径
 *  @return 类对象
 */
- (id)initWithFilePath:(NSString *)filePath maintainPixelSize:(BOOL)maintainPixelSize;

/**
 *
 *  设置图片路径，用于动态修改所使用的图标
 *  @param  filePath    文件路径
 *  @return 空
 *
 */
- (void)setImageFilePath:(NSString *)filePath;

/**
 *
 *  添加图片动画
 *  @param  subimageNumber  图片数量
 *  @param  flashPattern    "*1000" means all frames last 1000 milliseconds. Like:*-*-*-*-*-...... "b300;a300;b300;a1800" constitues a flash-flash warning effect. Like: *-*------*-*-------......
 *  @return 空
 */
- (void)markAsAnimated:(NSInteger)subimageNumber flashPattern:(NSString *)flashPattern;

@end
