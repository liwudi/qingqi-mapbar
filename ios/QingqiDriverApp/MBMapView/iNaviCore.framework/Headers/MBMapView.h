//
//  MBMapView.h
//  Navigation
//
//  Created by delon on 12-12-26.
//
//

#import <UIKit/UIKit.h>
#import <CoreLocation/CoreLocation.h>

#import "MBEngine.h"
#import "MBAnnotation.h"

typedef enum MBOptionalGesture{
    MBOptionalGesture_singleTouchZoom = 1,
    MBOptionalGesture_doubleTouchesElevate = 2,
    MBOptionalGesture_doubleTouchesRotate = 3
}MBOptionalGesture;

typedef enum MBRenderConfig
{
    MBRenderConfig_maxCustomIconSize = 1,
    MBRenderConfig_orderAnnotDynamically = 2,
    MBRenderConfig_annotationDropInterval = 5,
    MBRenderConfig_annotationDropFrameNum = 6,
    MBRenderConfig_calloutTextAlignment = 7,
}MBRenderConfig;

/**
 *  地图动画类型
 */
typedef enum MBAnimationType
{
    MBAnimationType_linear,   //暂不支持
    MBAnimationType_flyOver   //当前只支持直升机风格
}MBAnimationType;
/**
 *  缩放级别
 */
typedef enum MBLevelCase{
    MBLevelCase_maxIndoor,      //最大室内图
    MBLevelCase_maxMap,         //最大普通地图
    MBLevelCase_maxCountryMap,  //最大全国地图
    MBLevelCase_maxWorldMap,    //最大世界地图
    MBLevelCase_highest         //最小普通地图
}MBLevelCase;

/**
 *  卫星图数据提供商
 */
typedef enum MBSatellitePicProvider
{
    MBSatellitePicProvider_default = 1,  //Any pictures cut into tiles of Mapbar 3D map.
    MBSatellitePicProvider_bing = 2      //Microsoft Bing
} MBSatellitePicProvider;


/**
 *  光栅图状态
 */
typedef enum MBURasterState{
    MBURasterState_none = 0,
    MBURasterState_onlyOtherZoom = 1,
    MBURasterState_bothSame = 2,
    MBURasterState_bothDifferent = 3
}MBURasterState;


/**
 *  地图数据模式
 */
typedef enum MBMapDataMode
{
    MBMapDataMode_online,
    MBMapDataMode_offline,
    MBMapDataMode_both
}MBMapDataMode;


/**
 *  地图数据样式
 */
typedef enum MBUrlType
{
    MBUrlType_basicMap = 0,
    MBUrlType_tmcRoadShape,
    MBUrlType_model3d,
    MBUrlType_panorama,
    MBUrlType_tmcTraffic,
    MBUrlType_tmcProvinceList,
    MBUrlType_satellite,
    MBUrlType_userRaster
}MBUrlType;

/**
 *  地图渲染质量
 */
typedef enum MBRenderQuality
{
    MBRenderQuality_low = 1,
    MBRenderQuality_medium = 2,
    MBRenderQuality_high = 3
} MBRenderQuality;

/**
 *  相机设置
 */
typedef enum MBCameraSetting
{
    MBCameraSetting_worldCenter = 1,
    MBCameraSetting_scale       = 2,
    MBCameraSetting_heading     = 4,
    MBCameraSetting_elevation   = 8,
    MBCameraSetting_viewport    = 16,
    MBCameraSetting_viewShift   = 32,
    MBCameraSetting_dpiFactor   = 64,
    MBCameraSetting_zoomLevel   = 128
} MBCameraSetting;

/**
 *  地图模式，判断是正常显示模式还是导航模式。
 */
typedef enum MBMapMode{
    MapMode_normal = 0,
    MapMode_navigation = 1
}MBMapMode;

/**
 *  POI类型
 */
