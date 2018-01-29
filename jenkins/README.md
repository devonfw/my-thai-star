# Jenkins

In this folder 2 Jenkinsfile(s) are provided to execute some CI/CD process for different parts of the **My Thai Star** project. One for the **Angular client** and another one for the **Java server**. Both are intended to be executed in an already configured **Production Line instance**. This configuration is required to be **used by Devonfw projects**, and a guide can be found in the [**Devonfw Shop Floor** incubator's wiki](https://github.com/devonfw/devonfw-shop-floor/wiki/devonfw-shop-floor-4-production-line-environment).

**TIP**: All environment variables used on both Jenkinsfiles should be declared in the correspondant Jenkins Pipeline configuration more or less like this:

![](./jenkins-pipelines-params.png)