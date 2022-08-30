/*
每日一言使用api:https://v1.hitokoto.cn/
官网:https://developer.hitokoto.cn/
 */
import axios from "axios";

const url = 'https://v1.hitokoto.cn/';
const TYPE = ['a', 'b', 'c', 'd', ' e', 'f', 'g', 'h', 'i', 'k']

function errorAlert(message) {
    alert(`每日一言刷新失败：${message}`);
}

export default async function getProverbs() {
    const DAY = new Date().getDay()-1;
    let parameter = [TYPE[DAY],TYPE[TYPE.length-1-DAY],TYPE[DAY+1]].join('&c=');
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

function t(test = 1) {
    console.log(arguments)
}