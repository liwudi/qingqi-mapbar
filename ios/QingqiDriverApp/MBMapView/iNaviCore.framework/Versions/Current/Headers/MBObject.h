//
//  MBEngineDateObject.h
//  iNaviCore
//
//  Created by fanyl on 14-4-29.
//  Copyright (c) 2014年 Mapbar. All rights reserved.
//

#import <Foundation/Foundation.h>

#import "MBNaviCoreBase.h"

/**
 *  数据类型基础类，客户端无需直接调用
 */
@interface MBObject : NSObject

/**
 *  数据类型初始化
 *
 *  @param handle
 *
 *  @return 初始化实例
 *
 *  @since 4.10.x
 */
-(id)initWithHandle:(void*)handle;

/**
 *  数据类型句柄
 *
 *  @return 句柄
 *
 *  @since 4.10.x
 */
-(void*)getHandle;

@end
