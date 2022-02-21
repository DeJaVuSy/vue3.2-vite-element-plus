<template>
    <div class="login">
        <el-card class="login_center">
            <template #header>
                <div class="card_header">
                    <span>用户登录</span>
                </div>
            </template>
            <!-- 在表单属性中加入以下代码即可实现回车键登录 @keyup.enter.native="handleLogin" -->
            <el-form :model="loginFormState" :rules="rules" ref="loginFormRef" @keyup.enter.native="handleLogin">
                <el-form-item prop="name">
                    <el-input
                        @input="rememberMeChange()"
                        :prefix-icon="User"
                        v-model.trim="loginFormState.name"
                        maxlength="32"
                        placeholder="请输入账号"
                        clearable
                    ></el-input>
                </el-form-item>
                <el-form-item prop="pwd">
                    <el-input
                        @input="rememberMeChange()"
                        :prefix-icon="Lock"
                        v-model.trim="loginFormState.pwd"
                        maxlength="16"
                        show-password
                        placeholder="请输入密码"
                        clearable
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-row :gutter="30">
                        <el-col :span="12" >
                            <el-input style="width: 150px;" 
                            v-model.trim="loginFormState.identify"
                            maxlength="4"
                            placeholder="请输入验证码"
                            clearable>
                            </el-input>
                        </el-col>
                        <el-col :span="10" >
                            <!-- 引入验证码组件 -->
                            <Identify :identifyCode="loginFormState.identifyCode" @click="changeCode()" style="height: 0;"></Identify>
                        </el-col>
                    </el-row>
                    <el-checkbox v-model="rememberMe" label="记住密码" size="large" @change="rememberMeChange()"></el-checkbox>
                    <el-button type="primary" style="width: 100%" :loading="loginFormState.loading" @click="handleLogin">登 录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script setup>
