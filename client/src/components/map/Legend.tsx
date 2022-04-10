import { LegendThreshold, LegendLabel, LegendItem } from "@visx/legend";
import { scaleThreshold } from "@visx/scale";
import { LinearGradient } from "@visx/gradient";
import { Typography } from "@mui/material";
import { useCallback } from "react";

export interface LegendProps {
  domain: Array<number>;
  range: Array<string>;
  units?: string;
  title: string;
  width?: number; // default 15
  height?: number; // default 22
}

function LegendContainer({
  title,
  subTitle,
  children,
}: {
  title: string;
  subTitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="legend">
      <Typography variant="body1">{title}</Typography>
      <Typography
        sx={{
          marginBottom: 1,
          color: (theme) => theme.palette.text.secondary,
          fontStyle: "italic",
        }}
        variant="body2"
      >
        {subTitle}
      </Typography>
      {children}
      <style>{`
        .legend {
          line-height: 0.9em;
          color: #000000;
          font-size: 10px;
          font-family: arial;
          padding: 10px 10px;
          float: left;
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 8px;
          margin: 5px 5px;
        }
      `}</style>
    </div>
  );
}

function shouldPutLabel(height: number, i: number) {
}

export function Legend(props: LegendProps) {
  const { title, units, domain, range, width, height } = props;
  const glyphWidth = width ?? 15;
  const glyphHeight = height ? height / range.length : 22;
  const minLabelHeight = 10;

  const thresholdScale = scaleThreshold({ domain, range });

  return (
    <LegendContainer title={title} subTitle={units}>
      <LegendThreshold scale={thresholdScale} itemMargin={0}>
        {(labels) =>
          labels
            .reverse()
            .map((label, i) => (
              <LegendItem
                key={`legend-quantile-${i}`}
                onClick={() => {
                  alert(`clicked: ${JSON.stringify(label)}`);
                }}
              >
                
                <svg width={glyphWidth} height={glyphHeight}>
                  <rect fill={label.value} width={glyphWidth} height={glyphHeight} />
                </svg>
                {//<svg width={glyphWidth} height={glyphHeight}>
                //   <LinearGradient
                //     from={range[range.length - 1 - i]}
                //     to={range[Math.max(range.length - i - 2, 0)]}
                //     id={`legend-grad-${i}`}
                //   />
                //   <rect
                //     fill={`url('#legend-grad-${i}')`}
                //     width={glyphWidth}
                //     height={glyphHeight}
                //   />
                // </svg>
                // { shouldPutLabel(i) && <LegendLabel margin="0px 0 0 8px">{label.text}</LegendLabel>}
                }
                <LegendLabel margin="0px 0 0 8px">{label.text}</LegendLabel>
              </LegendItem>
            ))
        }
      </LegendThreshold>
    </LegendContainer>
  );
}