typedef enum MBPOIType
{
    MBPOIType_NONE = 0,
    
    MBPOIType_railwayStation = 0x1,
    MBPOIType_airport = 0x2,
    MBPOIType_dock = 0x4,
    MBPOIType_subwayStation = 0x8,   /// Drawn as the icon of the subway system of each city.
    
    MBPOIType_community = 0x10,      /// i.e. residential block
    MBPOIType_school = 0x20,
    MBPOIType_hospital = 0x40,
    MBPOIType_park = 0x80,
    MBPOIType_hotel = 0x100,
    MBPOIType_seeingSite = 0x200,    /// usually the historical buildings, such as each palace or gate in the Forbidden City.
    MBPOIType_toilet = 0x400,
    
    MBPOIType_gasStation = 0x800,
    MBPOIType_parkingLot = 0x1000,
    MBPOIType_trafficLight = 0x2000,
    
    /** 4 well-known country-wide banks are drawn with their own logo: ICBC, ABC, BC, and CBC; others are drawn with the RMB icon.
     Note it does NOT include the Postal Savings Bank of China.
     */
    MBPOIType_bank = 0x8000,
    MBPOIType_chinaPost = 0x10000,   /// China Post office, usually meaning an office of Postal Savings Bank of China too.
    
    MBPOIType_McDonald = 0x20000,
    MBPOIType_KFC = 0x40000,
    
    MBPOIType_subwayExit = 0x80000,  /// such as A, B, C, D
    
    MBPOIType_others = 0x100000,     /// all other kinds; will be drawn with a black dot.
    
    MBPOIType_ALL = 0xFFFFFFFF
}MBPOIType;

@class MBOverlay;
@class MBMapState;

@protocol MBMapViewDelegate;

@interface MBMapView : UIView
/**
 *  授权判断
 */
@property(nonatomic,readonly) MBSdkAuthError authErrorType;
/**
 *  当前地图中心点经纬度坐标
 */
@property(nonatomic,assign) MBPoint worldCenter;
/**
 *  当前地图中心点经纬度坐标，Nds表示形式
 */
@property(nonatomic,assign) MBNdsPoint centerNds;
/**
 *  区域范围
 *
 *  @since 4.9.x
 */
@property(nonatomic,assign) MBRect boundArea;

/**
 *  Set and get the zoom level. Bigger the level, more detailed the map. None-integer values are possible. The level ranges
 in the range returned by [MBMapView zoomLevelRange](#). Note the [MBMapView scale](#) also changes this zoom level.
 *
 *  @since 4.9.x
 */
@property(nonatomic,assign) float zoomLevel;

/**
 *  当前地图绘图标尺,会触发didChanged
 */
@property(nonatomic,assign) float scale;

/**
 *  仰角角度，单位：度，范围：(MIN_ELEVATION, 90]，不同比例尺的仰角范围是不同的，但上限相同，比例尺越小，仰角范围的最小值越小
 */
@property(nonatomic,assign) float elevation;

/**
 *  地图的朝向，方向角，正北为0，取值范围是[0, 360)
 */
@property(nonatomic,assign) float heading;

/**
 *
 *  当前屏幕的相对位置偏移，屏幕的相对位置，相当于百分比，范围：[-1.0, 1.0]
 */
@property(nonatomic,assign) float viewShift;

/**
 * 中心点偏移
 */
@property(nonatomic,assign) MBPoint centerOffset;

/**
 *  可视范围
 *
 *  @since 4.9.x
 */
@property(nonatomic,assign) MBRect viewport;

/**
 *  标注集合
 */
@property(nonatomic,readonly) MBRect worldRect;
/**
 *  <#Description#>
 *
 *  @since <#version number#>
 */
@property(nonatomic,readonly) MBRect worldRectNds;
@property(nonatomic,readonly) MBPoint shiftXY;

/** nightMode
 *
 *  判断当前是否开启夜间模式
 *   如果为true表示开启夜间模式，否则表示开启白天模式
 */
@property(nonatomic,assign) BOOL nightMode;

/** NAVICORE-2312
 *  地图移动，缩放，旋转和倾斜的手势事件的禁用
 *  true:禁用    false:不禁用
 */
@property(nonatomic,assign) BOOL forbidGesture;

/**
 *  标注集合
 */
@property(nonatomic,readonly) NSArray *annotations;

