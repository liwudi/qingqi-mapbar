//
//  MBBusSegmentBase.h
//  iNaviCore
//
//  Created by fanyl on 14-6-4.
//  Copyright (c) 2014年 Mapbar. All rights reserved.
//

#import "MBObject.h"
#import "MBBusBaseType.h"
/**
 * 换乘路段基类</br> 步行换乘{@link MBBusWalkSegment}和公交换乘{@link MBBusSegment}都继承自该类
 */
@interface MBBusSegmentBase : MBObject
/**
 * 路线类型 {@link MBBusLine.Type}
 *
 * @see MBBusLine.Type
 */
@property(nonatomic,assign)MBBusLineType type;
@end
