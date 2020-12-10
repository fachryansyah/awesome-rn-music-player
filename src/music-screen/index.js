import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  Animated,
  LogBox
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Slider from '@react-native-community/slider';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {getColorFromURL} from 'rn-dominant-color';
import Wave from 'react-native-waveview';
import styles from './styles';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
LogBox.ignoreAllLogs();

class MusicScreen extends Component {
  state = {
    fromBgColor: '#fff',
    toBgColor: '#fff',
    currentPlayed: 0,
    colorAnimation: new Animated.Value(0),
    musicTitle: '',
    musicBand: '',
    musicTime: 160,
    currentMusicTime: 0,
    musicList: [
      {
        id: 1,
        title: 'Yoru ni kakeru',
        band: 'Yoasabi',
        cover:
          'https://asset.kompas.com/crops/ObTkbDcOu_s8W00Iob4mwgFemBc=/0x211:1500x1211/750x500/data/photo/2020/10/23/5f923f627d0dc.jpg',
      },
      {
        id: 2,
        title: 'Hakujitsu',
        band: 'King Gnu',
        cover:
          'https://aramajapan.com/wp-content/uploads/2018/11/aramajapan.com-king-gnu-to-release-their-major-debut-album-in-january-king-gnu-to-release-their-major-debut-album-in-january-1.jpg',
      },
      {
        id: 3,
        title: 'S.O.S De`un terrein en detterese',
        band: 'Dimash Kudaibergen',
        cover:
          'https://qph.fs.quoracdn.net/main-qimg-a11c9b8d8adff35e67d0b47ed52f4287',
      },
      {
        id: 4,
        title: 'Ano Yume wo Nazotte',
        band: 'Yoasabi',
        cover:
          'https://asset.kompas.com/crops/ObTkbDcOu_s8W00Iob4mwgFemBc=/0x211:1500x1211/750x500/data/photo/2020/10/23/5f923f627d0dc.jpg',
      },
    ],
  };

  componentDidMount = () => {
    this.setState({
      currentPlayed: this.state.musicList.length - 1,
    });
    this.setCurrentMusic();
    this.getCurrentColor();
    this._carousel = null;
  };

  getCurrentColor = async () => {
    const {currentPlayed, colorAnimation} = this.state;
    const music = await this.getMusicByIndex(currentPlayed);

    await getColorFromURL(music.cover).then(async (colors) => {
      console.log(colors);
      await this.setState({
        fromBgColor: this.state.toBgColor,
      });
      await this.setState({
        toBgColor: colors.primary,
      });
    });

    Animated.timing(colorAnimation, {
      toValue: 0,
      duration: 0,
    }).start(() => {
      Animated.timing(colorAnimation, {
        toValue: 1,
        duration: 500,
      }).start();
    });
  };

  getMusicByIndex = async (index) => {
    const {musicList} = this.state;
    const music = await musicList.find(
      (item, indexMusic) => indexMusic === index,
    );
    return music;
  };

  setCurrentMusic = async (index) => {
    const {currentPlayed} = this.state;
    const music = await this.getMusicByIndex(currentPlayed);
    this.setState({
      musicTitle: music.title,
      musicBand: music.band,
    });
  };

  onSlide = async (index) => {
    await this.setState({
      currentPlayed: index,
    });
    this.setCurrentMusic();
    this.getCurrentColor();
  };

  timeConvertion = (duration) => {
    let minutes = Math.floor(duration / 60);
    let seconds = duration % 60;

    if (seconds < 10) {
      seconds = `0${seconds}`;
    }

    //get minutes
    return `${minutes}:${seconds}`;
  };

  _renderItem = ({item, index}) => {
    return (
      <View style={styles.coverCard}>
        <Image source={{uri: item.cover}} style={styles.cover} />
      </View>
    );
  };

  render = () => {
    const {
      fromBgColor,
      toBgColor,
      musicList,
      colorAnimation,
      musicTitle,
      musicBand,
      musicTime,
      currentMusicTime,
    } = this.state;
    const boxInterpolation = colorAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [fromBgColor, toBgColor],
    });
    return (
      <>
        <SafeAreaView style={{flex: 1}}>
          <Animated.View
            style={[styles.overlay, {backgroundColor: boxInterpolation}]}
          />
          <Image source={require('../../assets/img/diagmonds.png')} style={styles.textureBackground}/>
          <View style={styles.header}>
            <TouchableOpacity style={styles.left}>
              <Feather name="chevron-down" size={26} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerText}>Fachry's Playlist</Text>
            <TouchableOpacity style={styles.right}>
              <Feather name="more-vertical" size={26} color="#fff" />
            </TouchableOpacity>
          </View>
          <Carousel
            slideStyle={{height: SCREEN_WIDTH * 0.5, marginTop: 50}}
            ref={(c) => {
              this._carousel = c;
            }}
            data={musicList}
            layout={'stack'}
            layoutCardOffset={'18'}
            firstItem={musicList.length - 1}
            renderItem={this._renderItem}
            sliderWidth={SCREEN_WIDTH}
            itemWidth={SCREEN_WIDTH * 0.8}
            onSnapToItem={(slideIndex) => this.onSlide(slideIndex)}
          />

          <View>
            {/*music info*/}
            <View style={styles.musicInfo}>
              <Text style={styles.musicTitle}>{musicTitle}</Text>
              <Text style={styles.musicBand}>{musicBand}</Text>
            </View>
            <View style={styles.sliderControl}>
              <Slider
                style={styles.slider}
                onValueChange={(value) =>
                  this.setState({currentMusicTime: value})
                }
                minimumValue={0}
                maximumValue={musicTime}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#f1f1f1"
                thumbTintColor="#fff"
              />
              <View style={{flexDirection: 'row'}}>
                <Text style={[styles.left, styles.timer]}>
                  {this.timeConvertion(Math.floor(currentMusicTime))}
                </Text>
                <Text style={[styles.right, styles.timer]}>
                  {this.timeConvertion(musicTime)}
                </Text>
              </View>
            </View>
            {/*control button*/}
            <View style={styles.controlButton}>
              <TouchableOpacity style={styles.left}>
                <Feather name="shuffle" size={26} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnControl}
                onPress={() => this._carousel.snapToPrev()}>
                <Feather name="skip-back" size={26} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnControl}>
                <MaterialIcons name="play-circle-fill" size={80} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnControl}
                onPress={() => this._carousel.snapToNext()}>
                <Feather name="skip-forward" size={26} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.right}>
                <Feather name="repeat" size={26} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>

          <Wave
            ref={(ref) => (this._waveRect = ref)}
            style={styles.wave}
            H={20}
            waveParams={[
              {A: 40, T: SCREEN_WIDTH + 80, fill: '#fff'},
              {A: 45, T: SCREEN_WIDTH + 40, fill: '#d2d2d2'},
              {A: 50, T: SCREEN_WIDTH, fill: '#eeeeee'},
            ]}
            animated={true}
          />
        </SafeAreaView>
      </>
    );
  };
}

export default MusicScreen;
