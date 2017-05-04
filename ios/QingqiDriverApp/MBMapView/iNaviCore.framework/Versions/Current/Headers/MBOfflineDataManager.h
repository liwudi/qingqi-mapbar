//
//  MBOfflineData.h
//  iNaviCore
//
//  Created by mapbar on 13-9-12.
//  Copyright (c) 2013年 Mapbar. All rights reserved.
//

#import <Foundation/Foundation.h>

@class MBOfflineRecord;

typedef enum CheckUpdateListState{
    CheckUpdateListState_None,
    CheckUpdateListState_Start,
    CheckUpdateListState_Complete,
    CheckUpdateListState_Error,
}CheckUpdateListState;
@class MBOfflineDataManager;
/**
 *
 *  离线数据管理代理
 */
@protocol MBOfflineDataDelegate <NSObject>
@optional
/**
 *
 *  下载离线数据状态跟踪
 *  @param  record   离线下载记录信息
 *  @return 空
 */
- (void)onGetOfflineDataState:(MBOfflineRecord*)record;
@end

typedef void (^MBDownloadProgressBlock)();
typedef void (^MBOfflineStateBlock)(CheckUpdateListState updateState);

/*    离线数据管理类
 *  
 */
@interface MBOfflineDataManager : NSObject{
    MBDownloadProgressBlock _downloadProgressBlock;
    MBOfflineStateBlock _offlineStateBlock;
}
@property(nonatomic,assign) BOOL isNew;
/**
 *
 *   获取唯一实例
 */
+(instancetype)sharedOfflineDataManager;
/**
 *
 *   代理
 */
@property(nonatomic,assign) id<MBOfflineDataDelegate> delegate;
/**
 *
 *  离线数据信息记录(内部存储MBOfflineRecord)
 */
@property(nonatomic,readonly) NSArray* offlineRecordList;

/**
 *
 *  设置获取离线数据信息json地址
 *  @param  json地址
 *  @return 空
 */
-(void)setUrl:(NSString*)url;

/**
 *
 *  扫描document目录下打包的全国数据包，成功验证后导入供引擎读取
 *  @return 空
 */
-(BOOL)scan;

/**
 *
 *  开始下载离线数据，如果你没有基础数据，会先自动下载基础数据，20s 超时，非长连接
 *  @param  record     待下载的离线数据信息
 *  @return 空
 */
-(void)start:(MBOfflineRecord*)record;

-(void)start:(MBOfflineRecord*)record block:(MBDownloadProgressBlock)block;
/**
 *
 *  暂停离线数据
 *  @param  record     待暂停的离线数据信息
 *  @return 空
 */
-(void)pause:(MBOfflineRecord*)record;

/**
 *
 *  暂停所有下载
 *  @return 空
 */
-(void)pauseAll;

/**
 *
 *  移除离线数据
 *  @param  record     待移除的离线数据信息
 *  @return 空
 */
-(void)remove:(MBOfflineRecord*)record;

/**
 *
 *  获得离线数据的记录信息，即数据下载列表
 *  @param  block 数据的记录信息block(回调)
 *  @return 空
 */
-(void)getOfflineRecordList:(MBOfflineStateBlock)block;
/**
 *  取消获取离线数据的记录信息
 *
 *  @since 5.0.x
 */
-(void)stopGetOfflineRecordList;
@end
