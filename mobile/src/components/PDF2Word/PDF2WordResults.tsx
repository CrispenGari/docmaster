import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Table } from "../../components";
import { COLORS } from "../../constants";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppParamList } from "../../params";

interface Props {
  results: any;
  navigation: StackNavigationProp<AppParamList, "Results", undefined>;
}
const PdfMetaResults: React.FunctionComponent<Props> = ({
  results,
  navigation,
}) => {
  const [tableData, setTableData] = useState<Array<any[]>>([]);
  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!results) {
      const pages = results.pages;
      const author = results.author ?? "No author";
      const producer = results.producer ?? "No Producer";
      const creator = results.creator ?? "No creator";
      const createdAt = results.createdAt;
      const modifiedAt = results.modifiedAt;
      const pageLayout = results.pageLayou ?? "No Page Layout";
      const pageLabels = results.pageLabels;
      const pageMode = results.pageMode ?? "No page mode";
      const isLocked = results.isLocked ? "locked" : "unlocked";
      const pdfHeader = results.pdfHeader;
      const documentName = results.documentName;
      const _data = {
        "Document Name": documentName,
        pages,
        author,
        producer,
        creator,
        "Created At": createdAt,
        "Modified At": modifiedAt,
        "page Layout": pageLayout,
        "page mode": pageMode,
        Security: isLocked,
        "PDF header": pdfHeader,
        "Page Labels": [...pageLabels].join(", "),
      };
      setTableData(Object.entries(_data));
    }
    return () => {
      mounted = false;
    };
  }, [results]);
  return (
    <ScrollView style={{ flex: 1 }}>
      <Table title="Document Meta Data" tableData={tableData} />

      <TouchableOpacity
        activeOpacity={0.7}
        style={{
          marginVertical: 30,
          alignSelf: "center",
          backgroundColor: COLORS.main,
          paddingVertical: 10,
          width: "100%",
          maxWidth: 300,
          alignItems: "center",
          borderRadius: 5,
        }}
        onPress={async () => {
          // clear session
          // navigate back
          navigation.goBack();
        }}
      >
        <Text style={{ color: "white" }}>NEW DOCUMENT</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default PdfMetaResults;
