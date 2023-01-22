import { View, Text } from "react-native";
import React from "react";
import { Table, Rows } from "react-native-table-component";
import { COLORS, FONTS } from "../../constants";

interface Props {
  title: string;
  tableData: Array<Array<any>>;
}
const T: React.FC<Props> = ({ title, tableData }) => {
  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        width: "100%",
      }}
    >
      <Text
        style={{
          color: "white",
          textAlign: "center",
          marginBottom: 10,
          fontFamily: FONTS.regular,
          fontSize: 20,
          letterSpacing: 2,
        }}
      >
        {title}
      </Text>
      <Table borderStyle={{ borderWidth: 1, borderColor: COLORS.main_primary }}>
        <Rows
          data={tableData}
          flexArr={[1, 2]}
          textStyle={{
            color: "white",
            paddingHorizontal: 10,
            paddingVertical: 8,
            fontFamily: FONTS.regular,
            fontSize: 16,
            textTransform: "capitalize",
          }}
        />
      </Table>
    </View>
  );
};

export default T;
