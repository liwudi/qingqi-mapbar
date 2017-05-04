//
//  MBNaviCoreBase.h
//  iNaviCore
//
//  Created by fanyunlong on 10/23/15.
//  Copyright © 2015 Mapbar. All rights reserved.
//

/**
 *  iNaviCore common types
 *
 *  @since 5.0.x
 */

#ifndef MBNaviCoreBase_h
#define MBNaviCoreBase_h

#ifdef NAVICORE_USED

typedef struct cqPoint MBPoint;
typedef struct cqRect MBRect;
typedef struct cqRange MBRange;

#else

/**
 *  Point type
 *
 *  @since 4.9.x
 */
typedef struct MBPoint
{
    int x;
    int y;
} MBPoint;

/**
 *  Rectangular type
 *
 *  @since 4.9.x
 */
typedef struct MBRect
{
    int left;
    int top;
    int right;
    int bottom;
} MBRect;

/**
 *  Range type, differ from NSRange in Apple API
 *
 *  @since 5.0.x
 */
typedef struct MBRange {
    int lower;
    int upper;
} MBRange;

#endif

/**
 *  Point type in NDS format
 *
 *  @since 5.0.x
 */
typedef struct MBNdsPoint
{
    int x, y;
} MBNdsPoint;

/**
 *  Range type in float format
 *
 *  @since 5.0.x
 */
typedef struct MBRangeF {
    float lower;
    float upper;
} MBRangeF;

/**
 *  date type
 *
 *  @since 4.9.x
 */
typedef struct MBDateTime
{
    NSInteger   m_hours;
    NSInteger 	m_minutes;
    NSInteger 	m_seconds;
    NSInteger 	m_year;
    NSInteger 	m_month;
    NSInteger 	m_day;
} MBDateTime;

/**
 *  MBGpsSimulator send this notification when client simulating navigation
 *
 *  @since 4.9.x
 *
 *  @note Deprecated
 */
#define KLocationManagerSimStartNotification @"com.mapbar.lmnss"

/* constants for values of parameter MBTTS_PARAM_SPEAKER */
#define MBTTS_ROLE_TIANCHANG			1			/* Tianchang (female, Chinese) */
#define MBTTS_ROLE_WENJING				2			/* Wenjing (female, Chinese) */
#define MBTTS_ROLE_XIAOYAN				3			/* Xiaoyan (female, Chinese) */
#define MBTTS_ROLE_YANPING				3			/* Xiaoyan (female, Chinese) */
#define MBTTS_ROLE_XIAOFENG				4			/* Xiaofeng (male, Chinese) */
#define MBTTS_ROLE_YUFENG				4			/* Xiaofeng (male, Chinese) */
#define MBTTS_ROLE_SHERRI				5			/* Sherri (female, US English) */
#define MBTTS_ROLE_XIAOJIN				6			/* Xiaojin (female, Chinese) */
#define MBTTS_ROLE_NANNAN				7			/* Nannan (child, Chinese) */
#define MBTTS_ROLE_JINGER				8			/* Jinger (female, Chinese) */
#define MBTTS_ROLE_JIAJIA				9			/* Jiajia (girl, Chinese) */
#define MBTTS_ROLE_YUER					10			/* Yuer (female, Chinese) */
#define MBTTS_ROLE_XIAOQIAN				11			/* Xiaoqian (female, Chinese Northeast) */
#define MBTTS_ROLE_LAOMA				12			/* Laoma (male, Chinese) */
#define MBTTS_ROLE_BUSH					13			/* Bush (male, US English) */
#define MBTTS_ROLE_XIAORONG				14			/* Xiaorong (female, Chinese Szechwan) */
#define MBTTS_ROLE_XIAOMEI				15			/* Xiaomei (female, Cantonese) */
#define MBTTS_ROLE_ANNI					16			/* Anni (female, Chinese) */
#define MBTTS_ROLE_JOHN					17			/* John (male, US English) */
#define MBTTS_ROLE_ANITA				18			/* Anita (female, British English) */
#define MBTTS_ROLE_TERRY				19			/* Terry (female, US English) */
#define MBTTS_ROLE_CATHERINE			20			/* Catherine (female, US English) */
#define MBTTS_ROLE_TERRYW				21			/* Terry (female, US English Word) */
#define MBTTS_ROLE_XIAOLIN				22			/* Xiaolin (female, Chinese) */
#define MBTTS_ROLE_XIAOMENG				23			/* Xiaomeng (female, Chinese) */
#define MBTTS_ROLE_XIAOQIANG			24			/* Xiaoqiang (male, Chinese) */
#define MBTTS_ROLE_XIAOKUN				25			/* XiaoKun (male, Chinese) */
#define MBTTS_ROLE_JIUXU				51			/* Jiu Xu (male, Chinese) */
#define MBTTS_ROLE_DUOXU				52			/* Duo Xu (male, Chinese) */
#define MBTTS_ROLE_XIAOPING				53			/* Xiaoping (female, Chinese) */
#define MBTTS_ROLE_DONALDDUCK			54			/* Donald Duck (male, Chinese) */
#define MBTTS_ROLE_BABYXU				55			/* Baby Xu (child, Chinese) */
#define MBTTS_ROLE_DALONG				56			/* Dalong (male, Cantonese) */
#define MBTTS_ROLE_TOM					57			/* Tom (male, US English) */
#define MBTTS_ROLE_USER					99			/* user defined */

#endif /* MBNaviCoreBase_h */
