//
//  MBWorldManager.h
//  iNaviCore
//
//  Created by fanwei on 1/10/13.
//  Copyright (c) 2013 Mapbar. All rights reserved.
//

#import "MBNaviCoreBase.h"
#import "MBWmrBaseTypes.h"

@class MBWmrNode;
@class MBAdminBorder;

/**
 *  区域级别
 */
typedef enum MBDistrictLevel
{
    MBDistrictLevel_province = 1 << 0,
    MBDistrictLevel_city = 1 << 1,
    MBDistrictLevel_village = 1 << 2,
    MBDistrictLevel_pedAdmin = 1 << 3,
    MBDistrictLevel_all = 0xFF
} MBDistrictLevel;

/**
 *  城市管理单例，在使用前请初始化 MBEngine 基础类，详情参见 [MBEngine](#)
 */
@interface MBWorldManager : NSObject
/**
 *  Returns the shared world manager.
 *
 *  @return shared world manager
 *
 *  @since 4.9.x
 */
+(instancetype)sharedInstance;
/**
 *  城市管理单例销毁
 *
 *  @since 5.0.x
 */
+(void)cleanup;
/**
 *
 *  获取根节点对象ID，功能类似 4.10.x 中的 - (MBWmrNode *)rootWmrNode (从5.0.x之后删除)， 但是只得到根节点ID。
 *  @return 根节点ID
 */
- (MBWmrObjId) getRoot;

/**
 *  根据行政编码返回当前行政区划ID
 *
 *  @param  adminCode 行政编码
 *  @return 行政区划ID
 */
-(MBWmrObjId)getIdByAdminCode:(MBAdminCode)adminCode;

/**
 *  根据行政区划ID返回行政编码
 *
 *  @param  nodeId 行政区划ID
 *  @return 行政编码
 */
-(MBAdminCode)getAdminCodeByNodeId:(MBWmrObjId)nodeId;
/**
 *  根据节点ID，获得该节点MBWmrNode对象
 *
 *  @param nodeId 节点ID
 *
 *  @return MBWmrNode对象
 *
 *  @since 4.9.x
 */
- (MBWmrNode *) getNodeById:(MBWmrObjId)nodeId;

/**
 *
 *  根据节点ID，获得该节点下的全部Child对象
 *  @param  nodeId 节点ID
 *  @return NSArray [MBWmrNode](#) 对象
 */
- (NSArray*) getChildNodes:(MBWmrObjId)nodeId;
/**
 *  根据指定的经纬度坐标返回其所在的完整行政区划名称
 *
 *  @param pt    指定的经纬度坐标
 *  @param level 要获取得到的行政区区划级别。比如：3： 省一级，如：“安徽”，“北京市”；2：地级市一级，如：“安徽滁州市”，“北京市”；1：区县一级，如：“安徽滁州市凤阳县”，“北京市西城区”
 *
 *  @return 得到的行政区划名称
 *
 *  @since 4.9.x
 */
- (NSString*)getCompleteRegionName:(MBPoint)point level:(NSUInteger)level;
/**
 *  根据指定的经纬度坐标返回其所在的行政区划名称
 *	@param point 指定的经纬度坐标。
 *	@param level 要获取到的行政区划级别。
 *  ilevel = MBDistrictLevel_province: 省一级，如:"安徽", "北京市"
 *  ilevel = MBDistrictLevel_city: 地级市一级，如:"滁州市", "西城区"
 *  ilevel = MBDistrictLevel_village: 区县一级，如 "凤阳县", ""
 *  ilevel = MBDistrictLevel_province | MBDistrictLevel_city: 如"安徽滁州" "北京西城区"
 *  ilevel = MBDistrictLevel_city | MBDistrictLevel_village：如"滁州市凤阳县" "西城区"
 *  ilevel = MBDistrictLevel_province | MBDistrictLevel_village：如"安徽省 凤阳县"
 *  ilevel = MBDistrictLevel_province | MBDistrictLevel_city | MBDistrictLevel_village：如"安徽滁州市凤阳县" "北京市西城区"
 *
 * @return 行政区划名称
 */
-(NSString*)getRegionNameByPosition:(MBPoint)point level:(MBDistrictLevel)level;
/**
 *
 * 根据指定的位置，返回该位置所属城市结点信息，该接口的调用需要完整的 base.dat 资源
 * @param   pt 指定位置的经纬度坐标
 * @return  所属城市结点信息
 */
