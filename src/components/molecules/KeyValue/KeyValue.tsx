import { StyleSheet, View } from "@react-pdf/renderer";
import PropTypes from "prop-types";
import React from "react";

import Typography from "components/atoms/Typography/Typography";
import LabelWithIcon from "components/molecules/LabelWithIcon/LabelWithIcon";

export interface KeyValueItemProps {
    attr: string | number;
    value: string | number;
    iconName?: string;
    color?: string | string[];
}

export interface KeyValueProps {
    data?: KeyValueItemProps;

    // key(LabelWithIcon)
    keyLabelContainerStyle?: object;

    iconWidth?: number;
    iconHeight?: number;
    keyIconContainerStyle?: object;
    keyContainerStyle?: object;

    // splitter
    splitterStyle?: object;

    // value(Typhography)
    valueLabelStyle?: object;
    valueLabelContainerStyle?: object;
    valueAlign?: "center" | "left" | "right";

    // container
    containerStyle?: object;
}

// style (default)
const styles = StyleSheet.create({
    colorIconStyle: {
        marginTop: "1px",
        marginRight: "8px",
        width: "10px",
        height: "10px"
    },
    keyLabelStyle: {
        textAlign: "right",
    },
    keyLabelContainerStyle: {
        width: "65px",
    },
    keyIconContainerStyle: {
        width: "10px",
    },
    keyContainerStyle: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        width: "80px",
    },
    // splitter
    splitterStyle: {
        width: "1px",
        height: "80%",
        marginLeft: "5px",
        marginRight: "10px",
        backgroundColor: "#AAAAAA",
    },
    // value
    valueLabelStyle: {
        textAlign: "right",
    },
    valueLabelContainerStyle: {
        width: "60px",  
    },
    containerStyle: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
});

export const KeyValue: React.FC<KeyValueProps> = (props) => {
    if (props.data.iconName) {
        return (
            <View style={[styles.containerStyle, props.containerStyle]}>
                <LabelWithIcon
                    label={props.data.attr}
                    labelContainerStyle={[
                        styles.keyLabelContainerStyle,
                        props.keyLabelContainerStyle,
                    ]}
                    iconName={props.data.iconName}
                    iconWidth={props.iconWidth}
                    iconHeight={props.iconHeight}
                    iconContainerStyle={[
                        styles.keyIconContainerStyle,
                        props.keyIconContainerStyle,
                    ]}
                    containerStyle={[
                        styles.keyContainerStyle,
                        props.keyContainerStyle,
                    ]}
                ></LabelWithIcon>
                <View
                    style={[styles.splitterStyle, props.splitterStyle]}
                ></View>
                <Typography
                    text={props.data.value}
                    textAlign={props.valueAlign}
                    textStylePreset={"value_medium"}
                    containerStyle={[
                        styles.valueLabelContainerStyle,
                        props.valueLabelContainerStyle,
                    ]}
                ></Typography>
            </View>
        );
    } else if (props.data.color) {
        const colorIcon = typeof(props.data.color) === "string" 
                            ? <View style={[styles.colorIconStyle,  {backgroundColor: props.data.color}]} />
                            : props.data.color.map((color) => <View style={{width: "10px", height: "10px", backgroundColor: color}}></View>)
                
        return (
            <View style={[styles.containerStyle, props.containerStyle]}>
                <View
                    style={[styles.keyContainerStyle, props.keyContainerStyle]}
                >
                    <View style={styles.colorIconStyle}>
                        {colorIcon}
                    </View>
                    <Typography
                        text={props.data.attr}
                        textStylePreset={"attribute_medium"}
                        textAlign={"right"}
                        containerStyle={{
                            ...styles.keyLabelContainerStyle,
                            ...props.keyLabelContainerStyle,
                        }}
                    ></Typography>
                </View>
                <View
                    style={[styles.splitterStyle, props.splitterStyle]}
                ></View>
                <Typography
                    text={props.data.value}
                    textStylePreset={"value_medium"}
                    textAlign={props.valueAlign}
                    containerStyle={{
                        ...styles.valueLabelContainerStyle,
                        ...props.valueLabelContainerStyle,
                    }}
                ></Typography>
            </View>
        )
    } else {
        return (
            <View style={[styles.containerStyle, props.containerStyle]}>
                <View
                    style={[styles.keyContainerStyle, props.keyContainerStyle]}
                >
                    <Typography
                        text={props.data.attr}
                        textStylePreset={"attribute_medium"}
                        textAlign={"right"}
                        containerStyle={{
                            ...styles.keyLabelContainerStyle,
                            ...props.keyLabelContainerStyle,
                        }}
                    ></Typography>
                </View>
                <View
                    style={[styles.splitterStyle, props.splitterStyle]}
                ></View>
                <Typography
                    text={props.data.value}
                    textStylePreset={"value_medium"}
                    textAlign={props.valueAlign}
                    containerStyle={{
                        ...styles.valueLabelContainerStyle,
                        ...props.valueLabelContainerStyle,
                    }}
                ></Typography>
            </View>
        );
    }
};

KeyValue.propTypes = {
    data: PropTypes.any,

    // key(LabelWithIcon)
    keyLabelContainerStyle: PropTypes.object,

    iconWidth: PropTypes.number,
    iconHeight: PropTypes.number,
    keyIconContainerStyle: PropTypes.object,
    keyContainerStyle: PropTypes.object,

    // splitter
    splitterStyle: PropTypes.object,

    // value(Typhography)
    valueLabelStyle: PropTypes.object,
    valueLabelContainerStyle: PropTypes.object,

    // container
    containerStyle: PropTypes.object,
};

export default KeyValue;
