import { useEffect, useState, useRef } from "react";
import { View, Alert, Modal, StatusBar, ScrollView } from "react-native";
import { router, useLocalSearchParams, Redirect } from "expo-router"
import {useCameraPermissions, CameraView} from "expo-camera"

import { Button } from "@/components/button";
import { Loading } from "@/components/loading";
import { Cover } from "@/components/market/cover";
import { Coupon } from "@/components/market/coupon";
import { Details, PropsDetails } from "@/components/market/details";

import { api } from "@/services/api";

type DataProps = PropsDetails & {
    cover: string
}

export default function Market() {
    const [data, setData] = useState<DataProps>()
    const [coupon, setCoupon] = useState<string | null>(null)
    const [isVisibleCameraModal, setIsVisibleCameraModal] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [permission, requestPermision] = useCameraPermissions()
    const [couponIsFetching, setCouponIsFetching] = useState(false)
    const qrLock = useRef(false)

    const params = useLocalSearchParams<{id : string}>();

    // Para teste:
    console.log(params.id) 

    async function fetchMarket() {
        try {
            const { data } = await api.get("/markets/" + params.id)
            setData(data)
            setIsLoading(false)
        } catch (error) {
            console.log(error)
            Alert.alert("Erro", "Não foi possível carregar os dados", [
                { text: "OK", onPress: () => router.back()}
            ])
        }
    }

    async function handleOpenCamera() {
        try {
            const {granted} = await requestPermision()

            if (!granted) {
                return Alert.alert("Câmera", "Por favor, habilite o uso da câmera")
            }

            setIsVisibleCameraModal(true)
            qrLock.current = false
        } catch (error) {
            console.log(error)
            Alert.alert("Câmera", "Algo deu errado no carregamento da câmera...")
        }
    }

    async function handleUseCoupon(id:string) {
        setIsVisibleCameraModal(false)
        Alert.alert("Cupom",
            "Não é possível reutilizar cupons após o resgate. Deseja realmente resgatar o cupom agora?",
        [
            {style:"cancel", text: "Não"},
            {text: "Sim", onPress: () => getCoupon(id)}
        ])
    }

    async function getCoupon(id: string) {
        try {
            setCouponIsFetching(true)

            const { data } = await api.patch("/coupons/" + id)
            Alert.alert("Cupom", data.coupon)
            setCoupon(data.coupon)
        } catch (error) {
            console.log(error)
            Alert.alert("Erro", "Não foi possível utilizar o cupom")
        } finally {
            setCouponIsFetching(false)
        }
    }

    useEffect(() => {
        fetchMarket()
    }, [params.id, coupon]) // carregada quando recebe um id ou muda a quantidade de cupom

    if (isLoading) {
        return <Loading/>
    }

    if (!data) {
        return <Redirect href="/home"/>
    }

    return (
        <View style={{flex: 1}}>
            <StatusBar hidden /> 
            
            <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false}>
                <Cover uri={data.cover} />
                <Details data={data}/>
                {coupon && <Coupon code={coupon}/>} 
            </ScrollView>

            <View style={{padding: 32}}>
                <Button onPress={handleOpenCamera}>
                    <Button.Title>Ler QR Code</Button.Title>
                </Button>
            </View>

            <Modal style={{flex:1}} visible={isVisibleCameraModal}>
                <CameraView style={{flex:1}}
                facing="back"
                onBarcodeScanned={({data}) => {
                    if(data && !qrLock.current) {
                        qrLock.current = true
                        setTimeout(()=>{
                            handleUseCoupon(data), 400
                        })
                    }
                }}
                />
                <View style={{position:"absolute", bottom: 32, left: 32, right:32}}>
                    <Button onPress={() => setIsVisibleCameraModal(false)} isLoading={couponIsFetching}>
                        <Button.Title>Voltar</Button.Title>
                    </Button>
                </View>
            </Modal>
        </View>
    )
}