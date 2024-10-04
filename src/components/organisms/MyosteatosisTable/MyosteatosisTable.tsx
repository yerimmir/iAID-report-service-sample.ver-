import { Image, StyleSheet, View } from "@react-pdf/renderer";
import { Spacer } from "components/atoms/Spacer/Spacer";
import Typography from "components/atoms/Typography/Typography";
import { KeyValue } from "components/molecules/KeyValue/KeyValue";
import { Table } from "components/molecules/Table/Table";
import {
  IMeasurement,
  IStatisticalAnalysis,
  SarcopeniaResultType,
} from "models/sarcopenia";
import { setNoImage } from "modules/checkError";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { ContainerPadding } from "../../../constants";

export interface SarcopeniaTableProps {
  className?: string;
  containerStyle?: object;

  targetSliceLevel?: number;
  measurement?: IMeasurement;
  statisticalAnalysis?: IStatisticalAnalysis;
}

const styles = StyleSheet.create({
  // header
  headerContainerStyle: {
    display: "flex",
    backgroundColor: "#F1F2FF",
    width: "250px",
    height: "25px",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: "5px",
    paddingLeft: "10px",
    marginBottom: "5px",
  },
  headerKeyContainerStyle: {
    width: "120px",
  },
  keyContainerStyle: {
    width: "30px",
  },
  keyLabelContainerStyle: {
    width: "30px",
  },
  valueLabelContainerStyle: {
    width: "73px",
  },

  measurementTableStyle: {
    height: "180px",
    backgroundColor: "#000000",
    border: "none",
  },
  statisticalAnalysisTableStyle: {
    height: "60 px",
    paddingTop: ContainerPadding,
    paddingBottom: ContainerPadding,
  },
  sarcopeniaTableColumnContainerStyle: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",

    width: "100px",
    alignItems: "center",
  },
  // container
  containerStyle: {
    display: "flex",
    width: "100%",
  },
});

