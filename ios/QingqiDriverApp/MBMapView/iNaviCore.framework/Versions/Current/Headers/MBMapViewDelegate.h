//
//  MBMapViewDelegate.h
//  iNaviCore
//
//  Created by fanyunlong on 5/31/16.
//  Copyright © 2016 Mapbar. All rights reserved.
//

#ifndef MBMapViewDelegate_h
#define MBMapViewDelegate_h

@class MBMapView;

/**
 *   地图代理
 */
@protocol MBMapViewDelegate <NSObject>

@optional

////////////--------Annotation--------/////////////

/**
 *  [MBAnnotation](#) 被选中时触发的回调，在 [MBMapViewDelegate mbMapView: onAnnotationClicked: area:](#) 之前被触发;
 *  @param  mapView  当前地图 MBMapView 实例
 *  @param  annot    当前被选中的标注 MBAnnotation
 *  @return 空
 */
-(void)mbMapView:(MBMapView *)mapView onAnnotationSelected:(MBAnnotation *)annot;
/**
 *
 *  取消被选中时触发的回调
 *  @param  mapView  当前地图
 *  @param  annot    当前取消选中状态的标注
 *  @return 空
 */
-(void)mbMapView:(MBMapView *)mapView onAnnotationDeselected:(MBAnnotation *)annot;
/**
 *
 *  点击[MBAnnotation](#)时触发的回调
 *  @param  mapView  当前地图
 *  @param  annot    被点击的 MBAnnotation
 *  @param  area     被点击的区域 MBAnnotationArea
 *  @return 空
 */
-(void)mbMapView:(MBMapView *)mapView onAnnotationClicked:(MBAnnotation *)annot area:(MBAnnotationArea)area;
/**
 *  点中的 [MBAnnotation](#) 个数。该方法用于监听多个 MBAnnotation 由于紧凑造成在地图显示重叠
 *
 *  @param mapView 地图实例
 *  @param annots MBAnnotation 数组
 *  @note 该方法返回值 annots 建议在下一次收到该方法或者收到 [mbMapView:onAnnotationDeselected:](#) 清空
 *
 *  @since 5.0.x
 */
-(void)mbMapView:(MBMapView *)mapView onAnnotationsClicked:(NSArray *)annots;

////////////--------Overlay--------/////////////

/**
 *  点击 MBOverlay 的时候触发
 *  @param mapView 当前 MBMapView 实例
 *  @param overlay 被点中的 MBOverlay
 *  @param area    点中的区域
 */
- (void)mbMapView:(MBMapView *)mapView onOverlayClicked:(MBOverlay*)overlay area:(MBAnnotationArea)area;
/**
 *  选中 MBOverlay 的时候触发, Nds的为高精度，在 [MBMapViewDelegate mbMapView: onOverlaySelected: grabbedPoint:](#) 之前被触发
 *  @param mapView 当前 MBMapView 实例
 *  @param overlay 被选中的 MBOverlay
 *  @param point   点中的点坐标
 */
- (void)mbMapView:(MBMapView *)mapView onOverlaySelected:(MBOverlay*)overlay grabbedPoint:(MBPoint)point;
- (void)mbMapView:(MBMapView *)mapView onOverlaySelectedNds:(MBOverlay*)overlay grabbedPoint:(MBNdsPoint)point;
/**
 *  反选 MBOverlay 触发
 *  @param mapView 当前 MBMapView 实例
 *  @param overlay 当前反选的 MBOverlay
 */
- (void)mbMapView:(MBMapView *)mapView onOverlayDeselected:(MBOverlay*)overlay;



////////////--------POI--------/////////////

/**
 *
 *  选中POI时触发的回调，Nds为高精度，这里规定如果连续点击相同的 POI 只会发生一次回调。所以如果对 POI 有连续点击的操作逻辑，可以使用 [MBMapViewDelegate mbMapView: onPoiClicked: pos:](#)
 *  @param  mapView     当前地图
 *  @param  name        POI名称
 *  @param  pos         POI所在位置坐标
 *  @return 空
 */
-(void)mbMapView:(MBMapView *)mapView onPoiSelected:(NSString *)name pos:(MBPoint)pos;
-(void)mbMapView:(MBMapView *)mapView onPoiSelectedNds:(NSString *)name pos:(MBNdsPoint)area;
/**
 *
 *  反选POI时触发的回调，Nds为高精度
 *  @param  mapView     当前地图
 *  @param  name        POI名称
 *  @param  pos         POI所在位置坐标
 *  @return 空
 */
