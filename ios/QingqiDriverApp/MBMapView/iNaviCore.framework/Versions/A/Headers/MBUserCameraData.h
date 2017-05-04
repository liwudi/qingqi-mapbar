//
//  MBUserCameraData.h
//  iNaviCore
//
//  Created by fanwei on 5/8/13.
//  Copyright (c) 2013 Mapbar. All rights reserved.
//

#import "MBObject.h"

@class MBCameraData;

/**
 *  摄像头基本数据
 */
@interface MBUserCameraData : MBObject
/**
 *  摄像头数据
 */
@property (retain,nonatomic) MBCameraData* cameraData;
/**
 *  摄像头名称
 */
@property (retain,nonatomic) NSString* name;
/**
 *  用户自定义摄像头 ID
 */
@property (assign,nonatomic) unsigned int userCameraId;
/**
 *  用户自定义摄像头说明
 */
@property (retain,nonatomic) NSString* userData;
@end
