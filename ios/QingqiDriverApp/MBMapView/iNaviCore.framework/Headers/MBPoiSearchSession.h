//
//  MBPoiSearchSession.h
//  iNaviCore
//
//  Created by fanyunlong on 5/17/16.
//  Copyright © 2016 Mapbar. All rights reserved.
//

#import <Foundation/Foundation.h>

#import "MBWmr.h"
#import "MBExpandView.h"

typedef enum _MBPoiSearchSessionError
{
    MBPoiSearchSessionError_none,
    MBPoiSearchSessionError_noResult,
    MBPoiSearchSessionError_httpError,
    MBPoiSearchSessionError_timeout,
    MBPoiSearchSessionError_otherError
} MBPoiSearchSessionError;


typedef enum _MBItemType
{
    MBItemType_poi,
    MBItemType_correction,
    MBItemType_cityDistribution,
    MBItemType_citySuggestion,
    MBItemType_originalDistrict
} MBItemType;

typedef void (^MBBasicBlock)(void);
typedef void (^MBDataBlock)(NSArray *pois, NSArray *corrections, NSArray *cityDistributions, NSArray *citySuggestions, NSArray *districts);

@interface MBPoiSearchSession : NSObject

/**
 The shared default instance of `MBPoiSearchSession` initialized with default values.
 */
+ (instancetype)defaultInstance;

/**
 *  Set the default host for all the on-line interfaces
 *  Include MBPoiSearchSession and MBPoiSuggest
 *  This function is only valid when called before any instance created.
 */
+ (NSString*)defaultUrlBase;
+ (void)setDefaultUrlBase:(NSString *)defaultUrlBase;

/**
 *  Get/Set current search instance urlbase
 */
@property (nonatomic, retain) NSString* urlBase;

/**
 *  Get/Set search parameter keyword
 */
@property (nonatomic, retain) NSString* keyword;

/**
 *  设置查询城市 wmrId, 在执行具体查询函数前必须设置。
 *
 *  @since 5.2.x
 */
@property (nonatomic, assign) MBWmrObjId wmrId;

/**
 *  Get/Set search parameter page size, default is 10.
 */
@property (nonatomic, assign) NSInteger pageSize;

/**
 *  Get/Set data perference, default is  MBDataPreference_onlineOnly.
 *  MBDataPreference_offlineOnly and MBDataPreference_onlineOnly are supported now.
 */
@property (nonatomic, assign) MBDataPreference preference;

/**
 *  Get/Set search parameter range, default is 3000.
 */
@property (nonatomic, assign) NSInteger range;

/**
 *  设置查询点坐标, 在执行具体查询函数前必须设置。
 *
 *  @since 5.2.x
 */
@property (nonatomic, assign) MBPoint center;

/**
 *  开始查询
 */
- (void)query;

/**
 *  选择返回列表中的哪一类的第几个进行查询，不支持类型：MBItemType_poi
 *
 *  @param type  类型
 *  @param index
 */
- (void)selectType:(MBItemType)type index:(NSInteger)index;

/**
 *  取消查询
 */
- (void)cancelQuery;

/**
 *  加载更多
 */
- (void)loadMore;

/**
 *  恢复上一次的查询结果
 */
- (void)goBack;

/**
 *  是否还有更多数据
 *
 *  @return true:有
 */
- (BOOL)hasMore;

/**
 *  查询开始回调块
 *
 *  @param aStartedBlock
 */
- (void)setStartedBlock:(MBBasicBlock)aStartedBlock;

/**
 *  Query successfully, but data is not loaded
 *
 *  @param aEndBlock
 */
- (void)setEndedBlock:(MBBasicBlock)aEndBlock;

/**
 *  查询失败时回调块
 *
 *  @param aFailedBlock
 */
- (void)setFailedBlock:(MBBasicBlock)aFailedBlock;

/**
 *  查询成功后加载数据完成时的回调块，携带返回数据
 *
 *  @param aLoadedBlock
 */
- (void)setLoadedBlock:(MBDataBlock)aLoadedBlock;

/**
 *  取消查询的回调块
 *
 *  @param aCancelBlock
 */
- (void)setCanceledBlock:(MBBasicBlock)aCancelBlock;

@end
