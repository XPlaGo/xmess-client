
// request data

import axios from "axios"
import React from "react";
import {ThunkDispatch} from "@reduxjs/toolkit";
import {
    AuthState,
    refreshAuth,
    setAuth,
    setJwt,
    setProfile,
    setProfileAvatar,
    setUsername
} from "../../features/auth/authSlice";
import {AvatarService} from "./AvatarService";
import {setChatMemberAvatar} from "../../features/chat/chatSlice";

export interface SigninData {
    username: string,
    password: string
}

export interface SignupData {
    username: string,
    email: string,
    password: string
}

export interface RefreshData {
    refreshToken: string | null
}

// response data

export interface SigninResponse {
    token: string,
    refreshToken: string,
    username: string
}

export interface SignupResponse {
    token: string,
    refreshToken: string,
    username: string
}

export interface RefreshResponse {
    token: string,
    username: string
}

export interface AuthServiceInterface {
    signin(
        requestData: SigninData,
        setError:  React.Dispatch<React.SetStateAction<string | null>>,
        setLoading:  React.Dispatch<React.SetStateAction<boolean>>,
        dispatch: ThunkDispatch<{ auth: AuthState }, any, any>
    ): Promise<any>,

    signup(requestData: SignupData,
           setError:  React.Dispatch<React.SetStateAction<string | null>>,
           setLoading:  React.Dispatch<React.SetStateAction<boolean>>,
           dispatch: ThunkDispatch<{ auth: AuthState }, any, any>
    ): Promise<any>,

    refresh(requestData: RefreshData,
            setError:  React.Dispatch<React.SetStateAction<string | null>>,
            setLoading:  React.Dispatch<React.SetStateAction<boolean>>,
            dispatch: ThunkDispatch<{ auth: AuthState }, any, any>
    ): Promise<any>,

    getProfile(jwt: string,
               dispatch: ThunkDispatch<any, any, any>): Promise<any>,

    getMessage(response: any): string | null
}

let corsHeaders: {headers: {[header: string] : any}} = {
    headers: {
        //Accept: 'application/json',
        //'Content-Type': 'application/json',
        //'Access-Control-Allow-Origin': '*'
    }
}

export const AuthService: AuthServiceInterface = {

    signin: function (requestData,
                      setError,
                      setLoading,
                      dispatch): Promise<any> {
        setLoading(true);
        return axios.post("https://xmess-gateway-service.jelastic.regruhosting.ru/auth/signin", requestData, corsHeaders).catch(e => {
            setError(this.getMessage(e.response));
            setLoading(false);
        }).then(response => {
            setLoading(false)
            if (response?.status === 200) {
                setError(null);
                dispatch(setAuth(response?.data));
                setTimeout(() => {
                    this.refresh(
                        {refreshToken: response?.data.refreshToken},
                        () => {},
                        () => {},
                        dispatch
                    )
                }, 290000)
                this.getProfile(response.data.jwtToken, dispatch);
                return response.data;
            }
            return null;
        })
    },

    signup: function (requestData,
                      setError,
                      setLoading,
                      dispatch): Promise<any> {
        setLoading(true);
        return axios.post("https://xmess-gateway-service.jelastic.regruhosting.ru/auth/signup", requestData, corsHeaders).catch(e => {
            setError(this.getMessage(e.response));
            setLoading(false);
            return null;
        }).then(response => {
            setLoading(false);
            if (response?.status === 200) {
                setError(null);
                dispatch(setAuth(response?.data));
                setTimeout(() => {
                    this.refresh(
                        {refreshToken: response?.data.refreshToken},
                        () => {},
                        () => {},
                        dispatch
                    )
                }, 290000)
                this.getProfile(response.data.jwtToken, dispatch);
                return response.data;
            }
            return null;
        })
    },

    refresh: function (requestData,
                       setError,
                       setLoading,
                       dispatch): Promise<any> {
        return axios.post("https://xmess-gateway-service.jelastic.regruhosting.ru/auth/refresh", requestData, corsHeaders).catch(e => {
            setError(this.getMessage(e.response));
            setLoading(false);
            return null;
        }).then(response => {
            setLoading(false);
            if (response?.status === 200) {
                setError(null);
                dispatch(refreshAuth({jwtToken: response?.data.token, username: response?.data.username}))
                setTimeout(() => {
                    this.refresh(
                        requestData,
                        () => {},
                        () => {},
                        dispatch
                    )
                }, 290000)
                this.getProfile(response.data.token, dispatch);
                return response.data;
            }
            return null;
        })
    },

    getProfile: function (jwt,
                          dispatch): Promise<any> {
        return axios.get("https://xmess-gateway-service.jelastic.regruhosting.ru/chats/getProfile", {headers: {Authorization: "Bearer " + jwt}}).then(res => {
            dispatch(setProfile(res.data))
            console.log("got profile")
            AvatarService.loadAvatar(res.data.avatarId, jwt)?.then((base64) => {
                console.log("got avatar")
                dispatch(setProfileAvatar(base64));
            })
        })
    },

    getMessage: function (response): string | null {
        if (response && response.data) {
            if (response.data.errors !== undefined && typeof response.data.errors[0].defaultMessage === "string") {
                return response.data.errors[0].defaultMessage;
            } else if (typeof response.data === "string") {
                return response.data;
            } else if (typeof response.data.message === "string") {
                return response.data.message;
            } else if (typeof response.data.error === "string" && typeof response.data.status == "number") {
                return `${response.data.status}: ${response.data.error}`;
            } else {
                return "Oops, an unusual error!";
            }
        } else {
            return null
        }
    }
}
