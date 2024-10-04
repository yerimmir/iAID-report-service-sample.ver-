import { Image, StyleSheet, View } from "@react-pdf/renderer";
import { Spacer } from "components/atoms/Spacer/Spacer";
import Typography from "components/atoms/Typography/Typography";
import BulletPoint from "components/molecules/BulletPoint/BulletPoint";
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
  statisticalAnalysis?: IStatisticalAnalysis[];
}

const styles = StyleSheet.create({
  // header
  headerContainerStyle: {
    display: "flex",
    backgroundColor: "#F1F2FF",
    width: "250px",
    height: "20px",
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
    width: "40px",
  },
  keyLabelContainerStyle: {
    width: "30px",
  },
  valueLabelContainerStyle: {
    width: "73px",
  },

  measurementTableStyle: {
    height: "150px",
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
    let ima = measurement.ima;
    let lama = measurement.lama;
    let nama = measurement.nama;
    
    // let muscleValue = muscle.value >= 0 ? muscle.value : 0; // 이전 코드. 확인을 위해 임시로 muscle -> sma로 변경함.
    let smaValue = sma.value >= 0 ? sma.value : 0; // 수정 코드
    let visceralFatValue = visceralFat.value >= 0 ? visceralFat.value : 0;
    let subcutaneousFatValue =
      subcutaneousFat.value >= 0 ? subcutaneousFat.value : 0;
    let imaValue = ima.value >= 0 ? ima.value : 0;
    let lamaValue = lama.value >= 0 ? lama.value : 0;
    let namaValue = nama.value >= 0 ? nama.value : 0;

    let SMA = Math.round(smaValue * 10000) / 10000 + muscle.unit;
    let VFA = Math.round(visceralFatValue * 10000) / 10000 + visceralFat.unit;
    let SFA =
      Math.round(subcutaneousFatValue * 10000) / 10000 + subcutaneousFat.unit;
    let IMA = Math.round(imaValue * 10000) / 10000 + ima.unit;
    let LAMA = Math.round(lamaValue * 10000) / 10000 + lama.unit;
    let NAMA = Math.round(namaValue * 10000) / 10000 + nama.unit;

    let SMAImage = sma.image ? sma.image : setNoImage();
    let VFAImage = visceralFat.image ? visceralFat.image : setNoImage();
    let SFAImage = subcutaneousFat.image ? subcutaneousFat.image : setNoImage();

    let dataImageItems = [];
    let onlyDataItems = [];

    // const colorCanvas = createGradientImage("#AD1014", "#32224F")
    // console.log(colorCanvas);

    dataImageItems.push(
      {
        header: (
          <KeyValue
            data={{ attr: "SMA", value: SMA, color: ["#00D2E7", "#AD1014"] }}
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
            data={{ attr: "VFA", value: VFA, color: "#32224F" }}
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
            data={{ attr: "SFA", value: SFA, color: "#471E1A" }}
            keyContainerStyle={styles.keyContainerStyle}
            keyLabelContainerStyle={styles.keyLabelContainerStyle}
            valueLabelContainerStyle={styles.valueLabelContainerStyle}
          />
        ),
        value: <Image src={SFAImage} />,
      },
    );

    onlyDataItems.push(
      {ima: IMA, lama: LAMA, nama: NAMA}
    )

    return [dataImageItems, onlyDataItems];
  } else {
    return [];
  }
};
const convertToStatisticalAnalysis = (statisticalAnalysis) => {
  if (!!statisticalAnalysis) {
    let height2Tscore = statisticalAnalysis[0].tscore;
    let height2Value = statisticalAnalysis[0].value;
    let height2Result = statisticalAnalysis[0].result;
    let bmiTscore = statisticalAnalysis[1].tscore;
    let bmiValue = statisticalAnalysis[1].value;
    let bmiResult = statisticalAnalysis[1].result;

    switch (height2Result) {
      case SarcopeniaResultType.NORMAL:
        height2Result = "정상";
        break;
      case SarcopeniaResultType.SARCOPENIA:
        height2Result = "근감소증";
        break;
    }
    switch (bmiResult) {
      case SarcopeniaResultType.NORMAL:
        bmiResult = "정상";
        break;
      case SarcopeniaResultType.SARCOPENIA:
        bmiResult = "근감소증";
        break;
    }


    let sarcopeniaItems = [];
    sarcopeniaItems.push(
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
              text="SMA / Height²"
            ></Typography>
            <Typography
              textStylePreset="attribute_medium"
              text="SMA / BMI"
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
            <Typography text={height2Tscore} textAlign="center"></Typography>
            <Typography text={bmiTscore} textAlign="center"></Typography>
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
            <Typography text={height2Value} textAlign="center"></Typography>
            <Typography text={bmiValue} textAlign="center"></Typography>
          </View>
        ),
      },
      {
        value: (
          <View style={styles.sarcopeniaTableColumnContainerStyle}>
            <Typography
              textStylePreset="attribute_medium"
              text="근감소증 여부"
              textAlign="center"
            ></Typography>
            <Spacer direction="row" margin="10px"></Spacer>
            <Typography text={height2Result} textAlign="center"></Typography>
            <Typography text={bmiResult} textAlign="center"></Typography>
          </View>
        ),
      }
    );
    return sarcopeniaItems;
  } else {
    return [];
  }
};

