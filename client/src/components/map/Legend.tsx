import { LegendThreshold, LegendLabel, LegendItem } from '@visx/legend';
import { scaleThreshold } from '@visx/scale';
import { LinearGradient } from '@visx/gradient';

export interface LegendProps {
  domain: Array<number>;
  range: Array<string>;
  units?: string;
  title: string;
}

function LegendContainer({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="legend">
      <div className="title">{title}</div>
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
        .title {
          font-size: 12px;
          margin-bottom: 10px;
          font-weight: 100;
        }
      `}</style>
    </div>
  );
}

export function Legend(props: LegendProps) {
  const { title, units, domain, range } = props;
  const legendGlyphSize = 15;

  const thresholdScale = scaleThreshold({ domain, range });  

  return (
    <LegendContainer title={`${title} (${units})`}>
        <LegendThreshold scale={thresholdScale}>
          {(labels) =>
            labels.slice(1).reverse().map((label, i) => (
              <LegendItem
                key={`legend-quantile-${i}`}
                onClick={() => {
                   alert(`clicked: ${JSON.stringify(label)}`);
                }}
              >
                <svg width={legendGlyphSize} height={legendGlyphSize * 1.5}>
                  <LinearGradient 
                    from={range[range.length - 1 - i]} 
                    to={range[range.length - i - 2]} 
                    id={`legend-grad-${i}`} 
                  />
                  <rect 
                    fill={`url('#legend-grad-${i}')`} 
                    width={legendGlyphSize} 
                    height={legendGlyphSize * 1.5} 
                  />
                </svg>
                <LegendLabel margin="0px 0 0 8px">
                  {label.text}
                </LegendLabel>
              </LegendItem>
            ))
          }
        </LegendThreshold>
      </LegendContainer>
  )
}