-(MBWmrNode *)getNodeByPosition:(MBPoint)pt;
/**
 *  根据指定的位置，返回该位置所属的城市Id，该接口的调用需要完整的 base.dat 资源
 *
 *  @param point 坐标
 *
 *  @return 城市id
 */
-(MBWmrObjId)getIdByPosition:(MBPoint)point;
/**
 *  根据经纬度坐标获取指定城市的ID，此处获取的ID是带有PED文件的ID，一般来说是城市、直辖市以及特别行政区的ID，一般使用 [getIdByPosition:](#)
 *
 *  @param point 坐标
 *
 *  @return 城市id
 */
-(MBWmrObjId)getPedIdByPosition:(MBPoint)point;
/**
 *  根据指定的ID，返回其对应的不带扩展名的数据文件路径
 *          使用数据文件时，尽量用本函数来构造数据文件名，而不要在代码中写死。
 *          对于纯国内数据，id 为 0 时得到的结果是：L"china/china"，
 *          id 为 1 时得到：L"china/0beijing/0beijing"
 *          对于躲过数据，如当前国家为印度，id 为 0 时得到的结果将会是：L"in/india/india"。
 *
 *  @param nodeId 指定的行政区划节点ID
 *
 *  @return 不带扩展名的文件路径
 *
 *  @since 4.9.x
 */
-(NSString*)getDataFileWithoutExt:(MBWmrObjId)nodeId;

/**
 *  分省数据时，根据ID判断对应省份的数据是否已经下载了
 *  @param  nodeId 省ID
 *  @return 如果已经存在则返回true，否则返回false
 */
-(BOOL)dataExist:(MBWmrObjId)nodeId;

/**
 *  是否包含全国节点，若包含则返回全国节点有效id，否则返回无效id
 *  @return 如果存在，返回全国节点Id，如果不存在，返回无效Id
 */
-(MBWmrObjId) get0achinaNode;

/**
 *
 *  根据关键字或拼音查询相关的城市Id
 *  @param  nodeId		搜索范围Id，最大为全国，即根节点Id
 *  @param  kwandPY	所要查询城市的关键字或拼音
 *  @param  maxNum	最大查找结果数
 *  @return	返回所有匹配的结果Id集合
 */
-(NSArray*)getIdByKeywordOrPY:(MBWmrObjId)nodeId kwandPY:(NSString*)kwandPY maxNum:(NSUInteger)maxNum;

/**
 *
 *  根据行政区划编码字符串获取行政区划Id
 *  @param  adminCode	行政区划编码字符串
 *  @return	行政区划Id
 */
-(MBWmrObjId)getIdByAdminCodeStr:(NSString*)adminCode;
/**
 *  获取指定id的行政区划的多边形边界点坐标
 *
 *  @param nodeId 行政区划id
 *
 *  @return 若给定的id无效则不对[MBAdminBorder](#)进行操作，若有效返回 [MBAdminBorder](#) 结构指针。
 *
 *  @since 4.9.x
 */
-(MBAdminBorder*)getBorderById:(MBWmrObjId)nodeId;

/**
 *
 *  获取当前对象下一个兄弟节点的Id
 *  @param nodeId 行政区划id
 *  @return 兄弟节点Id
 *  @since 5.0
 */
- (MBWmrObjId) getNextSiblingId:(MBWmrObjId)nodeId;

/**
 *  获取当前对象第一个子节点ID
 *
 *  @param nodeId 兄弟节点Id
 *
 *  @return 第一个子节点ID
 *
 *  @since 4.9.x
 */
- (MBWmrObjId) getFirstChildId:(MBWmrObjId)nodeId;

/**
 *  获取当前对象的父亲节点ID
 *  @param nodeId 兄弟节点Id
 *  @return 父亲节点ID
 *  @since 5.0
 */
- (MBWmrObjId) getParentId:(MBWmrObjId)nodeId;

/**
 *
 *  获取当前对象子节点总数
 *  @param nodeId 行政区划id
 *  @return 子节点总数
 *  @since 5.0
 */
- (NSInteger) getChildrenNumber:(MBWmrObjId)nodeId;
/**
 *  该方法屏蔽了三级行政区域，如：“河南省郑州市金水区”中的“金水区”将无法获得，其他与[getNodeById:](#)方法功能一样
 *
 *  @param nodeId 城市Id
 *
 *  @return 城市节点
 */
- (MBWmrNode *) getNodeByIdWithoutThirdLevel:(MBWmrObjId)nodeId;
@end