const convertToMeasurementItems = (measurement) => {
  if (!!measurement) {
    let muscle = measurement.muscle;
    let visceralFat = measurement.visceralFat;
    let sma = measurement.sma;
    let subcutaneousFat = measurement.subcutaneousFat;

    
    // let muscleValue = muscle.value >= 0 ? muscle.value : 0; // 이전 코드. 확인을 위해 임시로 muscle -> sma로 변경함.
    let smaValue = sma.value >= 0 ? sma.value : 0; // 수정 코드
    let visceralFatValue = visceralFat.value >= 0 ? visceralFat.value : 0;
    let subcutaneousFatValue =
      subcutaneousFat.value >= 0 ? subcutaneousFat.value : 0;

    let SMA = Math.round(smaValue * 10000) / 10000 + muscle.unit;
    let VFA = Math.round(visceralFatValue * 10000) / 10000 + visceralFat.unit;
    let SFA =
      Math.round(subcutaneousFatValue * 10000) / 10000 + subcutaneousFat.unit;

    let SMAImage = sma.image ? sma.image : setNoImage();
    let VFAImage = visceralFat.image ? visceralFat.image : setNoImage();
    let SFAImage = subcutaneousFat.image ? subcutaneousFat.image : setNoImage();

    let newItems = [];
    newItems.push(
      {
        header: (
          <KeyValue
            data={{ attr: "SMA", value: SMA }}
            keyContainerStyle={styles.keyContainerStyle}
            keyLabelContainerStyle={styles.keyLabelContainerStyle}
            valueLabelContainerStyle={styles.valueLabelContainerStyle}
          />
        ),
        value: <Image src={SMAImage} />,
      },
      {
        header: (
          <KeyValue
            data={{ attr: "VFA", value: VFA }}
            keyContainerStyle={styles.keyContainerStyle}
            keyLabelContainerStyle={styles.keyLabelContainerStyle}
            valueLabelContainerStyle={styles.valueLabelContainerStyle}
          />
        ),
        value: <Image src={VFAImage} />,
      },
      {
        header: (
          <KeyValue
            data={{ attr: "SFA", value: SFA }}
            keyContainerStyle={styles.keyContainerStyle}
            keyLabelContainerStyle={styles.keyLabelContainerStyle}
            valueLabelContainerStyle={styles.valueLabelContainerStyle}
          />
        ),
        value: <Image src={SFAImage} />,
      }
    );

    return newItems;
  } else {
    return [];
  }
};
const convertToStatisticalAnalysis = (statisticalAnalysis) => {
  if (!!statisticalAnalysis) {
    let namatamaTscore = statisticalAnalysis.tscore;
    let namatamaValue = statisticalAnalysis.value;
    let namatamaResult = statisticalAnalysis.result;

    switch (namatamaResult) {
      case SarcopeniaResultType.NORMAL:
        namatamaResult = "정상";
        break;
      case SarcopeniaResultType.SARCOPENIA:
        namatamaResult = "근감소증";
        break;
    }


    let myosteatosisItems = [];
    myosteatosisItems.push(
      {
        value: (
          <View style={styles.sarcopeniaTableColumnContainerStyle}>
            <Typography
              textStylePreset="attribute_medium"
              text=" "
            ></Typography>
            <Spacer direction="row" margin="10px"></Spacer>
            <Typography
              textStylePreset="attribute_medium"
              text="NAMA / TAMA"
            ></Typography>
          </View>
        ),
      },
      {
        value: (
          <View style={styles.sarcopeniaTableColumnContainerStyle}>
            <Typography
              textStylePreset="attribute_medium"
              text="T-Score = -2.0 기준"
              textAlign="center"
            ></Typography>
            <Spacer direction="row" margin="10px"></Spacer>
            <Typography text={namatamaTscore} textAlign="center"></Typography>
          </View>
        ),
      },
      {
        value: (
          <View style={styles.sarcopeniaTableColumnContainerStyle}>
            <Typography
              textStylePreset="attribute_medium"
              text="측정 결과"
              textAlign="center"
            ></Typography>
            <Spacer direction="row" margin="10px"></Spacer>
            <Typography text={namatamaValue} textAlign="center"></Typography>
          </View>
        ),
      },
      {
        value: (
          <View style={styles.sarcopeniaTableColumnContainerStyle}>
            <Typography
              textStylePreset="attribute_medium"
              text="근지방증 여부"
              textAlign="center"
            ></Typography>
            <Spacer direction="row" margin="10px"></Spacer>
            <Typography text={namatamaResult} textAlign="center"></Typography>
          </View>
        ),
      }
    );
    return myosteatosisItems;
  } else {
    return [];
  }
};

export const MyosteatosisTable: React.FC<SarcopeniaTableProps> = (props) => {
  const [measurementItems, setMeasurementItems] = useState(
    convertToMeasurementItems(props.measurement)
  );
  const [statisticalAnalysisItems, setStatisticalAnalysisItems] = useState(
    convertToStatisticalAnalysis(props.statisticalAnalysis)
  );

  // measurementItems
  useEffect(() => {
    setMeasurementItems(convertToMeasurementItems(props.measurement));
  }, [props.measurement]);

  // statisticalAnalysisItems
  useEffect(() => {
    setStatisticalAnalysisItems(
      convertToStatisticalAnalysis(props.statisticalAnalysis)
    );
  }, [props.statisticalAnalysis]);

  return (
    <View style={[styles.containerStyle, props.containerStyle]}>
      {/* <BulletPoint title="복부 인공지능 분석 결과" /> */}
      {/* <BulletPoint title="근지방증 분석 결과" /> */}
      <Table
        containerStyle={styles.statisticalAnalysisTableStyle}
        valueOnly={true}
        items={statisticalAnalysisItems}
      ></Table>
    </View>
  );
};

MyosteatosisTable.defaultProps = {};
MyosteatosisTable.propTypes = {
  className: PropTypes.string,
  containerStyle: PropTypes.object,

  targetSliceLevel: PropTypes.number,
  measurement: PropTypes.any,
  statisticalAnalysis: PropTypes.any,
};
export default MyosteatosisTable;