/**
 *  覆盖层集合
 */
@property(nonatomic,readonly) NSArray *overlays;

/**
 *
 *  当前是否延迟显示状态
 *
 */
@property(nonatomic,assign) BOOL suspendDisplay;

/**
 *
 *  代理
 *
 */
@property(nonatomic,assign) id<MBMapViewDelegate> delegate;
/**
 *  设置地图样式：客户端将默认 map3_style_sheet.json 文件放在APP的res目录下，系统自动读取，客户端也可以根据需要更改其中配置。[MBMapView styleClass:](#);比如[MBMapView setStyleClass:@"route.weaker"];等
 */
@property(nonatomic,assign) NSString* styleClass;

/**
 *  强制绘制地图，类似UIView的setNeedsDisplay函数。
 */
- (void)drawView;

/**
 *  支持的最小比例尺
 */
- (CGFloat)minScale;

/**
 *  支持的最大比例尺
 */
- (CGFloat)maxScale;

/**
 *
 *  刷新数据。使用新下载的离线地图数据，而无需重新启动程序。
 *  @return 空
 *
 */
- (void)reloadMapData;

/**
 *
 *  设置地图的显示方式（自动，在线，离线）。默认自动 MBMapDataMode_both。
 *  @return 空
 *
 */
@property(nonatomic,assign)MBMapDataMode mapDataMode;
/**
 *  设置卫星图的数据提供商，如果数据使用客户服务自己的，设置成 MBSatellitePicProvider_default。默认值 MBSatellitePicProvider_default
 */
@property(nonatomic,assign) MBSatellitePicProvider satellitePicProvider;
/**
 *
 *  将世界坐标转换为对应的屏幕坐标
 *  @param  pt    世界坐标
 *  @return 屏幕坐标
 *
 */
- (MBPoint)world2Screen:(MBPoint)pt;

/**
 *  coordinate converting methods
 *
 *  @param pt screen point
 *
 *  @return nds point
 *
 *  @since 5.0.x
 */
-(MBNdsPoint)screen2WorldNds:(MBPoint)pt;
-(MBPoint)world2ScreenNds:(MBNdsPoint)pt;

/**
 *  加载样式
 *
 *  @param filename 样式文件名臣
 *
 *  @since 4.10.x
 */
-(void)loadStyleSheet:(NSString*)filename;
/**
 *  特定位导航一号产品封装，其他产品无需调用。销毁地图渲染对象。
 *
 *  @since 5.0.x
 */
-(void)destorymapRenderer;
/**
 *
 *  将屏幕坐标转换为对应的世界坐标
 *  @param  pt    屏幕坐标
 *  @return  世界坐标
 *
 */
- (MBPoint)screen2World:(MBPoint)pt;
/**
 *
 *  将世界坐标矩形转换为对应的屏幕坐标矩形
 *  @param  rc    世界坐标矩形
 *  @return 屏幕坐标矩形
 *
 */
- (MBRect)worldRect2Screen:(MBRect)rc;
/**
 *
 *  将屏幕坐标矩形转换为对应的世界坐标矩形
 *  @param  rc    屏幕坐标矩形
 *  @return 世界坐标矩形
 *
 */
- (MBRect)screenRect2World:(MBRect)rc;

/**
 *
 *  判断指定的点是否在地图的可见范围内
 *  @param pos    判断的点
 *  @return 可见则返回YES，否则返回NO
 */
- (BOOL)isPointVisible:(MBPoint)pos;

/**
 *
 *  判断指定的矩形是否在地图的可见范围内
 *  @param  rect    欲判断的矩形
 *  @return 可见则返回YES，否则返回NO
 */
- (BOOL)isRectVisible:(MBRect)rect;
- (BOOL)isRectVisibleNds:(MBRect)rect;
- (float)unitWorld2Screen:(float)worldUnit;
-(float)unitWorld2ScreenNds:(float)worldUnit;
-(float)unitScreen2World:(float)screenUnit;
-(float)unitScreen2WorldNds:(float)screenUnit;
/**
 *  Set the world center and scale, so that the specified world area is totally shown in screen. Equal to
 [MBMapView fitWorldArea:rect:](#).
 *
 *  @param area world coordinate
 *
 *  @since 4.9.x
 */
