/*
每日一言使用api:https://v1.hitokoto.cn/
官网:https://developer.hitokoto.cn/
 */
import axios from "axios";

const url = 'https://v1.hitokoto.cn/';

function errorAlert(message) {
    alert(`每日一言刷新失败：${message}`);
}
export default async function getProverbs(type = 'a') {
    let parameter = arguments.length > 1 ? Array.from(arguments).join('&c=') : arguments[0];
    arguments.length===0?parameter=type:parameter;
    try {
        const {data} = await axios.get(`${url}?c=${parameter}`);
        return data;
    } catch (error) {
        let {message} = error;
        switch (message) {
            case "Network Error":
                errorAlert(message);
                break;
            default :
                errorAlert('未知错误')
        }
    }
}
function t(test = 1){
    console.log(arguments)
}