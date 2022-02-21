//时间格式化函数，此处仅针对yyyy-MM-dd hh:mm:ss 的格式进行格式化
export const DateFormat = (time) => {
    var date=new Date(time);
    var year=date.getFullYear();
    /* 在日期格式中，月份是从0开始的，因此要加0
      * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
      * */
    var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
    var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
    var hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours();
    var minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
    var seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
    // 拼接
    return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
};
//时段
export const TimeFrame = () => {
    //获取小时
    const hour = new Date().getHours();
    const thisTimeFrame = hour == 0? '子夜好!': hour < 5? '凌晨好!': hour < 8? '早上好!': hour < 11? '上午好!': 
                     hour < 13? '中午好!' : hour < 17? '下午好!': hour < 19? '傍晚好!': hour < 23? '晚上好!': '子夜好!';
    return thisTimeFrame;
};