- (void)fitWorldArea:(MBRect)area;

/**
 *  Set the world center and scale, so that the specified world area is totally shown in specified screen rectangle.
 *
 *  @param area world coordinate
 *  @param rect screen coordinate
 *
 *  @since 4.9.x
 */
- (void)fitWorldArea:(MBRect)area rect:(CGRect)rect;
/**
 *  A facility to get the scale value of specified zoom level. The returned value depends on whether the map data in use is of old- or new- format.
 *
 *  @param zoomLevel Should be in [getZoomLevelOf(LevelCase_highest), getZoomLevelOf(LevelCase_maxIndoor)]. Values out of it will be truncated into it in this function.
 *
 *  @return scale
 *
 *  @since 5.0.x
 */
-(float)zoomLevel2Scale:(float)zoomLevel;
/**
 *  A shortcut to calculate the scale length to show to user. It's equal to:
 (int)((float)lenInMeter / (float)getScale() * getDpiFactor() * 50.0f)
 Usually when you want to use this function, \a getTraditionalMapScale() will be a better choice.
 So it'll be deprecated in future.
 *
 *  @param meter
 *
 *  @return pixel
 *
 *  @since 5.0.x
 */
- (NSInteger)meter2Pixel:(int)meter;
/**
 *  A shortcut of calculating current map scale in the traditional sense in geography, i.e. the value of x in scale-expression "1:x" of traditional map on paper.
 It means the length in real world which are represented by a length of 1 unit in the map view.
 It is the 100 times of the value, in meter, typically annotated on a 1cm long map scale line.
 Given the dpiFactor of this MBMapView is set as the device's DPI divided by 160 (i.e. REFERENCE_DPI), this value equals to:
 1.0f * (dpiFactor*REFERENCE_DPI) / 50.0f * (scale / dpiFactor) * (100/2.54f)
 = 125.984 * scale;     (Note REFERENCE_DPI is now 160)
 *
 *  @return traditional map scale
 *
 *  @since 5.0.x
 */
-(float)getTraditionalMapScale;
/**
 *  添加Annotation到MapRenderer对象
 *  @param  annotation  标注
 *  @return 空
 */
- (void)addAnnotation:(MBAnnotation *)annotation;

/**
 *  移除Annotation
 *  @param  annotation  标注
 *  @return 空
 */
- (void)removeAnnotation:(MBAnnotation *)annotation;

/**
 *  移除Annotations
 *  @param  annotations  标注集合
 *  @return 空
 */
- (void)removeAnnotations:(NSArray *)annotations;

/**
 *
 *  设置选中地图中指定的Annotation
 *  @param  annotation  待选中的Annotation标注
 *  @return 空
 */
- (void)selectAnnotation:(MBAnnotation *)annotation;

/**
 *
 *  添加Overlay到MapRenderer对象<br><font color="red">注意：调用addOverlay之后，会将Native的资源托管给{@link MapRenderer}<br>此时如果要删除相应的{@link Overlay}对象，那么应该调用{@link MapRenderer#removeOverlay(Overlay)}来清理删除对象<br>删除后的对象将不再可用，客户端需手动将对应的Java对象置空。</font>
 *  @param  overlay     层
 *  @return 空
 */
- (void)addOverlay:(MBOverlay *)overlay;

/**
 *  在指定层次插入Overlay，不同层次会出现压盖关系
 *  @param  overlay     待插入的Overlay
 *  @param  index       插入位置
 *  @return 空
 */
- (void)insertOverlayAtIndex:(MBOverlay *)overlay index:(NSInteger)index;

/**
 *  移除MapRenderer中的Overlay对象，释放Overlay对应的Native资源<br><font color="red">注意：此方法将释放Overlay对应的Native资源，此时Overlay已经失效，不可用，任何对其操作都将引起崩溃。</font>
 *  @param  overlay     待插入的Overlay
 *  @return 空
 */
- (void)removeOverlay:(MBOverlay *)overlay;

