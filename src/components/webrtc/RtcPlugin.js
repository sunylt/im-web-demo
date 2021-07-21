import React from "react"
import { connect } from 'react-redux'
import EmediaPlugin from "@/config/EmediaPlugin"
import MultiAVActions from '@/redux/MultiAVRedux'
import MessageActions from '@/redux/MessageRedux'

export const emediaPlugin = new EmediaPlugin({
	iframeSrc: WebIM.config.rtcServer + "/emedia-app/plugin.html",
	success: function(){},
	onExit: () => {
		document.querySelector("#emedia-iframe-wrapper").style.display = "none";
	}
})

export const RtcManager = {
	userId: "", // 当前用户id
	userSig: "", // 当前用户sig

	/*
	userId 用户id
	chatType 聊天类型
	*/
	inviteeInfo: null, // 当前被邀请人信息，结构如上

	/*
	conferenceNotice，int类型，1，会议邀请；2，用户加入（1v1）；1邀请，2加入，3拒接，4取消;
	conferenceId,String类型,会议roomId;
	isGroupChat，boolean类型true/false；
	isVideoOff，boolean类型true/false；
	fromNickName，String类型，邀请人昵称；
	*/

	rtcInfo: null, // 当前接受到的会议信息， 结构如上

	init: function(userId){
		this.userId = userId
		this.getUserSig(userId).then(res => {
			this.userSig = res
		})
	},
	getUserSig: function(userId){
		const {rtcSigUrl, rtcAppID, rtcAppKey} = WebIM.config
		return fetch(`${rtcSigUrl}/management/room/player/usersig?name=${userId}&sdkAppId=${rtcAppID}&sdkAppKey=${rtcAppKey}`)
		.then(res => res.text())
	},
	createConference: function(callback){
		emediaPlugin.joinRoom({
			room_id: this.userId,
			user_sig: this.userSig,
			user_id: this.userId,
			app_id: WebIM.config.rtcAppID
		})
		.then((res) => {
			callback(this.userId)
		})
		.catch((e) => {
			console.log('加入房间失败', e)
		})
	},
	joinConference: function(callback){
		emediaPlugin.joinRoom({
			room_id: this.rtcInfo.conferenceId,
			user_sig: this.userSig,
			user_id: this.userId,
			app_id: WebIM.config.rtcAppID
		}).then((res) => {
			callback(res)
		})
		.catch((e) => {
			console.log('加入房间失败', e)
		})
	}
}


class RtcInviteView extends React.Component{
	
	componentDidMount(){
		RtcManager.init(this.props.username)
	}

	accept = () => {
		const _this = this
		const { rtcInfo } = RtcManager
		_this.props.hideInviteView()
		document.querySelector("#emedia-iframe-wrapper").style.display = "flex"
		RtcManager.joinConference(() => {
			_this.props.sendTxtMessage(rtcInfo.isGroupChat ? "groupchat" : "chat", rtcInfo.fromNickName, {
				msg: "已接受音视频邀请",
				ext: {
					conferenceNotice: 2
				}
			})
		})
	}

	refuse = () => {
		const {isGroupChat, fromNickName} = RtcManager.rtcInfo
		this.props.sendTxtMessage(isGroupChat ? "groupchat" : "chat", fromNickName, {
			msg: "拒绝接受音视频",
			ext: {
				conferenceNotice: 3
			}
		})
		this.props.hideInviteView()
	}

	cancel = () => {
		const { userId, chatType } = RtcManager.inviteeInfo
		this.props.sendTxtMessage(chatType, userId, {
			msg: "取消音视频",
			ext: {
				conferenceNotice: 4,
				conferenceId: this.props.username,
				isGroupChat: chatType === "chat" ? false : true,
				fromNickName: this.props.username
			}
		})
		emediaPlugin.exit(true)
	}

	close = () => {
		this.props.rtcStat === 1 ? this.cancel() : this.refuse()
		this.props.hideInviteView()
	}

	render(){
		const titleTop = ["", "等待对方接受音视频邀请", "邀请您进行音视频通话"]
		return (
			<div className="rtc-plugin" style={{ display: [1, 2].includes(this.props.rtcStat) ? "block" : "none" }}>
				<div className="webim-rtc-video" style={{width: "360px", height: "360px"}}>
					<span>{titleTop[this.props.rtcStat]}</span>
					<i key="accept" onClick={this.accept} className="font small accept" style={{
						display: this.props.rtcStat === 2 ? "block" : "none",
						left: "6px",
						right: "auto",
						top: "auto",
						bottom: "6px"
					}}>z</i>
					<i key="close" onClick={this.close} className="font small close" style={{left: "auto", right: "6px", top: "auto", bottom: "6px"}}>Q</i>
					</div>
			</div>
		)
	}
}

export default connect(
	(state, props) => ({
		username: state.login.username,
		rtcStat: state.multiAV.rtcStat
	}),
	dispatch => ({
		sendTxtMessage: (chatType, id, message) => dispatch(MessageActions.sendTxtMessage(chatType, id, message)),
		hideInviteView: () => dispatch(MultiAVActions.setRtcStat(0)),
	})
)(RtcInviteView)