### usages at workflows

```yaml
jobs:
  build:
    runs-on: ubuntu-20.04
    permissions:
      id-token: write
      contents: read
    steps:
      - uses: actions/checkout@v3
      - uses: ./.github/actions/configure-aws-credentials
        with:
          role_to_assume: ${{ secrets.AWS_ROLE_ARN }}
      - run: aws s3 ls
```
