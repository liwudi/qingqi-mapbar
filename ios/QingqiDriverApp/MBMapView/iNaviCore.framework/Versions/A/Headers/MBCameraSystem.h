//
//  MBCameraSystem.h
//  iNaviCore
//
//  Created by fanyl on 5/6/13.
//  Copyright (c) 2013 Mapbar. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "MBNaviBaseTypes.h"

@class MBCameraData;
@class MBUserCameraData;

/**
 *  电子眼过滤模式
 */
typedef enum MBCameraSystemFilterMode
{
    MBCameraSystemFilterMode_simple = 0,///简洁模式
    MBCameraSystemFilterMode_standard,///标准模式
    MBCameraSystemFilterMode_all ///详细模式
} MBCameraSystemFilterMode;
/**
 *  电子眼错误码
 */
typedef enum MBCameraErrorCode
{
	MBCameraErrorCode_noError = 0,
	MBCameraErrorCode_userCameraNoUserFile,		/// 用户自定义电子眼文件不存在
	MBCameraErrorCode_userCameraInvalidIndex,		/// 无效的索引，超出自定义电子眼数目上限，或者小于-1
	MBCameraErrorCode_userCameraGrabFailed,		/// 自定义电子眼抓路失败
	MBCameraErrorCode_userCameraRepeat,			/// 在附近发现另一个用户自定义电子眼
	MBCameraErrorCode_userCameraInvalidId,		/// 无效的UserCamera id
	MBCameraErrorCode_userCameraInvalidPos,		/// 非法坐标
	MBCameraErrorCode_userCameraInvalidType,		/// 非法类型
}MBCameraErrorCode;

/**
 *   摄像头信息获取
 */
@interface MBCameraSystem : NSObject

/**
 *  设置播报模式，一般推荐设置为标准模式
 *  @param  mode  播报模式
 *  @return 空
 */
+(void)setFilterMode:(MBCameraSystemFilterMode)mode;
/**
 *  是否播报电子眼的语音
 *  @param  enable 果为true，表示正常播报，如果为false，那么只显示不播报语音
 *  @return 空
 */
+(void)enableVoice:(BOOL)enable;
/**
 *  获取前方道路中的电子眼，如果前方无电子眼，那么返回0个元素的数组
 *  @return 电子眼信息数组
 *
 */
+(NSArray*)getCameras;
/**
 *  根据下标获取用户自定义电子眼
 *  @param  index 下标
 *  @return 如果电子眼存在返回电子眼数据，否则返回null
 */
+(MBUserCameraData*)getUserCamera:(NSInteger)index;
/**
 *  根据范围获取用户自定义电子眼，例如，获取全部电子眼时参数为[MBCameraSystem getUserCameraNum](#)
 *
 *  @param range 范围
 *
 *  @return 用户自定义电子眼数组 [MBUserCameraData](#)
 *
 *  @since 4.9.x
 */
+(NSArray*)getUserCameras:(NSRange)range;
/**
 *  添加自定义电子眼，应该保证电子眼数据base.cmr或base.ca2存在且获得授权
 *  @param  userCamera 用户自定义电子眼
 *  @return 错误码 [MBCameraErrorCode](#)
 */
+(MBCameraErrorCode)addUserCamera:(MBUserCameraData*)userCamera;
/**
 *  通过索引删除自定义电子眼
 *  @param  index 索引值
 *  @return 错误码，[MBCameraErrorCode](#) 的 MBCameraErrorCode_noError 表示删除成功
 */
+(MBCameraErrorCode)removeUserCamera:(NSInteger)index;
/**
 * 通过ID删除自定义电子眼
 * @param cameraId 自定义电子眼ID
 * @return 错误码，如果返回 [MBCameraErrorCode](#) 的 MBCameraErrorCode_noError 表示删除成功
 */
+(MBCameraErrorCode)removeUserCameraById:(uint)cameraId;
/**
 *  根据索引替换自定义电子眼
 *  @param  index 索引
 *  @param  data 替换数据
 *  @return 错误码，如果返回 [MBCameraErrorCode](#) 的 MBCameraErrorCode_noError 表示删除成功
 */
+(MBCameraErrorCode)replaceUserCamera:(NSInteger)index data:(MBUserCameraData*)data;
/**
 * 将添加的电子眼数据保存到文件中
 */
+(void)saveUserCamera2File;
/**
 *  获取用户自定义电子眼个数
 *  @return 用户自定义电子眼个数
 */
+(NSInteger)getUserCameraNum;
/**
 *  设置过滤类型
 *
 *  @param types 数组 MBCameraType
 *  @param num   数组个数
 *  @param on    是否打开，YES 表示打开相应电子眼播报
 *
 *  @since 5.0.x
 */
+(void)setFilters:(MBCameraType*)types withNum:(NSInteger)num broadcast:(BOOL)on;
/**
 *  返回当前超速提醒次数，超速次数包括中途超速提醒记录和真正通过电子眼时的超速结果记录
 *
 *  @return 提醒次数
 *
 *  @since 5.0.x
 */
+(NSInteger)getSpeedingWarningCount;
/**
 *  将当前的超速提醒次数清零
 *
 *  @since 5.0.x
 */
+(void)clearSpeedingWarningCount;
/**
 *  控制超速播报开关
 *
 *  @param enable 设置为TRUE表示播报超速提示，设置为FALSE则表示不播报
 *
 *  @since 5.0.x
 */
+(void)enableOverspeedWarning:(BOOL)enable;
@end
