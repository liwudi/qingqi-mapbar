/**
 * Created by cryst on 2016/10/16.
 */
const resultCode = {
    SUCCESS: 200,   //成功
    SYSTEM_ERROR: 506,  //系统异常，请联系管理员
    PARAMS_ERROR: 507,  //参数异常，验证失败
    USER_DOSE_NOT_EXIST: 508,   //用户不存在
    LOGIN_FAILED: 509,  //登录失败
    NO_PERMISSIONS: 510,    //权限不足
    NO_DATA: 511    //无数据
};

export default resultCode;