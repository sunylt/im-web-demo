/**
 * git do not control webim.config.js
 * everyone should copy webim.config.js.demo to webim.config.js
 * and have their own configs.
 * In this way , others won't be influenced by this config while git pull.
 *
 */

// for react native
// var location = {
//     protocol: "https"
// }



var config = {
    /*
     * websocket server
     * im-api-v2.easemob.com/ws 线上环境
     * im-api-v2-hsb.easemob.com/ws 沙箱环境
     */
    socketServer: "https://imapi.navimentum.com:12002/ws",
    /*
     * Backend REST API URL
     * a1.easemob.com 线上环境
     * a1-hsb.easemob.com 沙箱环境
     */
    restServer: "https://am.navimentum.com:12001",

		/*
		 * Config for VideoCall
		*/
		rtcSigUrl: "https://priv-ali-sandbox-indmedia.easemob.com",
		rtcServer: "https://priv-ali-sandbox-kefu.easemob.com",
		rtcAppKey: "Y25Sak9nbnVlN1pLv3Bm5FCJBquhPsL5csn06k3AOlQ",
		rtcAppID: "827212690214645824",

    /*
     * Application AppKey
     */
    appkey: 'easemob-demo#chatdemoui',
    /*
     * Application Host
     */
    Host: 'easemob.com',
    /*
     * Whether to use HTTPS
     * @parameter {Boolean} true or false
     */
    https: false,

    /*
    * 公有云配置默认为 true，
    * 私有云配置请设置 isHttpDNS = false , 详细文档：http://docs-im.easemob.com/im/web/other/privatedeploy
    */
    isHttpDNS: false,
    /*
     * isMultiLoginSessions
     * true: A visitor can sign in to multiple webpages and receive messages at all the webpages.
     * false: A visitor can sign in to only one webpage and receive messages at the webpage.
     */
    isMultiLoginSessions: true,
    /**
     * isSandBox=true:  socketURL: 'im-api.sandbox.easemob.com',  apiURL: '//a1.sdb.easemob.com',
     * isSandBox=false: socketURL: 'im-api.easemob.com',          apiURL: '//a1.easemob.com',
     * @parameter {Boolean} true or false
     */
    isSandBox: false, //内部测试环境，集成时设为false
    /**
     * Whether to console.log
     * @parameter {Boolean} true or false
     */
    isDebug: false,
    /**
     * will auto connect the websocket server autoReconnectNumMax times in background when client is offline.
     * won't auto connect if autoReconnectNumMax=0.
     */
    autoReconnectNumMax: 5,
    /**
     * webrtc supports WebKit and https only
     */
    isWebRTC: window.RTCPeerConnection && /^https\:$/.test(window.location.protocol),
    /*
     * Upload pictures or file to your own server and send message with url
     * @parameter {Boolean} true or false
     * true: Using the API provided by SDK to upload file to huanxin server
     * false: Using your method to upload file to your own server
     */
    useOwnUploadFun: false,
    /**
     *  cn: chinese
     *  us: english
     */
    i18n: 'cn',
    /*
     * Set to auto sign-in
     */
    isAutoLogin: false,
    /**
     * Size of message cache for person to person
     */
    p2pMessageCacheSize: 500,
    /**
     * When a message arrived, the receiver send an ack message to the
     * sender, in order to tell the sender the message has delivered.
     * See call back function onReceivedMessage
     */
    delivery: false,
    /**
     * Size of message cache for group chating like group, chatroom etc. For use in this demo
     */
    groupMessageCacheSize: 200,
    /**
     * 5 actual logging methods, ordered and available:
     * 'TRACE', 'DEBUG', 'INFO', 'WARN', 'ERROR'
     */
    loglevel: 'ERROR',

    /**
     * enable localstorage for history messages. For use in this demo
     */
    enableLocalStorage: true,

    deviceId: 'newDevice'
}
export default config