/**
 *
 *  移除MapRenderer中的Overlay对象，释放Overlay对应的Native资源<br><font color="red">注意：此方法将释放Overlay对应的Native资源，此时Overlay已经失效，不可用，任何对其操作都将引起崩溃。</font>
 *  @param  overlays     删除的Overlay集合
 *  @return 空
 */
- (void)removeOverlays:(NSArray *)overlays;

/**
 *  将指定的Overlay提到所有Overlay最顶端
 *  @param  overlay     待操作Overlay
 *  @return 空
 */
- (void)bringOverlayToTop:(MBOverlay *)overlay;

/**
 *  将指定的Overlay放入所有Overlay最下方
 *  @param  overlay     待操作Overlay
 *  @return 空
 */
- (void)sendOverlayToBack:(MBOverlay *)overlay;

/**
 *  交换两个Overlay的层次顺序
 *
 *  @param l 图层
 *  @param r 图层
 *
 *  @since <#version number#>
 */
- (void)exchangeOverylayIndices:(MBOverlay *)l r:(MBOverlay *)r;
/**
 *  句柄
 */
@property(nonatomic,readonly) id native;

/**
 *  设置地图缩放级别
 *  @param  zoomLevel   缩放级别，取值范围[1.0, 14.0]
 *  @param  animated    是否使用动画效果
 *  @return 空
 */
- (void)setZoomLevel:(CGFloat)zoomLevel animated:(BOOL)animated;

/**
 *  设置地图比例
 *  @param  scale   缩放比例
 *  @param  animated    是否使用动画效果
 *  @return 空
 */
- (void)setScale:(CGFloat)scale animated:(BOOL)animated;

/**
 *  设置地图的朝向
 *  @param  heading     方向角，正北为0，取值范围是[0, 360)
 *  @param  animated    是否使用动画效果
 *  @return 空
 *  @note 如果开启默认动画，则动画时长0.7s，这时如果在第一个切换动画前继续调用该函数，第二次的设置可能失败
 */
- (void)setHeading:(CGFloat)heading animated:(BOOL)animated;
/**
 *  开始动画
 */
- (void)beginAnimations;
/**
 *  取消动画
 */
-(void)cancelAnimations;
/**
 *  提交动画
 *
 *  @param duration 秒数
 *  @param type     动画类型
 */
-(void)commitAnimations:(int)duration type:(MBAnimationType)type;
/**
 *  连续动画
 *
 *  @param toZoomIn YES，连续ZoomIn
 */
-(void)startZoom:(BOOL)toZoomIn;
/**
 *  结束连续动画
 */
-(void)endZoom;
/**
 *  是否在动画中
 *
 *  @return YES正在动画，NO不在动画。
 */
-(BOOL)isInAnimation;
/**
 *
 *  设置地图中心点位置
 *  @param  worldCenter      欲设置的中心点
 *  @param  animated    是否使用动画效果
 *  @return 空
 */
- (void)setWorldCenter:(MBPoint)worldCenter animated:(BOOL)animated;
/**
 *  设置X和Y方向偏移比例,默认为0
 *
 *  @param rx x轴偏移量
 *  @param ry y轴偏移量
 *
 *  @since 4.9.x
 */
- (void)setViewShiftX:(float)rx y:(float)ry;

/**
 *  建议在程序切到后台或者接收到操作系统内存紧缺的信号 时使用此函数精简内存使用
 */
-(void)compactCache;
/**
 *  建议当系统内存资源紧缺时使用此函数清理释放内存
 */
-(void)clearCache;
/**
 *  设置地图渲染时是否清屏，默认：清屏
 */
@property (nonatomic,assign) BOOL enableBackground;
/**
 *  开启/关闭地图底图，默认开启
 */
@property (nonatomic,assign) BOOL enableBasicMap;
/** enableBuilding
 *
 *  是否显示建筑，默认true值
 *
 */
@property(nonatomic,assign) BOOL enableBuilding;
/**
 *  是否切换到全景图模式。 默认是：false
 */
