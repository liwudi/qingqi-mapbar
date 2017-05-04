//
//  MBPoiQuery.h
//  iNaviCore
//
//  Created by fanwei on 1/25/13.
//  Copyright (c) 2013 Mapbar. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <CoreLocation/CoreLocation.h>

#import "MBWmrBaseTypes.h"
#import "MBPoiBaseTypes.h"

@class MBPoiFavorite;
@class MBPoiQueryParams;

#import "MBSideInfo.h"
#import "MBEngine.h"

/**
 *  关键字分类
 */
typedef enum MBKeywordClass{
    MBKeywordClass_normal,
    MBKeywordClass_nearby
} MBKeywordClass;
/**
 *  搜索Host类型
 */
typedef enum MBPoiQueryHostType
{
	MBPoiQueryHostType_query = 1,					/// 在线关键字搜索Host
	MBPoiQueryHostType_nearby = 2,				/// 周边搜索Host
	MBPoiQueryHostType_alongRoute = 3				/// 沿路搜索Host
} MBPoiQueryHostType;


/**
 *   POI搜索代理类
 */
@protocol MBPoiQueryDelegate;

/**
 *   POI搜索类
 */
@interface MBPoiQuery : NSObject
/**
 *  授权状态
 */
@property(nonatomic, readonly) MBSdkAuthError authErrorType;
/**
 *  接收者的委托。
 *  当查询在线POI数据或部分离线数据功能,需要实现MBPoiQueryDelegate协议中的方法。
 */
@property(nonatomic, assign) id<MBPoiQueryDelegate> delegate;
/**
 *  获取搜索的单例对象
 *  @return MBPoiQuery 对象
 */
+(instancetype)sharedInstance;
/**
 *  搜索模块销毁
 *
 *  @since 5.0.x
 */
+(void)cleanup;
/**
 * 设置搜索参数，这里注意 MBNaviSession 初始化设置 MBNaviSessionParams 时也会设置，以最后一次设置为准。之前的设置会被最后一次覆盖。
 */
@property(nonatomic,retain)MBPoiQueryParams* params;
/**
 *  切换在线、离线搜索模式。一旦切换，现有结果会清空。需要重新搜索。
 *
 *  @param mode 模式 [MBPoiQueryMode](#)
 *
 *  @since 4.9.x
 */
- (void) setMode:(MBPoiQueryMode)mode;

/**
 *  获取当前的搜索模式：在线、离线
 */
- (MBPoiQueryMode) getMode;

/**
 *  返回是否还有下一页
 *  @return 如果有下一页则返回YES，没有下一页返回NO
 */
- (BOOL) hasNextPage;

/**
 *  通过回调的形式，下载下一页。下载完成后，返回 PoiQueryEvent_pageLoaded 消息
 *  @return 空
 */
- (void) loadNextPage;

/**
 *  通过回调的形式，加载上一页。加载完成后，返回 PoiQueryEvent_pageLoaded 消息
 *  @return 空
 */
- (void) loadPreviousPage;

/**
 *  获取当前页第一个元素在搜索结果中的下标
 *  @return 返回当前页第一个元素在搜索结果中的下标
 */
- (NSInteger) getCurrentPageFirstResultIndex;

/**
 *  获取当前页最后一个元素在搜索结果中的下标
 */
- (NSInteger) getCurrentPageLastResultIndex;

/**
 *  获取当前结果页的页码
 *  @return 返回当前结果页的页码
 */
- (NSInteger) getCurrentPageIndex;

/**
 *  获取总页码
 */
- (NSInteger) totalPageCount;

/**
 *
 *  返回总结果数。可能还需要用loadNextPage()加载
 *  @return 结果总数
 */
- (NSInteger) getTotalResultNumber;

/**
 *  取消当前搜索，在线模式有效
 *  @return 空
 */
- (void) cancel;

/**
 *  为关键字/首字母/地址/交叉路口/公交车站搜索设置当前城市
 *  @param  wmrId 城市树中节点id
 *  @return 空
 */
- (void) setWmrId:(MBWmrObjId)wmrId;

/**
 *  获取当前城市ID
 *  @return 空
 */
- (MBWmrObjId) getWmrId;

/**
 *  关键字搜索
 *  @param  keyword 搜索关键字
 *  @param  pos  搜索中心点，用于计算到POI的距离
 *  @return 空
 *   
 */
- (void) queryByKeyword:(NSString *)keyword center:(MBPoint)pos;

/**
 *
 *  周边关键字搜索，这是个有些争议的功能，建议尽量避免或很少使用
 *  @param  keyword 搜索关键字
 *  @param  pos  搜索中心点，用于计算到POI的距离
 *  @return 空
 *
 */
- (void) queryNearbyKeyword:(NSString *)keyword center:(MBPoint)pos;

/**
 *
 *  文本搜索，支持汉子关键字和拼音首字母搜索
 *  @param  text 搜索文本
 *  @param  pos  搜索中心点，用于计算到POI的距离
 *  @param  nearby  是否是周边搜索
 *  @return 空
 */
- (void) queryText:(NSString*)text center:(MBPoint)pos isNearby:(BOOL) nearby;

/**
 *
 *  周边类型搜索
 *  @param  pos  搜索中心点，用于计算到POI的距离
 *  @param  index   POI 类型索引（POI 类型 ID），实际上是 POI 类型树中节点的序号
 *  @return 空
 */
- (void) queryNearbyCenter:(MBPoint)pos poiTypeIndex:(MBPoiTypeIndex)index;


