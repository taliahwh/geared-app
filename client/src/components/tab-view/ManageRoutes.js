import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const thirdWindowWidth = Dimensions.get('window').width / 3;

const IEMS = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
];
const ItemSellingRender = () => <View style={styles.sellingItem} />;
const Separator = () => {
  return <View style={{ width: 5, backgroundColor: '#fff' }} />;
};

const ManageRoute = () => {
  return (
    <View style={styles.container}>
      <View style={styles.soldContainer}>
        <Text style={styles.sectionTitle}>Sold</Text>
        <View style={styles.soldItemsBtn}>
          <View style={styles.leftOfBtn}>
            <Ionicons
              name="receipt-outline"
              size={24}
              color="black"
              style={styles.btnIcon}
            />
            <Text style={styles.btnTitle}>All sold items</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={24} color="black" />
        </View>
      </View>
      <View style={styles.sellingContainer}>
        <Text style={styles.sectionTitle}>Selling</Text>
        <View style={styles.flatlistContainer}>
          <FlatList
            data={IEMS}
            renderItem={({ item }) => <ItemSellingRender />}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={Separator}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <Text style={styles.listAnItemBtn}>List an item</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F1F1F1',
  },
  soldContainer: {
    backgroundColor: '#fff',
    paddingVertical: 30,
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontWeight: '700',
    fontSize: 17,
  },
  sellingContainer: {
    backgroundColor: '#fff',
    marginTop: 10,
    paddingVertical: 30,
    paddingHorizontal: 15,
  },
  soldItemsBtn: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#e4e4e7',
    padding: 12,
    borderRadius: 5,
  },
  leftOfBtn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnIcon: {
    paddingRight: 18,
  },
  btnTitle: {
    fontSize: 16,
  },
  flatlistContainer: {
    paddingTop: 15,
  },
  sellingItem: {
    height: thirdWindowWidth,
    width: thirdWindowWidth,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
  },
  listAnItemBtn: {
    textAlign: 'center',
    backgroundColor: '#404040',
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
    paddingVertical: 10,
    marginTop: 15,
    borderRadius: 5,
    overflow: 'hidden',
  },
});

export default ManageRoute;
