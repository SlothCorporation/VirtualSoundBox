import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as elbv2 from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ecsPatterns from 'aws-cdk-lib/aws-ecs-patterns';

export class AppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const prefix = "vsb-prd";

    const nginxRepository = new ecr.Repository(this, 'NginxRepository');
    const phpFpmRepository = new ecr.Repository(this, 'PhpFpmRepository');

    const vpc = new ec2.Vpc(this, 'Vpc', {
      ipAddresses: ec2.IpAddresses.cidr('10.0.0.0/16'),
      natGateways: 0,
    })

    const cluster = new ecs.Cluster(this, 'Cluster', {
      vpc,
    });

    const taskDefinition = new ecs.FargateTaskDefinition(this, 'TaskDefinition', {});

    taskDefinition.addContainer('Nginx', {
      image: ecs.ContainerImage.fromEcrRepository(nginxRepository),
      portMappings: [{ containerPort: 80 }],
      // memoryLimitMiB: 256,
      // healthCheck: {
      //   command: ['CMD-SHELL', `curl -f http://localhost/${healthCheckPath} || exit 1`],
      //   retries: 10,
      //   interval: Duration.seconds(10),
      // },
    });

    const loadBalancedFargateService = new ecsPatterns.ApplicationLoadBalancedFargateService(this, 'Service', {
      cluster,
      // memoryLimitMiB: 1024,
      // cpu: 512,
      // // taskImageOptions: {
      // //   image: ecs.ContainerImage.fromRegistry("amazon/amazon-ecs-sample"),
      // //   command: ['command'],
      // //   entryPoint: ['entry', 'point'],
      // // },
      // containerCpu: 256,
      // containerMemoryLimitMiB: 512,
      // minHealthyPercent: 100,
      taskDefinition,
    });

    // loadBalancedFargateService.targetGroup.configureHealthCheck({
    //   path: "/custom-health-path",
    // });
  }
}
