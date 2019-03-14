import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'

import { Icon } from './index'

export default ({ icon, ...props }) =>
    <TouchableOpacity activeOpacity={0.6} {...props}>
        <Icon name={icon} size={130} style={styles.icon} />
    </TouchableOpacity>

const styles = StyleSheet.create({ 
    icon: {
        opacity: .8,
    }
})
