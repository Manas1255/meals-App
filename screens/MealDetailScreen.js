import { Text, View, Image, StyleSheet, ScrollView, Button } from "react-native";
import { useContext, useLayoutEffect } from "react";
import List from "../components/MealDetail/List";
import Subtitle from "../components/MealDetail/Subtitle";
import MealDetails from "../components/MealDetails";
import { MEALS } from "../data/dummy-data";
import IconButton from "../components/IconButton";
import { FavoritesContext } from "../store/context/redux/favorites-context";

function MealDetailScreen({route, navigation}){
    const favoriteMealsCtx = useContext(FavoritesContext);
    const mealId = route.params.mealId;
    const selectedMeal = MEALS.find((meal)=> meal.id === mealId);
    const mealIsFavorite = favoriteMealsCtx.ids.includes(mealId);


    function changeFavoriteStatusHandler(){
        if (mealIsFavorite){
            favoriteMealsCtx.removeFavorite(mealId);
        } else {
            favoriteMealsCtx.addFavorite(mealId);
        }

    }

    useLayoutEffect(()=> {
        navigation.setOptions({
            headerRight: () => {
                return <IconButton icon={mealIsFavorite ? "star" : "star-outline"} 
                color="white" onPress={changeFavoriteStatusHandler}></IconButton>
            }
        });
    }, [navigation, changeFavoriteStatusHandler]);

    return( 
        <ScrollView style={styles.rootContainer}>
            <Image style={styles.image} source={{uri: selectedMeal.imageUrl}}></Image>
            <Text style={styles.title}>{selectedMeal.title}</Text>
            <MealDetails duration={selectedMeal.duration}
            complexity={selectedMeal.complexity} 
            affordability={selectedMeal.affordability}
            textStyle={styles.detailText}></MealDetails>

            <View style={styles.listOuterContainer}>
            <View style={styles.listContainer}>
            <Subtitle>Ingredients</Subtitle>
            <List data={selectedMeal.ingredients}></List>
            <Subtitle>Steps</Subtitle>
            <List data={selectedMeal.steps}></List>
            </View>
            
            </View>
            
        </ScrollView>
  );
}

export default MealDetailScreen;

const styles = StyleSheet.create({
    rootContainer:{
        marginBottom: 32
    },
    image: {
        width: '100%',
        height: 350
    },
    title:{
        fontWeight: 'bold',
        fontSize: 24,
        margin: 8,
        textAlign: 'center',
        color: 'white'
    },
    detailText:{
        color: 'white'
    },
    listContainer:{
        width: '80%'
    },
    listOuterContainer:{
        alignItems: 'center'
    }
    
})