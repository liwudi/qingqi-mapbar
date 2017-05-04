//
//  MBPoiTypeManager.h
//  iNaviCore
//
//  Created by fanwei on 1/28/13.
//  Copyright (c) 2013 Mapbar. All rights reserved.
//

#import "MBPoiTypeObject.h"

/**
 *  POI类型管理类
 */
@interface MBPoiTypeManager : NSObject
/**
 *  返回默认的 MBPoiTypeManager,需要先初始化 MBPoiQuery 和 MBWorldManager。
 */
+ (MBPoiTypeManager *)defaultPoiTypeManager;
/**
 *  返回表示"周边快捷类型"的POI类型对象，即，整个POI类型树的根节点
 *  @return POI类型树的根节点对象
 */
- (MBPoiTypeObject *)rootPoiTypeObject;
/**
 *  返回表示"周边更多类型"的POI类型对象
 *  @return POI类型对象
 */
- (MBPoiTypeObject *)rootKeyQueryPoiTypeObject;
/**
 *  返回表示"周边快捷类型"的POI类型索引值，即，整个POI类型树的根节点
 *  @return POI类型树的根节点ID
 */
- (MBPoiTypeIndex) getRoot;
/**
 *  获取POI类型树中指定节点的第一个子节点Id
 *  @param  index    指定POI节点ID
 *  @return 第一个子节点ID
 */
- (MBPoiTypeIndex) getFirstChildId:(MBPoiTypeIndex)index;
/**
 *  获取类型树中指定节点的下一个兄弟节点
 *  @param  index    指定POI节点ID
 *  @return 兄弟节点ID
 */
- (MBPoiTypeIndex) getNextSibling:(MBPoiTypeIndex)index;
/**
 *  获取POI类型树中指定节点的父节点
 *  @param  index    指定POI节点ID
 *  @return 父节点ID
 */
- (MBPoiTypeIndex) getParent:(MBPoiTypeIndex)index;
/**
 *  获取POI类型树中的节点总数
 *  @return 获取到无效结果，则返回-1
 */
- (NSInteger) getObjectNumber;
/**
 *  返回POI类型树中具有指定名称的节点ID，由于不同数据中的类型名称会有所差异，所以最好不要使用这个方法
 *  @param  name        类型名称
 *  @return POI类型ID
 */
- (MBPoiTypeIndex) getIndexByName:(NSString *)name;
/**
 *  返回表示"周边更多类型"的POI类型索引
 *  @return POI类型索引
 */
- (MBPoiTypeIndex) getKeyQueryTypeRoot;
/**
 *  获取指定的POI类型码在类型树"周边更多类型"节点之下对应的节点索引
 *  @param  type 指定的POI类型码
 *  @return POI类型索引
 */
- (MBPoiTypeIndex) getIndexByType:(MBPoiType)type;
/**
 *  获取指定 POI 类型码对应的类型名称
 *
 *  @param typeCode MBPoiType
 *
 *  @return POI类型名称
 */
- (NSString *) getTypeName:(MBPoiType)typeCode;
/**
 *  获取 POI 类型树中指定节点所包含的 POI 类型码
 *
 *  @param index POI类型索引
 *
 *  @return MBPoiType
 */
- (NSArray *) getNaviInfoIds:(MBPoiTypeIndex)index;
/**
 *  根据 MBPoiTypeIndex 得到当前 MBPoiType 下的子节点
 *
 *  @param index 当前 MBPoiType 的 index
 *
 *  @return <MBPoiTypeObject>
 */
- (NSArray*) getChildNodes:(MBPoiTypeIndex)index;
@end