export const SarcopeniaTable: React.FC<SarcopeniaTableProps> = (props) => {
  const L3SliceLevel = "L3 level slice number : " + `${props.targetSliceLevel}`;

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
      <View style={styles.headerContainerStyle}>
        <Typography
          text="근감소증 분석"
          textStylePreset="attribute_medium"
          containerStyle={styles.headerKeyContainerStyle}
        ></Typography>
        {/* <Spacer direction="col" margin="1px" /> */}
        <Typography text={L3SliceLevel}></Typography>
      </View>
      <Spacer direction="row" margin="2px" />
      <View style={{position: "relative"}}>
        <Table
          className={"measurementItems-container"}
          containerStyle={styles.measurementTableStyle}
          items={measurementItems[0]}
        />
        <View style={{position: "absolute", display: "flex", flexDirection: "row", marginTop: "15px", width: "100%", height: "15px", backgroundColor: "#EEEEEE"}}>
          <KeyValue
            containerStyle={{width: "33.3%", marginLeft: "31px"}}
            data={{ attr: "IMA", value: measurementItems[1][0].ima, color:"#C4DD20"}}
            keyContainerStyle={{width: '40px'}}
            // keyLabelContainerStyle={styles.keyLabelContainerStyle}
            valueLabelContainerStyle={styles.valueLabelContainerStyle}
          />
          <KeyValue
            containerStyle={{width: "33.3%", marginLeft: "20px"}}
            data={{ attr: "LAMA", value: measurementItems[1][0].lama, color: "#00D2E7" }}
            keyContainerStyle={{width: '50px'}}
            // keyLabelContainerStyle={styles.keyLabelContainerStyle}
            valueLabelContainerStyle={styles.valueLabelContainerStyle}
          />
          <KeyValue
            containerStyle={{width: "33.3%", marginLeft: "20px"}}
            data={{ attr: "NAMA", value: measurementItems[1][0].nama, color: "#AD1014"}}
            keyContainerStyle={{width: '50px'}}
            // keyLabelContainerStyle={styles.keyLabelContainerStyle}
            valueLabelContainerStyle={styles.valueLabelContainerStyle}
          />
        </View>
      </View>
      {/* <Spacer direction="row" margin="3px" /> */}
      <BulletPoint title="근감소증, 근지방증 분석 결과" />
      <Table
        containerStyle={styles.statisticalAnalysisTableStyle}
        valueOnly={true}
        items={statisticalAnalysisItems}
      ></Table>
      <Spacer direction="row" margin="1px" />
    </View>
  );
};

SarcopeniaTable.defaultProps = {};
SarcopeniaTable.propTypes = {
  className: PropTypes.string,
  containerStyle: PropTypes.object,

  targetSliceLevel: PropTypes.number,
  measurement: PropTypes.any,
  statisticalAnalysis: PropTypes.any,
};
export default SarcopeniaTable;
