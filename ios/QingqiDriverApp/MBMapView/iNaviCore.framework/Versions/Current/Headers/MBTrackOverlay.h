//
//  MBTrackOverlay.h
//  Navigation
//
//  Created by delon on 12-12-26.
//
//

#import "MBOverlay.h"
/**
 *  绘制轨迹的图层
 */
@interface MBTrackOverlay : MBOverlay
/**
 *  通过给定保存轨迹的文件来实例化一个轨迹图层
 *  @param  filePath    文件路径
 *  @return 类对象
 */
- (id)initWithFilePath:(NSString *)filePath;
@end
