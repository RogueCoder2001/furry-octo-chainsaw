import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Modal,
  FlatList,
} from "react-native";
import Task from "../components/Task";
import GooglePlacesInput from "./GooglePlacesInput";
import AddForm from "./AddForm";
import { MaterialIcons } from "@expo/vector-icons";
import { API, Auth, graphqlOperation } from "aws-amplify";
import {
  getLandlord,
  getProperty,
  listPropertys,
} from "../src/graphql/queries";
import {
  createProperty,
  createLandlord,
  updateLandlord,
} from "../src/graphql/mutations";
export default function properties({ navigation }) {
  /*Constants*/
  const [modalOpen, setModalOpen] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
  const [rentals, setRental] = useState([]);
  const [user, setUser] = useState("");
  const [number, setNumber] = useState(0);

  const checkUser = async () => {
    try {
      const curUser = await Auth.currentAuthenticatedUser();
      const landlord = await API.graphql({
        query: getLandlord,
        variables: { id: curUser.username },
      });
      //console.log("landlord",landlord);
      if (landlord.data.getLandlord == null) {
        console.log("adding...");
        const tmp = {};
        tmp.id = curUser.username;
        tmp.properties = [];
        const userData = await API.graphql(
          graphqlOperation(createLandlord, { input: tmp })
        );
      }
      setUser(curUser.username);
    } catch (error) {
      console.log("not found", error, "a", user);
    }
  };
  const getRentals = async () => {
    try {
      const x = await checkUser();
      console.log("user", user);
      const landlord = await API.graphql({
        query: getLandlord,
        variables: { id: user },
      });
      if (landlord.data.getLandlord != null) {
        const properties = landlord.data.getLandlord.properties;
        if (rentals.length == 0) {
          for (const property of properties) {
            const rental = await API.graphql({
              query: getProperty,
              variables: { id: property },
            });
            console.log(rental.data.getProperty);
            setRental((currentRentals) => {
              return [rental.data.getProperty, ...currentRentals];
            });
          }
          console.log("retrieved");
        }
      }
    } catch (error) {
      console.log("error getting", error);
    }
  };

  const addProperty = async (rental) => {
    try {
      const rentalData = await API.graphql(
        graphqlOperation(createProperty, { input: rental })
      );
      const tmp = await API.graphql({
        query: getLandlord,
        variables: { id: user },
      });
      const landlord = tmp.data.getLandlord;
      delete landlord.createdAt;
      delete landlord.updatedAt;
      landlord.properties.push(rental.id);
      const landlordData = await API.graphql(
        graphqlOperation(updateLandlord, { input: landlord })
      );
      setRental((currentRentals) => {
        return [rental, ...currentRentals];
      });
    } catch (error) {
      console.log("error adding", error);
    }
  };
  const addRental = (rental) => {
    //change this to not random
    rental.id = Math.random().toString();
    rental.issues = 0;
    rental.number = number;
    setNumber(0);
    addProperty(rental);
    setModalOpen(false);
  };
  /*Functions */
  const pressRental = (item) => {
    console.log(item.id);
    //let item = rentals[key];
    navigation.navigate("RentalDetails", item);
  };

  const handleAddTask = () => {
    Alert.alert("Add Property", "Do you wish to add a new rental property", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Presssed"),
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => navigation.navigate("AddRental"),
      },
    ]);
  };

  getRentals();
  return (
    <View style={StyleSheet.container}>
      <Modal visible={modalOpen} animationType="slide">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContent}>
            <MaterialIcons
              name="close"
              size={24}
              style={{ ...styles.modalToggle, ...styles.modalClose }}
              onPress={() => setModalOpen(false)}
            />
            <View style={styles.googleInput}>
              <TextInput
                style={styles.TextInput}
                placeholder="Apt number(optional)"
                onChangeText={(number) => setNumber(number)}
                //defaultValue={number}
                keyboardType="numeric"
              />
              <GooglePlacesInput addRental={addRental} />
            </View>
            {/*<AddForm addRental={addRental} />*/}
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/*menu options*/}
      <Modal visible={modal2Open} animationType="slide">
        <View>
          <MaterialIcons
            name="close"
            size={24}
            style={{ ...styles.modalToggle, ...styles.modalClose }}
            onPress={() => setModal2Open(false)}
          />
          <Button
            //style={styles.button}
            title="Logout"
            color="maroon"
            onPress={() => console.log("logout")}
          />
          {/*<Options />*/}
        </View>
      </Modal>

      <MaterialIcons
        name="add"
        size={24}
        style={styles.modalToggle}
        onPress={() => setModalOpen(true)}
      />

      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Properties</Text>
        {/*Properties list*/}
        <View style={styles.items}>
          <FlatList
            data={rentals}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => pressRental(item)}>
                <Task
                  text={
                    item.number == 0
                      ? item.address
                      : item.number + " " + item.address
                  }
                />
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
      <MaterialIcons
        name="menu-open"
        size={24}
        style={styles.modal2Toggle}
        onPress={() => setModal2Open(true)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  TextInput: {
    paddingBottom: 10,
    backgroundColor: "grey",
    color: "white",
  },
  googleInput: {
    flex: 1,
    marginTop: 20,
    paddingBottom: 30,
  },
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  tasksWrapper: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  items: {
    marginTop: 30,
  },
  modalToggle: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#f2f2f2",
    padding: 10,
    borderRadius: 10,
    alignSelf: "center",
  },
  modal2Toggle: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#f2f2f2",
    padding: 10,
    borderRadius: 10,
    alignSelf: "baseline",
  },
  modalClose: {
    marginTop: 20,
    marginBottom: 0,
  },
  modalContent: {
    flex: 1,
  },
});
