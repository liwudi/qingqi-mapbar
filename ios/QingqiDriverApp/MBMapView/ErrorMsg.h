//
//  ErrorMsg.h
//  iosSdkDemo
//
//  Created by mapbar on 13-4-12.
//  Copyright (c) 2013年 witchnana. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface ErrorMsg : NSObject
@property(nonatomic,retain)NSString* errorMsg;
-(id)initWithErrorId:(NSInteger)errorId;
@end
