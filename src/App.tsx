import "@mantine/core/styles.css";
import { Container, MantineProvider, Stack, Title } from "@mantine/core";
import { theme } from "./theme";
import { MaxMinProductionTable } from "./components/MaxMinProductionTable";
import { CropAveragesTable } from "./components/CropAvgTable";

export default function App() {
  return <MantineProvider theme={theme}>
    <Container>
      <Stack>
        <Title>Maximum and Minimum Crop Production by Year </Title>
        <MaxMinProductionTable />
        <Title>Crop Average Yields and Cultivation Areas</Title>
        <CropAveragesTable />
      </Stack>
    </Container>
  </MantineProvider>;
}