/**
 *
 *  用类型码数组来做周边类型搜索
 *  @param  center  搜索中心点，用于计算到POI的距离
 *  @param  types   MBPoiTypeIndex 索引数组
 *  @param  len     MBPoiTypeIndex 索引数组个数
 */
-(void)queryNearbyByPoiTypes:(MBPoint)center poiTypeIndexs:(MBPoiTypeIndex*)types length:(NSInteger)len;

/**
 *
 *  清除现在的搜索结果
 *  @return 空
 */
- (void) clearResult;

/**
 *
 *  根据经纬度坐标生成一个 POI(注：离线函数) 在传入的坐标点位置做一个周边搜索（排除停车场、公共厕所、车站、高速出入口、收费站、ATM/自助银行、其他加油站、中国石油、中国石化、壳牌、美孚、BP等类型）；如果搜索到最近的 POI 离 @p pos 的距离小于等于 10，则直接返回此 POI
 如果搜索到最近的 POI 里 @p pos 的距离大于 10，则将该 POI 的地址修改为行政区划名称，并在名称后加上“附近”，然后返回
 如果没有搜索到 POI，则返回一个名称为“未知地点”，地址为行政区划名称的 POI
 *  @param  pos 经纬度坐标
 *  @return MBPoiFavorite POI点
 */
- (MBPoiFavorite *) getPoiFavoriteByPosition:(MBPoint)pos;


/**
 *
 *  检测关键字分类
 *  @param  keyword         检测的关键字
 *  @return KeywordClass    关键字的类别
 *  普通关键字建议使用 [MBQuery queryByKeyword:center:](#) 做搜索
    周边关键字建议使用 [MBQuery queryNearbyKeyword:center:](#) 做搜索
 *  
 */
- (MBKeywordClass) classifyKeyword:(NSString *) keyword;
/**
 *
 *  通过拼音首字母进行检索，仅用于离线搜索
 *  @param  keyword     搜索关键词的拼音首字母
 *  @param  pos         搜索中心点，用于计算到POI的距离
 *  @return 空
 */
- (void) queryByInitial:(NSString *)keyword center:(MBPoint)pos;

/**
 *
 *  地址搜索
 *  @param  keyword     地址
 *  @param  pos      搜索中心点，用于计算到POI的距离
 *  @return 空
 */
- (void) queryByAddress:(NSString *)keyword center:(MBPoint)pos;

/**
 *
 *  交叉路口搜索
 *  @param  keyword     搜索关键词的拼音首字母
 *  @param  pos      搜索中心点，用于计算到POI的距离
 *  @return 空
 */
- (BOOL) queryCrossRoads:(NSString *)keyword center:(MBPoint)pos;

/**
 *
 *  公交站点搜索
 *  @param  keyword     搜索关键词的拼音首字母
 *  @param  pos      搜索中心点，用于计算到POI的距离
 */
- (BOOL) queryBusStations:(NSString *)keyword center:(MBPoint)pos;

/**
 *  @return 已经加载的结果数
 */
- (NSInteger) getResultNumber;

/**
 *
 *  将搜索结果按距离排序
 *  @return 空
 */
- (void) sortByDistance;

/**
 *
 *  将搜索结果按默认(如关键字搜索按相关度)排序
 *  @return 空
 */
- (void) sortByDefault;

/**
 *
 *  初始化联想字和拼音数据
 *  @return 空
 */
- (void) initRwdPyData;

/**
 *
 *  清除联想字和拼音数据
 *  @return 空
 */
- (void) cleanupRwdPyData;

/**
 *  沿路搜索,路线为当前导航引擎所采纳的路线，所以此方法必须在已经开始导航的情况下使用
 *
 *  @param poiTypeIndex 搜索类型
 *  @param carPos       当前位置
 */
-(void)queryByRouteWithPoiType:(MBPoiTypeIndex)poiTypeIndex carPoint:(MBPoint)carPos;
/**
 *  设置搜索相关服务的Host地址[在线]
 *
 *  @param type 搜索相关服务类型
 *  @param hostUrl URL
 */
-(void)setHostUrl:(MBPoiQueryHostType)type hostUrl:(NSString*)hostUrl;
/**
 *  获取搜索相关服务的Host地址[在线]
 *
 *  @param type 搜索相关服务类型
 *
 *  @return Host URL
 */
-(NSString*)getHostUrl:(MBPoiQueryHostType)type;
/**
 *  获取搜索到的指定索引POI所在位置相对路线的关系信息[离线]，沿路搜索时获取POI相对于路线的左右侧信息及沿路的距离
 *
 *  @param index poi索引
 *
 *  @return 指定对象所在的位置信息
 */
-(MBSideInfo*)getResultRoutePosition:(int)index;
/**
 *  将结果以POI的形式返回[在线&离线]
 *
 *  @param index poi索引
 *
 *  @return 搜索点。
 */
-(MBPoiFavorite*)getResultAsPoiFavoriteInfo:(int)index;
/**
 *  设置全国范围搜索[在线]
 */
-(void)setWmrNationWide;
@end

/**
 *
 *   POI搜索代理类
 *
 */
@protocol MBPoiQueryDelegate <NSObject>

@optional

/**
 *  poi搜索开始
 */
- (void) poiQueryStart;

/**
 *  poi搜索失败
 */
- (void) poiQueryFailed;

/**
 *  poi搜索没有结果
 */
- (void) poiQueryNoResult;

/**
 *  搜索分页结果回调
 *  @param  result    poi搜索结果 [MBPoiFavorite](#)
 */
- (void)poiQueryResultByPage:(NSArray *)result;
@end
