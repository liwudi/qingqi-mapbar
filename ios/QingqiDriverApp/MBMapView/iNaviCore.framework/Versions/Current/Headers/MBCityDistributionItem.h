//
//  MBCityDistributionItem.h
//  iNaviCore
//
//  Created by fanyunlong on 5/18/16.
//  Copyright © 2016 Mapbar. All rights reserved.
//

#import "MBObject.h"

@interface MBCityDistributionItem : MBObject
@property (nonatomic, retain) NSString* name;
@property (nonatomic, assign) MBPoint center;
@property (nonatomic, retain) NSString* adCode;
@property (nonatomic, assign) NSInteger num;
@end
