import React from 'react';
import { Table } from '@mantine/core';
import { processMaxMinProductionByYear } from '../utils/data-processor';

export const MaxMinProductionTable: React.FC = () => {
  const data = processMaxMinProductionByYear();

  const rows = data.map((row) => (
    <Table.Tr key={row.year}>
      <Table.Td>{row.year}</Table.Td>
      <Table.Td>{row.maxCrop}</Table.Td>
      <Table.Td>{row.minCrop}</Table.Td>
    </Table.Tr>
  ));
  return (
    <Table striped>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Year</Table.Th>
          <Table.Th>Crop with Maximum Production in that year</Table.Th>
          <Table.Th>Crop with Minimum Productionin that year</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};