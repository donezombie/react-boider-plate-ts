import PageWrapper from "@/components/PageWrapper";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { localeNumber } from "@/helpers/common";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { sum } from "lodash";
import CircleProgress from "@/components/CircleProgress";
import Divider from "@/components/Divider";

const EachProgress = ({
  value,
  title,
  total,
}: {
  value: number;
  title: string | React.ReactNode;
  total: number;
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress((value / total) * 100), 200);
    return () => clearTimeout(timer);
  }, [total, value]);

  return (
    <div className={cn("w-full ")}>
      <div className="mb-2 flex items-end justify-between">
        <p className="text-md">{title}</p>
        <span className="text-sm font-normal text-green-600">
          {progress.toFixed(2)}% Completed
        </span>
      </div>
      <Progress value={progress} />
    </div>
  );
};

const Homepage = () => {
  //! State
  const goal = {
    firstLinePTV: 10500,
    cuPPV: 10300,
    video: 50,
    volLeg1: 100,
    volLeg2: 200,
    volLeg3: 200,
  };

  const current = {
    firstLinePTV: 8400,
    cuPPV: 150,
    video: 10,
    volLeg1: 100,
    volLeg2: 80,
    volLeg3: 50,
  };

  //! Function

  //! Render

  return (
    <PageWrapper>
      <div>
        <div className="flex gap-14">
          <div className="flex flex-grow flex-col gap-2">
            <h5 className="mb-2 text-3xl">March</h5>

            <div className="">
              <EachProgress
                title=""
                value={sum(Object.values(current))}
                total={sum(Object.values(goal))}
              />
            </div>

            <Divider />

            <div className="other__stats mt-0 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-2">
              {[
                {
                  label: "First line PTV",
                  value: current.firstLinePTV,
                  total: goal.firstLinePTV,
                },

                {
                  label: "CU PPV",
                  value: current.cuPPV,
                  total: goal.cuPPV,
                },
                {
                  label: "Video",
                  value: current.video,
                  total: goal.video,
                },
                {
                  label: "Vol Leg 1",
                  value: current.volLeg1,
                  total: goal.volLeg1,
                },
                {
                  label: "Vol Leg 2",
                  value: current.volLeg2,
                  total: goal.volLeg2,
                },
                {
                  label: "Vol Leg 3",
                  value: current.volLeg3,
                  total: goal.volLeg3,
                },
              ].map((el) => {
                return (
                  <div
                    className="min-w-[200px] flex-grow rounded-lg"
                    key={el.label}
                  >
                    <p className="mb-3 text-center text-sm font-semibold">
                      {el.label}
                    </p>
                    <div className="m-auto max-w-[150px]">
                      <CircleProgress value={(el.value / el.total) * 100} />
                    </div>
                    <p className="mt-2 text-center text-sm text-muted-foreground">
                      <b className="text-lg font-semibold">
                        {localeNumber(el.value)}
                      </b>{" "}
                      / <span>{localeNumber(el.total)}</span>
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="component:Homepage mt-10 rounded border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead />
              <TableHead>First line PTV</TableHead>
              <TableHead>CU PPV</TableHead>
              <TableHead>Video</TableHead>
              <TableHead>Vol leg1</TableHead>
              <TableHead>Vol leg2/OSL</TableHead>
              <TableHead>Vol leg3</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow>
              <TableCell>Goal</TableCell>
              <TableCell>{localeNumber(10500)}</TableCell>
              <TableCell>{localeNumber(10300)}</TableCell>
              <TableCell>{localeNumber(50)}</TableCell>
              <TableCell>{localeNumber(100)}</TableCell>
              <TableCell>{localeNumber(100)}</TableCell>
              <TableCell>{localeNumber(100)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Have</TableCell>
              <TableCell>{localeNumber(8400)}</TableCell>
              <TableCell>{localeNumber(150)}</TableCell>
              <TableCell>{localeNumber(0)}</TableCell>
              <TableCell>{localeNumber(100)}</TableCell>
              <TableCell>{localeNumber(80)}</TableCell>
              <TableCell>{localeNumber(50)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Remaining</TableCell>
              <TableCell>{localeNumber(2100)}</TableCell>
              <TableCell>{localeNumber(9250)}</TableCell>
              <TableCell>{localeNumber(50)}</TableCell>
              <TableCell>{localeNumber(0)}</TableCell>
              <TableCell>{localeNumber(20)}</TableCell>
              <TableCell>{localeNumber(50)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </PageWrapper>
  );
};

export default Homepage;
