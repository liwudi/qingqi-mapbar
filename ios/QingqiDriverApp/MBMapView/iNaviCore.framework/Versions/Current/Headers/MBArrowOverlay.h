//
//  MBArrowOverlay.h
//  Navigation
//
//  Created by delon on 12-12-26.
//
//

#import "MBMultipointOverlay.h"
#import "MBNaviCoreBase.h"

/**
 *    箭头图层
 */
@interface MBArrowOverlay : MBMultipointOverlay
/**
 *    箭头宽度
 */
@property(nonatomic,assign) CGFloat width;
/**
 *  初始化箭头（C风格）推荐
 *  @param  points  绘制箭头的坐标点
 *  @param  count   坐标点的数量
 *  
 */
- (id)initWithPoints:(const MBPoint*)points count:(NSInteger)count;
/**
 *  箭头宽度（OC风格）不推荐
 *  @param  points  点的数组
 */
- (id)initWithPoints:(NSArray*)points;
@end