//
//  MBPolygonOverlay.h
//  Navigation
//
//  Created by delon on 12-12-26.
//
//

#import "MBMultipointOverlay.h"

/**
 *  根据点数组创建一个多边形
 */
@interface MBPolygonOverlay : MBMultipointOverlay

/**
 *
 *  根据点数组创建一个多边形
 *  @param  points  点的数组，用来表示线段
 *  @param  count   点的数组数量
 *  @return 类对象
 */
- (id)initWithPoints:(const MBPoint*)points count:(NSInteger)count;
@end
