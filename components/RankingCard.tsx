import { Stack, Text } from "@chakra-ui/react";

type Props = {
  title: string;
  items: string[];
};

export const RankingCard = ({ title, items }: Props) => (
  <Stack border="2px" borderColor="gray.400" shadow="lg" p="4" rounded="md">
    <Text fontSize="32" fontWeight="bold">
      {title}
    </Text>
    {items.map((item, i) => (
      // ランキング上位ほどフォントサイズが大きくなるようにする
      <Text fontSize={8 * (4 - i)} key={i}>
        {i + 1}. {item}
      </Text>
    ))}
  </Stack>
);
