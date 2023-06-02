import React from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Pressable } from "react-native";
import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
const petData = [{
  id: 1,
  name: "Buddy",
  image: "https://drive.google.com/uc?export=view&id=139XGK7ODE8e_MdcY6bHiBJes8xOqlV-L",
  isFav: false
}, {
  id: 2,
  name: "Max",
  image: "https://drive.google.com/uc?export=view&id=1lr1eFggIYYMbaXCOKVFI-Z-Zn8Z7Fnhi",
  isFav: true
}, {
  id: 3,
  name: "Charlie",
  image: "https://drive.google.com/uc?export=view&id=1H6aB3CncDrYuLwPx0DBlNp0saLLRrNcp",
  isFav: false
}, {
  id: 4,
  name: "Lucy",
  image: "https://drive.google.com/uc?export=view&id=1xY7Hgd-mvrWujQnw6QOzGxoVJBbDQnU5",
  isFav: true
}, {
  id: 5,
  name: "Daisy",
  image: "https://drive.google.com/uc?export=view&id=139XGK7ODE8e_MdcY6bHiBJes8xOqlV-L",
  isFav: false
}, {
  id: 6,
  name: "Rocky",
  image: "https://drive.google.com/uc?export=view&id=1xY7Hgd-mvrWujQnw6QOzGxoVJBbDQnU5",
  isFav: false
}, {
  id: 7,
  name: "Luna",
  image: "https://drive.google.com/uc?export=view&id=1lr1eFggIYYMbaXCOKVFI-Z-Zn8Z7Fnhi",
  isFav: true
}, {
  id: 8,
  name: "Bailey",
  image: "https://drive.google.com/uc?export=view&id=1H6aB3CncDrYuLwPx0DBlNp0saLLRrNcp",
  isFav: false
}, {
  id: 9,
  name: "Sadie",
  image: "https://drive.google.com/uc?export=view&id=1xY7Hgd-mvrWujQnw6QOzGxoVJBbDQnU5",
  isFav: false
}, {
  id: 10,
  name: "Molly",
  image: "https://drive.google.com/uc?export=view&id=1H6aB3CncDrYuLwPx0DBlNp0saLLRrNcp",
  isFav: true
}];

const PetGalleryScreen = () => {
  const authTokens = useSelector(state => state?.authTokens);
  const navigation = useNavigation();
  const [filter, setFilter] = useState("Explore");
  const [pets, setPets] = useState(petData);
  useEffect(() => {
    if (authTokens) {
      // token
      console.log("token", authTokens);
    }
  }, [authTokens]);

  const handleFilter = filterType => {
    setFilter(filterType);
    console.log("tkn" + authTokens);

    if (filterType === "Explore") {
      setPets(petData);
    } else if (filterType === "My Pets") {
      setPets(petData.filter(pet => !pet.isFav));
    } else if (filterType === "My Favs") {
      setPets(petData.filter(pet => pet.isFav));
    }
  };

  const handleFavToggle = id => {
    const updatedPets = pets.map(pet => {
      if (pet.id === id) {
        return { ...pet,
          isFav: !pet.isFav
        };
      }

      return pet;
    });
    setPets(updatedPets);
  };

  return <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => {
        navigation.navigate("ScreenAI7", {});
      }}>
          <Image source={require("./peticon.png")} style={styles.headerImage} />
        </Pressable>
        <Text style={styles.headerTitle}>{"Explore"}</Text>
        <Pressable onPress={() => {
        navigation.navigate("ScreenAI3", {});
      }}>
          <Image source={require("./add.png")} style={styles.headerImage} />
        </Pressable>
      </View>
      <View style={styles.body}>
        <ScrollView contentContainerStyle={styles.cardContainer}>
          {pets.map(pet => <Pressable key={pet.id} style={styles.card} onPress={() => {
          navigation.navigate("ScreenAI5", {
            petId: "pet.id"
          });
        }}>
              <Image source={{
            uri: pet.image
          }} style={styles.cardImage} />
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardName}>{pet.name}</Text>
                <TouchableOpacity onPress={() => handleFavToggle(pet.id)}>
                  <Image source={{
                uri: pet.isFav ? "https://drive.google.com/uc?export=view&id=1tVMtgpqVRu-qrFqEN2u04o_gOPG0vFDQ" : "https://drive.google.com/uc?export=view&id=1pIgKHT8aLxInLdY_XuLrq8P-vzkFizkX"
              }} style={styles.cardFavImage} />
                </TouchableOpacity>
              </View>
            </Pressable>)}
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={[styles.footerButton, filter === "Explore" && styles.footerButtonHighlighted]} onPress={() => handleFilter("Explore")}>
          <Image source={require("./1200px-Magnifying_glass_icon.svg.png")} style={styles.footerButtonImage} />
          <Text style={[styles.footerButtonText, {
          color: filter === "Explore" ? "#FFFFFF" : "#376D89"
        }]}>
            Explore
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.footerButton, filter === "My Pets" && styles.footerButtonHighlighted]} onPress={() => handleFilter("My Pets")}>
          <Image source={require("./peticon.png")} style={styles.footerButtonImage} />
          <Text style={[styles.footerButtonText, {
          color: filter === "My Pets" ? "#FFFFFF" : "#376D89"
        }]}>
            My Pets
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.footerButton, filter === "My Favs" && styles.footerButtonHighlighted]} onPress={() => handleFilter("My Favs")}>
          <Image source={{
          uri: "https://drive.google.com/uc?export=view&id=1pIgKHT8aLxInLdY_XuLrq8P-vzkFizkX"
        }} style={styles.footerButtonImage} />
          <Text style={[styles.footerButtonText, {
          color: filter === "My Favs" ? "#FFFFFF" : "#376D89"
        }]}>
            My Favs
          </Text>
        </TouchableOpacity>
      </View>
    </View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFF5F7"
  },
  header: {
    backgroundColor: "#DFEDF4",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10
  },
  headerTitle: {
    color: "#376D89",
    fontSize: 24,
    fontWeight: "bold"
  },
  headerImage: {
    width: 30,
    height: 30
  },
  body: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },
  card: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    marginBottom: 20
  },
  cardImage: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  cardTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  cardName: {
    color: "#376D89",
    fontSize: 18,
    fontWeight: "bold"
  },
  cardFavImage: {
    width: 34,
    height: 31
  },
  footer: {
    backgroundColor: "#DFEDF4",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  footerButton: {
    flexDirection: "column",
    alignItems: "center"
  },
  footerButtonHighlighted: {
    backgroundColor: "#376D89",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  footerButtonImage: {
    width: 34,
    height: 31
  },
  footerButtonText: {
    color: "#376D89",
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5
  }
});
export default PetGalleryScreen;