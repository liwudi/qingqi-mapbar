//
//  MBUtils.h
//  iNaviCore
//
//  Created by delon on 13-4-24.
//  Copyright (c) 2013年 Mapbar. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "MBNaviCoreBase.h"
#import "MBLog.h"

@interface MBUtils : NSObject

/**
*  数据源
*
*  @param fileName 文件相对路径
*
*  @return 字典，keys分别是：fileExist，guid，dataVersion，moreDataVersionNumber，moreDataVersions，mapbarVersion，compileTime，dataId，values分别是：BOOL，NSString，NSString，int，NSArray，NSString，NSString，NSString。
*
*  @since 4.10.x
*/
+ (NSDictionary *)App_getNaviDataMetadata:(NSString*)fileName;
/**
 *  将世界坐标系下的经纬度表示的长度转换为屏幕坐标系下的长度,来绘制用于显示的比例尺。
 *
 *  @param startPoint 起点坐标
 *  @param endPoint   终点坐标
 *
 *  @return 距离，单位：米。
 *
 *  @since 4.9.x
 */
+ (NSInteger)distanceWithStartPoint:(MBPoint *)startPoint endPoint:(MBPoint *)endPoint;
/**
 *  将世界坐标系下的经纬度表示的长度转换为屏幕坐标系下的长度,来绘制用于显示的比例尺。
 *
 *  @param startPoint 起点坐标
 *  @param endPoint   终点坐标
 *
 *  @return 距离，单位为“公里”、“米”、“英里”、“英尺”。
 */
+ (NSString *)distanceTextWithStartPoint:(MBPoint *)startPoint endPoint:(MBPoint *)endPoint;
/**
 *  NSInteger类型的距离转化成字符串类型的距离
 *
 *  @param length NSInteger表示的长度
 *
 *  @return 字符串表示的长度
 *
 *  @since 4.9.x
 */
+ (NSString *)distanceTextWithLength:(NSInteger)length;
/**
 *  相对位置转化为字符串，比如"东偏北300米"，但是如果小于等于100米，则返回"附近"
 *
 *  @param startPoint 起始点
 *  @param endPoint   终点
 *
 *  @return 字符串描述
 */
+ (NSString *)orientationTextWithStartPoint:(MBPoint *)startPoint endPoint:(MBPoint *)endPoint;
/**
 *  计算角度
 *
 *  @param dx 经度
 *  @param dy 纬度
 *
 *  @return 角度
 */
+ (NSInteger)angleFromDx:(NSInteger)dx andDy:(NSInteger)dy;
/**
 *  计算角度
 *
 *  @param posFrom 起始点
 *  @param posTo   终点
 *
 *  @return 角度
 */
+ (NSInteger)angleFromPoint:(MBPoint)posFrom toPoint:(MBPoint)posTo;

/**
 *  白天黑夜自动模式，根据当前时区自动判断是否是白天或者黑夜，需要开启定位
 *
 *  @return -1表示error,0表示daymode,1表示nightmode
 */
+ (int)isNightMode;
/**
 *  相对路径转化绝对路径，客户端无需理会
 *
 *  @param relativePath 相对路径
 *
 *  @return 绝对路径
 */
+ (NSString*)getAbsolutePath:(NSString*)relativePath;
/**
 *  类型转换
 *
 *  @param date NSDate
 *
 *  @return MBDateTime
 *
 *  @since 4.9.x
 */
+ (MBDateTime)NSDate2DateTime:(NSDate*)date;
/**
 *  获取设备唯一表示
 *
 *  @return 唯一标示
 */
+ (NSString*)Device_uniqueDeviceIdentifier;
/**
 *  UIImage 转换成位图
 *
 *  @param image UIImage
 *
 *  @return 位图指针
 *
 *  @since 4.9.x
 */
+ (unsigned char *) convertUIImageToBitmapRGBA8:(UIImage *) image;

/**
 *  位图转换成UIImage
 *
 *  @param buffer 位图缓冲区大小
 *  @param width  宽
 *  @param height 高
 *
 *  @return UIImage 实例
 *
 *  @since 4.10.x
 */
+ (UIImage *) convertBitmapRGBA8ToUIImage:(unsigned char *) buffer
                                withWidth:(int) width
                               withHeight:(int) height;
@end
