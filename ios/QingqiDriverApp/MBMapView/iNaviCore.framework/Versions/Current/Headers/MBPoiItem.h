//
//  MBPoiItem.h
//  iNaviCore
//
//  Created by fanyunlong on 5/18/16.
//  Copyright © 2016 Mapbar. All rights reserved.
//

#import "MBObject.h"

@interface MBPoiItem : MBObject

/**
 *  poi名字
 */
@property (nonatomic, retain) NSString* name;

/**
 *  地址
 */
@property (nonatomic, retain) NSString* address;

/**
 *  坐标位置
 */
@property (nonatomic, assign) MBPoint position;

/**
 *  入口
 */
@property (nonatomic, assign) MBPoint entryPoint;

/**
 *  poi类型
 */
@property (nonatomic, retain) NSString* typeName;

/**
 *  电话
 */
@property (nonatomic, retain) NSString* phoneNum;

/**
 *  相距多远
 */
@property (nonatomic, assign) double distance;

@end
