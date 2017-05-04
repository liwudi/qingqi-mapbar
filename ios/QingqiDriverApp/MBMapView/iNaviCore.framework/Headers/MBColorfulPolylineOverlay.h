//
//  MBColorfulPolylineOverlay.h
//  iNaviCore
//
//  Created by fanyunlong on 14-1-3.
//  Copyright (c) 2014年 Mapbar. All rights reserved.
//

#import "MBPolylineOverlay.h"
/**
 *  合并模式
 */
typedef enum MBMergeMode
{
    ColorMergeMode_noMerge = 0,  //Not merge, i.e. always keep original color of each segment.
    ColorMergeMode_byRGBA = 1,   //Average the R,G,B,A channels of colors of neighboring segments as the new color.
    ColorMergeMode_byIndex = 2   //Average the color index of neighboring segments and query the pallette to get the new color.
}MBMergeMode;

/**
 *  彩色折线图层颜色参数类
 */
@interface MBColorfulSpecifyParam : NSObject
/**
 *  调色板
 */
@property (nonatomic,retain)NSArray* pallette;
/**
 *  路段颜色索引
 */
@property (nonatomic,retain)NSArray* segColorIndices;
/**
 *  合并模式
 */
@property (nonatomic,assign)MBMergeMode mergeMode;
/**
 *  颜色参数，初始化ColorfulSpecifyParam参数，用于MBColorfulPolylineOverlay的构造。
 *
 *  @param segColorIndices 路段的颜色索引。
 *  @param pallette        调色板，存储UIColor对象。
 *  @param mergeMode       合并模式。
 *
 *  @return MBColorfulSpecifyParam对象
 */
-(id)initWithSegColorIndices:(NSArray*)segColorIndices pallettes:(NSArray*)pallette mergeMode:(MBMergeMode)mergeMode;
@end
/**
 *  彩色折线类图层
 */
@interface MBColorfulPolylineOverlay : MBPolylineOverlay
/**
 *  路段颜色索引，只读
 */
@property (nonatomic,readonly) NSArray* segColorIndices;
/**
 *  合并模式，只读
 */
@property (nonatomic,readonly) MBMergeMode mergeMode;
/**
 *  调色板
 */
@property (nonatomic,retain) NSArray* pallette;
/**
 *  线条类型
 */
@property (nonatomic,assign) MBStrokeStyle strokeStyle;
/**
 *  颜色路线图层
 *
 *  @param points     图层点数组
 *  @param count      点个数
 *  @param colorParam 颜色参数
 *  @param isClosed   结尾和开头不需要连起来
 *
 *  @return 颜色路线图层
 */
-(id)initWithPoints:(const MBPoint *)points count:(NSInteger)count colorSpecifyParam:(MBColorfulSpecifyParam*)colorParam isClosed:(BOOL)isClosed;
@end