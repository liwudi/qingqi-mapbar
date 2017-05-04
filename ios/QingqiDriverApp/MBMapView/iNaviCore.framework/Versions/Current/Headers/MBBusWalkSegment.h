//
//  MBBusWalkSegment.h
//  iNaviCore
//
//  Created by fanyl on 14-6-4.
//  Copyright (c) 2014年 Mapbar. All rights reserved.
//

#import "MBBusSegmentBase.h"

@interface MBBusWalkSegment : MBBusSegmentBase
/**
 * 步行描述
 */
@property(nonatomic,retain)NSString* desc;
/**
 * 步行距离
 */
@property(nonatomic,assign)NSInteger distance;
/**
 * 步行方向
 */
@property(nonatomic,retain)NSString* direction;
/**
 * 步行点数量
 */
@property(nonatomic,assign)NSInteger pointNum;
/**
 * 步行点集合
 */
@property(nonatomic,assign)MBPoint* points;
@end
