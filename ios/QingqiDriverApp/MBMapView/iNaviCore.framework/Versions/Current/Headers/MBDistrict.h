//
//  MBDistrict.h
//  iNaviCore
//
//  Created by fanyunlong on 5/18/16.
//  Copyright © 2016 Mapbar. All rights reserved.
//

#import "MBObject.h"

@interface MBDistrict : MBObject

@property (nonatomic, assign) NSInteger level;
@property (nonatomic, retain) NSString* name;
@property (nonatomic, assign) MBPoint center;
@property (nonatomic, retain) NSString* adCode;
@property (nonatomic, retain) NSString* cityCode;
@end
