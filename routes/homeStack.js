import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Home from "../screens/properties";
import RentalDetails from "../screens/rentalPage";
import Login from "../screens/LoginScreen";
import Register from "../screens/RegisterScreen";
import Start from "../screens/StartScreen";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";
import Tenant from "../screens/Tenant";
import InvitationPage from "../screens/invitationPage";
import editTenant from "../screens/editTenant";
import TenantForm from "../screens/TenantForm";

const screens = {
  // TenantForm: {
  //   screen: TenantForm,
  //   navigationOptions: {
  //     title: "TenantForm",
  //   },
  // },
  editTenant: {
    screen: editTenant,
    navigationOptions: {
      title: "editTenant",
    },
  },
  InvitationPage: {
    screen: InvitationPage,
    navigationOptions: {
      title: "InvitationPage",
    },
  },
  Tenant: {
    screen: Tenant,
    navigationOptions: {
      title: "Tenant",
    },
  },
  ResetPasswordScreen: {
    screen: ResetPasswordScreen,
    navigationOptions: {
      title: "ResetPasswordScreen",
    },
  },
  Login: {
    screen: Login,
    navigationOptions: {
      title: "Login",
    },
  },
  Register: {
    screen: Register,
    navigationOptions: {
      title: "Register",
    },
  },
  Start: {
    screen: Start,
    navigationOptions: {
      title: "Start",
    },
  },
  Home: {
    screen: Home,
    navigationOptions: {
      title: "Home",
    },
  },
  RentalDetails: {
    screen: RentalDetails,
    navigationOptions: {
      title: "Rental Page",
    },
  },
};

const HomeStack = createStackNavigator(screens, {
  initialRouteName: "Start",
  defaultNavigationOptions: {
    headerTintColor: "#444",
    headerStyle: {
      backgroundColor: "#eee",
      height: 60,
    },
  },
});

export default createAppContainer(HomeStack);
