import { useEffect, useState, useRef } from "react";
import { Alert, View, StyleSheet, Text } from "react-native";
import  MapView, { Callout, Marker } from "react-native-maps";
import * as Location from "expo-location";

import { api } from "@/services/api";
import {colors, fontFamily} from "@/styles/theme"

import { Places } from "@/components/places";
import { PlaceProps } from "@/components/place";
import { Categories, CategoriesProps } from "@/components/categories";
import { router } from "expo-router";

type MarketProps = PlaceProps & {
    latitude: number
    longitude: number
}

const currentLocation ={
    latitude: -23.561187293883442,
    longitude: -46.656451388116494,
}

export default function Home(){
    const [categories, setCategories] = 
    useState<CategoriesProps>([]) // generic, esse estado é desse tipo, de início é uma lista vazia
    const [category, setCategory] = useState("")
    const [markets, setMarkets] = useState<MarketProps[]>([])
    const mapRef = useRef<MapView>(null);

    async function fetchCategories() {
        try{
            const {data} = await api.get("/categories")
            setCategories(data)
            setCategory(data[0].id)
        } catch (error){
            console.log(error)
            Alert.alert("Categorias", "Não foi possível carregar as categorias...")
        }
    }

    async function fetchPlaces() {
        try {
            if (!category){
                return 
            }
            const { data } = await api.get("/markets/category/" + category)
            setMarkets(data)
        } catch (error) {
            console.log(error)
            Alert.alert("Locais", "Não foi possível carregar os locais...")
        }
    }

    async function getCurrentLocation() {
        try {
            const { granted } = await Location.requestForegroundPermissionsAsync();

            if (granted) {
                const { coords } = await Location.getCurrentPositionAsync();

                mapRef.current?.animateToRegion({
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                });            
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        // getCurrentLocation() // pede permissão da localização
        fetchCategories()
    }, []) // "[]" é dependência, para recarregar não apenas na hora da renderização 

    useEffect(() => {
        fetchPlaces()
    }, [category]) // só carrega quando tiver category

    return (
        <View style={{flex:1 , backgroundColor: colors.green.soft}}>
            
            <Categories data={categories} onSelected={setCategory} selected={category} />

            <MapView
                ref={mapRef} 
                style={StyleSheet.absoluteFillObject}
                initialRegion={{ 
                    latitude: currentLocation.latitude,
                    longitude: currentLocation.longitude,
                    latitudeDelta: 1,
                    longitudeDelta: 1,
                }}
                onMapReady={() => {
                    mapRef.current?.animateToRegion({
                    latitude: currentLocation.latitude,
                    longitude: currentLocation.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                    }, 800);
                }}
            >
                <Marker
                    identifier = "current"
                    coordinate={{
                        latitude: currentLocation.latitude,
                        longitude: currentLocation.longitude,
                    }}
                    image={require("@/assets/location.png")}
                />

                {
                    markets.map((item) => (
                        <Marker
                            key={item.id}
                            identifier={item.id}
                            coordinate={{
                                latitude: item.latitude,
                                longitude: item.longitude,
                        }}
                        image={require("@/assets/pin.png")}
                        zIndex={1000}
                    >
                        <Callout onPress={() => router.navigate(`/market/${item.id}`)}>
                            <View>
                                <View>
                                    <Text style={{
                                        fontSize: 14,
                                        color: colors.gray[600], 
                                        fontFamily: fontFamily.medium
                                        }}>{item.name}</Text>
                                    <Text style={{
                                        fontSize: 12,
                                        color: colors.gray[600], 
                                        fontFamily: fontFamily.regular
                                        }}>{item.address}</Text>
                                </View>
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>
            
            <Places data={markets} />
        </View>
    )
}