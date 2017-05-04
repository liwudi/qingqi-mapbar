//
//  MBOfflineRecord.h
//  iNaviCore
//
//  Created by mapbar on 13-9-12.
//  Copyright (c) 2013年 Mapbar. All rights reserved.
//

#import <Foundation/Foundation.h>
/**
 *  下载状态
 */
typedef enum DownloadState{
    DownloadState_None,
    DownloadState_Error,
    DownloadState_UnZip,
    DownloadState_Start,
    DownloadState_Pause,
    DownloadState_Downloading,
    DownloadState_Complete,
    DownloadState_UnZipError
}DownloadState;
/**
 *  数据类型
 */
typedef enum DataType{
    DataType_None=0,
    DataType_Vip,
    DataType_Normal,
    DataType_Camera,
    DataType_Base
}DataType;

/** 
 *
 *  离线下载记录（下载的文件，大小进度等）
 *  
 */
@interface MBOfflineRecord : NSObject<NSCoding>{
@package
    NSString* _url;
    NSString* _md5s;
    NSString* _fileName;
    long long _downloadSize;//已经下载的
    NSFileHandle* _fileHandle;
}
/**
 *  数据版本
 *
 *  @since 5.0.x
 */
@property(nonatomic,retain) NSString* version;
/**
 *  已经下载的数据
 *
 *  @since 4.9.x
 */
@property(nonatomic,getter = getDownloadSize) long long downloadSize;
/**
 *  数据唯一标示
 */
@property(nonatomic,retain)NSString* dataId;
/**
 *  名字
 */
@property(nonatomic,retain) NSString* name;
/**
 *  文件大小
 */
@property(nonatomic,assign) long long fileSize;
/**
 *  下载状态
 */
@property(atomic,assign) DownloadState download;
/**
 *  是否更新
 */
@property(nonatomic,assign) BOOL isUpdate;
/**
 *  下载进度
 */
@property(atomic,assign) long long progress;
/**
 *  子节点
 */
@property(nonatomic,retain)NSArray * childNodes;
/**
 *  数据类型
 */
@property(nonatomic,assign) DataType type;
/**
 *  带宽(每秒的字节数)
 */
//@property(nonatomic,assign) unsigned long bandwidthUsedPerSecond;
@end
