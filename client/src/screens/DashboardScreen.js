import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ImageBackground,
  Dimensions,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

// Tab Screens
import ManageRoute from '../components/tab-view/ManageRoutes';
import PaymentsRoute from '../components/tab-view/PaymentsRoute';
import ProfileSettingsRoute from '../components/tab-view/ProfileSettingsRoute';
import { getUserDetails } from '../actions/userActions';

const initialLayout = { width: Dimensions.get('window').width };

const renderScene = SceneMap({
  manage: ManageRoute,
  payments: PaymentsRoute,
  settings: ProfileSettingsRoute,
});

const Header = ({ children }) => {
  return <View style={styles.loadingHeader}>{children}</View>;
};

const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={styles.indicator}
    style={styles.tabBar}
    renderLabel={({ route }) => <Text style={styles.label}>{route.title}</Text>}
  />
);

const DashboardScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'manage', title: 'Manage' },
    { key: 'payments', title: 'Payments' },
    { key: 'settings', title: 'Settings' },
  ]);

  const { _id: userId } = useSelector((state) => state.userSignIn.userInfo);
  const {
    loading: loadingUserDetails,
    userDetails,
    error: errorUserDetails,
  } = useSelector((state) => state.userDetails);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getUserDetails(userId));
    }, [dispatch])
  );

  return (
    <>
      {loadingUserDetails && (
        <Header>
          <ActivityIndicator size={'small'} />
        </Header>
      )}
      {errorUserDetails && (
        <Header>
          <Text>{errorUserDetails}</Text>
        </Header>
      )}
      {userDetails && (
        <ImageBackground
          style={styles.headerContainer}
          blurRadius={80}
          source={{
            uri: userDetails.profileImage,
          }}
        >
          <Image
            style={styles.userImage}
            source={{
              uri: userDetails.profileImage,
            }}
          />
          <Text style={styles.welcomeTitle}>
            {`Hey, @${userDetails.username}`}
          </Text>
        </ImageBackground>
      )}
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={renderTabBar}
      />
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    color: '#27272a',
    fontWeight: '600',
  },
  indicator: {
    // backgroundColor: '#3E5E7E',
    backgroundColor: '#404040',
  },
  tabBar: {
    backgroundColor: 'white',
  },
  headerContainer: {
    // backgroundColor: 'orange',
    height: 120,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // paddingLeft: 30,
  },
  userImage: {
    // borderWidth: 1,
    // borderColor: '#d4d4d4',
    borderRadius: 1000,
    marginRight: 15,
    height: 60,
    width: 60,
  },
  welcomeTitle: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
  },
  dashboardContainer: {
    paddingTop: 10,
  },
  loadingHeader: {
    height: 120,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DashboardScreen;
