//
//  MBTrackManager.h
//  iNaviCore
//
//  Created by fanwei on 4/25/13.
//  Copyright (c) 2013 Mapbar. All rights reserved.
//

#import <Foundation/Foundation.h>

/**
 *  轨迹错误码
 */
typedef enum MBTrackManagerErrorCode {
	MBETMEC_Succ,
	MBETMEC_NoGPSSignal,
	MBETMEC_AchiveIsFull,
	MBETMEC_IOError
} MBTrackManagerErrorCode;

/**
 *   轨迹记录与查看相关的接口
 */
@interface MBTrackManager : NSObject
/**
 *  轨迹记录单例
 *  @return 单例指针
 */
+ (instancetype)sharedTrackMgr;
/**
 *  清理轨迹管理模块资源
 *  @return 空
 */
+ (void)cleanup;
/**
 *  删除所有轨迹记录
 *  @return 空
 */
- (void)deleteAllTracks;
/**
 *  删除指定的轨迹记录文件
 *  @param  fileName 轨迹记录文件名称
 *  @return 是否删除成功，成功返回true，否则返回false
 *     
 */
-(BOOL)deleteTrack:(NSString*)fileName;
/**
 *  是否正在记录轨迹
 *  @return 正在记录返回true，否则返回false
 */
-(BOOL)isRecording;
/**
 *  停止记录轨迹
 *  @return 空
 */
- (void)stop;
/**
 *  获取当前正在记录的轨迹文件名称
 *  @return 轨迹文件名称
 */
-(NSString*)getCurrentTrackName;
/**
 *  生成一条新轨迹
 *  @return 空
 */
- (MBTrackManagerErrorCode)newTrack;
/**
 *  获取当前所有已经存在的轨迹记录文件，并返回文件名数组
 *  @return 轨迹记录文件数组
 */
-(NSArray*)getAllTracks;
/**
 *  设置保存轨迹的文件夹
 *  @param  path	文件夹路径
 *  @return 空
 */
- (void)setBaseFolder:(NSString*)path;
@end
