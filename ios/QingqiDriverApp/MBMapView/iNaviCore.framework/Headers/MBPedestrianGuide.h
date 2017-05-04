//
//  MBPedestrianGuide.h
//  iNaviCore
//
//  Created by fanyunlong on 4/12/16.
//  Copyright © 2016 Mapbar. All rights reserved.
//

#import <Foundation/Foundation.h>

@class MBPedestrianGuide;

@protocol MBPedestrianGuideDelegate <NSObject>

-(void)pedestrianGuide:(MBPedestrianGuide*)guide action:(void*)action;
-(void)pedestrianGuide:(MBPedestrianGuide*)guide speak:(NSString*)text;

@end

/**
 *  步行导航提示
 *
 *  @since 5.2.x
 */
@interface MBPedestrianGuide : NSObject
/**
 *  Returns the shared pedestrian guide.
 *
 *  @return shared pedestrian guide
 *
 *  @since 5.2.x
 */
+(instancetype)sharedInstance;
/**
 *  Destroy the shared pedestrian guide.
 *
 *  @since 5.2.x
 */
+(void)cleanup;
/**
 *  是否开启语音
 *
 *  @since 5.2.x
 */
@property(nonatomic,assign) BOOL enableVoice;
/**
 *  方法代理
 *
 *  @since 5.2.x
 */
@property(nonatomic,assign) id<MBPedestrianGuideDelegate>delegate;
@end
