//
//  MBWmrNode.h
//  iNaviCore
//
//  Created by fanwei on 1/10/13.
//  Copyright (c) 2013 Mapbar. All rights reserved.
//

#import "MBObject.h"
#import "MBWmrBaseTypes.h"

/**
 *   Wmr结点信息，该对象一般不直接构造，而是通过 MBWorldManager 间接得到
 */
@interface MBWmrNode : MBObject
/**
 *    当前节点id
 */
@property (nonatomic,readonly) MBWmrObjId nodeId;
/**
 *   当前行政区划的级别， 0 是全国级，1 是省/直辖市/自治区级， 2 是地市级， 3 是地级市下的区，如:河南省郑州市金水区
 */
@property (nonatomic,readonly) NSUInteger level;
/**
 *  行政区划区域包络盒
 */
@property (nonatomic,readonly) MBRect area;
/**
 *  行政区划的行政中心地理经纬度坐标
 */
@property (nonatomic,readonly) MBPoint pos;
/**
 *  行政区划汉语名称
 */
@property (nonatomic,readonly) NSString *chsName;
/**
 *  行政区划所在路径
 */
@property (nonatomic,readonly) NSString *directoryName;
/**
 *  行政编码
 */
@property (nonatomic,readonly) NSString* adminCode;
/**
 *  -1表示新版wmrObj无效的偏移量
 */
@property (nonatomic,readonly) int borderOffset;
/**
 *  虚拟节点
 */
@property (nonatomic,readonly) BOOL isVirtualObj;
/**
 *  该节点是否包含搜索文件(ped)
 */
@property (nonatomic,readonly) BOOL hasPed;
/**
 *  该节点是否包含显示数据(evf or pvf)
 */
@property (nonatomic,readonly) BOOL hasEvf;
/**
 *
 *  初始化MBWmrNode对象
 *  @param  nodeId 节点id
 */
- (id) initWithNodeId:(MBWmrObjId)nodeId;
/**
 *  DEPRECATED  since 5.0! 获取当前对象下一个兄弟节点的Id，使用 [MBWorldManager getChildNodes](#) 代替
 *  @return 兄弟节点Id
 */
- (MBWmrObjId) getNextSiblingId;
/**
 *  DEPRECATED since 5.0! 获取当前对象第一个子节点Id，使用 [MBWorldManager getFirstChildId](#) 代替
 *  @return 第一个子节点Id
 */
- (MBWmrObjId) getFirstChildId;
/**
 *  DEPRECATED since 5.0! 获取当前对象的父亲节点Id，使用 [MBWorldManager getParentId](#) 代替
 *  @return 父亲节点Id
 */
- (MBWmrObjId) getParentId;
/**
 *
 *  DEPRECATED since 5.0! 获取当前对象子节点总数，使用 [MBWorldManager getChildrenNumber](#) 代替
 *  @return 子节点总数
 */
- (NSInteger) getChildrenNumber;
@end