@property (nonatomic,assign) BOOL enablePanoramaMode;
/**
 *
 *  是否显示TMC，默认不显示，如果为YES表示打开TMC，否则为关闭TMC
 */
@property(nonatomic,assign) BOOL enableTmc;
/**
 *
 *  是否打开卫星图，默认false，如果为true表示打开卫星图，否则为关闭卫星图，同时调用默认的 L":map3d/map3ss_satellite.json" 配置文件，该文件存放在 packet.dat 中，如果客户端想手动配置，可以自己创建一份 xxx.json，并且放置在 res/ 目录下。之后调用 [MBMapView loadStyleSheet:](#) 方法
 */
@property(nonatomic,assign) BOOL satelliteMap;
/**
 *  获取屏幕DPI大小
 */
@property(nonatomic,assign) float dpiFactor;
/**
 *  获取当前渲染地图的质量
 */
@property(nonatomic,assign) MBRenderQuality renderQuality;
/**
 *  获取当前地图状态，包括摄像机状态，用于动态恢复地图状态
 */
@property(nonatomic,retain) MBMapState* mapState;
/**
 *  获取缩放等级范围，触发地图回调，该方法不能在 beginAnimations 和 commitAnimations 中使用。在老地图数据中的范围是[0,14]，新数据是[0,16]，可以使用 getZoomLevelOf 函数得到缩放大小
 */
@property(nonatomic,assign) MBRangeF zoomLevelRange;
/**
 *  当前实时交通(TMC)数据刷新时间, 单位: ms。也就是如果要设置为10秒钟刷新，那么应该是10 * 1000。同理两分钟刷新就是2 * 60 * 1000
 */
@property(nonatomic,assign) int tmcRefreshInterval;
/**
 *  Set/Get configurable parameters of integer types.
    The meaning of \a values for possible types at present:
    - RenderConfig_maxCustomIconSize:
    {width, height}: max size of the custom icon
    Default value: {512,512} for devices with screen DPI <400, {1024,1024} otherwise.
 *
 *  @param type   The number of configure values in \a values.
 *  @param values width,height
 *  @param num    number of values
 *
 *  @since 5.0.x
 */
-(void)setConfigType:(MBRenderConfig)type values:(int*)values num:(NSInteger)num;
-(void)getConfigType:(MBRenderConfig)type values:(int*)values num:(NSInteger)num;
/**
 *  Set/Get configurable parameters of boolean type.
    The meaning of \a value for possible types at present:
    - RenderConfig_orderAnnotDynamically:
    Whether to increase zLevel of an annotation for ever after it is clicked.
    Default: false.
 *
 *  @param type   MBRenderConfig
 *  @param enable enable or not
 *
 *  @since 5.0.x
 */
-(void)setConfigType:(MBRenderConfig)type enable:(BOOL)enable;
-(BOOL)getConfigTypeEnable:(MBRenderConfig)type;
/**
 *  缩放全景图
 *
 *  @param byTimes 如果此值大于1，表示放大
 */
-(void)zoomInPanorama:(float)byTimes;
/**
 *  旋转全景图。画图时将先绕屏幕y轴旋转、然后绕屏幕旋转。旋转角度的符号与旋转轴的方向符合右手法则。
 *
 *  @param x x轴
 *  @param y y轴
 */
-(void)rotatePanoramaByAngleAroundX:(int)x Y:(int)y;
/**
 *  设置当前全景图地点
 *
 *  @param cityCode     城市ID
 *  @param siteId       请求URL中的图片Id，类似"000289-0-201110200100280028"
 *  @param face1Heading 第一个面的位于观察者的哪个方向，正北是0，正西是90，正南是180，正东是270。
 */
-(void)setPanoramaSite:(NSString*)cityCode siteId:(NSString*)siteId face1Heading:(int) face1Heading;
/**
 *  设置数据URL前缀，主要用于请求在线数据
 *
 *  @param type url类型
 *  @param url  url
 */
-(void)setDataUrlPrefix:(MBUrlType)type urlPrefix:(NSString*)url;
/**
 *  屏幕截图功能
 *
 *  @return UIImage对象。
 */
