//
//  MBNaviDataEntity.h
//  iNaviCore
//
//  Created by fanyl on 14-8-8.
//  Copyright (c) 2014年 Mapbar. All rights reserved.
//

#import "MBObject.h"
#import "MBDataStoreBaseTypes.h"

/**
 *  数据状态
 */
typedef enum MBNaviDataState
{
	MBNaviDataState_noData,
	MBNaviDataState_noUpdate,
	MBNaviDataState_hasUpdate
} MBNaviDataState;
/**
 *  数据实体对象，支持归档，不支持拷贝
 */
@interface MBNaviDataEntity : MBObject <NSCoding>
{
    @package
    unsigned long long  _hasDownloadSize;//已经下载到得数据大小
}
/**
 *  数据名称
 */
@property(nonatomic,readonly) NSString* name;
/**
 *  数据 ID
 */
@property(nonatomic,readonly) NSString* dataId;
/**
 *  是否有需要更新的数据，有返回 YES
 */
@property(nonatomic,readonly) BOOL hasUpdate;
/**
 *  是否有本地数据，有返回 YES，判断是否调用 [MBNaviDataManager applyDataByDataId:](#)
 */
@property(nonatomic,readonly) BOOL hasLocalData;
/**
 *  本地数据版本号
 */
@property(nonatomic,readonly) NSInteger version;
/**
 *  本地数据描述
 */
@property(nonatomic,readonly) NSString* localDescription;
/**
 *  本地数据说明
 */
@property(nonatomic,readonly) NSString* localReleaseNotes;
/**
 *  本地数据日期
 */
@property(nonatomic,readonly) NSString* localReleaseDate;
/**
 *  本地数据大小
 */
@property(nonatomic,readonly) NSInteger size;
/**
 *  最新版本号
 */
@property(nonatomic,readonly) NSInteger latestVersion;
/**
 *  最新版本描述
 */
@property(nonatomic,readonly) NSString* latestDescription;
/**
 *  最新版本说明
 */
@property(nonatomic,readonly) NSString* latestReleaseNotes;
/**
 *  最新版本日期
 */
@property(nonatomic,readonly) NSString* latestReleaseDate;
/**
 *  数据实体的总大小，等于其 [MBNaviDataDownload](#) 个数的 size 和
 */
@property(nonatomic,readonly) NSInteger downloadSize;
/**
 *  实体所包含 MBNaviDataDownload 的个数，等于 downloads.count
 */
@property(nonatomic,readonly) NSInteger downloadNumber;
/**
 *  存放 [MBNaviDataDownload](#) 对象
 */
@property(nonatomic,readonly) NSArray* downloads;
/**
 *  跟踪进度，[0,100]
 */
@property(nonatomic,assign) NSInteger progress;
/**
 *  状态
 */
@property(nonatomic,assign) MBDownloadState state;
/**
 *  是否已经下载
 *
 *  @since 5.0.x
 */
@property(nonatomic,assign) BOOL hasDownload;
@end
