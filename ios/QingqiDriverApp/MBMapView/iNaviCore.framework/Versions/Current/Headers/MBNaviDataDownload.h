//
//  MBNaviDataDownload.h
//  iNaviCore
//
//  Created by fanyl on 14-8-8.
//  Copyright (c) 2014年 Mapbar. All rights reserved.
//

#import "MBObject.h"
#import "MBDataStoreBaseTypes.h"

/**
 *  数据实体对象 MBNaviDataEntity 所包含的下载项目，该对象支持归档，不支持拷贝
 */
@interface MBNaviDataDownload : MBObject <NSCoding>
{
    @package
    NSFileHandle* _fileHandle;
    unsigned long long _currentSize;
    id _entity;
}
/**
 *  对应资源的URL
 */
@property(nonatomic,retain) NSString* url;
/**
 *  客户端应该把数据下载到 tempPath 指定的路径,下面一个属性 [localPath](#) 无需关心
 */
@property(nonatomic,retain) NSString* tempPath;
/**
 *  Apply 之后的路径
 */
@property(nonatomic,retain) NSString* localPath;
/**
 *  文件加密
 */
@property(nonatomic,retain) NSString* md5;
@property(nonatomic,retain) NSString* tags;
/**
 *  文件大小
 */
@property(nonatomic,assign) NSInteger size;
/**
 *  下载状态
 */
@property(nonatomic,assign) MBDownloadState state;
/**
 *  下载进度
 */
@property(nonatomic,assign) NSInteger progress;
@end
