//
//  MBRouteRequest.h
//  iNaviCore
//
//  Created by fanyunlong on 4/1/16.
//  Copyright © 2016 Mapbar. All rights reserved.
//

#import "MBObject.h"

@interface MBRouteRequest : MBObject
@property(nonatomic,retain) NSString* url;
@property(nonatomic,retain) NSString* postData;
@property(nonatomic,assign) NSInteger postDataLength;
@end
