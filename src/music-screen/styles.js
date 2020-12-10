import {StyleSheet, Dimensions} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  textureBackground: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    position: 'absolute',
    resizeMode: 'repeat',
    opacity: 0.5,
  },
  header: {
    padding: 20,
    flexDirection: 'row',
  },
  headerText: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'Poppins-Bold',
    letterSpacing: 1.2,
  },
  left: {
    marginRight: 'auto',
  },
  right: {
    marginLeft: 'auto',
  },
  cover: {
    width: SCREEN_WIDTH * 0.8,
    height: SCREEN_WIDTH * 0.8,
    borderRadius: 16,
    elevation: 10,
  },
  coverCard: {
    elevation: 10,
    backgroundColor: '#fff',
    borderRadius: 16,
  },
  imageBackround: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    resizeMode: 'cover',
    position: 'absolute',
  },
  overlay: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    position: 'absolute',
    zIndex: 1,
    opacity: 0.9,
  },
  musicInfo: {
    paddingHorizontal: 24,
  },
  musicTitle: {
    fontSize: 28,
    color: '#fff',
    fontFamily: 'Poppins-Bold',
    letterSpacing: 0.5,
  },
  musicBand: {
    fontSize: 20,
    color: '#f1f1f1',
    fontFamily: 'Poppins-Light',
  },
  sliderControl: {
    paddingHorizontal: 24,
  },
  slider: {
    height: 40,
    width: '100%',
  },
  timer: {
    color: '#fff',
    fontFamily: 'Poppins-Medium',
  },
  controlButton: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnControl: {
    marginHorizontal: 12,
  },
  wave: {
    width: SCREEN_WIDTH,
    height: 50,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
});

export default styles;