-(UIImage*)screenshot;
/**
 *  是否打开室内图，默认 false
 */
@property(nonatomic,assign)BOOL enableUserRasterMap;
/**
 *  建筑物是否透明，默认 false
 *
 *  @return true 透明，false 不透明
 */
-(BOOL)isBuildingOpaque;
/**
 *  最高的建筑缩放比例，默认 3.0
 */
@property(nonatomic,assign) float highestBuildingZoom;
/**
 *  根据当前点得到栅格图对象 MBURasterArea，数组中第一个为当前比例尺下支持的 MBURasterArea，第二个为全局比例尺下支持的 MBURasterArea，使用时先判断他的 validate 属性是否位真
 *
 *  @param pos 坐标点
 *
 *  @return 包含两个 MBURasterArea 的数组
 */
-(NSArray*)userRasterAreaAt:(MBPoint)pos;
/**
 *  当前展示室内图楼层
 */
@property(nonatomic,assign) int currentUserRasterFloor;
/**
 *  是否打开室内图，默认关闭
 */
@property(nonatomic,assign)BOOL indoorMode;
/**
 *  Tmc 高亮模式，如果设置成 True，该模式下基础地图的元素减少，同时让 Tmc 高亮，客户端同时需要 self.enableTmc = True，必要时候可以打开夜间模式增强效果。默认 False
 */
@property(nonatomic,assign)BOOL highlightTmc;
/**
 *  不同案例下的缩放级别，不论新老数据，zoom_maxIndoor > zoom_maxMap > zoom_lowestProvince > zoom_lowestWorld > zoom_highest. 其中 zoom_maxMap 对于老数据 14，新数据 16，新老数据下的 zoom_highest 为 0
 *
 *  @param levelCase 案例
 *
 *  @return 缩放级别
 */
-(float)getZoomLevelOf:(MBLevelCase)levelCase;
/**
 *  MBPoint 坐标准换成高精度坐标
 *
 *  @param pos 普通坐标
 *
 *  @return 高精度坐标
 */
+(MBNdsPoint)ndsPointFromMBPoint:(MBPoint)pos;
/**
 *  MBNdsPoint 高精度坐标转换成普通坐标
 *
 *  @param pos 高精度坐标
 *
 *  @return 普通坐标
 */
+(MBPoint)ndsPointToMBPoint:(MBNdsPoint)pos;
/**
 *  苹果API对象转化成地图需要的高精度坐标
 *
 *  @param location 位置坐标
 *
 *  @return 高精度坐标
 */
+(MBNdsPoint)ndsPointFrom:(CLLocationCoordinate2D)location;
/**
 *  高精度坐标转换成苹果API对象
 *
 *  @param pos 高精度坐标
 *
 *  @return 位置坐标
 */
+(CLLocationCoordinate2D)ndsPointToXY:(MBNdsPoint)pos;
/**
 *  根据传入点得到包含这些点的包络盒
 *
 *  @param points 点数组
 *  @param poiNum 点数组个数
 *
 *  @return 包含所有点的包络盒
 *
 *  @since 5.0.x
 */
+(MBRect)getFitRect:(MBPoint*)points num:(NSInteger)poiNum;
/**
 *  手势类型的开启和关闭
 *
 *  @param gesture 手势类型
 *  @param enable  YES 表示开启识别
 *
 *  @since 5.0.x
 */
-(void)optionalGesture:(MBOptionalGesture)gesture enable:(BOOL)enable;
/**
 *  Default value: OptionalGesture_singleTouchZoom - true.
 *
 *  @param gesture 手势类型
 *
 *  @return YES 识别该类型手势
 *
 *  @since 5.0.x
 */
-(BOOL)isOptionalGestureEnabled:(MBOptionalGesture)gesture;
-(NSInteger)detachAllOverlays;
-(void)detachOverlay:(MBOverlay*)overlay;
-(void)detachAnnotation:(MBAnnotation*)annotation;
-(NSInteger)detachAllAnnotations;
-(UIImage*)screenshotWithRect:(MBRect)rect dpiFactor:(float)dpi;
@end
