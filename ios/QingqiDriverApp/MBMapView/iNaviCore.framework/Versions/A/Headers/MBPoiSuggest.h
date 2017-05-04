//
//  MBPoiSuggest.h
//  iNaviCore
//
//  Created by liguanjun on 16/6/14.
//  Copyright © 2016年 Mapbar. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "MBWmr.h"
#import "MBPoiSearchSession.h"

/**
 与关键字相关度
 */
typedef enum _MBPoiSuggestRelationDeep
{
    MBRelationDeepNone = 0,
    MBRelationDeepTwoStage,
    MBRelationDeepThreeStage
} MBPoiSuggestRelationDeep;


@interface MBPoiSuggest : NSObject

/**
 *  Get/Set current search instance urlbase
 *  has no default url,need to set it before query
 *  the value can be setted with [MBPoiSearchSession defaultUrlBase]
 */
@property (nonatomic, retain) NSString* urlBase;

/**
 *  Get/Set search parameter world manager object id
 */
@property (nonatomic, assign) MBWmrObjId wrmId;

/**
 *  Get/Set search parameter page size, default is 10.
 */
@property (nonatomic, assign) NSInteger pageSize;

/**
 *  Get/Set search parameter relation depth, default is `MBRelationDeepNone`
 */
@property (nonatomic, assign) MBPoiSuggestRelationDeep relationDeep;

/**
 *
 *  @return 单例
 */
+ (instancetype)defaultInstance;

/**
 *  查询
 *
 *  @param keyword 关键字
 */
- (void)query:(NSString*) keyword;

/**
 *  取消查询
 */
- (void)cancelQuery;

/**
 *  设置查询开始时的回调块
 *
 *  @param aStartedBlock 无参回调块
 */
- (void)setStartedBlock:(MBBasicBlock)aStartedBlock;

/**
 *  查询结束时回调块，此时只是查询结束，还未加载数据
 *
 *  @param aStartedBlock 无参回调块
 */
- (void)setEndedBlock:(MBBasicBlock)aEndBlock;

/**
 *  查询失败时回调块
 *
 *  @param aStartedBlock 无参回调块
 */
- (void)setFailedBlock:(MBBasicBlock)aFailedBlock;
/**
 *  查询结束后加载数据完成时的回调块
 *
 *  @param aStartedBlock 携带返回参数回调块
 */
- (void)setLoadedBlock:(MBDataBlock)aLoadedBlock;

/**
 *  取消查询时回调块
 *
 *  @param aStartedBlock 无参回调块
 */
- (void)setCanceledBlock:(MBBasicBlock)aCancelBlock;

@end
