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
} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import ManageRoute from '../components/tab-view/ManageRoutes';
import PaymentsRoute from '../components/tab-view/PaymentsRoute';
import ProfileSettingsRoute from '../components/tab-view/ProfileSettingsRoute';

const initialLayout = { width: Dimensions.get('window').width };

const renderScene = SceneMap({
  manage: ManageRoute,
  payments: PaymentsRoute,
  settings: ProfileSettingsRoute,
});

const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={styles.indicator}
    style={styles.tabBar}
    renderLabel={({ route }) => <Text style={styles.label}>{route.title}</Text>}
  />
);

const DashboardScreen = ({ navigation }) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'manage', title: 'Manage' },
    { key: 'payments', title: 'Payments' },
    { key: 'settings', title: 'Settings' },
  ]);

  return (
    <>
      <ImageBackground
        style={styles.headerContainer}
        blurRadius={80}
        source={{
          uri: 'https://i0.wp.com/sneakerhistory.com/wp-content/uploads/2019/03/fab-five-air-force-max-black-socks.jpg?fit=1280%2C1600&ssl=1',
        }}
      >
        <Image
          style={styles.userImage}
          source={{
            uri: 'https://i0.wp.com/sneakerhistory.com/wp-content/uploads/2019/03/fab-five-air-force-max-black-socks.jpg?fit=1280%2C1600&ssl=1',
          }}
        />
        <Text style={styles.welcomeTitle}>Hey, @fab_five</Text>
      </ImageBackground>
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
    backgroundColor: 'orange',
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
});

export default DashboardScreen;
