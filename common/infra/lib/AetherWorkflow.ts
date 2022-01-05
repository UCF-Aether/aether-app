import { StackProps, Stage, StageProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { MonoRepoProps, MonoRepoPipelineProps, MonoRepoPipeline, ProjectProps } from "./MonoRepoPipeline";
import { toCamelCase } from "./Utils";
import { IInfraSettings, infraSettings, IInfraConfiguration } from "./InfraSettings";

export interface AetherWorkflowProps extends StackProps {
  name: string;
  stages: [(scope: Construct, config: IInfraConfiguration) => Stage];
  selfMutation?: boolean;
};

export interface WorkflowStageProps extends StageProps {
  config: IInfraConfiguration;
  tags?: {[key: string]: string};
};


// TODO: tag component
// TODO: research conditionally creating app based on CLI args
export class AetherWorkflow extends Construct {
  readonly pipelines: Map<string, MonoRepoPipeline>;

  constructor(scope: Construct, id:string, props: AetherWorkflowProps) {
    super(scope, id);
    this.pipelines = new Map();

    const defaultBranch = 'main';
    const repo = {
      owner: 'UCF-Aether',
      name: 'Aether-App',
    };
    const project: ProjectProps = {
      name: props.name,
      path: props.name,
      additionalPaths: [
        'common/infra',
      ],
      cdkDir: 'infra/',
    };

    // console.log(infraSettings);
    Object.entries(infraSettings.configurations).forEach(([name, pipelineConfig]) => {
      let pipelineProps: MonoRepoPipelineProps = {
        repo: {
          branch: pipelineConfig.branch || defaultBranch,
          ...repo,
        },
        project,
        selfMutation: props.selfMutation || true,
        config: pipelineConfig,
        env: {
          region: infraSettings.region,
          account: pipelineConfig.account,
        },
        tags: props.tags,
      };

      const pipeline = new MonoRepoPipeline(this, `${toCamelCase(name)}Pipeline`, pipelineProps);
      this.pipelines.set(name, pipeline);

      (props.stages || []).forEach((createStage) => {
        pipeline.pipeline.addStage(createStage(pipeline, pipelineConfig));
        // console.log(`Added stage`)
      });
      // Need to build once finished with the pipeline or the cloudformation code won't be genreated
      pipeline.pipeline.buildPipeline();
      // console.log(pipeline.pipeline.pipeline.stages);
    });
  }
}
