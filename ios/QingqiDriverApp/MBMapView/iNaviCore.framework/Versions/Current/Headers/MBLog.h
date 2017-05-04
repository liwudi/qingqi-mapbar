//
//  MBLog.h
//  iNaviCore
//
//  Created by fanyunlong on 3/3/16.
//  Copyright © 2016 Mapbar. All rights reserved.
//

#import <Foundation/Foundation.h>

typedef enum _CoreLogLevel
{
    CoreLogLevel_fatal,	///< Fatal errors. For example, a core module fails to initialize or some critical resource is missing.
    CoreLogLevel_critical,	///< Critical errors. For example, details about why a module fails to initialize.
    CoreLogLevel_warning,		///< Tolerable errors. For example, a picture on a button fails to load.
    CoreLogLevel_info,		///< Informative output. For example, a sound file is played, or a message box is displayed.
    CoreLogLevel_trivial,		///< Even more information. For example, a file is opened.
} CoreLogLevel;
/**
 *  写入文件，并且在控制台打印 Log
 *
 *  @param void YES 控制台打印 Log
 *
 *  @return NULL
 *
 *  @since 5.0.x
 */
#ifndef OUTPUT_TO_CONSOLE
#define OUTPUT_TO_CONSOLE 1
#endif

/**
 *  When set to 1 DEBUG will print information, Release suggest close log
 *
 *  @param void NULL
 *
 *  @return NULL
 *
 *  @since 5.2.x
 */
#ifndef MB_DEBUG_STATUS
#define MB_DEBUG_STATUS 1
#endif

@interface MBLog : NSObject
/**
 *  写入 Log
 *
 *  @param log 要记录的 Log 语句
 *
 *  @since 5.2.x
 */
+(void)writeLog:(NSString*)log;

/**
 *  删除所有 Logs 记录
 *
 *  @return YES 删除成功
 *
 *  @since 5.2.x
 */
+(BOOL)deleteAllLogs;

/**
 *  设置引擎日志输出等级
 *
 *
 */
+(void)setMBLogLevel:(CoreLogLevel)lev;
@end
