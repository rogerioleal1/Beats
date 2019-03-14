import React, { PureComponent } from 'react'
import { View, Text, Slider, StatusBar, YellowBox, TouchableOpacity, StyleSheet } from 'react-native'

import Sound from 'react-native-sound'

import { Icon, StartStop } from './components'

YellowBox.ignoreWarnings(['Slider'])

class App extends PureComponent {

    state = {
        beats: 60,
        count: 1,
        isStarted: false,
        beatsPerMeasure: 4,
    }

    componentDidMount() {
        this.sound = new Sound('click1.wav', Sound.MAIN_BUNDLE, error => {
            if (error) {
                alert(JSON.stringify(error))
            }
        })

        this.sound2 = new Sound('click2.wav', Sound.MAIN_BUNDLE, error => {
            if (error) {
                alert(JSON.stringify(error))
            }
        })
    }

    handleBeats = beats => {
        clearInterval(this.beep)

        this.setState({ 
            beats,
            count: 1,
            isStarted: false,
         })
    }

    increaseBeats = () => this.handleBeats(this.state.beats + 1)

    decreaseBeats = () => this.handleBeats(this.state.beats - 1)

    play = () => {
        const { count } = this.state

        count == 1 ? this.sound2.play() : this.sound.play()

        this.setState(state => ({
            count: state.count == 4 ? 1 : state.count + 1 
        }))
    }

    pause() {
        clearInterval(this.beep)
        this.setState({ count: 1, isStarted: false })
    }

    toggleStart = () => {
        this.setState({ isStarted: !this.state.isStarted }, () => {

            if (! this.state.isStarted) {
                this.pause()
                return false
            }
                
            this.beep = setInterval(this.play, (60 / this.state.beats) * 1000)
        })
    }

    render() {

        const { beats, isStarted } = this.state

        return (
            <View style={styles.container}>
                <StatusBar backgroundColor='#2ECC71' barStyle='light-content' />

                <Icon name='music' size={60} style={styles.iconLogo} />
                <Text style={styles.logo}>Beats Metrônomo</Text>

                <View style={styles.beatsBox}>
                    <TouchableOpacity activeOpacity={0.6} onPress={this.decreaseBeats}>
                        <Icon name='minus-circle' size={40} color='#008B80' />
                    </TouchableOpacity>

                    <Text style={styles.beats}>
                        {beats}<Text style={styles.bpm}>BPM</Text>
                    </Text>
                    
                    <TouchableOpacity activeOpacity={0.6} onPress={this.increaseBeats}>
                        <Icon name='plus-circle' size={40} color='#008B80' />
                    </TouchableOpacity>
                </View>

                <Slider
                    style={styles.slide}
                    step={1}
                    value={beats}
                    minimumValue={20}
                    maximumValue={300}
                    minimumTrackTintColor='#fff'
                    thumbTintColor='#fff'
                    onValueChange={this.handleBeats}
                />

                <StartStop 
                    icon={isStarted ? 'pause-circle' : 'play-circle'}
                    onPress={this.toggleStart}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#106B60',
    },
    logo: {
        color: '#fff',
        fontSize: 28,
        marginBottom: 40,
        opacity: .8,
    },
    iconLogo: {
        opacity: .8,
    },
    beatsBox: {
        flexDirection: 'row', 
        alignItems: 'center',
    },
    beats: {
        color: '#fff',
        fontSize: 60,
        fontWeight: 'bold',
        marginBottom: 15,
        marginHorizontal: '5%',
        opacity: .8,
    },
    bpm: {
        fontSize: 14,
    },
    slide: {
        width: '80%',
        opacity: .8,
        marginBottom: 20,
    },
})

export default App
