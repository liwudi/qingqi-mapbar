//
//  MBURasterArea.h
//  iNaviCore
//
//  Created by fanyl on 1/21/15.
//  Copyright (c) 2015 Mapbar. All rights reserved.
//

#import "MBObject.h"
/**
 *  光栅图
 */
@interface MBURasterArea : MBObject
/**
 *  当前是否有室内图信息，YES 表示有
 */
@property(nonatomic,assign)BOOL validate;
/**
 *  包络盒大小
 */
@property(nonatomic,assign)MBRect bounds;
/**
 *  缩放级别范围
 */
@property(nonatomic,assign)MBRange zoomLevelRange;
/**
 *  楼层范围
 */
@property(nonatomic,assign)MBRange floorRange;
/**
 *  楼层个数
 */
@property(nonatomic,assign)NSInteger floorCount;
/**
 *  区域名称
 */
@property(nonatomic,retain)NSString* areaName;
/**
 *  楼层名称，比如：一楼
 */
@property(nonatomic,retain)NSArray* floorNames;
@end
