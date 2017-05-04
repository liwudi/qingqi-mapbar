//
//  MB4SObject.h
//  iNaviCore
//
//  Created by fanyl on 14-5-4.
//  Copyright (c) 2014年 Mapbar. All rights reserved.
//

#import "MBObject.h"
/**
 * 汽车4S店详细信息，一般用来显示4S店详情
 */
@interface MB4SObject : MBObject
/**
 * 4S店名称
 */
@property (nonatomic,retain) NSString* name;
/**
 *  4S店地址
 */
@property (nonatomic,retain) NSString* address;
/**
 * 销售电话
 */
@property (nonatomic,retain) NSString* salePhones;
/**
 * 服务电话
 */
@property (nonatomic,retain) NSString* servicePhones;
/**
 * 具体品牌信息
 */
@property (nonatomic,retain) NSString* brandDetail;
/**
 * 地理坐标位置
 */
@property (nonatomic,assign) MBPoint pos;
/**
 * 距离当前车的位置
 */
@property (nonatomic,assign) NSUInteger distance;

@end
