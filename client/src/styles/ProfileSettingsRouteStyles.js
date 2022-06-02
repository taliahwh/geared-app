import { StyleSheet, Dimensions } from 'react-native';

const modalHeight = Dimensions.get('window').height / 4;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
  },
  border: {
    borderTopWidth: 1,
    borderColor: '#d4d4d4',
    marginVertical: 20,
  },
  section: {
    marginVertical: 20,
    // marginBottom: 10,
  },
  sectionTitle: {
    fontWeight: '700',
    fontSize: 17,
    paddingBottom: 5,
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#d4d4d4',
  },
  imageInputContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderColor: '#d4d4d4',
    alignItems: 'center',
  },
  inputTitle: {
    width: '30%',
    // backgroundColor: 'pink',
    fontSize: 15,
  },
  inputSection: {
    // backgroundColor: 'orange',
    width: '70%',
    marginRight: 15,
    color: '#000',
  },
  flexInputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#d4d4d4',
  },
  flexInputTitle: {
    flex: 3,
    // backgroundColor: 'pink',
    width: '30%',
    fontSize: 15,
  },
  flexInputSection: {
    // backgroundColor: 'orange',
    flex: 6,
    marginRight: 15,
    color: '#000',
  },
  flexPlaceholderSection: {
    // backgroundColor: 'orange',
    flex: 6,
    marginRight: 15,
    color: '#a1a1aa',
  },
  flexIcon: {
    // backgroundColor: 'pink',
    flex: 1,
    color: '#000',
  },
  userImage: {
    height: 30,
    width: 30,
    borderWidth: 1,
    borderColor: '#d4d4d4',
    borderRadius: 100,
  },
  btn: {
    backgroundColor: '#27272a',
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
    paddingVertical: 10,
    borderRadius: 3,
    overflow: 'hidden',
  },
  tagsContainer: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#d4d4d4',
  },

  // Modal

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: '100%',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 5,
    paddingTop: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: modalHeight,
    width: '100%',
  },
  textInput: {
    height: 40,
    borderColor: '#000000',
    paddingHorizontal: 10,
  },
});

export default styles;
