//
//  RCTMyViewManager.m
//  ReactNative_MyViewController
//
//  Created by caoshilong on 16/9/20.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "RCTMapViewManager.h"
#import "MapView.h"
#import "RCTBridge.h"
#import "RCTUIManager.h"
#import "RCTEventDispatcher.h"
#import "RCTEventEmitter.h"
#import "RCTConvert.h"
//#import <iNaviCore/MBAnnotation.h>

#import <iNaviCore/MBPolylineOverlay.h>


#import <iNaviCore/MBGpsLocation.h>
#import <iNaviCore/MBPoiQuery.h>
#import <iNaviCore/MBReverseGeocoder.h>
#import <iNaviCore/MBAnnotation.h>
#import <iNaviCore/MBCustomAnnotation.h>


#import <iNaviCore/MBMapViewDelegate.h>
#import <iNaviCore/MBPoiQueryParams.h>
#import <iNaviCore/MBGpsInfo.h>
#import <iNaviCore/MBReverseGeocodeObject.h>

@interface RCTMapViewManager()
@end
@implementation RCTMapViewManager
@synthesize bridge = _bridge;

RCT_EXPORT_MODULE()
RCT_EXPORT_VIEW_PROPERTY(annotationDtas, NSArray<MyAnnotation *>)
RCT_EXPORT_VIEW_PROPERTY(mapCenter, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(showUserLocation, BOOL)
RCT_EXPORT_VIEW_PROPERTY(zoomLevel, float)
RCT_EXPORT_VIEW_PROPERTY(forbidGesture, BOOL)
RCT_EXPORT_VIEW_PROPERTY(annotation,MBAnnomation)

RCT_EXPORT_VIEW_PROPERTY(onAnnotationClick,RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onIconOverlayClick,RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onZoom,RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onZoomIn,RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onZoomOut,RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onSpan,RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onTap,RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onRotation,RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onInit,RCTBubblingEventBlock)


#pragma mark - 导出函数供JS调用



#pragma mark 画线
RCT_EXPORT_METHOD(addLine:(nonnull NSNumber *)reactTag points:(NSDictionary *)dict
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject){
  
  NSLog(@"line方法被调用了");
  MapView *myView = [self getViewWithTag:reactTag];
   [myView lineWithPoints:dict];
  
//  if (value) {
//    resolve([NSNumber numberWithInteger:value]);
//  }else {
//    reject(@"1002", @"调用方法4出错", [NSError errorWithDomain:@"调用方法4出错" code:1002 userInfo:nil]);
//  }
//  
}

#pragma mark 批量打点
RCT_EXPORT_METHOD(addAnnotations:(nonnull NSNumber *)reactTag points:(NSArray *)array
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject){
  

  NSLog(@"line方法被调用了");
  MapView *myView = [self getViewWithTag:reactTag];
  [myView setAnnotationDtas:array];
  //  if (value) {
  //    resolve([NSNumber numberWithInteger:value]);
  //  }else {
  //    reject(@"1002", @"调用方法4出错", [NSError errorWithDomain:@"调用方法4出错" code:1002 userInfo:nil]);
  //  }
  //
  
}
/**
 *  设置地图缩放级别
 *  @param  zoomLevel   缩放级别，取值范围[1.0, 14.0]
 *  @param  animated    是否使用动画效果
 *  @return 空
 */
#pragma mark 更新位置
RCT_EXPORT_METHOD(refreshAnnotationLocation:(nonnull NSNumber *)reactTag dictionary:(NSDictionary *)dictionary
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject){
  MapView *myView = [self getViewWithTag:reactTag];
  [myView moveWith:dictionary];
}


#pragma mark 设置地图缩放级别
RCT_EXPORT_METHOD(setZoomLevel:(nonnull NSNumber *)reactTag zoomLevel:(float)zoomLevel){
  MapView *myView = [self getViewWithTag:reactTag];
  [myView setZoomLevel:zoomLevel animated:YES];
}

#pragma mark 设置地图中心点坐标
RCT_EXPORT_METHOD(setWorldCenter:(nonnull NSNumber *)reactTag location:(NSDictionary *)location
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject){
  MapView *myView = [self getViewWithTag:reactTag];
    [myView setMapCenter:location];
}

#pragma mark 获取annotationIDs
RCT_EXPORT_METHOD(getAnnotationIDs:(nonnull NSNumber *)reactTag
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject){
  MapView *myView = [self getViewWithTag:reactTag];
   NSArray *annotationIds = [myView getAnnotationIds];
    if (annotationIds.count > 0) {
      resolve([NSArray arrayWithArray:annotationIds]);
    }else {
      reject(@"1002", @"调用方法getAnnotationIDs出错", [NSError errorWithDomain:@"调用方法getAnnotationIDs出错" code:1002 userInfo:nil]);
    }
}

#pragma mark 禁止操作地图
RCT_EXPORT_METHOD(setForbidGesture:(nonnull NSNumber *)reactTag forbidGesture:(BOOL)forbidGestur){
  MapView *myView = [self getViewWithTag:reactTag];
  myView.forbidGesture = forbidGestur;
}

#pragma mark 删除点
RCT_EXPORT_METHOD(removeAnnotation:(nonnull NSNumber *)reactTag array:(NSArray *)array
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject){
  MapView *myView = [self getViewWithTag:reactTag];
  [myView removeMarkers:array];
}


#pragma mark 删除lineoverlay
RCT_EXPORT_METHOD(deleteLine:(nonnull NSNumber *)reactTag
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject){
  MapView *myView = [self getViewWithTag:reactTag];
  [myView removeLine];
}

#pragma mark 更新icon
RCT_EXPORT_METHOD(setIcon:(nonnull NSNumber *)reactTag info:(NSDictionary *)info
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject){
  MapView *myView = [self getViewWithTag:reactTag];
  NSDictionary<NSString *, NSString *> *options = [RCTConvert NSDictionary:info];
  [myView setAnnotationIcon:options];
}


#pragma mark 删除所有的覆盖物
RCT_EXPORT_METHOD(removeAllOverlayAndAnnotation:(nonnull NSNumber *)reactTag){
  MapView *myView = [self getViewWithTag:reactTag];
  [myView removeLine];
  [myView removeAllOverlayAndAnnotation];
}



#pragma mark 定位
RCT_EXPORT_METHOD(getUserLocation:(nonnull NSNumber *)reactTag
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject){
  MapView *myView = [self getViewWithTag:reactTag];
  [myView setShowUserLocation:YES resolve:^(NSDictionary *location) {
    resolve(location);
  } reject:^(NSError *error) {
    reject(@"1002", @"定位失败", error);
  }];
  
 
}

#pragma mark 停止定位
RCT_EXPORT_METHOD(stopLocation:(nonnull NSNumber *)reactTag
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject){
  MapView *myView = [self getViewWithTag:reactTag];
  [myView stopLocation];
}


#pragma mark -----------------------iconOverlay-------------------------

#pragma mark  刷新iconOverlay位置
RCT_EXPORT_METHOD(refreshIconOverlayLocation:(nonnull NSNumber *)reactTag dictionary:(NSDictionary *)dictionary){
  MapView *myView = [self getViewWithTag:reactTag];
  [myView refreshIconOVerlayLocation:dictionary];
}

#pragma mark 更新iconOverlay的 icon
RCT_EXPORT_METHOD(setIconOverlayIcon:(nonnull NSNumber *)reactTag info:(NSArray *)info
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject){
  MapView *myView = [self getViewWithTag:reactTag];
  [myView setIconOverlayIcon:info];
}

#pragma mark 设置iconOverlay
RCT_EXPORT_METHOD(setIconOverlayIcons:(nonnull NSNumber *)reactTag info:(NSArray *)info
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject){
  MapView *myView = [self getViewWithTag:reactTag];
  [myView setRotationAnnotations:info];
}

#pragma mark 删除iconOverlay
RCT_EXPORT_METHOD(removeIconOverlay:(nonnull NSNumber *)reactTag array:(NSArray *)array
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject){
  MapView *myView = [self getViewWithTag:reactTag];
  [myView removeIconOverlay:array];
}

#pragma mark 获取iconOverlayIds
RCT_EXPORT_METHOD(getIconOverlayIds:(nonnull NSNumber *)reactTag
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject){
  MapView *myView = [self getViewWithTag:reactTag];
  NSArray *annotationIds = [myView getIconOverlayIds];
  if (annotationIds.count > 0) {
    resolve([NSArray arrayWithArray:annotationIds]);
  }else {
    reject(@"1002", @"调用方法getAnnotationIDs出错", [NSError errorWithDomain:@"调用方法getIconOverlayIds出错" code:1002 userInfo:nil]);
  }
}

/// 拿到当前View
- (MapView *) getViewWithTag:(NSNumber *)tag {
  NSLog(@"%@", [NSThread currentThread]);
  
  UIView *view = [self.bridge.uiManager viewForReactTag:tag];
  return [view isKindOfClass:[MapView class]] ? (MapView *)view : nil;
}

/// 重写这个方法，返回将要提供给RN使用的视图
- (UIView *)view {
  MapView *myView = [[MapView alloc] init];
//  myView.delegate = self;
  return myView;
}


- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

/******************add by liufang**********************/

RCT_EXPORT_METHOD(getZoomLevel:(nonnull NSNumber *)reactTag
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject){
  MapView *myView = [self getViewWithTag:reactTag];
  //float zoomLevel = myView.zoomLevel;
  float zoomLevel = [myView getZoomLevelValue];
  NSLog(@"getZoomLevel方法被调用了");
  NSLog(@"%f", zoomLevel);
  if (zoomLevel >= 0) {
    resolve([NSNumber numberWithFloat:zoomLevel]);
  }else {
    reject(@"1002", @"调用方法4出错", [NSError errorWithDomain:@"调用方法4出错" code:1002 userInfo:nil]);
  }
}

RCT_EXPORT_METHOD(setZoomIn:(nonnull NSNumber *)reactTag){
  MapView *myView = [self getViewWithTag:reactTag];
  float zoomLevel = [myView getZoomLevelValue];
  if(zoomLevel < 16){
    [myView setZoomLevel:zoomLevel + 1 animated:YES];
  }
}

RCT_EXPORT_METHOD(setZoomOut:(nonnull NSNumber *)reactTag){
  MapView *myView = [self getViewWithTag:reactTag];
  float zoomLevel = [myView getZoomLevelValue];
  if(zoomLevel > 0){
    [myView setZoomLevel:zoomLevel - 1 animated:YES];
  }
}

RCT_EXPORT_METHOD(getWorldRect:(nonnull NSNumber *)reactTag
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject){
  MapView *myView = [self getViewWithTag:reactTag];
  MBRect worldRect = [myView getWorldRect];
  NSNumber *minLongitude = [NSNumber numberWithInt:worldRect.left],
  *minLatitude = [NSNumber numberWithInt:worldRect.top],
  *maxLongitude = [NSNumber numberWithInt:worldRect.right],
  *maxLatitude = [NSNumber numberWithInt:worldRect.bottom];
  NSLog(@"getWorldRect方法被调用了");
  if (true) {
    resolve(@{ @"minLongitude":minLongitude,@"minLatitude":minLatitude,@"maxLongitude":maxLongitude, @"maxLatitude":maxLatitude });
  }else {
    reject(@"1002", @"调用方法getWorldRect出错", [NSError errorWithDomain:@"调用方法getWorldRect出错" code:1002 userInfo:nil]);
  }
}

RCT_EXPORT_METHOD(fitWorldArea:(nonnull NSNumber *)reactTag dictionary:(NSDictionary *)dictionary){
  MBRect worldRect = {
    [dictionary[@"minLongitude"]intValue],
    [dictionary[@"minLatitude"]intValue],
    [dictionary[@"maxLongitude"]intValue],
    [dictionary[@"maxLatitude"]intValue]
  };
  MapView *myView = [self getViewWithTag:reactTag];

  [myView fitWorldArea:worldRect];
}

RCT_EXPORT_METHOD(onDestroyMap:(nonnull NSNumber *)reactTag){
  MapView *myView = [self getViewWithTag:reactTag];
  [myView onDestory];
}


@end

