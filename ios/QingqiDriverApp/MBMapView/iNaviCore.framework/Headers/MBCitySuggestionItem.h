//
//  MBCitySuggestionItem.h
//  iNaviCore
//
//  Created by fanyunlong on 5/18/16.
//  Copyright © 2016 Mapbar. All rights reserved.
//

#import "MBObject.h"

@interface MBCitySuggestionItem : MBObject
@property (nonatomic, retain) NSString* simpleName;
@property (nonatomic, retain) NSString* name;
@property (nonatomic, assign) MBPoint center;
@property (nonatomic, retain) NSString* adCode;
@end
