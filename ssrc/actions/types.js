/**
 * Created by ligj on 2016/9/27.
 */

//用户登录、注销相关
export const LOGGED_IN 	= 'LOGGED_IN';//
export const LOGGED_OUT = 'LOGGED_OUT';//退出登录
export const LOGGED_ERROR = 'LOGGED_ERROR'//登录错误
export const LOGGED_DOING = 'LOGGED_DOING';//登录中
export const LOGGED_NULL = 'LOGGED_NULL';//无状态

//发送验证码状态
export const SEND_CODE_ING = 'SEND_CODE_ING';//发送中
export const SEND_CODE_TIMEOUT = 'SEND_CODE_TIMEOUT';//倒计时
export const SEND_CODE_DONE = 'SEND_CODE_DONE';//倒计时完成
export const SEND_CODE_ERROR = 'SEND_CODE_ERROR';//发送失败

//注册
export const REG_STEP1_DOING = 'REG_STEP1_DOING'; //
export const REG_STEP1_SUCCESS = 'REG_STEP1_SUCCESS'; //
export const REG_STEP1_ERROR = 'REG_STEP1_ERROR'; //
export const REG_STEP2_START = 'REG_STEP2_START'; //

//找回密码
export const FINDPASS_STEP1_DOING = 'FINDPASS_STEP1_DOING'; //
export const FINDPASS_STEP1_ERROR = 'FINDPASS_STEP1_ERROR'; //
export const FINDPASS_STEP2 = 'FINDPASS_STEP2'; //
export const FINDPASS_STEP2_DOING = 'FINDPASS_STEP2_DOING'; //
export const FINDPASS_STEP2_ERROR = 'FINDPASS_STEP2_ERROR'; //
export const FINDPASS_STEP3 = 'FINDPASS_STEP3'; //
export const FINDPASS_STEP3_DOING = 'FINDPASS_STEP3_DOING'; //
export const FINDPASS_STEP3_ERROR = 'FINDPASS_STEP3_ERROR'; //
export const FINDPASS_STEP3_DONE = 'FINDPASS_STEP3_DONE'; //

//通用数据请求状态
export const COMMON_DATA_DOING = 'COMMON_DATA_DOING'; //获取数据
export const COMMON_DATA_SUCCESS = 'COMMON_DATA_SUCCESS'; //获取数据-成功
export const COMMON_DATA_ERROR = 'COMMON_DATA_ERROR'; //获取数据-出错

//体检数据请求状态
export const TEST_DATA_DOING = 'TEST_DATA_DOING'; //获取体检数据
export const TEST_DATA_SUCCESS = 'TEST_DATA_SUCCESS'; //获取体检数据-成功
export const TEST_DATA_ERROR = 'TEST_DATA_ERROR'; //获取体检数据-出错
//添加车辆-从TDS系统获取车辆数据
export const TDS_DATA_DOING = 'TDS_DATA_DOING'; //获取体检数据
export const TDS_DATA_SUCCESS = 'TDS_DATA_SUCCESS'; //获取体检数据-成功
export const TDS_DATA_ERROR = 'TDS_DATA_ERROR'; //获取体检数据-出错

//推送消息
export const PUSH_MESSAGE_ADD = 'PUSH_MESSAGE_ADD'; //添加消息
export const PUSH_MESSAGE_LIST = 'PUSH_MESSAGE_LIST'; //添加列表
export const PUSH_MESSAGE_ACTIVE_PAGE = 'PUSH_MESSAGE_ACTIVE_PAGE'; //添加列表

//头像
export const USER_PIC = 'USER_PIC'; //头像

//优惠券数量
export const COUPON_IN = 'COUPON_IN';