-(void)mbMapView:(MBMapView *)mapView onPoiDeselected:(NSString *)name pos:(MBPoint)pos;
-(void)mbMapView:(MBMapView *)mapView onPoiDeselectedNds:(NSString *)name pos:(MBNdsPoint)area;

/**
 *
 *  点击 POI 时触发的回调
 *  @param  mapView  当前地图
 *  @param  name     被点击的 POI 名称
 *  @param  pos      被点击的 POS 点
 *  @return 空
 */
-(void)mbMapView:(MBMapView *)mapView onPoiClicked:(NSString *)name pos:(MBPoint)pos;

////////////--------Camera--------/////////////

/**
 *
 *  相机状态发生改变时触发的回调
 *  @param  mapView     当前地图
 *  @param  changeType  相机参数改变类型{@link CameraSetting}
 *  @return 空
 */
- (void)mbMapView:(MBMapView *)mapView didChanged:(MBCameraSetting)cameraSetting;
/**
 *  地图动画 commitAnimations 调用，并且完成相应的动画后触发
 *
 *  @param mapView 当前地图
 *  @param unused  无用的数据
 */
- (void)mbMapView:(MBMapView *)mapView onCameraAnimationEnded:(void*)unused;

////////////--------Gesture--------/////////////

/**
 *
 *  点击
 *  @param  mapView     当前地图
 *  @param  tapCount    点击的次数
 *  @param  pos         当前地图
 *  @return 空
 */
- (void)mbMapView:(MBMapView *)mapView onTapped:(NSInteger)tapCount pos:(MBPoint)pos;

/**
 *
 *  长按
 *  @param  mapView 当前地图
 *  @param  pos     长按地图上的坐标
 *  @return 空
 */
- (void)mbMapViewOnLongPress:(MBMapView *)mapView pos:(MBPoint)pos;

/**
 *
 *  开启手势
 *  @param  mapView 当前地图
 *  @param  point   当前手势操作的坐标
 *  @return 空
 */
- (BOOL)mbMapViewEnableGesture:(MBMapView *)mapView point:(CGPoint)point;
/**
 *  拖动开始回调
 *
 *  @param mapView 当前地图实例
 *  @param pos     第一次点位
 *
 *  @since 5.0.x
 */
- (void)mbMapView:(MBMapView *)mapView didPanStartPos:(MBPoint)pos;
/**
 *  拖动结束回调
 *
 *  @param mapView 当前地图实例
 *  @param pos     最后一次点位
 *
 *  @since 5.0.x
 */
-(void)mbMapView:(MBMapView *)mapView didPanEndPos:(MBPoint)pos;
/**
 *
 *  接触地图是触发
 *  @param  mapView 当前地图
 *  @return 空
 */
- (void)mbMapViewDidTouched:(MBMapView *)mapView;

/**
 *  使用手势旋转地图时触发
 *  @param  mapView 当前地图
 *  @return 空
 */
- (void)mbMapViewOnRotate:(MBMapView *)mapView;
/**
 *  有手势时触发
 *
 *  @param mapView     当前地图
 *  @param animStarted 动画是否开始
 */
- (void)mbMapView:(MBMapView *)mapView onGestureAnimationEvent:(BOOL)animStarted;

////////////--------Rendering--------/////////////

/**
 *  当基础地图和 tmc 第一次被画出后触发
 *
 *  @param mapView 当前地图
 *  @param unused  无用数据
 */
- (void)mbMapView:(MBMapView *)mapView onTileLoadingFinished:(void*)unused;

/**
 *
 *  绘制地图完成
 *  @param  mapView 当前地图
 *  @return 空
 */
- (void)mbMapViewDrawFinished:(MBMapView *)mapView;

////////////--------Configuration--------/////////////

/**
 *  在线地图数据 setDataUrlPrefix() for UrlType_basicMap 后触发
 *
 *  @param mapView  当前地图
 *  @param upgraded 是否有需要更新的版本
 */
- (void)mbMapView:(MBMapView *)mapView onOnlineDataVersionChecked:(BOOL)upgraded;
/**
 *  在线地图数据 setDataUrlPrefix() for UrlType_userRaster 后触发
 *
 *  @param mapView    当前地图
 *  @param fromSource 该更新来自在线还是离线
 */
- (void)mbMapView:(MBMapView *)mapView onUserRasterDataUpdated:(MBMapDataMode)fromSource;

@end

#endif /* MBMapViewDelegate_h */
