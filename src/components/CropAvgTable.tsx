import React from 'react';
import { Table } from '@mantine/core';
import { processCropAverages } from '../utils/data-processor';

export const CropAveragesTable: React.FC = () => {
  const data = processCropAverages();

  const rows = data.map((row) => (
    <Table.Tr key={row.cropName}>
      <Table.Td>{row.cropName}</Table.Td>
      <Table.Td>{row.avgYield}</Table.Td>
      <Table.Td>{row.avgArea}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table striped>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Crop</Table.Th>
          <Table.Th>Average Yield (Kg/Ha)</Table.Th>
          <Table.Th>Average Cultivation Area (Ha)</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};
