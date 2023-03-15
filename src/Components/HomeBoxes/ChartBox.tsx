import { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { PieChart, Pie, Cell } from "recharts";
import { selectUserStatistic } from "redux/tests/selectors";
import styled from "styled-components";

const COLORS = ["rgba(44, 160, 49, 0.8)", "rgb(187, 3, 49)"];

const ChartBox = () => {
  const [data, setData] = useState<any>([{}, {}]);
  const [percentage, setPersentage] = useState<number>(0);
  const statistic = useSelector(selectUserStatistic);

  useEffect(() => {
    if (statistic?.length !== 0) {
      setData([
        { name: "Group A", value: statistic[1] },
        { name: "Group B", value: statistic[0] },
      ]);
      setPersentage((100 * 5) / (statistic[0] + statistic[1]));
    }
  }, [statistic]);

  return (
    <Box>
      <StatisticListHeader>Статистика завершених тестів</StatisticListHeader>
      {statistic?.length !== 0 && (
        <>
          <p>Всього пройдено тестів:{statistic[0] + statistic[1]}</p>
          <PieChatBox>
            <Percentage>{percentage.toFixed(2)} %</Percentage>
            <PieChart
              key={Math.random()}
              width={230}
              height={data[0].value === 0 && data[1].value === 0 ? 0 : 230}
            >
              <Pie
                data={data}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label
                stroke="none"
              >
                {data.map((entry: any, index: any) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </PieChatBox>
        </>
      )}
    </Box>
  );
};

const Box = styled.div`
  width: 100%;
  max-width: 300px;
  max-height: 400px;
  padding: ${(p) => p.theme.space[4]}px;
  background-color: ${(p) => p.theme.colors.secondaryBgColor};
  border-radius: ${(p) => p.theme.borders.baseBorder};
  margin-top: ${(p) => p.theme.space[2]}px;

  @media screen and (min-width: 960px) {
    margin-top: 0;
    margin-left: ${(p) => p.theme.space[2]}px;
  }
`;

const PieChatBox = styled.div`
  position: relative;
`;

const Percentage = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StatisticListHeader = styled.p`
  margin-right: ${(p) => p.theme.space[2]}px;
  font-size: ${(p) => p.theme.fontSizes[3]}px;
  line-height: ${(p) => p.theme.lineHeights.body};
  font-weight: ${(p) => p.theme.fontWeights.bold};
`;

export default ChartBox;
