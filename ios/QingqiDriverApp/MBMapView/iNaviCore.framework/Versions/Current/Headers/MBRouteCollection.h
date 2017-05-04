//
//  MBRouteCollection.h
//  iNaviCore
//
//  Created by fanwei on 3/8/13.
//  Copyright (c) 2013 Mapbar. All rights reserved.
//

#import <Foundation/Foundation.h>

@class MBRouteBase;

typedef enum MBOnlineRouteCode
{
    MBOnlineRouteCode_fmtError = 0, // JSON format error
    MBOnlineRouteCode_verError = 1, // JSON format version error
    
    MBOnlineRouteCode_ok = 100,              // No error
    MBOnlineRouteCode_fail = 101,            //
    MBOnlineRouteCode_oriDestFail = 102,     // Fail to set start point or destination
    MBOnlineRouteCode_sysError = 103,        // System error
    MBOnlineRouteCode_noNeedToReroute = 104, // No need to reroute (no nearby road found)
    MBOnlineRouteCode_unsupportedRequestVersion = 105, // The server does not support current request's version.
    MBOnlineRouteCode_max = 0xffffffff
} MBOnlineRouteCode;


/**
 *   路线集合
 */
@interface MBRouteCollection : NSObject<NSCopying ,NSMutableCopying>
/**
 *  初始化
 *  @return self
 */
-(id)init;
/**
 *  路线条数
 */
@property(assign,nonatomic)NSInteger num;
/**
 *  路线
 */
@property(retain,nonatomic)NSMutableArray *routeBases;
/**
 * 清空路线
 */
- (void) removeALL;
/**
 *  加入路线
 *
 *  @param route 路线
 *
 *  @since 4.9.x
 */
-(void) addRoute:(MBRouteBase*) route;
-(BOOL)parseJsonStr:(NSString*)jsonStr withCode:(MBOnlineRouteCode)code;
@end
