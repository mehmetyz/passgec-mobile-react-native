import AsyncStorage from '@react-native-async-storage/async-storage';

const getData = async key => {
  try {
    let data = await AsyncStorage.getItem(key);
    return data;
  } catch (error) {
    console.log(error);
  }
};
const saveToStorage = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.log(error);
  }
};

export {getData, saveToStorage, clearStorage};
