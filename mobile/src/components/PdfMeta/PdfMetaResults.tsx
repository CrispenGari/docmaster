import { View, Text } from "react-native";
import React from "react";
import { Table } from "../../components";

interface Props {
  results: any;
}
const PdfMetaResults: React.FunctionComponent<Props> = ({ results }) => {
  const [tableHead, setTableHead] = React.useState<Array<string>>([]);

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && !!results) {
      setTableHead(Object.keys(results));
    }
    return () => {
      mounted = false;
    };
  }, [results]);
  return (
    <View style={{}}>
      <Text>{JSON.stringify(results, null, 2)}</Text>
      <Table tableHead={tableHead} title="Document Meta Data" tableData={[]} />
    </View>
  );
};

export default PdfMetaResults;
