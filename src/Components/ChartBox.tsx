import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { PieChart, Pie, Cell } from "recharts";
import { selectUserStatistic } from "redux/tests/selectors";
import styled from "styled-components";

const COLORS = ["#00C49F", "#a10707"];

const initialData = [
  { name: "Group A", value: 0 },
  { name: "Group B", value: 0 },
];

const ChartBox = () => {
  const [data, setData] = useState(initialData);
  const statistic = useSelector(selectUserStatistic);

  useEffect(() => {
    if (statistic.length !== 0) {
      setData([
        { name: "Group A", value: statistic[1] },
        { name: "Group B", value: statistic[0] },
      ]);
    }
  }, [statistic]);

  return (
    <Box>
      <StatisticListHeader>Статистика завершених тестів</StatisticListHeader>
      {statistic.length !== 0 && (
        <>
          <p>Всього пройдено тестів:{statistic[0] + statistic[1]}</p>
          <PieChart
            width={200}
            height={200}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry: any, index: any) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </>
      )}
    </Box>
  );
};

export const Box = styled.div`
  width: 100%;
  max-width: 300px;
  max-height: 400px;
  padding: ${(p) => p.theme.space[4]}px;
  background-color: ${(p) => p.theme.colors.secondaryBgColor};
  border-radius: ${(p) => p.theme.borders.baseBorder};
  margin-top: ${(p) => p.theme.space[3]}px;
  margin-right: auto;
  margin-left: auto;
`;

const StatisticListHeader = styled.p`
  margin-right: ${(p) => p.theme.space[2]}px;
  font-size: ${(p) => p.theme.fontSizes[3]}px;
  line-height: ${(p) => p.theme.lineHeights.body};
  font-weight: ${(p) => p.theme.fontWeights.bold};
`;

export default ChartBox;
