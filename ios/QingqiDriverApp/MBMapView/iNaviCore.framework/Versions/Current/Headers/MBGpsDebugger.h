//
//  MBGpsDebug.h
//  GpsDebug
//
//  Created by fanyl on 13-9-9.
//  Copyright (c) 2013年 fanyl. All rights reserved.
//

#import <Foundation/Foundation.h>
/**
 *  根据真实导航进行定位调试
 */
@interface MBGpsDebugger : NSObject
/**
 *  打开 Gps 调试模式，在开始前要关闭真实地 Gps，即关闭 [MBGpsTracker cleanup]
 *
 *  @param file 打开文件名称，[MBGpsDebugger startLogging:] 对应
 *
 *  @since 5.0.x
 */
+(void)openFalseDevice:(NSString*)file;
/**
 *  关闭 Gps 调试模式，如果还需要 Gps 定位，需要重新初始化 [MBGpsTracker](#)
 *
 *  @since 5.0.x
 */
+(void)closeFalseDevice;
/**
 * 获取当前播放到哪一帧
 *
 * @return 返回当前帧
 */
+(NSInteger)getCurrentFrameIndex;
/**
 *  根据帧索引，设置帧位置
 *
 *  @param index 索引
 *
 *  @since 4.9.x
 */
+(void)setFrameByIndex:(int)index;
/**
 * 获取当前数据总帧数<br>也就是当前gps_log轨迹中的记录的gps点数
 *
 * @return 总帧数
 */
+(NSInteger)getFrameNumber;
/**
 * 获取当前帧率，即，每秒钟播放多少帧
 *
 * @return 帧率
 */
+(NSInteger)getSpeed;
/**
 *  设置播放速度，即，每秒钟播放多少帧数据
 *
 *  @param speed 播放速度
 *
 *  @since 4.9.x
 */
+(void)setSpeed:(int)speed;
/**
 *  打开日志记录，Library/Private Documents/data 目录下
 *  @param file 打开文件名称，要以 .info 结尾。比如：gps_log.info
 */
+(void)startLogging:(NSString*)file;
/**
 * 开始播放
 */
+(void)play;
/**
 * 停止播放
 */
+(void)stop;
/**
 * 暂停播放
 */
+(void)pause;
@end
