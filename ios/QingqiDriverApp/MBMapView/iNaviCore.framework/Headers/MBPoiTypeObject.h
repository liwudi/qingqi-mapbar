//
//  MBPoiType.h
//  iNaviCore
//
//  Created by fanwei on 1/28/13.
//  Copyright (c) 2013 Mapbar. All rights reserved.
//

#import "MBObject.h"
#import "MBPoiBaseTypes.h"

/** 
 *   POI类型对象，比如加油站
 */
@interface MBPoiTypeObject : MBObject
/**
 *  POI类型索引，取值范围是[0, POI类型对象总数 - 1]
 */
@property (nonatomic) MBPoiTypeIndex index;

/**
 *  POI类型对象的层级
 */
@property (nonatomic) int level;

/**
 *  POI类型的名称
 */
@property (nonatomic,retain) NSString *name;

/** 
 *  FALSE 表示在界面显示时用户可以点击进入下一层，TRUE 表示不能进入下一层，点击即表示选中该类型
 */
@property (nonatomic,assign) BOOL isFinal;

/**
 *  POI类型码
 */
@property (nonatomic,assign) MBPoiType naviInfoId;
/**
 *  POI类型的分值，目前没有使用
 */
@property (nonatomic,assign) NSInteger score;
/**
 *  是否叶子节点，即无子节点
 */
@property (nonatomic,assign) BOOL isLeaf;
/**
 *  返回父节点Id
 */
@property(nonatomic,readonly) MBPoiTypeIndex parentIndex;
/**
 *  初始化 MBPoiTypeObject 对象
 *  @param  节点索引
 */
- (id)initWithPoiTypeIndex:(MBPoiTypeIndex)index;

@end
