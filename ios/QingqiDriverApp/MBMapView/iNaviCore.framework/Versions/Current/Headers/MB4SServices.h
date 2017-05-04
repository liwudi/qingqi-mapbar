//
//  MB4SServices.h
//  iNaviCore
//
//  Created by fanyl on 14-5-4.
//  Copyright (c) 2014年 Mapbar. All rights reserved.
//

#import <Foundation/Foundation.h>

#import "MBNaviCoreBase.h"
#import "MBWmrBaseTypes.h"// For MBWmrObjId type

@class MB4SObject;

/**
 * 4S店排序规则
 */
typedef enum MBSortRule
{
	MBSortRule_byDistance = 0,	/// 根据当前车的距离远近排序
	MBSortRule_byKeywordScore = 1	/// 你搜的关键词和搜索到的结果间的相关性
}MBSortRule;

/**
 *  4S店搜索功能模块。
    _此模块需要使用额外的资源文件。打包在base.dat中。_
 */
@interface MB4SServices : NSObject
/**
 * 模块初始化，失败返回 nil，清理方法 [MB4SServices cleanup](#)
 */
+(void)construct;
/**
 * 模块资源清理，构建方法 [MB4SServices construct](#)
 */
+(void)cleanup;
/**
 *  返回当前车类型个数
 *
 *  @return 车类型个数
 *
 *  @since 4.9.x
 */
+(NSInteger)getCarTypeNum;
/**
 *  @brief  根据索引查找指定类型名称，如果名称不存在，或者索引不是有效值将返回null
 *
 *  @param index 车类型索引
 *
 *  @return 车类型名称字符串
 *
 *  @since 4.9.x
 */
+(NSString*)getCarTypeByIndex:(int)index;
/**
 * 根据车类型名称和品牌名称首字母搜索指定的品牌名称
 * @param carTypeName	车类型名称
 * @param initials		品牌名称首字母，<font color="red">_如果需要所有的车类型名称所对应的品牌个数，则此参数应该传 null _</font>
 * @return	品牌个数
 * @since 4.9.x
 */
+(NSInteger)queryCarBrands:(NSString*)carTypeName initials:(NSString*)initials;
/**
 * 根据车品牌名称索引获取品牌名称，相关函数参考 [queryCarBrands:initials:](#)
 * @param carBrandIndex	品牌名称索引
 * @return	品牌名称
 * @since 4.9.x
 */
+(NSString*)getCarBrandByIndex:(int)carBrandIndex;
/**
 * 按照指定类型排序结果
 * 注意：此方法仅在有返回结果后调用有效。
 * @param sortRule	排序类型 [MBSortRule](#)
 */
+(void)setSortRule:(MBSortRule)sortRule;
/**
 * 根据关键字搜索车所在位置附近的4S店
 * @param carPos	车所在位置
 * @param wmrNodeId	所在城市及区县Id，如果输入城市以上级别id将没有结果，一般是通过  [MBWorldManager](#)相关方法获取的
 * @param type		车类型
 * @param brand		搜索的汽车品牌名称
 * @param keywords	搜索的关键字，关键字可以为空
 * @since 4.9.x
 */
+(BOOL)queryWithPoint:(MBPoint)carPos wmrNodeId:(MBWmrObjId)wmrNodeId type:(NSString*)type brand:(NSString*)brand keywords:(NSString*)keywords;
/**
 *  根据当前位置，城市 Id，品牌查询，如果没有选择车辆类型过滤结果，你应该调用这个接口代替 [queryWithPoint: wmrNodeId:type:brand:keywords:](#);
 *
 *  @param carPos 当前位置
 *  @param wmrId  城市 Id
 *  @param brand  车辆品牌
 *
 *  @return 是否查询成功
 */
+(BOOL)queryByBrandAndWmrId:(MBPoint)carPos wmrNodeId:(int)wmrId brand:(NSString*)brand;
/**
 * 获取搜索结果数
 * @return	搜索结果数量
 * @since 4.9.x
 */
+(NSInteger)getResultRecordsNum;
/**
 *  根据索引得到查询结果对象
 *
 *  @param index 索引
 *
 *  @return 4S结果对象
 */
+(MB4SObject*)getResultRecordByIndex:(int)index;
/**
 * 根据品牌名称返回品牌名称所在索引位置
 * @param carBrandName	品牌名称
 * @return	品牌名称对应的在表中的索引位置，如果获取失败则返回无效索引
 */
+(NSInteger)getCarBrandIndex:(NSString*)carBrandName;
/**
 *  从商标集合中得到商标索引
 *
 *  @param brandIndexInWholeSet 商标集合
 *
 *  @return 商标索引
 */
+(NSInteger)getCarBrandSubSetIndex:(int)brandIndexInWholeSet;
/**
 *  设置搜索距离限制
 *
 *  @param distanceLimit 距离限制
 */
+(void)setSearchAroundDis:(unsigned int)distanceLimit;

@end
