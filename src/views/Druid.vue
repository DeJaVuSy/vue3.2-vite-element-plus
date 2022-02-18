<template>
    <el-scrollbar height="800px">
        <iframe src="http://localhost:8081/druid" id="mobsf" style="position:relative;"></iframe>
    </el-scrollbar>

</template>
 
 
<script>
    export default {
        data () {
            return {
            }
        },
        mounted(){
            /**
            * iframe-宽高自适应显示   
            */
            function changeMobsfIframe(){
                const mobsf = document.getElementById('mobsf');
                const deviceWidth = document.body.clientWidth;
                const deviceHeight = document.body.clientHeight;
                mobsf.style.width = (Number(deviceWidth)-240) + 'px'; //数字是页面布局宽度差值
                mobsf.style.height = (Number(deviceHeight)-64) + 'px'; //数字是页面布局高度差
            }
            changeMobsfIframe()
            window.onresize = function(){
                changeMobsfIframe()
            }
        }
    }
</script>
