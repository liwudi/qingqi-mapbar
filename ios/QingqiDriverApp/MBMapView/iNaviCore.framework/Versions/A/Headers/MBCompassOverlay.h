//
//  MBCompassOverlay.h
//  iNaviCore
//
//  Created by fanyunlong on 4/12/16.
//  Copyright © 2016 Mapbar. All rights reserved.
//

#import "MBOverlay.h"

@interface MBCompassOverlay : MBOverlay

-(id)initWithImage:(NSString*)filePath radius:(CGFloat)radius lineWidth:(CGFloat)width dotRadius:(CGFloat)dotRadius;

@property(nonatomic,assign) CGFloat targetDirection;
@property(nonatomic,assign) CGFloat facingDirection;
@property(nonatomic,assign) CGFloat lineWidth;
@property(nonatomic,assign) CGFloat dotRadius;
@property(nonatomic,assign) CGFloat compassRadius;
@property(nonatomic,assign) unsigned int dotColor;

@end
