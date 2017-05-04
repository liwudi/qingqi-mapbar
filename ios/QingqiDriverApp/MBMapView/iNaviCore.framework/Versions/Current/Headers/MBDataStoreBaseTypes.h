//
//  MBDataStoreBaseTypes.h
//  iNaviCore
//
//  Created by fanyunlong on 6/1/16.
//  Copyright © 2016 Mapbar. All rights reserved.
//

#ifndef MBDataStoreBaseTypes_h
#define MBDataStoreBaseTypes_h

/**
 下载状态
 */
typedef enum MBDownloadState{
    MBDownloadState_None,//最初状态
    MBDownloadState_Error,
    MBDownloadState_Start,
    MBDownloadState_Pause,
    MBDownloadState_Downloading,
    MBDownloadState_Complete,
    MBDownloadState_Applying,
    MBDownloadState_Applied,
    MBDownloadState_ApplyFailed
}MBDownloadState;

#endif /* MBDataStoreBaseTypes_h */
