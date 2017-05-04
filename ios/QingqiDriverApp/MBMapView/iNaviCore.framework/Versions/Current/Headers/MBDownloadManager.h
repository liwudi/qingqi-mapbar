//
//  MBDownloadManager.h
//  iNaviCore
//
//  Created by fanyunlong on 9/29/15.
//  Copyright © 2015 Mapbar. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "MBNaviDataEntity.h"
#import "MBNaviDataDownload.h"

/**
 *  数据商店代理
 *
 *  @since 5.0.x
 */
@protocol MBDownloadManagerDelegate <NSObject>
@optional
/**
 *  数据刷新取消
 *
 *  @since 5.0.x
 */
-(void)datastoreRefreshCancel;
/**
 *  数据刷新完成
 *
 *  @param entities 数据实体对象 [MBNaviDataEntity](#)
 *
 *  @since 5.0.x
 */
-(void)datastoreRefreshed:(NSArray*)entities;
/**
 *  数据刷新失败
 *
 *  @since 5.0.x
 */
-(void)datastoreRefreshFailed;
/**
 *  数据发生改变
 *
 *  @since 5.0.x
 */
-(void)dataEntitiesChanged;
/**
 *  数据应用开始
 *
 *  @param entity 数据实体对象
 *
 *  @since 5.0.x
 */
-(void)applyStarted:(MBNaviDataEntity*)entity;
/**
 *  数据应用进度
 *
 *  @param entity   数据实体对象
 *  @param progress 应用进度
 *
 *  @since 5.0.x
 */
-(void)apply:(MBNaviDataEntity*)entity progressChanged:(NSInteger)progress;
/**
 *  数据应用成功
 *
 *  @param entity 数据实体对象
 *
 *  @since 5.0.x
 */
-(void)applySucceed:(MBNaviDataEntity*)entity;
/**
 *  数据应用失败
 *
 *  @param entity 数据实体对象
 *
 *  @since 5.0.x
 */
-(void)applyFailed:(MBNaviDataEntity*)entity;
/**
 *  下载离线数据状态跟踪
 *
 *  @param  entity   数据实体对象
 *
 *  @since 5.0.x
 */
- (void)downloadDataState:(MBNaviDataEntity*)entity;
@end

typedef void (^MBDownloadStartBlock)(MBNaviDataEntity* entity);
typedef void (^MBDownloadProgressBlock2)(MBNaviDataEntity* entity, unsigned long long size, unsigned long long total);
typedef void (^MBDownloadCompletionBlock)(MBNaviDataEntity* entity);
typedef void (^MBDownloadFailureBlock)(MBNaviDataEntity* entity,NSError* err);

@interface MBDownloadManager : NSObject
/**
 *  数据商店类
 *
 *  @return 数据商店单例
 */
+(instancetype)sharedNaviDataManager;
/**
 *  数据商店的 URL
 */
@property(nonatomic,retain) NSString* baseURL;
@property(nonatomic,assign) id<MBDownloadManagerDelegate> delegate;
/**
 *  数据实体个数
 *
 *  @return 数据实体个数
 */
-(NSInteger)dataEntityNumber;
/**
 *  filter data by dataId
 *
 *  @param filter e.g: "cn.*, tts.*"
 *
 *  @since 5.1.0
 */
-(void)setDataFilter:(NSString*)filter;
/**
 *  根据索引等到数据实体
 *
 *  @param index 数据实体索引
 *
 *  @return 数据实体
 */
-(MBNaviDataEntity*)dataEntityByIndex:(NSInteger)index;
/**
 *  根据数据实体的 Id 得到数据实体
 *
 *  @param dataId 数据实体 Id
 *
 *  @return 数据实体
 */
-(MBNaviDataEntity*)dataEntityByDataId:(NSString*)dataId;
/**
 *  根据数据实体的 Id 删除数据实体
 *
 *  @param dataId dataId 数据实体 Id
 */
-(void)deleteLocalDataByDataId:(NSString*)dataId;
/**
 *  刷新数据商店
 */
-(void)refreshDatastore;
/**
 *  根据数据实体 Id 应用该数据，每一个 Entity 只能 apply 一次，，
 *
 *  @param dataId dataId 数据实体 Id
 *  @note 1.不能连续调用 2.要先apply基础数据
 */
-(void)applyDataByDataId:(NSString*)dataId;
/**
 *  apply by move file
 *
 *  @param entity MBNaviDataEntity
 *
 *  @return YES indicates success
 *
 *  @since 5.0.x
 */
-(BOOL)applyDataWithMoveFile:(MBNaviDataEntity*)entity;
/**
 *  设置购买的数据 Id
 *
 *  @param dataIds 数据 Id 的数组
 */
-(void)setPurchasedDataIds:(NSArray*)dataIds;

/**
 *
 *  开始下载离线数据，支持后台下载，不支持长连接，一次最多下载1个
 *  @param  entity     待下载的离线数据信息
 *  @return 空
 */
-(void)start:(MBNaviDataEntity*)entity;
/**
 *  是否有正在应用的实体
 *
 *  @return YES 表示正在应用
 *
 *  @since 5.0.x
 */
-(BOOL)isApplying;
/**
 *  数据商店清理
 *
 *  @since 5.0.x
 */
+(void)cleanup;
@property (nonatomic, copy) MBDownloadCompletionBlock completion;
@property (nonatomic, copy) MBDownloadStartBlock start;
@property (nonatomic, copy) MBDownloadProgressBlock2 progress;
@property (nonatomic, copy) MBDownloadFailureBlock failure;

@property (nonatomic, copy) void (^refreshCancel)(void);
@property (nonatomic, copy) void (^datastoreRefreshed)(NSArray*);
@property (nonatomic, copy) void (^datastoreRefreshFailed)(void);
@property (nonatomic, copy) void (^applyProgressChanged)(NSUInteger progress);
@property (nonatomic, copy) void (^applySucceed)(MBNaviDataEntity* entity);
@property (nonatomic, copy) void (^applyFailed)(MBNaviDataEntity* entity);
@property (nonatomic, copy) void (^dataEntitiesChanged)(void);
@property (nonatomic, copy) void (^applyStarted)(void);
@end