import { getCurrentInstance, reactive, ref, watch ,defineComponent,nextTick} from "vue";
import { ElMessageBox, ElMessage, ElNotification } from 'element-plus'//控件
import {User,Lock,} from '@element-plus/icons-vue'//图标
import { useRouter } from "vue-router";//路由
//import { useStore } from "vuex";
import { encode,decode } from "js-base64";//修改编码格式
import Cookies from "js-cookie"//用于记住账号
// 引入验证码组件
import Identify from "../components/Identify.vue";
//引入接口
import {Login} from "../interface/login"
import {TimeFrame} from "../util/dateFormatUtil.js"



    const { proxy } = getCurrentInstance();
    const router = useRouter();//路由
    //const store = useStore();
    const loginFormRef = ref();
    const rememberMe = ref(false)//记住密码

    //页面加载时执行
    nextTick(() => {
        // 刷新页面就生成随机验证码
        loginFormState.identifyCode = '';
        makeCode(loginFormState.identifyCodes, 4);
        getCookie();
    })

    const loginFormState = reactive({
        name: "",
        pwd: "",
        loading: false,
        // 验证码初始值
        identifyCode: '1234',
        // 验证码的随机取值范围
        identifyCodes: '1234567890',
        identify:'',//输入框验证码
    });

    //页面加载时在输入框显示已记住的账号和密码
    const getCookie = () => {
        const rememberMeCookies = Cookies.get('rememberMePro')//从Cookies取出rememberMe
        if(rememberMeCookies != undefined){
            //alert(rememberMeDecode.username);
            loginFormState.name = Cookies.get("username");//从Cookies取出保存的用户名
            loginFormState.pwd = decodePwd(Cookies.get("secret"));//从Cookies取出保存的密码
            if(loginFormState.name !=undefined && loginFormState.pwd != undefined){
                rememberMe.value = !rememberMe.value;//记住密码选中
            }
            
        }
    }

    // 点击验证码刷新验证码
    const changeCode = () => {
        loginFormState.identifyCode = ''
        makeCode(loginFormState.identifyCodes, 4)
    }
    // 生成一个随机整数  randomNum(0, 10) 0 到 10 的随机整数， 包含 0 和 10
    const randomNum = (min, max) => {
      max = max + 1
      return Math.floor(Math.random() * (max - min) + min)
    }
    // 随机生成验证码字符串
    const makeCode = (data, len) => {
      for (let i = 0; i < len; i++) {
        loginFormState.identifyCode += data[randomNum(0, data.length - 1)]
      }
    }
    //账号和密码提示
    const rules = {
        name: [{ required: true, message: "账号不能为空", trigger: "blur" }],
        pwd: [
            { required: true, message: "密码不能为空", trigger: "blur" },
            { min: 5, max: 16, message: "密码长度为5-16位", trigger: "blur" }
        ],
    };

    //请求后端
    const handleLogin = () => {
        loginFormRef.value.validate(valid => {
            if (!valid) {
                return false;
            }
            if(loginFormState.identify !== loginFormState.identifyCode){
                ElMessage.error(loginFormState.identify==''?'请输入验证码':'验证码不正确');//弹窗提示错误验证码信息
                return;
            }
            loginFormState.loading = true;//显示加载中

            let params = new URLSearchParams();
            //添加参数
            params.append('name',loginFormState.name);
            params.append('pwd',encodePwdSalt(loginFormState.pwd));
            // let params = { name: loginFormState.name, pwd: loginFormState.pwd };
            // alert(encode(JSON.stringify(params)));
            // decode("Y2hpbmEgaXMgc28gbmI="); // 解码
            //alert(params.name);
            Login(params).then((response) =>{
                let { code, token, message } = response.data;
                if(message === 'success'){
                    //alert(token);
                    localStorage.setItem('token',token)
                    //欢迎登录提示
                    loginSuccessNotify();
                    // 路由跳转
                    router.push('/home')
                }else{
                    ElMessage.error('用户名或密码错误');
                }
                loginFormState.loading = false;//关闭加载中
                //刷新验证码
                loginFormState.identifyCode = ''
                makeCode(loginFormState.identifyCodes, 4);
                //alert(response.data.token);
            }).catch(err => {
                ElMessage.error("请求超时 "+err);
                loginFormState.loading = false;//关闭加载中
            });
            

            // setTimeout(() => {
            //     let users = { role: loginFormState.name === "admin" ? "admin" : "", username: loginFormState.name };
            //     Object.assign(params, users);
            //     sessionStorage.setItem("jwt", encode(JSON.stringify(params)));
            //     //store.dispatch("setUser", params);
            //     loginFormState.loading = false;
            //     router.replace("/index");
            // }, 1000);

            // proxy.$axios
            // 	.post("/user/login", proxy.$qs.stringify(params))
            // 	.then(res => {
            // 		let { code, result_data, message } = res.data;
            // 		if (code == 1) {
            // 			console.log("login_success", result_data);
            // 			ElMessage.success("登录成功");
            // 		} else {
            // 			ElMessage.error("登录失败：" + message);
            // 		}
            // 	})
            // 	.catch(err => {
            // 		console.log("login err", err);
            // 		ElMessage.error("登录失败");
            // 	});
        });
    };

        //记住密码事件
    const rememberMeChange = () =>{
        if (rememberMe.value) {
            if(loginFormState.name != '' && loginFormState.pwd!=''){
                let encodePwdSaltCookies = encodePwdSalt(loginFormState.pwd);//编码加盐
                // console.log(rememberMePwd)
                // console.log(decodePwd(rememberMePwd))
                //alert(randomString);
                //把账号和密码保存到Cookies中
                Cookies.set('username', loginFormState.name, { expires: 30 })
                Cookies.set('secret', encodePwdSaltCookies, { expires: 30 })
                Cookies.set('rememberMePro', rememberMe.value, { expires: 30 })
            }
        } else {
            //移除保存的账号和密码
            Cookies.remove('username')
            Cookies.remove('secret')
            Cookies.remove('rememberMePro')
        }
    }

    //自定义编码加盐
    const encodePwdSalt = (pwd) => {
        let randomString = randomRange(11);//随机生成11位字符加数字
        let encodePwd = randomString.substring(0,4)+pwd.substring(0,2)+randomString.substring(4,7)+pwd.substring(2,5)+randomString.substring(7,12)+pwd.substring(5,pwd.length);
        for (let index = 0; index < 5; index++) {
            encodePwd = encode(encodePwd);
        }
        return encodePwd;//编译
    }

    //解码
    const decodePwd = (encodePwd) => {
        let PwdSalt = encodePwd;
        for (let index = 0; index < 5; index++) {//解码
            PwdSalt = decode(PwdSalt);
        }
        return PwdSalt.substring(4,6)+PwdSalt.substring(9,12)+PwdSalt.substring(16,PwdSalt.length);
    }

    //随机字符串（位数固定）
    const randomRange = (min, max) => {
        var returnStr = "",
            range = (max ? Math.round(Math.random() * (max-min)) + min : min),
            charStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';//随机24个字母大小写加数字
    
        for(var i=0; i<range; i++){
            var index = Math.round(Math.random() * (charStr.length-1));
            returnStr += charStr.substring(index,index+1);
        }
        return returnStr;
    }
    
    const loginSuccessNotify = () => {
        ElNotification({
            title: TimeFrame()+loginFormState.name,
            message: '欢迎登录vue3.2+vite+element-plus!',
            type: 'success',
        })
    }
</script>

<style lang="scss" scoped>
.login {
    width: 100vw;
    height: 100vh;
    background-image: url("../assets/img/login.jpg");
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    .login_center {
        width: 410px;
        height: auto;
    }

    .card_header {
        font-size: 18px;
        text-align: center;
    }
}
</style>
