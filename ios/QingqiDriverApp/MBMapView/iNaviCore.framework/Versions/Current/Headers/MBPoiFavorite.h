//
//  MBPoiFavorite.h
//  iNaviCore
//
//  Created by fanwei on 2/4/13.
//  Copyright (c) 2013 Mapbar. All rights reserved.
//

#import "MBObject.h"
#import "MBPoiBaseTypes.h"

/**
 *  POI点信息
 */
@interface MBPoiFavorite : MBObject < NSCoding >

/**
 *  POI 的唯一id
 *
 *  @since 5.0.x
 */
@property (nonatomic, assign) NSInteger poiId;

/**
 *  POI 的类型码。0 表示该 MBPoiFavorite 无效，还有一种情况：客户端用 MBPoiFavorite 来存储路线详情时 type 也为 0
 */
@property (nonatomic, assign) MBPoiType type;

/**
 *  POI导航点坐标
 */
@property (nonatomic, assign) MBPoint pos;

/**
 *  POI显示点坐标，有可能与导航点坐标一致，也可能不一致。
 */
@property(nonatomic,assign) MBPoint displayPos;

/**
 *   POI名称
 */
@property (nonatomic, retain) NSString *name;

/**
 *  POI地址
 */
@property (nonatomic, retain) NSString *address;

/**
 *  POI电话
 */
@property (nonatomic, retain) NSString *phoneNumber;

/**
 *  POI所在地区名
 */
@property (nonatomic, retain) NSString *regionName;
/**
 *  POI 类型名称
 */
@property(nonatomic,retain) NSString* typeName;
/**
 *  距离
 */
@property (nonatomic, assign) NSInteger distance;
/**
 *  导航一号使用
 */
@property(nonatomic,copy) NSString* pid;
/**
 *  展示名称
 */
@property(nonatomic,copy) NSString* displayName;

///////////////////////////////////////////////////
// add for MBCloud 导航一号
///////////////////////////////////////////////////
/**
 *  导航一号使用
 */
@property(nonatomic,copy) NSString* uid;
/**
 *  导航一号使用
 */
@property(nonatomic,assign) NSInteger editMode;
/**
 *  导航一号使用
 */
@property(nonatomic,assign)NSInteger index;
/**
 *  收藏时间
 */
@property(nonatomic,assign)NSTimeInterval useTime;
/**
 *  判断两个 POI 是否相等，判断依据即坐标是否相等
 *
 *  @param object MBPoiFavorite
 *
 *  @return 相等 YES，否则 NO
 */
-(BOOL)isEqual:(id)object;
/**
 *  判断当前 POI 是否有效，判断依据坐标是否为{0,0}
 *
 *  @return 有效 YES, 否则 NO
 */
-(BOOL)isValidate;
/**
 *  当前 POI 重置，重置后所有属性为 0 或者 nil
 */
-(void)reset;
/**
 *  转化成 poiObject 相等的 POI
 *
 *  @param poiObject 指定 POI
 */
-(void)updateFromPoiObject:(MBPoiFavorite *)poiObject;
/**
 *  复制自身 POI
 *
 *  @return 返回想通的 POI 对象
 */
-(MBPoiFavorite *)clone;
/**
 *  POI拷贝
 *
 *  @param poiObject 传入一个实例化的指针，作为返回后的拷贝对象。
 *
 *  @since 4.10.x
 */
-(void)copyToPoiObject:(MBPoiFavorite *)poiObject;

@end
