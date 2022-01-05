# Aether App
The Aether app is composed of the frontend (client), backend (services), and libraries (common).

## Dependencies
### NodeJS 14.15.0
```sh
yay -S nodejs
```

### NVM
Node Version Manager is needed to control which Version of node is used since AWS only supports
certain releases. Follow the installation directions on [repo](https://github.com/nvm-sh/nvm).

### PNPM (replacement for NPM)
```sh
npm i -g pnpm
```

[Documentation](https://pnpm.io/motivation)

For deploying to AWS:
### AWS CLI
```sh
python -m pip install awscli
```

[Documentation](https://docs.aws.amazon.com/cli/index.html)
[GitHub Repo](https://github.com/aws/aws-cli)

### AWS CDK CLI v2
```sh
pnpm i -g aws-cdk
```

[Documentation](https://docs.aws.amazon.com/cdk/v2/guide/home.html)
[API Reference](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-construct-library.html)
[GitHub Repo](https://github.com/aws/aws-cdk)


### Turborepo (optional)
Messing around with this. Not sure if it really adds much.
```sh 
pnpm add turbo -D
```

[Documentation](https://turborepo.org/docs/getting-started)

## Getting Started
### Developing
Build, test, lint, and synth commands can be executed with:
```sh
pnpm <command>
```
Where, `<command>` is either "build", "test", "lint", or "synth". Commands can be run against all
packages, recursively, with the `-r` flag, and run starting from the root workspace directory with
`-w`, like so:
```sh
pnpm test -r -w
```

Install all packages to get started:
```sh
pnpm install -r
```

### Bootstrapping your Environment
NodeJS 14 is required even though AWS Lambda supports v16 since CodeBuild only supports v14 at the
moment without workarounds. To use the latest NodeJS 14 version, use nvm:
```sh
nvm install 14
nvm use 14
```

To bootstrap your environment to deploy to AWS, you first need to be logged into AWS with the
`default` profile configured as your personal account. Run the following command and follow the
instructions.
```sh
aws configure
```

To create the resources needed to deploy CDK apps, run the following command:
```sh
cdk bootstrap --trust-for-lookup
```

Deploying locally isn't supported yet. Meaning, each developer can't create their own deployment on
their account correctly (there will be errors with not being able to access certain resources). Only
the tooling account can deploy with CI/CD.
