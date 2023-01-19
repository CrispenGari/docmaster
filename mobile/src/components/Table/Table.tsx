import { View, Text } from "react-native";
import React from "react";
import { Table, Row, Rows } from "react-native-table-component";
import { COLORS, FONTS } from "../../constants";

interface Props {
  tableHead: string[];
  title: string;
  tableData: Array<Array<any>>;
}
const T: React.FC<Props> = ({ tableHead, title, tableData }) => {
  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        backgroundColor: "#fff",
        width: "100%",
      }}
    >
      <Text
        style={{
          color: COLORS.main,
          textAlign: "center",
          marginBottom: 10,
          fontFamily: FONTS.regular,
          fontSize: 20,
          letterSpacing: 2,
        }}
      >
        {title}
      </Text>
      <Table
        borderStyle={{ borderWidth: 2, borderColor: COLORS.main_tertiary }}
      >
        <Row
          data={tableHead}
          style={{ height: 40, backgroundColor: COLORS.main }}
          textStyle={{
            color: "orange",
            fontFamily: FONTS.regular,
            textAlign: "center",
          }}
        />
        <Rows
          data={tableData}
          textStyle={{
            margin: 6,
            fontFamily: FONTS.regular,
            textAlign: "center",
          }}
        />
      </Table>
    </View>
  );
};

export default T;
