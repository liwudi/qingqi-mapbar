//
//  MBModelOverlay.h
//  iNaviCore
//
//  Created by fanyl on 13-12-23.
//  Copyright (c) 2013年 Mapbar. All rights reserved.
//

#import "MBOverlay.h"
/**
 *  3D小车图层。
 */
@interface MBModelOverlay : MBOverlay
/**
 *  大小，当初始化measuredInPixel参数为true时对应单位像素，false对应单位米。
 */
@property(nonatomic,assign)int size;
/**
 *  比例系数，默认1.0f。
 */
@property(nonatomic,assign)float scaleFactor;
/**
 *  方向，范围[0,360)，默认0。
 */
@property(nonatomic,assign)NSInteger heading;
/**
 *  3D小车位置。
 */
@property(nonatomic,assign) MBPoint position;
/**
 *  3D小车初始化。
 *
 *  @param filePath        文件路径。
 *  @param measuredInPixel 是否以像素为单位。
 *
 *  @return 3D小车实例。
 */
- (id)initWithFilePath:(NSString *)filePath measuredInPixel:(BOOL)measuredInPixel;
/**
 *  当3D小车被建筑物遮挡时建筑物是否透明。默认值 false
 *
 *  @param toEnable 建筑物是否透明。
 */
-(void)enableBuildingOpaque:(BOOL)toEnable;
@end
