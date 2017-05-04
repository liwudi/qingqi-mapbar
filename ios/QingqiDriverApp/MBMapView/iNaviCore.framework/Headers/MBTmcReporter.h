//
//  MBTmcReporter.h
//  iNaviCore
//
//  Created by fanyl on 14-1-14.
//  Copyright (c) 2014年 Mapbar. All rights reserved.
//

#import "MBObject.h"
#import "MBNaviBaseTypes.h"

/**
 *  TMC播报模式
 */
typedef enum MBTmcReporterMode {
	MBTmcReporterMode_manual = 0,		/// 手动模式，需客户端自己实现播报逻辑，调用[MBTmcReporter speakNow](#)播报
	MBTmcReporterMode_standard = 1,	/// 自动模式，按照引擎内部实现的逻辑播报
} MBTmcReporterMode;


/**
 *  Tmc播报项目类
 */
@interface MBTmcReportItem : MBObject
/**
 *  播报状态
 */
@property(nonatomic,assign) MBTmcState state;
/**
 *  道路名字
 */
@property(nonatomic,retain) NSString* roadName;
/**
 *  道路路况，与 MBTmcState 对应
 */
@property(nonatomic,retain) NSString* roadStatus;
/**
 *  方向，自xx向xx，或xx桥至xx桥
 */
@property(nonatomic,retain) NSString* roadDirection;
/**
 *  是否已播报
 */
@property(nonatomic,assign) BOOL isReported;


@end
/**
 *  TMC 播报类
 */
@interface MBTmcReporter : NSObject
/**
  立即停止Tmc播报
 */
+(void)forceStop;
/**
  立即播报
 */
+(void)speakNow;
/**
 *  设置播报模式，默认为标准模式
 *
 *  @param mode 模式
 *
 *  @since 4.9.x
 */
+(void)setMode:(MBTmcReporterMode)mode;
/**
 *  开启、关闭TMC播报
 *
 *  @param enable YES 开启
 *
 *  @since 5.0.x
 */
+(void)enableTmcReporter:(BOOL)enable;
/**
 *  TMC播报是否开启
 *
 *  @return YES 开启
 *
 *  @since 5.0.x
 */
+(BOOL)isEnableTmcReporter;
@end
