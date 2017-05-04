//
//  MBPoiBaseTypes.h
//  iNaviCore
//
//  Created by fanyunlong on 6/1/16.
//  Copyright © 2016 Mapbar. All rights reserved.
//

#ifndef MBPoiBaseTypes_h
#define MBPoiBaseTypes_h

typedef unsigned int MBPoiTypeIndex; /// POI 类型索引（POI 类型 ID），实际上是 POI 类型树中节点的序号。
typedef unsigned int MBPoiType;  /// POI 类型码

/**
 *  搜索类型
 */
typedef enum MBPoiQueryMode {
    MBPoiQueryMode_online,
    MBPoiQueryMode_offline
} MBPoiQueryMode;

#endif /* MBPoiBaseTypes_h */
