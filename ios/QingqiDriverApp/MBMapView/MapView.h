//
//  MyView.h
//  ReactNative_MyViewController
//
//  Created by caoshilong on 16/9/20.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <iNaviCore/MBMapView.h>
#import "RCTComponent.h"


typedef void(^Success)(NSDictionary *location);
typedef void(^Failure)(NSError *error);
@interface MapView : MBMapView

/// 提供给JS使用的属性

@property (nonatomic,assign) BOOL isInit;
@property (nonatomic,assign) BOOL showUserLocation;
@property(nonatomic,copy) NSDictionary *mapCenter;
/** 是否允许旋转 **/
@property(nonatomic,assign) BOOL rotationEnable;
/** 是否允许拖动 **/
@property(nonatomic,assign) BOOL dragEnable;
/** 是否允许缩放 **/
@property(nonatomic,assign) BOOL zoomEnable;
@property(nonatomic,assign) float lastZoomLevel;



@property (nonatomic, copy) RCTBubblingEventBlock onAnnotationClick;
@property (nonatomic, copy) RCTBubblingEventBlock onIconOverlayClick;
@property (nonatomic, copy) RCTBubblingEventBlock onZoom;//缩放
@property (nonatomic, copy) RCTBubblingEventBlock onZoomIn;//缩放
@property (nonatomic, copy) RCTBubblingEventBlock onZoomOut;//缩放
@property (nonatomic, copy) RCTBubblingEventBlock onSpan;//平移
@property (nonatomic, copy) RCTBubblingEventBlock onTap;//点击事件
@property (nonatomic, copy) RCTBubblingEventBlock onRotation;//旋转事件
@property (nonatomic, copy) RCTBubblingEventBlock onInit;//初始化事件
@property (nonatomic, copy) RCTBubblingEventBlock onDelloc;//注销事
@property (nonatomic, copy) Success success;
@property (nonatomic, copy) Failure failure;

@property (nonatomic, strong) NSArray *annotationDtas;
@property (nonatomic, strong) NSArray *rotationAnnotations;


- (void)lineWithPoints:(NSDictionary *)dict;
- (void)moveWith:(NSDictionary *)dict;
- (void)removeMarkers:(NSArray *)annotations;
- (MBRect)getWorldRect;
- (void)onDestory;
- (float)getZoomLevelValue;
- (NSArray *)getAnnotationIds;
- (NSArray *)getIconOverlayIds;
- (void)removeLine;
- (void)setAnnotationIcon:(NSDictionary *)dict;
- (void)stopLocation;
- (void)setIconOverlayIcon:(NSArray *)dict;
- (void)removeIconOverlay:(NSArray *)annotations;
- (void)refreshIconOVerlayLocation:(NSDictionary *)dict;
- (void)removeAllOverlayAndAnnotation;
- (void)setShowUserLocation:(BOOL)showUserLocation resolve:(Success)resolve reject:(Failure)reject;
@end
