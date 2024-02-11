import { View,Pressable,Text, StyleSheet, Platform } from "react-native";

function CategoryGridTile({title,color, onPress}){
    return (
        <View style={[styles.gridItem, {backgroundColor: color}]}>
            <Pressable style={({pressed})=> [styles.button,
            pressed ? styles.buttonPressed : null]}
            onPress={onPress}>
                <View style={styles.innerContainer}> 
                    <Text style={styles.title}>{title}</Text>
                </View>
            </Pressable>
        </View>
    );
}

export default CategoryGridTile;

const styles = StyleSheet.create({
    gridItem:{
        flex:1,
        margin: 16,
        height:150,
        borderRadius: 8,
        backgroundColor: 'white',
        shadowColor:'black',
        shadowOpacity: 0.25,
        shadowRadius: 8,
        shadowOffset: {width: 0, height:2},
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
        
    },
    button:{
        flex:1
    },
    innerContainer:{
        flex:1,
        padding: 16,
        justifyContent: 'center',
        alignItems:'center'

    },
    buttonPressed:{
        opacity:0.5
    },
    title:{
        fontWeight: 'bold',
        fontSize:18
    }


})